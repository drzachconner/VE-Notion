# N8N Credential Setup Guide

## N8N Project Name Suggestion:
**"VE Command Center Sync"** or **"VE Task Management Integration"**

Your N8N URL: https://vaneverychiropractic.app.n8n.cloud

---

## 1. Set Up Google Sheets OAuth2 Credential

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: **"N8N VE Integration"**
3. Enable APIs:
   - Google Sheets API
   - Google Drive API

### Step 2: Create OAuth Credentials

1. In Google Cloud Console:
   - APIs & Services → Credentials
   - Create Credentials → OAuth client ID
   - Application type: **Web application**
   - Name: **"N8N VE Sheets Access"**

2. Add authorized redirect URI:
   ```
   https://vaneverychiropractic.app.n8n.cloud/rest/oauth2-credential/callback
   ```

3. Save and copy:
   - Client ID
   - Client Secret

### Step 3: Configure in N8N

1. In N8N: Go to **Settings (gear icon) → Credentials**
2. Click **"+ New Credential"**
3. Search for: **"Google Sheets OAuth2 API"**
4. Fill in:
   - **Name:** `VE Google Sheets`
   - **Client ID:** [Paste from Google Cloud]
   - **Client Secret:** [Paste from Google Cloud]
   - **Scopes:** (keep default or add these if prompted)
     ```
     https://www.googleapis.com/auth/spreadsheets
     https://www.googleapis.com/auth/drive.file
     ```
5. Click **"Connect my account"**
6. Sign in with your Google account (the one that owns the sheet)
7. Grant permissions
8. **Save credential**

### Step 4: Share Sheet with Service Account (if using Service Account instead)

**Note:** If OAuth doesn't work, use Service Account method:
1. Create Service Account in Google Cloud
2. Download JSON key
3. In N8N, use "Google Sheets Service Account" credential instead
4. Share your Google Sheet with the service account email

---

## 2. Set Up Notion API Credential

### Step 1: Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Fill in:
   - **Name:** `N8N VE Command Center`
   - **Associated workspace:** Select your workspace
   - **Type:** Internal integration
   - **Capabilities:** (check all)
     - ✅ Read content
     - ✅ Update content
     - ✅ Insert content
     - ✅ Read comments
     - ✅ Insert comments

4. Click **"Submit"**
5. Copy the **"Internal Integration Token"** (starts with `secret_...`)

### Step 2: Connect Integration to Notion Databases

**IMPORTANT:** You must share your databases with the integration:

1. Open your **"Van Every Command Center"** in Notion
2. Click the **"..." menu** (top right)
3. Scroll down to **"Connections"** or **"Add connections"**
4. Search for: **"N8N VE Command Center"**
5. Click to connect
6. Repeat for these databases:
   - Team Work Hub
   - Projects
   - Meetings
   - Events and Meetings

### Step 3: Configure in N8N

1. In N8N: **Settings → Credentials**
2. Click **"+ New Credential"**
3. Search for: **"Notion API"**
4. Fill in:
   - **Name:** `VE Notion`
   - **API Key:** [Paste the integration token from Step 1]
5. **Save credential**

### Step 4: Get Database IDs

You'll need these for N8N workflows. To get database ID from Notion:

1. Open the database in Notion
2. Look at the URL:
   ```
   https://www.notion.so/[workspace-name]/[database-id]?v=...
   ```
3. Copy the database ID (32-character hex string)

**Get IDs for:**
- **Team Work Hub:** bcfd55b779f14c8ab19f6a26128e4abb (from your earlier file)
- **Projects:** 2a380ff9d4f581aab5e7ff996f31a40b
- **Meetings:** 2a380ff9d4f581468537e6e63fc6d0b6

**Store these - you'll need them in workflows!**

---

## 3. Set Up Slack Credential

### Step 1: Create Slack App

