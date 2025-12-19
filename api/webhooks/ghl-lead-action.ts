import { VercelRequest, VercelResponse } from '@vercel/node';
import { Lead, LeadStage, LeadSource, LeadTemperature, calculateLeadTier } from '../../core/types/lead';
import { processLeadToTask } from '../../workflows/lead-to-task';

/**
 * GHL Lead Action Webhook
 *
 * Receives webhooks from Go High Level when leads reach action stage
 * Creates tasks in ClickUp and notifies Front Desk team via Slack
 *
 * Endpoint: POST /api/webhooks/ghl-lead-action
 */

interface GHLLeadWebhook {
  type: string;                  // Event type
  contactId: string;             // GHL contact ID
  contact: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    tags?: string[];
    customFields?: {
      socialHandle?: string;
      condition?: string;
      specific_condition?: string;
      is_pregnant?: boolean;
      birth_date?: string;
      lead_source?: string;
      emails_opened?: number;
      emails_clicked?: number;
      sms_replied?: boolean;
      last_engagement?: string;
    };
  };
  timestamp: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📨 GHL lead action webhook received');

    // Parse webhook payload
    const payload: GHLLeadWebhook = req.body;

    console.log(`Processing lead: ${payload.contact.firstName} ${payload.contact.lastName}`);

    // Transform GHL contact to Lead object
    const lead: Lead = transformGHLContactToLead(payload);

    console.log(`Lead tier: ${lead.tier}, Stage: ${lead.stage}, Temperature: ${lead.temperature}`);

    // Process lead → task creation → Slack notification
    const result = await processLeadToTask(lead);

    if (result.success && result.taskCreated) {
      console.log(`✅ Task created successfully: ${result.taskId}`);

      return res.status(200).json({
        success: true,
        message: 'Lead processed and task created',
        taskId: result.taskId,
        taskUrl: result.taskUrl,
        slackNotified: result.slackNotified,
      });
    } else if (result.success && !result.taskCreated) {
      console.log(`⏭️ Lead not ready for task creation: ${result.error}`);

      return res.status(200).json({
        success: true,
        message: 'Lead received but not ready for task creation',
        reason: result.error,
      });
    } else {
      console.error(`❌ Error processing lead: ${result.error}`);

      return res.status(500).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error: any) {
    console.error('❌ Error in GHL lead action webhook:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Transform GHL contact to Lead object
 */
function transformGHLContactToLead(payload: GHLLeadWebhook): Lead {
  const contact = payload.contact;
  const customFields = contact.customFields || {};

  // Build partial lead object
  const partialLead = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    socialHandle: customFields.socialHandle,
    condition: customFields.condition,
    specificCondition: customFields.specific_condition,
    isPregnant: customFields.is_pregnant,
    birthDate: customFields.birth_date,
  };

  // Calculate tier based on available data
  const tier = calculateLeadTier(partialLead);

  // Determine stage from tags or custom fields
  const stage = determineLeadStage(contact.tags || []);

  // Determine temperature
  const temperature = determineLeadTemperature(
    customFields.emails_opened || 0,
    customFields.emails_clicked || 0,
    customFields.sms_replied || false
  );

  // Parse source
  const source = parseLeadSource(customFields.lead_source || '');

  // Build complete Lead object
  const lead: Lead = {
    id: contact.id,
    ghlContactId: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    socialHandle: customFields.socialHandle,
    tier,
    source,
    temperature,
    stage,
    condition: customFields.condition,
    specificCondition: customFields.specific_condition,
    isPregnant: customFields.is_pregnant,
    birthDate: customFields.birth_date,
    emailsOpened: customFields.emails_opened,
    emailsClicked: customFields.emails_clicked,
    smsReplied: customFields.sms_replied,
    lastEngagement: customFields.last_engagement,
    createdAt: payload.timestamp,
    updatedAt: payload.timestamp,
    tags: contact.tags,
  };

  return lead;
}

/**
 * Determine lead stage from GHL tags
 */
function determineLeadStage(tags: string[]): LeadStage {
  const tagSet = new Set(tags.map(t => t.toLowerCase()));

  if (tagSet.has('converted') || tagSet.has('patient')) return 'converted';
  if (tagSet.has('scheduled')) return 'scheduled';
  if (tagSet.has('action-ready') || tagSet.has('action ready')) return 'action-ready';
  if (tagSet.has('engaged')) return 'engaged';
  if (tagSet.has('contacted')) return 'contacted';
  if (tagSet.has('lost') || tagSet.has('not interested')) return 'lost';

  return 'new';
}

/**
 * Determine lead temperature from engagement metrics
 */
function determineLeadTemperature(
  emailsOpened: number,
  emailsClicked: number,
  smsReplied: boolean
): LeadTemperature {
  // Hot: High engagement
  if (emailsClicked >= 2 || smsReplied) {
    return 'hot';
  }

  // Warm: Some engagement
  if (emailsOpened >= 2 || emailsClicked >= 1) {
    return 'warm';
  }

  // Cold: No engagement
  return 'cold';
}

/**
 * Parse lead source from string
 */
function parseLeadSource(sourceString: string): LeadSource {
  const normalized = sourceString.toLowerCase().replace(/\s+/g, '-');

  if (normalized.includes('facebook')) return 'facebook-ad';
  if (normalized.includes('instagram')) return 'instagram-dm';
  if (normalized.includes('website')) return 'website-form';
  if (normalized.includes('pdf')) return 'pdf-download';
  if (normalized.includes('referral')) return 'referral';
  if (normalized.includes('walk')) return 'walk-in';
  if (normalized.includes('event')) return 'event';

  return 'manual-entry';
}
