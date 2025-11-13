# How to Import N8N Workflows

## Quick Start

1. **Log into your N8N:** https://vaneverychiropractic.app.n8n.cloud
2. **Create new workflow:** Click "+ New Workflow" button
3. **Import JSON:**
   - Click the workflow menu (3 dots, top right)
   - Select "Import from File"
   - Choose the JSON file (e.g., `1_Google_Sheets_to_Notion_Sync.json`)
   - Click "Import"

4. **Update Credential IDs:**
   After import, you need to reconnect credentials in each node:

   - Click on each node that uses a credential
   - In the "Credentials" dropdown, select your credential:
     - Google Sheets nodes → Select "VE Google Sheets"
     - Notion nodes → Select "VE Notion"
     - Slack nodes → Select "VE Slack"
   - Save the node

5. **Rename workflow:**
   - Click workflow name at top
   - Suggested name: "VE: Google Sheets → Notion Sync"

6. **Save workflow:** Ctrl+S or click "Save" button

---

## Workflow Import Order

Import and test in this sequence:

### Phase 1: Core Sync
1. **1_Google_Sheets_to_Notion_Sync.json**
   - Tests: Sheets → Notion data flow
   - Manual trigger for testing

2. **2_Notion_to_Google_Sheets_Sync.json**
   - Tests: Notion → Sheets data flow
   - Webhook trigger for live updates

### Phase 2: Automation
3. **3_Scheduled_Sync.json**
   - Runs hourly to keep systems in sync
   - Schedule trigger

### Phase 3: Slack Integration
4. **4_Slack_Create_Task.json**
   - Slash command: /task
   - Creates tasks in both Sheets and Notion

5. **5_Slack_Emoji_Status_Update.json**
   - React with ✅ to mark tasks done
   - Updates both systems

6. **6_Daily_Task_Summary.json**
   - Posts task summary every morning
   - Schedule: 8 AM weekdays

---

## After Importing Each Workflow

### Required Updates:

1. **Update Database/Sheet IDs:**
   - Google Sheet ID: `10RohggAvh8Rv1iMYELcajUaDgEjLARBN8GsojFrU3QA`
   - Notion Team Work Hub ID: `bcfd55b779f14c8ab19f6a26128e4abb`
   - These should already be in the JSON, but verify

2. **Update Slack Channel IDs:**
   - Replace `YOUR_SLACK_CHANNEL_ID` with actual channel ID
   - To get channel ID in Slack:
     - Right-click channel → View channel details
     - Scroll down, copy the Channel ID

3. **Test Each Node:**
   - Click "Execute Node" button on each node
   - Verify data flows correctly
   - Check for errors in red

4. **Activate Workflow:**
   - Toggle "Active" switch in top right
   - Only activate after testing!

---

## Common Issues & Fixes

### Issue: "Credentials are not set"
**Fix:** Click the node, select credential from dropdown, save

### Issue: "Database ID not found"
**Fix:**
1. Make sure you shared the Notion database with your integration
2. Verify database ID is correct (32-character hex string)

### Issue: "Insufficient permissions"
**Fix:**
- Google Sheets: Re-authenticate OAuth
- Notion: Check integration capabilities (Read, Write, Insert)
- Slack: Verify bot scopes in Slack app settings

### Issue: "Column not found" in Google Sheets
**Fix:**
- Check sheet tab name matches exactly (case-sensitive)
- Verify column headers match CSV imports
- Make sure range is correct (e.g., `Tasks!A:R`)

### Issue: Workflow runs but no data appears
**Fix:**
1. Check filters - may be filtering out all data
2. Verify trigger is working (check executions list)
3. Review each node's output data

---

## Testing Strategy

### Test Workflow 1 (Sheets → Notion):

1. Add a test task in Google Sheets:
   ```
   Task ID: TEST-001
   Task Name: Test Sync from Sheets
   Team Member: Dr. Zach
   Status: Not Started
   Priority: High
   ```

2. Run the workflow (click "Execute Workflow")

3. Check Notion Team Work Hub - should see new task appear

4. Modify the task in Sheets (change status to "In Progress")

5. Run workflow again

6. Check Notion - status should update

### Test Workflow 2 (Notion → Sheets):

1. Create a task in Notion Team Work Hub

2. Workflow should trigger automatically (webhook)

3. Check Google Sheets - new row should appear

4. Modify task in Notion

5. Check Sheets - should update

---

## Webhook URLs

After importing webhook-based workflows, you'll get URLs like:

```
https://vaneverychiropractic.app.n8n.cloud/webhook/[workflow-id]/[path]
```

**You need these URLs for:**
- Notion webhooks (for Workflow 2)
- Slack slash commands (for Workflow 4)
- Slack event subscriptions (for Workflow 5)

**To get webhook URL:**
1. Open the workflow
2. Click the "Webhook" trigger node
3. Copy the "Test URL" or "Production URL"
4. Paste into Slack app settings or Notion integration

---

## Production Checklist

Before activating for real use:

- ✅ All credentials connected and working
- ✅ Test data syncs correctly both ways
- ✅ No duplicate entries created
- ✅ Timestamps populate correctly
- ✅ Slack notifications work
- ✅ Error handling tested (try invalid data)
- ✅ Webhook URLs configured in Slack/Notion
- ✅ Team members trained on how to use
- ✅ Backup workflow JSONs saved

---

## Next Steps After Import

1. Test with sample data
2. Clear sample/test data
3. Import real tasks from current system
4. Train team on Slack commands
5. Monitor for first week
6. Adjust as needed

Need help? Check the N8N_Workflow_Architecture.md for detailed workflow explanations!
