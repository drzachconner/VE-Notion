# VE Command Center - N8N Workflow Architecture

## Overview
Three main workflows to create in N8N for seamless Notion ↔ Google Sheets ↔ Slack integration.

---

## Workflow 1: Google Sheets → Notion (Two-Way Sync - Sheets Changes)

### Trigger:
- **Google Sheets:** Watch for row updates/inserts in "Tasks" sheet
- Poll interval: Every 1-5 minutes (or use webhook if available)

### Workflow Steps:

1. **Trigger Node:** Google Sheets - On Row Added/Updated
   - Sheet: "VE Task Management"
   - Worksheet: "Tasks"

2. **Check if exists in Notion:**
   - Notion - Get Database Items
   - Filter by Task ID
   - If exists → Update
   - If not exists → Create new

3. **Map Fields:**
   - Task Name → Name (Title)
   - Team Member → Team Member (Select)
   - Due Date → Due Date (Date)
   - Priority → Priority (Select)
   - Status → Status (Select)
   - Related Project → Related Project (Relation)
   - Tags → Tags (Multi-select)
   - Type → Type (Select)
   - Time Estimate → Time Estimate (Number)
   - Notes → Notes (Rich Text)

4. **Notion - Create or Update Page:**
   - Database: "Team Work Hub"
   - Properties: Mapped from above

5. **Error Handler:**
   - Send Slack notification if sync fails
   - Log error to separate Google Sheet

---

## Workflow 2: Notion → Google Sheets (Two-Way Sync - Notion Changes)

### Trigger:
- **Notion Webhook:** Database Item Created/Updated
- Database: "Team Work Hub"

### Workflow Steps:

1. **Trigger Node:** Notion Trigger
   - Event: Database item created or updated
   - Database: Team Work Hub

2. **Get Full Page Details:**
   - Notion - Get Page
   - Page ID: From trigger

3. **Check if exists in Google Sheets:**
   - Google Sheets - Lookup
   - Search by Task ID (from Notion)
   - If exists → Update row
   - If not exists → Append row

4. **Map Fields:**
   - Name → Task Name
   - Team Member → Team Member
   - Due Date → Due Date
   - Priority → Priority
   - Status → Status
   - Related Project → Related Project (extract name)
   - Tags → Tags (join multi-select values)
   - Type → Type
   - Time Estimate → Time Estimate (hrs)
   - Notion URL → Notion Link column

5. **Google Sheets - Update or Append Row:**
   - Sheet: "VE Task Management"
   - Worksheet: "Tasks"

6. **Auto-populate timestamps:**
   - If Status = "Done" and Completed Date is empty → Add current timestamp
   - If new task and Created Date is empty → Add current timestamp

---

## Workflow 3: Slack Commands → Create/Update Tasks

### Part A: Create Task via Slash Command

**Trigger:**
- **Slack:** Slash command `/task` or `/addtask`

**Command Format:**
```
/task [Task Name] @[Team Member] #[Project] ![Priority] ^[Due Date]
```

**Example:**
```
/task Review patient protocols @DrZach #PatientCare !High ^11/20
```

**Workflow Steps:**

1. **Trigger Node:** Slack - Slash Command Trigger
   - Command: /task

2. **Parse Command Text:**
   - Function Node: Extract components
   - Regex patterns:
     - Task Name: Everything before first @
     - Team Member: Text after @
     - Project: Text after #
     - Priority: Text after !
     - Due Date: Text after ^

3. **Generate Task ID:**
   - Function Node: Create unique ID
   - Format: TASK-YYYYMMDD-XXX

4. **Add to Google Sheets:**
   - Google Sheets - Append Row
   - Sheet: "Tasks"
   - Map all parsed fields

5. **Add to Notion:**
   - Notion - Create Database Item
   - Database: Team Work Hub
   - Map all fields

6. **Send Slack Confirmation:**
   - Slack - Send Message
   - Channel: Where command was issued
   - Message: "✅ Task created: [Task Name] assigned to @[Team Member]"
   - Include: Link to Notion page

---

### Part B: Update Task Status via Emoji Reaction

**Trigger:**
- **Slack:** Reaction Added to Message

**Workflow Steps:**

1. **Trigger Node:** Slack - Reaction Added
   - Watch for specific emojis:
     - ✅ (checkmark) = Mark as Done
     - 🚧 (construction) = Mark as In Progress
     - 🚫 (prohibited) = Mark as Blocked
     - ⏸️ (pause) = Mark as On Hold

2. **Extract Task Info:**
   - Parse message for Task ID or search by task name

3. **Update Google Sheets:**
   - Google Sheets - Update Row
   - Find row by Task ID
   - Update Status column based on emoji
   - Update Completed Date if status = Done