1. Go to [Slack API](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. App Name: **"VE Task Manager"**
5. Workspace: Select your workspace
6. Click **"Create App"**

### Step 2: Configure OAuth & Permissions

1. In your app settings, go to **"OAuth & Permissions"**
2. Scroll to **"Scopes"** → **"Bot Token Scopes"**
3. Add these scopes:
   - `chat:write` - Send messages
   - `chat:write.public` - Send to channels app isn't in
   - `channels:read` - View channels
   - `users:read` - View people in workspace
   - `reactions:read` - View emoji reactions
   - `reactions:write` - Add emoji reactions
   - `commands` - Create slash commands
   - `im:write` - Send DMs
   - `im:read` - View DMs

4. Scroll up and click **"Install to Workspace"**
5. Authorize the app
6. Copy the **"Bot User OAuth Token"** (starts with `xoxb-...`)

### Step 3: Create Slash Commands

1. In your app settings, go to **"Slash Commands"**
2. Click **"Create New Command"**

**Command 1: /task**
- Command: `/task`
- Request URL: `https://vaneverychiropractic.app.n8n.cloud/webhook/slack-task-create`
  *(We'll update this with actual webhook URL from N8N)*
- Short Description: `Create a new task`
- Usage Hint: `[task name] @person #project !priority ^due-date`

**Command 2: /mytasks**
- Command: `/mytasks`
- Request URL: `https://vaneverychiropractic.app.n8n.cloud/webhook/slack-my-tasks`
- Short Description: `View your assigned tasks`
- Usage Hint: `[optional: today|week|overdue]`

3. Save commands

### Step 4: Enable Event Subscriptions (for emoji reactions)

1. Go to **"Event Subscriptions"**
2. Enable Events: **ON**
3. Request URL: `https://vaneverychiropractic.app.n8n.cloud/webhook/slack-events`
   *(We'll update this with actual webhook URL from N8N)*
4. Subscribe to bot events:
   - `reaction_added`
   - `message.channels`
5. Save changes

### Step 5: Configure in N8N

1. In N8N: **Settings → Credentials**
2. Click **"+ New Credential"**
3. Search for: **"Slack OAuth2 API"** or **"Slack API"**
4. Fill in:
   - **Name:** `VE Slack`
   - **Access Token:** [Paste Bot User OAuth Token from Step 2]
5. **Save credential**

### Step 6: Get Slack User IDs

To @mention people in Slack messages, you need their user IDs:

1. In Slack, click on a person's profile
2. Click **"..." (More)**
3. Click **"Copy member ID"**

**Get IDs for:**
- Dr. Saylor
- Dr. Zach
- Dr. John
- Lou Ann
- Christina
- Tricia
- Windy

**Add these to your Google Sheet** in the "Team Members" tab, "Slack User ID" column.

---

## 4. Test All Credentials

### Test Google Sheets:
1. In N8N, create a test workflow
2. Add **"Google Sheets"** node
3. Operation: **"Get Many"** or **"Read"**
4. Select credential: **VE Google Sheets**
5. Spreadsheet ID: `10RohggAvh8Rv1iMYELcajUaDgEjLARBN8GsojFrU3QA`
6. Range: `Tasks!A1:R10`
7. **Execute node**
8. Should return your task data ✅

### Test Notion:
1. Add **"Notion"** node
2. Resource: **"Database"**
3. Operation: **"Get Many"**
4. Select credential: **VE Notion**
5. Database ID: `bcfd55b779f14c8ab19f6a26128e4abb`
6. **Execute node**
7. Should return Team Work Hub data ✅

### Test Slack:
1. Add **"Slack"** node
2. Resource: **"Message"**
3. Operation: **"Post"**
4. Select credential: **VE Slack**
5. Channel: Select a test channel
6. Text: `Testing N8N integration! 🚀`
7. **Execute node**
8. Check Slack for message ✅

---

## Credential Summary

Once all set up, you should have these credentials in N8N:

- ✅ **VE Google Sheets** (OAuth2)
- ✅ **VE Notion** (API Key)
- ✅ **VE Slack** (OAuth2 or API Token)

**Important IDs to save:**
```
Google Sheet ID: 10RohggAvh8Rv1iMYELcajUaDgEjLARBN8GsojFrU3QA

Notion Database IDs:
- Team Work Hub: bcfd55b779f14c8ab19f6a26128e4abb
- Projects: 2a380ff9d4f581aab5e7ff996f31a40b
- Meetings: 2a380ff9d4f581468537e6e63fc6d0b6
```

---

## Next Steps

After credentials are working:
1. Import N8N workflow JSON files
2. Update webhook URLs in Slack app
3. Test each workflow individually
4. Enable workflows for production use

Let me know when credentials are set up and we'll move to importing workflows!
