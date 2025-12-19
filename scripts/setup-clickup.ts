#!/usr/bin/env ts-node
/**
 * ClickUp Structure Setup Script
 *
 * This script programmatically creates the entire ClickUp structure:
 * - Front Desk Tasks Space
 * - New Lead Follow-ups Folder
 * - 4 Lists (Tier 1-4)
 * - Custom fields on each list
 *
 * Usage:
 *   1. Get your ClickUp API token from: https://app.clickup.com/settings/apps
 *   2. Create a .env file with: CLICKUP_API_TOKEN=your_token_here
 *   3. Run: npx ts-node scripts/setup-clickup.ts
 *   4. Copy the output IDs to your .env file
 */

import * as dotenv from 'dotenv';
import { createInterface } from 'readline';

// Load environment variables
dotenv.config();

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
const CLICKUP_BASE_URL = 'https://api.clickup.com/api/v2';

// Helper for colored console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// ClickUp API wrapper
class ClickUpAPI {
  private token: string;
  private baseUrl: string;

  constructor(token: string) {
    this.token = token;
    this.baseUrl = CLICKUP_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ClickUp API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // Get all workspaces (teams)
  async getWorkspaces() {
    return this.request('/team');
  }

  // Create a space
  async createSpace(workspaceId: string, name: string) {
    return this.request(`/team/${workspaceId}/space`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        multiple_assignees: true,
        features: {
          due_dates: { enabled: true },
          time_tracking: { enabled: false },
          tags: { enabled: true },
          time_estimates: { enabled: false },
          checklists: { enabled: true },
          custom_fields: { enabled: true },
          remap_dependencies: { enabled: false },
          dependency_warning: { enabled: false },
          portfolios: { enabled: false },
        },
      }),
    });
  }

  // Create a folder
  async createFolder(spaceId: string, name: string) {
    return this.request(`/space/${spaceId}/folder`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  // Create a list
  async createList(folderId: string, name: string, priority: number) {
    return this.request(`/folder/${folderId}/list`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        content: '',
        due_date: null,
        priority,
        assignee: null,
        status: null,
      }),
    });
  }

  // Add custom field to list
  async createCustomField(listId: string, field: any) {
    return this.request(`/list/${listId}/field`, {
      method: 'POST',
      body: JSON.stringify(field),
    });
  }

  // Get workspace members
  async getWorkspaceMembers(workspaceId: string) {
    return this.request(`/team/${workspaceId}/user`);
  }
}

