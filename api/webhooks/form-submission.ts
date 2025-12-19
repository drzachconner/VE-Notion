import { VercelRequest, VercelResponse } from '@vercel/node';
import { getGHLClient } from '../../integrations/ghl/client';
import { logger } from '../../core/utils/logger';

/**
 * Website Form Submission Webhook Receiver
 *
 * This endpoint receives form submissions from your website
 * (e.g., ebook downloads, consultation requests)
 *
 * Endpoint: POST /api/webhooks/form-submission
 */

interface FormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  formType?: string; // 'ebook-download', 'consultation', 'contact'
  healthConcern?: string; // Main health concern
  ebookType?: string; // Which ebook they downloaded
  consent?: boolean; // Agreed to receive emails/SMS
  source?: string; // Where the form came from
  [key: string]: any;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    logger.info('Form submission received');

    const submission: FormSubmission = req.body;

    // Validate required fields
    if (!submission.firstName || !submission.lastName || !submission.email) {
      return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email' });
    }

    // Check consent
    if (!submission.consent) {
      logger.warn('Form submission without consent - not adding to GHL');
      return res.status(400).json({ error: 'Consent required to add to contact list' });
    }

    logger.logSafe('info', 'Form submission details', {
      formType: submission.formType,
      healthConcern: submission.healthConcern,
    });

    // Get GHL client
    const ghlClient = getGHLClient();

    // Prepare tags based on form type and health concern
    const tags = buildTags(submission);

    // Prepare contact data
    const contactData = {
      firstName: submission.firstName,
      lastName: submission.lastName,
      email: submission.email,
      phone: submission.phone,
      tags: tags,
      source: submission.source || 'Website Form',
      customFields: {
        lead_source_detail: `${submission.formType || 'form'} - ${submission.healthConcern || 'general'}`,
        primary_condition: submission.healthConcern,
      },
    };

    // Create or update contact in GHL
    const contact = await ghlClient.upsertContact(contactData);

    logger.info(`GHL contact created/updated from form submission: ${contact.id}`);

    // TODO: Trigger appropriate workflow based on form type
    // Example: Lead journey, ebook download workflow, consultation booking workflow

    // Return success with contact ID
    return res.status(200).json({
      success: true,
      message: 'Form submission processed',
      contactId: contact.id,
    });
  } catch (error: any) {
    logger.error('Error processing form submission', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Build tags based on form submission data
 */
function buildTags(submission: FormSubmission): string[] {
  const tags: string[] = ['Lead', 'Source: Website Form', 'Journey: Lead Active'];

  // Add form type tag
  if (submission.formType) {
    switch (submission.formType) {
      case 'ebook-download':
        tags.push('Lead Source: Ebook Download');
        if (submission.ebookType) {
          tags.push(`Ebook: ${submission.ebookType}`);
        }
        break;
      case 'consultation':
        tags.push('Lead Source: Consultation Request');
        break;
      case 'contact':
        tags.push('Lead Source: Contact Form');
        break;
      default:
        tags.push(`Form Type: ${submission.formType}`);
    }
  }

  // Add health concern / condition tag
  if (submission.healthConcern) {
    const conditionTag = mapHealthConcernToTag(submission.healthConcern);
    if (conditionTag) {
      tags.push(conditionTag);
    }
  }

  return tags;
}

/**
 * Map health concern from form to GHL tag
 */
function mapHealthConcernToTag(healthConcern: string): string | null {
  const mapping: Record<string, string> = {
    'back-pain': 'Condition: Back Pain',
    'neck-pain': 'Condition: Neck Pain',
    'headache': 'Condition: Headache',
    'migraine': 'Condition: Migraine',
    'pregnancy': 'Condition: Pregnancy',
    'pediatric': 'Condition: Pediatric',
    'infant': 'Condition: Infant',
    'autism': 'Condition: Autism',
    'adhd': 'Condition: ADHD',
    'anxiety': 'Condition: Anxiety',
    'depression': 'Condition: Depression',
    'sciatica': 'Condition: Sciatica',
    'sports-injury': 'Condition: Sports Injury',
    'auto-accident': 'Condition: Auto Accident',
    'work-injury': 'Condition: Work Injury',
    'wellness': 'Condition: Wellness',
    'other': 'Condition: Other',
  };

  const normalized = healthConcern.toLowerCase().replace(/\s+/g, '-');
  return mapping[normalized] || null;
}
