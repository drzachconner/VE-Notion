/**
 * Slack Configuration
 * Channel IDs and settings
 */

export const SLACK_CONFIG = {
  channels: {
    frontDesk: process.env.SLACK_FRONT_DESK_CHANNEL_ID || '',
  },
};

/**
 * Get Slack channel ID for Front Desk
 */
export function getFrontDeskChannelId(): string {
  return SLACK_CONFIG.channels.frontDesk;
}

/**
 * Validate Slack configuration
 */
export function validateSlackConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!SLACK_CONFIG.channels.frontDesk) {
    missing.push('SLACK_FRONT_DESK_CHANNEL_ID');
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
