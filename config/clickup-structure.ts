/**
 * ClickUp Structure Configuration
 * IDs for spaces, folders, and lists
 * These will be populated after setting up ClickUp via MCP
 */

import { LeadTier } from '../types/lead';

export interface ClickUpStructure {
  workspaceId: string;
  spaces: {
    frontDesk: {
      id: string;
      name: string;
      folders: {
        newLeads: {
          id: string;
          name: string;
          lists: {
            tier4Urgent: string;
            tier3High: string;
            tier2Normal: string;
            tier1Low: string;
          };
        };
      };
    };
  };
  channels: {
    frontDesk: string; // Slack channel ID for Front Desk notifications
  };
}

/**
 * ClickUp Structure
 * TODO: Update these IDs after setting up via MCP
 */
export const CLICKUP_STRUCTURE: ClickUpStructure = {
  workspaceId: process.env.CLICKUP_WORKSPACE_ID || '',

  spaces: {
    frontDesk: {
      id: process.env.CLICKUP_FRONT_DESK_SPACE_ID || '',
      name: 'Front Desk Tasks',
      folders: {
        newLeads: {
          id: process.env.CLICKUP_NEW_LEADS_FOLDER_ID || '',
          name: 'New Lead Follow-ups',
          lists: {
            tier4Urgent: process.env.CLICKUP_TIER4_LIST_ID || '',
            tier3High: process.env.CLICKUP_TIER3_LIST_ID || '',
            tier2Normal: process.env.CLICKUP_TIER2_LIST_ID || '',
            tier1Low: process.env.CLICKUP_TIER1_LIST_ID || '',
          },
        },
      },
    },
  },

  channels: {
    frontDesk: process.env.SLACK_FRONT_DESK_CHANNEL_ID || '',
  },
};

/**
 * Get ClickUp list ID for a given lead tier
 */
export function getListIdForTier(tier: LeadTier): string {
  const lists = CLICKUP_STRUCTURE.spaces.frontDesk.folders.newLeads.lists;

  switch (tier) {
    case 4:
      return lists.tier4Urgent;
    case 3:
      return lists.tier3High;
    case 2:
      return lists.tier2Normal;
    case 1:
      return lists.tier1Low;
    default:
      return lists.tier2Normal; // Default to normal priority
  }
}

/**
 * Get Slack channel ID for Front Desk
 */
export function getFrontDeskChannelId(): string {
  return CLICKUP_STRUCTURE.channels.frontDesk;
}

/**
 * Validate that all required IDs are configured
 */
export function validateStructure(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!CLICKUP_STRUCTURE.workspaceId) missing.push('CLICKUP_WORKSPACE_ID');
  if (!CLICKUP_STRUCTURE.spaces.frontDesk.id) missing.push('CLICKUP_FRONT_DESK_SPACE_ID');
  if (!CLICKUP_STRUCTURE.spaces.frontDesk.folders.newLeads.id) missing.push('CLICKUP_NEW_LEADS_FOLDER_ID');

  const lists = CLICKUP_STRUCTURE.spaces.frontDesk.folders.newLeads.lists;
  if (!lists.tier4Urgent) missing.push('CLICKUP_TIER4_LIST_ID');
  if (!lists.tier3High) missing.push('CLICKUP_TIER3_LIST_ID');
  if (!lists.tier2Normal) missing.push('CLICKUP_TIER2_LIST_ID');
  if (!lists.tier1Low) missing.push('CLICKUP_TIER1_LIST_ID');

  if (!CLICKUP_STRUCTURE.channels.frontDesk) missing.push('SLACK_FRONT_DESK_CHANNEL_ID');

  return {
    valid: missing.length === 0,
    missing,
  };
}
