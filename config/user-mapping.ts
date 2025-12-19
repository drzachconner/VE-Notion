/**
 * User Mapping Configuration
 * Maps team members across ClickUp and Slack
 */

export interface TeamMember {
  name: string;
  email: string;
  clickupId?: string;     // ClickUp user ID (get from API or MCP)
  slackId?: string;       // Slack user ID (get from API)
  role: 'front-desk' | 'doctor' | 'manager';
}

/**
 * Front Desk Team
 * These are the primary assignees for lead follow-up tasks
 */
export const FRONT_DESK_TEAM: TeamMember[] = [
  {
    name: 'Lou Ann',
    email: 'louann@vanevery.com', // TODO: Update with real email
    clickupId: undefined,           // TODO: Get from ClickUp
    slackId: undefined,             // TODO: Get from Slack
    role: 'manager',
  },
  {
    name: 'Christina',
    email: 'christina@vanevery.com', // TODO: Update with real email
    clickupId: undefined,
    slackId: undefined,
    role: 'front-desk',
  },
  {
    name: 'Tricia',
    email: 'tricia@vanevery.com', // TODO: Update with real email
    clickupId: undefined,
    slackId: undefined,
    role: 'front-desk',
  },
  {
    name: 'Wendy',
    email: 'wendy@vanevery.com', // TODO: Update with real email
    clickupId: undefined,
    slackId: undefined,
    role: 'front-desk',
  },
];

/**
 * Clinical Team
 */
export const CLINICAL_TEAM: TeamMember[] = [
  {
    name: 'Dr. Saylor',
    email: 'saylor@vanevery.com', // TODO: Update with real email
    clickupId: undefined,
    slackId: undefined,
    role: 'doctor',
  },
  {
    name: 'Dr. John',
    email: 'john@vanevery.com', // TODO: Update with real email
    clickupId: undefined,
    slackId: undefined,
    role: 'doctor',
  },
  {
    name: 'Dr. Zach (Van Every)',
    email: 'zach@vanevery.com', // TODO: Update with real email
    clickupId: undefined,
    slackId: undefined,
    role: 'doctor',
  },
];

/**
 * Get all team members
 */
export function getAllTeamMembers(): TeamMember[] {
  return [...FRONT_DESK_TEAM, ...CLINICAL_TEAM];
}

/**
 * Get ClickUp user IDs for Front Desk team
 */
export function getFrontDeskClickUpIds(): string[] {
  return FRONT_DESK_TEAM
    .map((member) => member.clickupId)
    .filter((id): id is string => id !== undefined);
}

/**
 * Get Slack user IDs for Front Desk team
 */
export function getFrontDeskSlackIds(): string[] {
  return FRONT_DESK_TEAM
    .map((member) => member.slackId)
    .filter((id): id is string => id !== undefined);
}

/**
 * Get team member by email
 */
export function getTeamMemberByEmail(email: string): TeamMember | undefined {
  return getAllTeamMembers().find(
    (member) => member.email.toLowerCase() === email.toLowerCase()
  );
}

/**
 * Get team member by ClickUp ID
 */
export function getTeamMemberByClickUpId(clickupId: string): TeamMember | undefined {
  return getAllTeamMembers().find((member) => member.clickupId === clickupId);
}

/**
 * Get team member by Slack ID
 */
export function getTeamMemberBySlackId(slackId: string): TeamMember | undefined {
  return getAllTeamMembers().find((member) => member.slackId === slackId);
}
