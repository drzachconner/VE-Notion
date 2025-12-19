/**
 * Lead to Task Workflow
 * Orchestrates: GHL Lead → ClickUp Task → Slack Notification
 */

import { Lead, isActionReady } from '../core/types/lead';
import { buildTaskFromLead } from '../core/types/task';
import { getClickUpClient } from '../integrations/clickup/client';
import { getSlackClient } from '../integrations/slack/client';
import { getListIdForTier } from '../integrations/clickup/config';
import { getFrontDeskChannelId } from '../integrations/slack/config';
import { getFrontDeskClickUpIds, getFrontDeskSlackIds } from '../core/config/team-mapping';

export interface LeadToTaskResult {
  success: boolean;
  taskCreated: boolean;
  taskId?: string;
  taskUrl?: string;
  slackNotified: boolean;
  error?: string;
}

/**
 * Main workflow: Create task from lead and notify team
 */
export async function processLeadToTask(lead: Lead): Promise<LeadToTaskResult> {
  try {
    // Step 1: Check if lead is ready for task creation
    if (!isActionReady(lead)) {
      return {
        success: true,
        taskCreated: false,
        slackNotified: false,
        error: 'Lead not yet at action stage',
      };
    }

    // Step 2: Get ClickUp list ID for this lead tier
    const listId = getListIdForTier(lead.tier);

    if (!listId) {
      throw new Error(`No ClickUp list configured for tier ${lead.tier}`);
    }

    // Step 3: Get Front Desk team assignees (optional for testing)
    const assignees = getFrontDeskClickUpIds();

    if (assignees.length === 0) {
      console.warn('⚠️ No Front Desk team members configured, creating unassigned task');
    }

    // Step 4: Build task from lead
    const taskData = buildTaskFromLead(lead, listId, assignees);

    // Step 5: Create task in ClickUp
    const clickup = getClickUpClient();
    const createdTask = await clickup.createTask(taskData);

    console.log(`✅ ClickUp task created: ${createdTask.id} - ${createdTask.name}`);

    // Step 6: Get Slack notification channel
    const channelId = getFrontDeskChannelId();

    if (!channelId) {
      console.warn('⚠️ No Slack channel configured, skipping notification');
      return {
        success: true,
        taskCreated: true,
        taskId: createdTask.id,
        taskUrl: createdTask.url,
        slackNotified: false,
      };
    }

    // Step 7: Get Slack user IDs for @mentions
    const slackUserIds = getFrontDeskSlackIds();

    if (slackUserIds.length === 0) {
      console.warn('⚠️ No Slack users configured, posting without mentions');
    }

    // Step 8: Send Slack notification
    const slack = getSlackClient();
    await slack.notifyTaskCreated(lead, createdTask, slackUserIds, channelId);

    console.log(`✅ Slack notification sent to #front-desk`);

    // Step 9: Return success
    return {
      success: true,
      taskCreated: true,
      taskId: createdTask.id,
      taskUrl: createdTask.url,
      slackNotified: true,
    };
  } catch (error: any) {
    console.error('❌ Error in lead-to-task workflow:', error);

    return {
      success: false,
      taskCreated: false,
      slackNotified: false,
      error: error.message,
    };
  }
}

/**
 * Batch process multiple leads
 */
export async function processMultipleLeads(leads: Lead[]): Promise<LeadToTaskResult[]> {
  const results: LeadToTaskResult[] = [];

  for (const lead of leads) {
    const result = await processLeadToTask(lead);
    results.push(result);

    // Add delay between tasks to avoid rate limiting
    await delay(1000); // 1 second
  }

  return results;
}

/**
 * Delay helper
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
