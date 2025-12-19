# ClickUp MCP Setup Guide

## Overview

This guide shows you how to use ClickUp MCP (Model Context Protocol) to conversationally build out the ClickUp structure for Van Every Chiropractic's task management system.

**Why MCP?** Instead of manually clicking through ClickUp's UI, we can talk to Claude and have it build the entire structure for us.

---

## Prerequisites

1. **ClickUp Account** with admin access
2. **ClickUp API Token**:
   - Go to ClickUp → Settings → Apps
   - Generate API Token
   - Copy and save securely

3. **ClickUp MCP Connection** in Claude Desktop/CLI

---

## Step 1: Connect ClickUp MCP

**In Claude Desktop** (or wherever you have MCP configured):

1. Add ClickUp MCP to your configuration
2. Provide your ClickUp API token
3. Test connection by asking: "List my ClickUp workspaces"

---

## Step 2: Conversational Structure Building

Once MCP is connected, have this conversation with Claude:

### Create Workspace Structure

```
You: "What workspaces do I have in ClickUp?"
Claude: *lists workspaces*

You: "Use workspace 'Van Every Chiropractic'"

You: "Create a Space called 'Front Desk Tasks'"
Claude: *creates space, gives you the ID*

IMPORTANT: Copy the Space ID → Add to .env as CLICKUP_FRONT_DESK_SPACE_ID
```

### Create Folder Structure

```
You: "In the Front Desk Tasks space, create a folder called 'New Lead Follow-ups'"
Claude: *creates folder, gives you the ID*

IMPORTANT: Copy the Folder ID → Add to .env as CLICKUP_NEW_LEADS_FOLDER_ID
```

### Create Lists (One for Each Tier)

```
You: "In the New Lead Follow-ups folder, create these lists:
1. Tier 4 - Urgent Leads
2. Tier 3 - High Priority Leads
3. Tier 2 - Normal Priority Leads
4. Tier 1 - Low Priority Leads"

Claude: *creates all 4 lists, gives you the IDs*

IMPORTANT: Copy each List ID:
- Tier 4 → CLICKUP_TIER4_LIST_ID
- Tier 3 → CLICKUP_TIER3_LIST_ID
- Tier 2 → CLICKUP_TIER2_LIST_ID
- Tier 1 → CLICKUP_TIER1_LIST_ID
```

### Add Custom Fields to Each List

```
You: "For each of those lists, add these custom fields:
- Lead Source (dropdown)
- Lead Tier (dropdown: 1, 2, 3, 4)
- Lead Temperature (dropdown: Hot, Warm, Cold)
- Phone (text)
- Email (text)
- Condition (text)
- Last Contact (date)"

Claude: *adds custom fields to all lists*
```

---

## Step 3: Get Team Member IDs

### Get ClickUp User IDs

```
You: "List all users in this workspace"
Claude: *shows all users with their IDs*

IMPORTANT: Copy user IDs for Front Desk team:
- Lou Ann → Update config/user-mapping.ts
- Christina → Update config/user-mapping.ts
- Tricia → Update config/user-mapping.ts
- Wendy → Update config/user-mapping.ts
```

---

## Step 4: Update Configuration Files

### Update `.env`

Add all the IDs you collected:

```bash
# ClickUp Structure
CLICKUP_WORKSPACE_ID=your_workspace_id
CLICKUP_FRONT_DESK_SPACE_ID=space_id_from_step_2
CLICKUP_NEW_LEADS_FOLDER_ID=folder_id_from_step_2
CLICKUP_TIER4_LIST_ID=tier4_list_id
CLICKUP_TIER3_LIST_ID=tier3_list_id
CLICKUP_TIER2_LIST_ID=tier2_list_id
CLICKUP_TIER1_LIST_ID=tier1_list_id

# ClickUp API
CLICKUP_API_TOKEN=your_api_token_here
```

### Update `config/user-mapping.ts`

Replace the `undefined` clickupId values with actual IDs:

```typescript
export const FRONT_DESK_TEAM: TeamMember[] = [
  {
    name: 'Lou Ann',
    email: 'louann@vanevery.com',
    clickupId: '12345678', // ← Add real ID here
    slackId: undefined,
    role: 'manager',
  },
  // ... etc for Christina, Tricia, Wendy
];
```

---

## Step 5: Verify Structure