4. **Update Notion:**
   - Notion - Update Page
   - Find page by Task ID
   - Update Status property
   - Update Completed Date if applicable

5. **Send Confirmation:**
   - Slack - Add Reaction to original message
   - Add different emoji to confirm (e.g., ✅ → ☑️)

---

## Workflow 4: Daily Task Summary to Slack

**Trigger:**
- **Schedule:** Daily at 8:00 AM (or custom time)

**Workflow Steps:**

1. **Trigger Node:** Schedule
   - Cron: `0 8 * * 1-5` (8 AM, weekdays)

2. **Get Today's Tasks from Notion:**
   - Notion - Get Database Items
   - Database: Team Work Hub
   - Filter: Due Date = Today OR Status = In Progress

3. **Group by Team Member:**
   - Function Node: Sort and group tasks

4. **Format Message:**
   - Function Node: Create formatted message
   - Format:
   ```
   🌅 Good morning team! Here's today's task summary:

   📋 Dr. Zach (3 tasks)
   • Review patient protocols [High] 🔴
   • Update treatment plans [Medium]
   • Team meeting prep [Low]

   📋 Lou Ann (2 tasks)
   • Process new patient paperwork [High] 🔴
   • Schedule follow-ups [Medium]

   [View all in Notion →]
   ```

5. **Send to Slack:**
   - Slack - Send Message
   - Channel: #general or #team-tasks
   - Message: Formatted summary

---

## Workflow 5: Overdue Task Alerts

**Trigger:**
- **Schedule:** Daily at 9:00 AM

**Workflow Steps:**

1. **Trigger Node:** Schedule
   - Cron: `0 9 * * *` (9 AM daily)

2. **Get Overdue Tasks:**
   - Notion - Get Database Items
   - Filter: Due Date < Today AND Status ≠ Done

3. **Group by Team Member:**
   - Function Node: Sort tasks

4. **Send Individual DMs:**
   - Loop through each team member
   - Slack - Send Direct Message
   - Message:
   ```
   ⚠️ You have [X] overdue tasks:

   • [Task 1] - Due [Date] [Link to Notion]
   • [Task 2] - Due [Date] [Link to Notion]

   Need help? Reply here or update in Notion.
   ```

---

## Workflow 6: Events and Meetings Sync (Google Sheets ↔ Notion)

### Similar to Task sync but for Events and Meetings sheet

**Trigger:**
- Google Sheets updates on "Events and Meetings" worksheet
- Notion updates on "Events and Meetings" database

**Bi-directional sync** using same pattern as Workflows 1 & 2

---

## Additional Helpful Workflows

### Workflow 7: Project Progress Updates
- Trigger: Notion task status changes
- Calculate project completion %
- Update Google Sheets project row
- Send weekly summary to Slack

### Workflow 8: Slack Message → Create Task
- Trigger: React to any Slack message with 📌
- Create task from message content
- Link to original Slack thread

---

## N8N Configuration Tips

### Error Handling:
```
For each workflow, add an Error Trigger node:
- Captures any failed nodes
- Sends alert to Slack #errors channel
- Logs to error sheet in Google Sheets
```

### Rate Limiting:
```
Add delays between batch operations:
- Wait 500ms between Notion API calls
- Use batch processing for large syncs
```

### Credentials Setup:
1. **Google Sheets OAuth2**
2. **Notion API Key** (Internal Integration)
3. **Slack Bot Token** (with permissions: chat:write, reactions:read, commands)

### Testing Strategy:
1. Create test versions of each workflow
2. Use small subset of data
3. Test each trigger independently
4. Verify bi-directional sync doesn't create loops
5. Test error handling

---

## Deployment Order

1. ✅ Create Google Sheets structure
2. ✅ Set up Notion databases (already done)
3. ✅ Build Workflow 1 (Sheets → Notion)
4. ✅ Build Workflow 2 (Notion → Sheets)
5. ✅ Test two-way sync thoroughly
6. ✅ Build Workflow 3 (Slack task creation)
7. ✅ Build Workflow 4 (Daily summaries)
8. ✅ Build Workflow 5 (Overdue alerts)
9. ✅ Add additional workflows as needed

---

## Maintenance Requirements

### Regular Checks (Monthly):
- Review error logs
- Check for failed workflows
- Test sync accuracy
- Update any changed field mappings

### When to Update Workflows:
- Adding new fields to databases
- Changing team members
- Modifying Slack command syntax
- Notion database structure changes

### Backup Strategy:
- Export N8N workflows (JSON) monthly
- Keep version history in Git
- Document any custom function nodes

