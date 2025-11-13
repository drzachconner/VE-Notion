# Google Sheet Setup Instructions

## Step 1: Create Sheet Tabs

In your Google Sheet: https://docs.google.com/spreadsheets/d/10RohggAvh8Rv1iMYELcajUaDgEjLARBN8GsojFrU3QA/edit

1. Rename "Sheet1" to **"Tasks"**
2. Create new tabs (click + at bottom):
   - **Projects**
   - **Events and Meetings**
   - **Team Members**
   - **Config** (for settings/lookups)

## Step 2: Import CSV Data

For each tab, I've created CSV files in the `Google_Sheets_Import` folder.

**To import each CSV:**

1. Open the tab (e.g., "Tasks")
2. Go to File → Import
3. Upload → Browse to select the CSV file
4. Import location: **"Replace current sheet"**
5. Separator type: **Comma**
6. Convert text to numbers: **Yes**
7. Click "Import data"

**Import in this order:**
1. `4_Team_Members.csv` → Team Members tab
2. `2_Projects.csv` → Projects tab
3. `3_Events_and_Meetings.csv` → Events and Meetings tab
4. `1_Tasks.csv` → Tasks tab

## Step 3: Set Up Data Validation (Dropdowns)

### In "Tasks" Tab:

**Team Member (Column C):**
1. Select column C (click the column header)
2. Data → Data validation
3. Criteria: List from a range
4. Range: `Team Members!A2:A8`
5. On invalid data: Reject input
6. Show dropdown list in cell: ✓
7. Save

**Priority (Column F):**
- Criteria: List of items
- Items: `High, Medium, Low`

**Status (Column G):**
- Criteria: List of items
- Items: `Not Started, In Progress, Done, Blocked, On Hold`

**Type (Column J):**
- Criteria: List of items
- Items: `Task, Project, Meeting`

**Recurring (Column L):**
- Criteria: List of items
- Items: `Yes, No`

### In "Projects" Tab:

**Owner (Column C):**
- Range: `Team Members!A2:A8`

**Status (Column D):**
- Items: `Backlog, In Progress, Completed, On Hold, Cancelled`

**Priority (Column E):**
- Items: `High, Medium, Low`

**Department (Column F):**
- Items: `Clinical, Admin, Marketing, Operations, Finance, HR`

### In "Events and Meetings" Tab:

**Type (Column H):**
- Items: `Meeting, Event, All Hands, Team, 1:1, Clinical, Client, Training, Conference, Workshop`

**Status (Column I):**
- Items: `Scheduled, Completed, Cancelled, Rescheduled`

## Step 4: Add Formulas

### In "Tasks" Tab:

**Created Date (Column N) - Auto-populate when row is created:**
Row 2 formula:
```
=IF(B2<>"", IF(N2="", NOW(), N2), "")
```
Drag down to apply to all rows

**Completed Date (Column O) - Auto-populate when Status = Done:**
Row 2 formula:
```
=IF(G2="Done", IF(O2="", NOW(), O2), "")
```
Drag down to apply to all rows

### In "Projects" Tab:

**Task Count (Column J) - Count related tasks:**
Row 2 formula:
```
=COUNTIF(Tasks!H:H, A2)
```
Explanation: Counts tasks where Related Project matches this Project ID

**Task Completion % (Column K):**
Row 2 formula:
```
=IF(J2>0, COUNTIFS(Tasks!H:H, A2, Tasks!G:G, "Done")/J2, 0)
```
Format as Percentage

## Step 5: Conditional Formatting

### In "Tasks" Tab:

**Color-code by Priority:**
1. Select columns A:R (all task data)
2. Format → Conditional formatting
3. Format rules → Add new rule:

**Rule 1 - High Priority:**
- Format cells if: Custom formula is
- Formula: `=$F2="High"`
- Formatting: Light red background
- Range: `A2:R1000`

**Rule 2 - Medium Priority:**
- Formula: `=$F2="Medium"`
- Formatting: Light yellow background

**Rule 3 - Low Priority:**
- Formula: `=$F2="Low"`
- Formatting: Light green background

**Rule 4 - Completed (Done):**
- Formula: `=$G2="Done"`
- Formatting: Light gray background, strikethrough text
- Note: This rule should be LAST (highest priority)

**Rule 5 - Overdue:**
- Formula: `=AND($E2<TODAY(), $G2<>"Done", $E2<>"")`
- Formatting: Bold red text
- This highlights overdue tasks

### In "Projects" Tab:

**Color-code by Status:**
- `$D2="In Progress"` → Light blue background
- `$D2="Completed"` → Light green background
- `$D2="Backlog"` → Light gray background

## Step 6: Freeze Headers & Formatting

**For all tabs (Tasks, Projects, Events and Meetings):**
1. Click row 1
2. View → Freeze → 1 row
3. Format row 1:
   - Bold
   - Background color: Dark gray (#666666)
   - Text color: White
   - Center align

**Column widths (Tasks tab):**
- Task ID (A): 100px
- Task Name (B): 250px
- Team Member (C): 120px
- Due Date (E): 100px
- Priority (F): 80px
- Status (G): 120px
- Related Project (H): 150px
- Tags (I): 150px
- Notes (P): 300px

## Step 7: Protect Team Members Sheet

1. Go to Team Members tab
2. Data → Protect sheets and ranges
3. Sheet: Team Members
4. Set permissions: Only you can edit
5. This prevents accidental changes to the source data for dropdowns

## Step 8: Create Named Ranges (Optional but Recommended)

Makes formulas easier to read and maintain:

1. Data → Named ranges
2. Create these ranges:

**TeamMemberList:**
- Range: `Team Members!A2:A8`
- Used in: Data validation dropdowns

**TasksDatabase:**
- Range: `Tasks!A:R`
- Used in: Formulas and N8N

**ProjectsDatabase:**
- Range: `Projects!A:M`

**EventsAndMeetingsDatabase:**
- Range: `Events and Meetings!A:M`

## Step 9: Set Up "Config" Tab (for N8N settings)

In the **Config** tab, create this structure:

| Setting | Value |
|---------|-------|
| Last Sync to Notion | |
| Last Sync from Notion | |
| Notion Database ID | [Will fill from Notion] |
| N8N Webhook URL | [Will fill from N8N] |
| Sync Enabled | TRUE |

This helps track sync status and store integration settings.

## Step 10: Share with N8N Service Account

Once you set up Google Sheets OAuth in N8N, you'll need to share this sheet with the service account email. I'll provide those instructions in the N8N credential setup guide.

---

## Verification Checklist

After completing setup, verify:

- ✅ All 5 tabs exist (Tasks, Projects, Events and Meetings, Team Members, Config)
- ✅ Sample data is imported
- ✅ All dropdowns work (try changing Team Member in Tasks)
- ✅ Conditional formatting shows colors
- ✅ Headers are frozen and formatted
- ✅ Formulas calculate correctly
- ✅ Team Members sheet is protected

**Once complete, move to N8N credential setup!**