Run this test to verify everything is configured:

```typescript
// In a test file or Node REPL
import { validateStructure } from './config/clickup-structure';

const result = validateStructure();

if (result.valid) {
  console.log('✅ ClickUp structure fully configured!');
} else {
  console.log('❌ Missing configuration:', result.missing);
}
```

---

## Step 6: Test Task Creation

Once everything is configured, test the full workflow:

```typescript
import { Lead } from './types/lead';
import { processLeadToTask } from './workflows/lead-to-task';

// Create a test lead
const testLead: Lead = {
  id: 'test-001',
  tier: 3,
  firstName: 'Test',
  lastName: 'Lead',
  email: 'test@example.com',
  phone: '+15551234567',
  source: 'website-form',
  temperature: 'warm',
  stage: 'action-ready',
  condition: 'back pain',
  emailsOpened: 3,
  emailsClicked: 2,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Process the lead
const result = await processLeadToTask(testLead);

console.log('Task creation result:', result);
// Should create task in Tier 3 list
// Should assign to Front Desk team
// Should have correct priority and due date
```

---

## Alternative: Manual Setup (If No MCP Access)

If you can't use MCP, you can set up ClickUp manually:

### Manual Steps

1. **Create Space** (Front Desk Tasks)
   - ClickUp → Everything → + Create Space
   - Name: "Front Desk Tasks"
   - Copy Space ID from URL

2. **Create Folder** (New Lead Follow-ups)
   - Inside Front Desk Tasks space
   - + Add Folder
   - Name: "New Lead Follow-ups"
   - Copy Folder ID from URL

3. **Create Lists**
   - Inside New Lead Follow-ups folder
   - + Add List (4 times)
   - Names:
     - "Tier 4 - Urgent Leads"
     - "Tier 3 - High Priority Leads"
     - "Tier 2 - Normal Priority Leads"
     - "Tier 1 - Low Priority Leads"
   - Copy each List ID from URL

4. **Add Custom Fields**
   - Go to each list settings
   - Add custom fields:
     - Lead Source (dropdown)
     - Lead Tier (dropdown)
     - Lead Temperature (dropdown)
     - Phone (text)
     - Email (text)
     - Condition (text)
     - Last Contact (date)

5. **Get User IDs**
   - Use ClickUp API:
   ```bash
   curl https://api.clickup.com/api/v2/team/YOUR_WORKSPACE_ID/user \
     -H "Authorization: YOUR_API_TOKEN"
   ```

---

## ClickUp Structure Diagram

After setup, your ClickUp should look like this:

```
Van Every Chiropractic (Workspace)
└── Front Desk Tasks (Space)
    └── New Lead Follow-ups (Folder)
        ├── Tier 4 - Urgent Leads (List)
        │   ├── Custom Fields: Lead Source, Tier, Temp, Phone, Email, Condition
        │   └── Assignees: Lou Ann, Christina, Tricia, Wendy
        ├── Tier 3 - High Priority Leads (List)
        │   └── (same custom fields and assignees)
        ├── Tier 2 - Normal Priority Leads (List)
        │   └── (same custom fields and assignees)
        └── Tier 1 - Low Priority Leads (List)
            └── (same custom fields and assignees)
```

---

## Troubleshooting

### Can't find MCP connection
- Check Claude Desktop/CLI settings
- Ensure ClickUp MCP is installed and configured
- Verify API token is valid

### "Permission denied" errors
- Ensure your ClickUp account has admin access
- Check API token has correct scopes (spaces, folders, lists, custom fields)

### Can't get List IDs
- Look at URL when viewing a list in ClickUp
- Format: `https://app.clickup.com/WORKSPACE_ID/v/li/LIST_ID`

### Custom field mapping not working
- Custom fields need to be mapped by ID (not name)
- This will require an additional API call to get field IDs
- For now, our code skips custom field population (TODO in code)

---

## Next Steps

After ClickUp structure is set up:

1. ✅ Configure Slack bot (see `docs/slack-setup.md`)
2. ✅ Get Slack channel ID and user IDs
3. ✅ Test full workflow: GHL → ClickUp → Slack
4. ✅ Deploy to Vercel
5. ✅ Configure GHL webhook to hit your endpoint

---

**Last Updated**: 2025-12-17
**Status**: Ready to use with MCP or manual setup
