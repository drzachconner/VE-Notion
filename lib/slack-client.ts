import axios, { AxiosInstance } from 'axios';
import { Lead } from '../types/lead';
import { ClickUpTaskResponse } from './clickup-client';

/**
 * Slack API Client
 * Documentation: https://api.slack.com/web
 */

export interface SlackUser {
  id: string;
  name: string;
  real_name: string;
  email?: string;
}

export interface SlackMessage {
  channel: string;
  text?: string;
  blocks?: any[];
  thread_ts?: string;
}

export class SlackClient {
  private client: AxiosInstance;

  constructor(botToken: string) {
    this.client = axios.create({
      baseURL: 'https://slack.com/api',
      headers: {
        'Authorization': `Bearer ${botToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Post a message to a channel
   */
  async postMessage(message: SlackMessage): Promise<any> {
    try {
      const response = await this.client.post('/chat.postMessage', message);

      if (!response.data.ok) {
        throw new Error(`Slack API error: ${response.data.error}`);
      }

      return response.data;
    } catch (error: any) {
      console.error('Error posting Slack message:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Format and post task notification to Front Desk team
   */
  async notifyTaskCreated(
    lead: Lead,
    task: ClickUpTaskResponse,
    userIds: string[],
    channelId: string
  ): Promise<any> {
    const mentions = userIds.map((id) => `<@${id}>`).join(' ');

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `📋 *New Task Assigned*\n${mentions}`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Task:*\n${task.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*Priority:*\n${this.formatPriority(task.status?.type || 'normal')}`,
          },
          {
            type: 'mrkdwn',
            text: `*Due:*\n${this.formatDueDate(lead.tier)}`,
          },
          {
            type: 'mrkdwn',
            text: `*Lead Source:*\n${this.formatLeadSource(lead.source)}`,
          },
        ],
      },
    ];

    // Add contact info section
    const contactFields: any[] = [];
    if (lead.phone) {
      contactFields.push({
        type: 'mrkdwn',
        text: `*Phone:*\n${lead.phone}`,
      });
    }
    if (lead.email) {
      contactFields.push({
        type: 'mrkdwn',
        text: `*Email:*\n${lead.email}`,
      });
    }

    if (contactFields.length > 0) {
      blocks.push({
        type: 'section',
        fields: contactFields,
      });
    }

    // Add condition if available
    if (lead.condition || lead.specificCondition) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Condition:*\n${lead.specificCondition || lead.condition}`,
        },
      });
    }

    // Add last contact info
    if (lead.lastEngagement) {
      const lastContact = new Date(lead.lastEngagement).toLocaleDateString();
      blocks.push({
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `📊 Engagement: ${lead.emailsOpened || 0} opens, ${lead.emailsClicked || 0} clicks | Last contact: ${lastContact}`,
          },
        ],
      });
    }

    // Add action button to view in ClickUp
    blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'View in ClickUp',
          },
          url: task.url,
          style: 'primary',
        },
      ],
    });

    return this.postMessage({
      channel: channelId,
      blocks,
    });
  }

  /**
   * Get users in workspace
   */
  async getUsers(): Promise<SlackUser[]> {
    try {
      const response = await this.client.get('/users.list');

      if (!response.data.ok) {
        throw new Error(`Slack API error: ${response.data.error}`);
      }

      return response.data.members.filter((user: any) => !user.is_bot && !user.deleted);
    } catch (error: any) {
      console.error('Error getting Slack users:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<SlackUser | null> {
    try {
      const response = await this.client.get('/users.lookupByEmail', {
        params: { email },
      });

      if (!response.data.ok) {
        return null;
      }

      return response.data.user;
    } catch (error: any) {
      console.error('Error looking up Slack user:', error.response?.data || error.message);
      return null;
    }
  }

  /**
   * Format priority for display
   */
  private formatPriority(priority: string): string {
    const priorityEmoji: Record<string, string> = {
      'urgent': '🔴 Urgent',
      'high': '🟠 High',
      'normal': '🟡 Normal',
      'low': '🟢 Low',
    };

    return priorityEmoji[priority.toLowerCase()] || '🟡 Normal';
  }

  /**
   * Format due date for display
   */
  private formatDueDate(tier: number): string {
    switch (tier) {
      case 4:
        return 'Within 2 hours';
      case 3:
        return 'Today by 5pm';
      case 2:
        return 'Next business day';
      case 1:
        return '2 days';
      default:
        return 'TBD';
    }
  }

  /**
   * Format lead source for display
   */
  private formatLeadSource(source: string): string {
    const sourceMap: Record<string, string> = {
      'facebook-ad': 'Facebook Ad',
      'instagram-dm': 'Instagram DM',
      'website-form': 'Website Form',
      'pdf-download': 'PDF Download',
      'manual-entry': 'Manual Entry',
      'referral': 'Referral',
      'walk-in': 'Walk-in',
      'event': 'Event',
    };

    return sourceMap[source] || source;
  }
}

/**
 * Get Slack client instance
 */
export function getSlackClient(): SlackClient {
  const botToken = process.env.SLACK_BOT_TOKEN;

  if (!botToken) {
    throw new Error('SLACK_BOT_TOKEN must be set in environment variables');
  }

  return new SlackClient(botToken);
}
