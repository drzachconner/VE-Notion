/**
 * Lead Data Structure
 * Shared across all systems (GHL, ChiroHD, ClickUp)
 */

export type LeadTier = 1 | 2 | 3 | 4;

export type LeadSource =
  | 'facebook-ad'
  | 'instagram-dm'
  | 'website-form'
  | 'pdf-download'
  | 'manual-entry'
  | 'referral'
  | 'walk-in'
  | 'event';

export type LeadTemperature = 'hot' | 'warm' | 'cold';

export type LeadStage =
  | 'new'           // Just captured
  | 'contacted'     // Initial outreach sent
  | 'engaged'       // Opened emails, clicked links
  | 'action-ready'  // High engagement, ready for task creation
  | 'scheduled'     // Appointment booked
  | 'converted'     // Became patient (first visit completed)
  | 'lost';         // Not interested or unresponsive

export interface Lead {
  // IDs across systems
  id: string;                    // Our internal ID
  ghlContactId?: string;         // Go High Level contact ID
  chiroHdLeadId?: string;        // ChiroHD lead ID
  clickupTaskId?: string;        // ClickUp task ID (when task created)

  // Basic info
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  socialHandle?: string;         // For Tier 1 leads

  // Lead classification
  tier: LeadTier;                // 1-4 based on data completeness
  source: LeadSource;
  temperature: LeadTemperature;
  stage: LeadStage;

  // Health info
  condition?: string;            // General condition (back pain, pregnancy, etc.)
  specificCondition?: string;    // Detailed condition info (Tier 4)
  isPregnant?: boolean;
  birthDate?: string;            // ISO date string

  // Engagement tracking
  emailsOpened?: number;
  emailsClicked?: number;
  smsReplied?: boolean;
  lastEngagement?: string;       // ISO date string

  // Campaign info
  campaignName?: string;         // GHL campaign they're in

  // Timestamps
  createdAt: string;             // ISO date string
  updatedAt: string;             // ISO date string
  convertedAt?: string;          // When they became patient

  // Additional metadata
  notes?: string;
  tags?: string[];               // GHL tags
}

/**
 * Determine lead tier based on available data
 */
export function calculateLeadTier(lead: Partial<Lead>): LeadTier {
  // Tier 4: Full intake
  if (
    lead.firstName &&
    lead.lastName &&
    lead.phone &&
    lead.email &&
    lead.specificCondition &&
    (lead.isPregnant !== undefined || lead.birthDate)
  ) {
    return 4;
  }

  // Tier 3: Name + contact + general condition
  if (
    lead.firstName &&
    lead.lastName &&
    lead.phone &&
    lead.email &&
    lead.condition
  ) {
    return 3;
  }

  // Tier 2: Phone + Email
  if (lead.phone && lead.email) {
    return 2;
  }

  // Tier 1: Social handle only
  return 1;
}

/**
 * Check if lead is ready for task creation
 */
export function isActionReady(lead: Lead): boolean {
  switch (lead.tier) {
    case 4:
      // Tier 4: Any engagement triggers task
      return lead.stage === 'engaged' || lead.stage === 'action-ready';

    case 3:
      // Tier 3: 2+ engagements AND high interest
      return (
        (lead.emailsOpened || 0) >= 2 &&
        (lead.emailsClicked || 0) >= 1
      );

    case 2:
      // Tier 2: 3+ emails opened OR clicked scheduling link
      return (
        (lead.emailsOpened || 0) >= 3 ||
        (lead.emailsClicked || 0) >= 1
      );

    case 1:
      // Tier 1: 3 DMs sent with no response
      return lead.stage === 'action-ready';

    default:
      return false;
  }
}
