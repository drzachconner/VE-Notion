import { VercelRequest, VercelResponse } from '@vercel/node';
import { getGHLClient } from '../../integrations/ghl/client';
import { logger } from '../../core/utils/logger';

/**
 * ChiroHD Webhook Receiver
 *
 * This endpoint receives webhooks from ChiroHD when patient events occur.
 * Events could include: patient created, visit completed, appointment scheduled, etc.
 *
 * Endpoint: POST /api/webhooks/chirohd
 */

interface ChiroHDWebhookPayload {
  event: string;
  timestamp: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    status?: string;
    visitCount?: number;
    firstVisitDate?: string;
    lastVisitDate?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    logger.info('ChiroHD webhook received');

    // TODO: Verify webhook signature/secret
    const webhookSecret = process.env.CHIROHD_WEBHOOK_SECRET;
    if (webhookSecret) {
      // Implement webhook verification when ChiroHD provides signature method
      // For now, we'll skip this step
    }

    const payload: ChiroHDWebhookPayload = req.body;

    logger.logSafe('info', 'ChiroHD webhook payload', {
      event: payload.event,
      patientId: payload.patient?.id,
    });

    // Get GHL client
    const ghlClient = getGHLClient();

    // Handle different event types
    switch (payload.event) {
      case 'patient.created':
      case 'lead.created':
        await handleLeadOrPatientCreated(ghlClient, payload);
        break;

      case 'visit.completed':
        await handleVisitCompleted(ghlClient, payload);
        break;

      case 'patient.updated':
        await handlePatientUpdated(ghlClient, payload);
        break;

      case 'appointment.scheduled':
        await handleAppointmentScheduled(ghlClient, payload);
        break;

      default:
        logger.warn(`Unhandled ChiroHD event type: ${payload.event}`);
    }

    return res.status(200).json({ success: true, message: 'Webhook processed' });
  } catch (error: any) {
    logger.error('Error processing ChiroHD webhook', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Handle lead or patient created in ChiroHD
 */
async function handleLeadOrPatientCreated(ghlClient: any, payload: ChiroHDWebhookPayload) {
  const { patient } = payload;

  logger.info(`Creating/updating GHL contact for ChiroHD patient: ${patient.id}`);

  // Determine if this is a lead or new patient
  const isLead = payload.event === 'lead.created' || patient.status === 'lead';

  // Prepare GHL contact data
  const contactData = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone,
    tags: isLead ? ['Lead', 'Source: ChiroHD'] : ['New Patient', 'Source: ChiroHD'],
    customFields: {
      chirohd_patient_id: patient.id,
      visit_count: patient.visitCount || 0,
      first_visit_date: patient.firstVisitDate || null,
      last_visit_date: patient.lastVisitDate || null,
    },
  };

  // Create or update contact in GHL
  const contact = await ghlClient.upsertContact(contactData);

  logger.info(`GHL contact created/updated: ${contact.id}`);

  // If it's a lead, add to lead journey workflow
  if (isLead) {
    // TODO: Add to lead journey workflow
    // await ghlClient.addContactToWorkflow(contact.id, LEAD_JOURNEY_WORKFLOW_ID);
    logger.info('Lead added - ready to trigger lead journey workflow');
  }
}

/**
 * Handle visit completed in ChiroHD
 */
async function handleVisitCompleted(ghlClient: any, payload: ChiroHDWebhookPayload) {
  const { patient } = payload;

  logger.info(`Visit completed for ChiroHD patient: ${patient.id}`);

  // Find existing contact by ChiroHD patient ID
  const contact = await findContactByChiroHDId(ghlClient, patient.id);

  if (!contact) {
    logger.warn(`No GHL contact found for ChiroHD patient: ${patient.id}`);
    return;
  }

  // Update visit count and last visit date
  await ghlClient.updateContact(contact.id, {
    customFields: {
      visit_count: patient.visitCount || (contact.customFields?.visit_count || 0) + 1,
      last_visit_date: payload.timestamp || new Date().toISOString(),
    },
  });

  // If this is the first visit, convert from Lead to New Patient
  if (patient.visitCount === 1 || !contact.customFields?.first_visit_date) {
    await convertLeadToNewPatient(ghlClient, contact.id, payload.timestamp);
  }

  logger.info(`Visit recorded for GHL contact: ${contact.id}`);
}

/**
 * Handle patient updated in ChiroHD
 */
async function handlePatientUpdated(ghlClient: any, payload: ChiroHDWebhookPayload) {
  const { patient } = payload;

  logger.info(`Patient updated in ChiroHD: ${patient.id}`);

  // Find existing contact
  const contact = await findContactByChiroHDId(ghlClient, patient.id);

  if (!contact) {
    logger.warn(`No GHL contact found for ChiroHD patient: ${patient.id}`);
    return;
  }

  // Update contact with new data
  await ghlClient.updateContact(contact.id, {
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone,
    customFields: {
      visit_count: patient.visitCount,
      last_visit_date: patient.lastVisitDate,
    },
  });

  logger.info(`GHL contact updated: ${contact.id}`);
}

/**
 * Handle appointment scheduled in ChiroHD
 */
async function handleAppointmentScheduled(ghlClient: any, payload: ChiroHDWebhookPayload) {
  const { patient } = payload;

  logger.info(`Appointment scheduled for ChiroHD patient: ${patient.id}`);

  // Find existing contact
  const contact = await findContactByChiroHDId(ghlClient, patient.id);

  if (!contact) {
    logger.warn(`No GHL contact found for ChiroHD patient: ${patient.id}`);
    return;
  }

  // TODO: Trigger appointment reminder workflow
  // await ghlClient.addContactToWorkflow(contact.id, APPOINTMENT_REMINDER_WORKFLOW_ID);

  logger.info(`Appointment scheduled for GHL contact: ${contact.id}`);
}

/**
 * Convert a lead to new patient
 */
async function convertLeadToNewPatient(ghlClient: any, contactId: string, firstVisitDate?: string) {
  logger.info(`Converting lead to new patient: ${contactId}`);

  // Remove Lead tag, add New Patient tag
  await ghlClient.removeTagsFromContact(contactId, ['Lead', 'Journey: Lead Active']);
  await ghlClient.addTagsToContact(contactId, ['New Patient', 'Journey: New Patient Active']);

  // Update custom field for first visit date
  await ghlClient.updateCustomField(contactId, 'first_visit_date', firstVisitDate || new Date().toISOString());

  // TODO: Trigger new patient journey workflow
  // await ghlClient.addContactToWorkflow(contactId, NEW_PATIENT_JOURNEY_WORKFLOW_ID);

  logger.info(`Lead converted to new patient: ${contactId}`);
}

/**
 * Find GHL contact by ChiroHD patient ID
 */
async function findContactByChiroHDId(ghlClient: any, chirohdPatientId: string): Promise<any> {
  // TODO: Implement search by custom field
  // GHL API may require searching all contacts and filtering
  // For now, this is a placeholder

  logger.warn('findContactByChiroHDId: Not yet implemented - requires custom field search');
  return null;
}
