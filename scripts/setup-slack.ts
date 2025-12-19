#!/usr/bin/env ts-node
/**
 * Slack Bot Setup Helper
 *
 * This script helps you:
 * 1. Test your Slack bot token
 * 2. List all channels in your workspace
 * 3. Find the Front Desk channel ID
 * 4. Test sending a message
 *
 * Usage:
 *   1. Create a Slack App (see docs/slack-setup.md)
 *   2. Get your Bot Token (starts with xoxb-)
 *   3. Add to .env: SLACK_BOT_TOKEN=xoxb-...
 *   4. Run: npm run setup:slack
 */

import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

// Helper for colored console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Slack API wrapper
class SlackAPI {
  private token: string;
  private baseUrl = 'https://slack.com/api';

  constructor(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Slack API Error: ${response.status} - ${error}`);
    }

    const data = await response.json() as any;

    if (!data.ok) {
      throw new Error(`Slack API Error: ${data.error}`);
    }

    return data;
  }

  // Test authentication
  async testAuth() {
    return this.request('/auth.test');
  }

  // List all channels
  async listChannels() {
    return this.request('/conversations.list?types=public_channel&exclude_archived=true&limit=200');
  }

  // Get channel info
  async getChannelInfo(channelId: string) {
    return this.request(`/conversations.info?channel=${channelId}`);
  }

  // Post a test message
  async postMessage(channelId: string, text: string) {
    return this.request('/chat.postMessage', {
      method: 'POST',
      body: JSON.stringify({
        channel: channelId,
        text,
      }),
    });
  }

  // List workspace users
  async listUsers() {
    return this.request('/users.list');
  }
}

// Main setup function
async function setupSlack() {
  log('╔════════════════════════════════════════════════════════════╗', 'bright');
  log('║  Van Every Chiropractic - Slack Setup                     ║', 'bright');
  log('╚════════════════════════════════════════════════════════════╝', 'bright');
  log('');

  // Validate bot token
  if (!SLACK_BOT_TOKEN) {
    log('❌ Error: SLACK_BOT_TOKEN not found in .env file', 'red');
    log('', 'reset');
    log('📚 Steps to get your Slack Bot Token:', 'yellow');
    log('1. Go to: https://api.slack.com/apps', 'yellow');
    log('2. Click "Create New App" → "From scratch"', 'yellow');
    log('3. Name: "Van Every Front Desk Bot"', 'yellow');
    log('4. Select your workspace', 'yellow');
    log('5. Go to "OAuth & Permissions"', 'yellow');
    log('6. Add Bot Token Scopes:', 'yellow');
    log('   - chat:write (send messages)', 'yellow');
    log('   - channels:read (read channel list)', 'yellow');
    log('   - users:read (read user list)', 'yellow');
    log('7. Click "Install to Workspace"', 'yellow');
    log('8. Copy the "Bot User OAuth Token" (starts with xoxb-)', 'yellow');
    log('9. Add to .env: SLACK_BOT_TOKEN=xoxb-your-token', 'yellow');
    log('', 'reset');
    log('📄 See docs/slack-setup.md for detailed instructions', 'cyan');
    process.exit(1);
  }

  const api = new SlackAPI(SLACK_BOT_TOKEN);

  try {
    // Step 1: Test authentication
    log('📋 Step 1: Testing Slack authentication...', 'blue');
    const auth = await api.testAuth() as any;
    log(`✅ Authenticated as: ${auth.user} in workspace: ${auth.team}`, 'green');
    log('');

    // Step 2: List channels
    log('📋 Step 2: Listing all channels...', 'blue');
    const channelsData = await api.listChannels() as any;
    const channels = channelsData.channels || [];

    log(`✅ Found ${channels.length} channels:`, 'green');
    log('');

    let frontDeskChannelId: string | null = null;

    channels.forEach((channel: any, index: number) => {
      const prefix = channel.is_member ? '✓' : ' ';
      const privacy = channel.is_private ? '🔒' : '  ';
      log(`   ${prefix} ${privacy} ${channel.name} (ID: ${channel.id})`, 'reset');

      // Try to find "front-desk" or similar channel
      if (channel.name.toLowerCase().includes('front') ||
          channel.name.toLowerCase().includes('desk') ||
          channel.name.toLowerCase().includes('leads')) {
        frontDeskChannelId = channel.id;
        log(`      ⭐ Possible Front Desk channel!`, 'yellow');
      }
    });
    log('');
    log('Legend: ✓ = Bot is a member, 🔒 = Private channel', 'cyan');
    log('');

    // Step 3: Get user list
    log('📋 Step 3: Listing workspace members...', 'blue');
    const usersData = await api.listUsers() as any;
    const users = (usersData.members || []).filter((u: any) => !u.is_bot && !u.deleted);

    log(`✅ Found ${users.length} active users:`, 'green');
    users.slice(0, 10).forEach((user: any) => {
      log(`   - ${user.real_name || user.name} (ID: ${user.id})`, 'reset');
    });
    if (users.length > 10) {
      log(`   ... and ${users.length - 10} more`, 'reset');
    }
    log('');

    // Print results
    log('╔════════════════════════════════════════════════════════════╗', 'bright');
    log('║  ✅ Slack Setup Information                                ║', 'bright');
    log('╚════════════════════════════════════════════════════════════╝', 'bright');
    log('');

    if (frontDeskChannelId) {
      log('🎯 Suggested Front Desk Channel:', 'green');
      log(`SLACK_FRONT_DESK_CHANNEL_ID=${frontDeskChannelId}`, 'green');
      log('');
      log('📝 Add this to your .env file', 'yellow');
    } else {
      log('⚠️  Could not auto-detect Front Desk channel', 'yellow');
      log('', 'reset');
      log('Please manually find your channel from the list above and add to .env:', 'yellow');
      log('SLACK_FRONT_DESK_CHANNEL_ID=C0123456789', 'yellow');
    }

    log('');
    log('💡 Next steps:', 'blue');
    log('1. Add the SLACK_FRONT_DESK_CHANNEL_ID to your .env file', 'reset');
    log('2. Make sure the bot is invited to that channel: /invite @Van Every Front Desk Bot', 'reset');
    log('3. Test the workflow: npm run dev', 'reset');
    log('4. Deploy to Vercel', 'reset');
    log('');

    // Optional: Test message
    if (frontDeskChannelId) {
      log('🧪 Would you like to send a test message? (This will post to the channel)', 'cyan');
      log('To test manually, run:', 'cyan');
      log(`curl -X POST https://slack.com/api/chat.postMessage \\`, 'cyan');
      log(`  -H "Authorization: Bearer ${SLACK_BOT_TOKEN}" \\`, 'cyan');
      log(`  -H "Content-Type: application/json" \\`, 'cyan');
      log(`  -d '{"channel":"${frontDeskChannelId}","text":"🤖 Van Every Practice Orchestration System is connected!"}'`, 'cyan');
      log('');
    }

  } catch (error: any) {
    log('', 'reset');
    log('❌ Setup failed!', 'red');
    log(`Error: ${error.message}`, 'red');
    log('', 'reset');

    if (error.message.includes('invalid_auth')) {
      log('💡 Your bot token might be invalid or expired', 'yellow');
      log('   Try regenerating it in the Slack App settings', 'yellow');
    } else if (error.message.includes('missing_scope')) {
      log('💡 Your bot is missing required permissions', 'yellow');
      log('   Go to OAuth & Permissions and add the missing scopes', 'yellow');
    }

    process.exit(1);
  }
}

// Run setup
setupSlack().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