// Main setup function
async function setupClickUp() {
  log('╔════════════════════════════════════════════════════════════╗', 'bright');
  log('║  Van Every Chiropractic - ClickUp Setup                   ║', 'bright');
  log('╚════════════════════════════════════════════════════════════╝', 'bright');
  log('');

  // Validate API token
  if (!CLICKUP_API_TOKEN) {
    log('❌ Error: CLICKUP_API_TOKEN not found in .env file', 'red');
    log('', 'reset');
    log('Steps to get your API token:', 'yellow');
    log('1. Go to: https://app.clickup.com/settings/apps', 'yellow');
    log('2. Click "Generate" under API Token', 'yellow');
    log('3. Copy the token', 'yellow');
    log('4. Add to .env file: CLICKUP_API_TOKEN=your_token_here', 'yellow');
    process.exit(1);
  }

  const api = new ClickUpAPI(CLICKUP_API_TOKEN);
  const results: any = {};

  try {
    // Step 1: Get workspaces
    log('📋 Step 1: Fetching your workspaces...', 'blue');
    const workspaces = await api.getWorkspaces() as any;

    if (!workspaces.teams || workspaces.teams.length === 0) {
      log('❌ No workspaces found', 'red');
      process.exit(1);
    }

    log(`✅ Found ${workspaces.teams.length} workspace(s):`, 'green');
    workspaces.teams.forEach((team: any, index: number) => {
      log(`   ${index + 1}. ${team.name} (ID: ${team.id})`, 'reset');
    });
    log('');

    // Select workspace
    let workspaceId: string;
    if (workspaces.teams.length === 1) {
      workspaceId = workspaces.teams[0].id;
      log(`🎯 Using workspace: ${workspaces.teams[0].name}`, 'green');
    } else {
      // TODO: Add interactive selection if multiple workspaces
      workspaceId = workspaces.teams[0].id;
      log(`🎯 Using first workspace: ${workspaces.teams[0].name}`, 'yellow');
    }
    results.workspaceId = workspaceId;
    log('');

    // Step 2: Create Space
    log('📋 Step 2: Creating "Front Desk Tasks" space...', 'blue');
    const space = await api.createSpace(workspaceId, 'Front Desk Tasks') as any;
    results.frontDeskSpaceId = space.id;
    log(`✅ Space created! ID: ${space.id}`, 'green');
    log('');

    // Step 3: Create Folder
    log('📋 Step 3: Creating "New Lead Follow-ups" folder...', 'blue');
    const folder = await api.createFolder(space.id, 'New Lead Follow-ups') as any;
    results.newLeadsFolderId = folder.id;
    log(`✅ Folder created! ID: ${folder.id}`, 'green');
    log('');

    // Step 4: Create Lists
    log('📋 Step 4: Creating 4 priority lists...', 'blue');
    const lists = [
      { name: 'Tier 4 - Urgent Leads', priority: 1, key: 'tier4ListId' },
      { name: 'Tier 3 - High Priority Leads', priority: 2, key: 'tier3ListId' },
      { name: 'Tier 2 - Normal Priority Leads', priority: 3, key: 'tier2ListId' },
      { name: 'Tier 1 - Low Priority Leads', priority: 4, key: 'tier1ListId' },
    ];

    for (const listConfig of lists) {
      const list = await api.createList(folder.id, listConfig.name, listConfig.priority) as any;
      results[listConfig.key] = list.id;
      log(`✅ Created: ${listConfig.name} (ID: ${list.id})`, 'green');
    }
    log('');

    // Step 5: Add custom fields
    log('📋 Step 5: Adding custom fields to lists...', 'blue');
    const customFields = [
      {
        name: 'Lead Source',
        type: 'drop_down',
        type_config: {
          options: [
            { name: 'Website Form', color: '#6fddff' },
            { name: 'Phone Call', color: '#81b1ff' },
            { name: 'Walk-in', color: '#a37cff' },
            { name: 'Referral', color: '#7cffaf' },
            { name: 'Social Media', color: '#ffcd7c' },
            { name: 'Other', color: '#d3d3d3' },
          ],
        },
      },
      {
        name: 'Lead Tier',
        type: 'drop_down',
        type_config: {
          options: [
            { name: '4 - Urgent', color: '#ff0000' },
            { name: '3 - High', color: '#ff9900' },
            { name: '2 - Normal', color: '#ffcc00' },
            { name: '1 - Low', color: '#00cc00' },
          ],
        },
      },
      {
        name: 'Lead Temperature',
        type: 'drop_down',
        type_config: {
          options: [
            { name: 'Hot', color: '#ff0000' },
            { name: 'Warm', color: '#ff9900' },
            { name: 'Cold', color: '#0099ff' },
          ],
        },
      },
      { name: 'Phone', type: 'phone' },
      { name: 'Email', type: 'email' },
      { name: 'Condition', type: 'text' },
      { name: 'Last Contact', type: 'date' },
    ];

    for (const listConfig of lists) {
      const listId = results[listConfig.key];
      log(`   Adding fields to ${listConfig.name}...`, 'reset');

      for (const field of customFields) {
        try {
          await api.createCustomField(listId, field);
        } catch (error: any) {
          // Ignore if field already exists
          if (!error.message.includes('already exists')) {
            throw error;
          }
        }
      }
      log(`   ✅ Custom fields added`, 'green');
    }
    log('');

    // Step 6: Get team members
    log('📋 Step 6: Fetching workspace members...', 'blue');
    const members = await api.getWorkspaceMembers(workspaceId) as any;
    log(`✅ Found ${members.members?.length || 0} members:`, 'green');
    if (members.members) {
      members.members.forEach((member: any) => {
        log(`   - ${member.user.username} (ID: ${member.user.id})`, 'reset');
      });
    }
    log('');

    // Print results
    log('╔════════════════════════════════════════════════════════════╗', 'bright');
    log('║  ✅ ClickUp Setup Complete!                                ║', 'bright');
    log('╚════════════════════════════════════════════════════════════╝', 'bright');
    log('');
    log('📝 Add these to your .env file:', 'yellow');
    log('');
    log('# ClickUp Structure IDs', 'reset');
    log(`CLICKUP_WORKSPACE_ID=${results.workspaceId}`, 'green');
    log(`CLICKUP_FRONT_DESK_SPACE_ID=${results.frontDeskSpaceId}`, 'green');
    log(`CLICKUP_NEW_LEADS_FOLDER_ID=${results.newLeadsFolderId}`, 'green');
    log(`CLICKUP_TIER4_LIST_ID=${results.tier4ListId}`, 'green');
    log(`CLICKUP_TIER3_LIST_ID=${results.tier3ListId}`, 'green');
    log(`CLICKUP_TIER2_LIST_ID=${results.tier2ListId}`, 'green');
    log(`CLICKUP_TIER1_LIST_ID=${results.tier1ListId}`, 'green');
    log('');
    log('🎉 Next steps:', 'blue');
    log('1. Copy the IDs above to your .env file', 'reset');
    log('2. Update core/config/team-mapping.ts with user IDs', 'reset');
    log('3. Configure Slack bot (see docs/slack-setup.md)', 'reset');
    log('4. Test locally: npm run dev', 'reset');
    log('5. Deploy to Vercel', 'reset');
    log('');

  } catch (error: any) {
    log('', 'reset');
    log('❌ Setup failed!', 'red');
    log(`Error: ${error.message}`, 'red');
    log('', 'reset');
    process.exit(1);
  }
}

// Run setup
setupClickUp().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
