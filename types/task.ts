/**
 * Task Data Structure
 * ClickUp tasks created from leads
 */

import { LeadTier, Lead } from './lead';

export type TaskPriority = 'urgent' | 'high' | 'normal' | 'low';

export type TaskStatus = 'open' | 'in-progress' | 'completed' | 'cancelled';

export interface ClickUpTask {
  // ClickUp IDs
  id?: string;                   // ClickUp task ID (assigned after creation)
  listId: string;                // Which ClickUp list this belongs to

  // Task details
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;

  // Assignment
  assignees: string[];           // ClickUp user IDs

  // Timing
  dueDate?: number;              // Unix timestamp (ms)
  createdAt?: number;            // Unix timestamp (ms)

  // Custom fields (ClickUp specific)
  customFields?: {
    leadSource?: string;
    leadTier?: string;
    leadTemperature?: string;
    phone?: string;
    email?: string;
    condition?: string;
    lastContact?: string;
  };

  // Tags
  tags?: string[];
}

/**
 * Generate task name from lead
 */
export function generateTaskName(lead: Lead): string {
  const name = lead.firstName && lead.lastName
    ? `${lead.firstName} ${lead.lastName}`
    : lead.email || lead.phone || lead.socialHandle || 'Unknown Lead';

  return `Follow up with ${name} (Tier ${lead.tier})`;
}

/**
 * Generate task description from lead
 */
export function generateTaskDescription(lead: Lead): string {
  const parts: string[] = [];

  // Contact info
  if (lead.phone) parts.push(`📞 ${lead.phone}`);
  if (lead.email) parts.push(`📧 ${lead.email}`);
  if (lead.socialHandle) parts.push(`📱 ${lead.socialHandle}`);

  // Condition
  if (lead.condition || lead.specificCondition) {
    parts.push(`\n🏥 Condition: ${lead.specificCondition || lead.condition}`);
  }

  // Source
  parts.push(`\n📍 Source: ${lead.source}`);

  // Engagement
  if (lead.emailsOpened || lead.emailsClicked) {
    parts.push(
      `\n📊 Engagement: ${lead.emailsOpened || 0} opens, ${lead.emailsClicked || 0} clicks`
    );
  }

  // Last interaction
  if (lead.lastEngagement) {
    const lastContact = new Date(lead.lastEngagement).toLocaleDateString();
    parts.push(`\n🕒 Last contact: ${lastContact}`);
  }

  // Notes
  if (lead.notes) {
    parts.push(`\n📝 Notes: ${lead.notes}`);
  }

  // GHL link
  if (lead.ghlContactId) {
    parts.push(
      `\n🔗 [View in GHL](https://app.gohighlevel.com/contacts/${lead.ghlContactId})`
    );
  }

  return parts.join('\n');
}

/**
 * Determine task priority from lead tier
 */
export function calculateTaskPriority(tier: LeadTier): TaskPriority {
  switch (tier) {
    case 4:
      return 'urgent';   // Full intake, immediate followup
    case 3:
      return 'high';     // Name + condition, high priority
    case 2:
      return 'normal';   // Phone + email, standard followup
    case 1:
      return 'low';      // Social handle only, low priority
    default:
      return 'normal';
  }
}

/**
 * Calculate task due date based on tier
 */
export function calculateDueDate(tier: LeadTier): number {
  const now = new Date();

  switch (tier) {
    case 4:
      // Urgent: Within 2 hours
      now.setHours(now.getHours() + 2);
      break;
    case 3:
      // High: Same day if before 3pm, next day if after
      if (now.getHours() < 15) {
        now.setHours(17, 0, 0, 0); // Today at 5pm
      } else {
        now.setDate(now.getDate() + 1);
        now.setHours(17, 0, 0, 0); // Tomorrow at 5pm
      }
      break;
    case 2:
      // Normal: Next business day
      now.setDate(now.getDate() + 1);
      now.setHours(17, 0, 0, 0);
      break;
    case 1:
      // Low: 2 days
      now.setDate(now.getDate() + 2);
      now.setHours(17, 0, 0, 0);
      break;
  }

  return now.getTime();
}

/**
 * Build complete ClickUp task from lead
 */
export function buildTaskFromLead(
  lead: Lead,
  listId: string,
  assignees: string[]
): ClickUpTask {
  return {
    listId,
    name: generateTaskName(lead),
    description: generateTaskDescription(lead),
    priority: calculateTaskPriority(lead.tier),
    status: 'open',
    assignees,
    dueDate: calculateDueDate(lead.tier),
    customFields: {
      leadSource: lead.source,
      leadTier: lead.tier.toString(),
      leadTemperature: lead.temperature,
      phone: lead.phone,
      email: lead.email,
      condition: lead.condition || lead.specificCondition,
      lastContact: lead.lastEngagement,
    },
    tags: lead.tags || [],
  };
}
