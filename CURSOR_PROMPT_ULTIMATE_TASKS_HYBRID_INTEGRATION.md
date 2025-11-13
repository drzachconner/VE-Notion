# Cursor Prompt: Ultimate Tasks Hybrid Integration for VE-Notion
## Keep Dashboard Layouts + Integrate Ultimate Tasks Databases + Auto-Create Filtered Views

---

## PROJECT OVERVIEW

**Goal**: Hybrid architecture combining your custom dashboard layouts with Thomas Frank's Ultimate Tasks databases

**Existing Structure (Preserve)**:
- 7 individual dashboards already built (Dr. Saylor, Dr. Zach, Dr. John, Lou Ann, Christina, Tricia, Wendy)
- Clean 3-section layout: My Tasks, My Events, My Projects
- Team-wide pages for all tasks, events, projects
- Manual linked database views with filters

**New Layer (Add)**:
- Ultimate Tasks databases: Tasks [UT], Projects [UT], Events [UT]
- Assignee-based filtered views (35 total: 5 per team member)
- Hidden/archived Ultimate Tasks features not needed
- Relinked database blocks pointing to Ultimate Tasks sources

**Result**: Professional task management foundation + your custom dashboard design

---

## CONTEXT: VE-NOTION ARCHITECTURE

**Project**: Van Every Family Chiropractic Center  
**URL**: https://github.com/drzachconner/VE-Notion  
**Phase**: 3 (Individual Dashboard Upgrades)  
**Team**: 7 members (3 doctors + 4 staff)
**Login**: Single shared Notion account, 7 individual dashboards  
**Current Status**: Dashboards restructured; ready for database integration

**Team Members**:
```python
team_members = [
    "Dr. Saylor",
    "Dr. Zach",
    "Dr. John",
    "Lou Ann",
    "Christina",
    "Tricia",
    "Wendy"
]
```

---

## EXISTING DASHBOARD STRUCTURE (DO NOT MODIFY LAYOUT)

Each dashboard has this structure:
```
┌─────────────────────────────────────────┐
│ [Icon] [Team Member Name]               │
│ [Role/Department]                       │
└─────────────────────────────────────────┘

📍 TODAY'S FOCUS
🎯 [Top 3 priorities]

┌──────────────┬──────────────────────────┐
│ MY TODAY     │ MY WEEK                  │
│ [Count]      │ [Count]                  │
├──────────────┼──────────────────────────┤
│ MY OVERDUE   │ MY IN PROGRESS           │
│ [Count]      │ [Count]                  │
└──────────────┴──────────────────────────┘

📋 MY TASKS
[Database view block - filtered to this person's tasks]

📅 MY EVENTS
[Database view block - filtered to this person's events]

🚀 MY PROJECTS
[Database view block - filtered to this person's projects]

┌─────────────────────────────────────────┐
│ 🔗 QUICK LINKS                          │
│ [Links to team-wide pages, resources]   │
└─────────────────────────────────────────┘
```

**Your Requirement**: Keep this layout EXACTLY as is. Only change the database sources underneath.

---

## THOMAS FRANK'S ULTIMATE TASKS TEMPLATE

**What It Provides**:
- Professional Tasks database with properties: Name, Status, Project, Due Date, Next Due, Priority, **Assignee**
- Professional Projects database with relations and tracking
- Multiple pre-built views: Inbox, Today, Week, All Tasks, Priority View, Task Journal, Someday, Recurring Tasks
- Clean, battle-tested architecture used by millions

**What We're Doing**: Using the databases but adapting the views for your team structure

---

## TECHNICAL REQUIREMENTS

### 1. Ultimate Tasks Database Import
**What to do**:
- Reference the Ultimate Tasks template structure (HTML provided)
- Duplicate/import the Tasks [UT], Projects [UT] databases into VE-Notion workspace
- Verify "Assignee" property exists (Person type)
- Map your existing tasks to Ultimate Tasks properties where applicable

**Notion API Constraints**:
- Cannot directly import templates via API
- Will need to be created as new databases with equivalent schema
- Alternative: Document exact properties and Cursor creates them

**Output**: 
- 3 new databases ready in VE-Notion workspace
- Tasks [UT], Projects [UT], Events [UT]
- All properties match Ultimate Tasks standard structure

### 2. Create 35 Filtered Views (Python Script)
**File**: `create_filtered_views.py`

**What it does**:
- Uses Notion API to create 5 filtered views for each of 7 team members
- Views created in Tasks [UT] and Projects [UT] databases
- Implements --dry-run mode for preview

**Views for Each Team Member** (5 views × 7 people = 35 total):

#### Tasks Filtered Views (20 total):
1. **My Tasks-[Name]** → Filter: Assignee = [Name] | Sort: Priority DESC, Due Date ASC
2. **My Today-[Name]** → Filter: Assignee = [Name] AND Due = Today | Sort: Priority DESC
3. **My Week-[Name]** → Filter: Assignee = [Name] AND Due = Next 7 Days | Sort: Due Date ASC
4. **My Overdue-[Name]** → Filter: Assignee = [Name] AND Status ≠ Done AND Due < Today | Sort: Due Date ASC
5. **My In Progress-[Name]** → Filter: Assignee = [Name] AND Status = In Progress | Sort: Priority DESC

#### Projects Filtered Views (7 total):
6. **My Projects-[Name]** → Filter: Team Member = [Name] OR Lead = [Name]

#### Events Filtered Views (8 total):
7. **My Events-[Name]** → Filter: Attendees = [Name] (or equivalent relation)

**Output**: 
- `create_filtered_views.py` script with --dry-run capability
- Logs showing all 35 views created
- Error handling for missing properties or API failures

### 3. Relink Database Blocks in Dashboards
**What to do**:
- Update each of the 7 dashboards
- Change database view blocks to point to Ultimate Tasks databases instead of custom ones
- Ensure correct filtered views are linked for each section:
  - "My Tasks" section → "My Tasks-[Name]" view
  - "My Events" section → "My Events-[Name]" view
  - "My Projects" section → "My Projects-[Name]" view

**Notion API Constraints**:
- Cannot update existing database blocks via API (Notion limitation)
- These must be manually relinked in Notion UI OR documented in setup instructions
- Script should document which view links to which dashboard section

**Output**:
- `DASHBOARD_RELINK_INSTRUCTIONS.md` with step-by-step for each dashboard
- Alternative: If Notion API allows, automate via Python script

### 4. Hide/Customize Ultimate Tasks Features
**What to hide**:
- Archive or delete pages you don't need from Ultimate Tasks template:
  - "Task Journal" (daily scratchpad)
  - "Someday" list
  - "Recurring tasks" view (if not using)
  - "Priority View" (if your system handles priorities differently)
  - Any other Ultimate Tasks pages not aligned with your workflow

**What to keep**:
- Core navigation
- "Inbox" view (new tasks entry point)
- "All Tasks" (master view)
- Database structure

**Output**:
- `CUSTOMIZATION_STEPS.md` documenting which features to archive
- List of recommended deletions/hides
- Explanation of why each is optional

---

## IMPLEMENTATION TASKS FOR CURSOR

### Task 1: Database Schema & Property Documentation
**Output**: `ULTIMATE_TASKS_SCHEMA.md`

Document for each database:
```
Tasks [UT]:
- Name (Title)
- Status (Select: To Do, In Progress, Done, Cancelled)
- Project (Relation to Projects [UT])
- Due Date (Date)
- Next Due (Date)
- Priority (Select: Low, Medium, High, Urgent)
- Assignee (Person - CRITICAL)

Projects [UT]:
- Name (Title)
- Status (Select: Active, On Hold, Done)
- Team Members (Relation or Multi-select)
- Start Date (Date)
- End Date (Date)
- Description (Rich text)

Events [UT]:
- Name (Title)
- Date (Date)
- Attendees (Person - relation to team members)
- Location (Text)
- Type (Select: Meeting, Training, Other)
```

### Task 2: Generate create_filtered_views.py Script
**Output**: `create_filtered_views.py`

Requirements:
- CLI tool with `--dry-run` flag
- Validates Assignee property exists before proceeding
- Creates all 35 filtered views using Notion API
- Includes comprehensive logging
- Rate limiting for API calls
- Summary output: "Created 35 views (5 views × 7 people)"
- Error handling with clear error messages

Example usage:
```bash
python create_filtered_views.py --dry-run
python create_filtered_views.py  # applies changes
```

### Task 3: Generate Database Setup Python Script
**Output**: `setup_ultimate_tasks_databases.py`

What it does:
- Creates Tasks [UT], Projects [UT], Events [UT] databases in VE-Notion workspace
- Sets up all properties with correct types
- Creates relations between databases
- Initializes with sample structure (no data yet)
- Uses config.json or .env for workspace/database IDs

### Task 4: Generate Dashboard Relink Instructions
**Output**: `DASHBOARD_RELINK_INSTRUCTIONS.md`

Step-by-step for each of 7 dashboards:
```
FOR EACH DASHBOARD ([Name]'s Dashboard):

Step 1: My Tasks Section
- Click on the "My Tasks" database view block
- Edit block settings
- Change Database source: Select "Tasks [UT]"
- Change View: Select "My Tasks-[Name]"
- Save

Step 2: My Events Section
- Same process with "Events [UT]" database
- Select view: "My Events-[Name]"
- Save

Step 3: My Projects Section
- Same process with "Projects [UT]" database
- Select view: "My Projects-[Name]"
- Save

Verify each section shows ONLY [Name]'s items
```

Repeat for all 7 team members.

### Task 5: Generate Customization Guide
**Output**: `CUSTOMIZATION_STEPS.md`

What to delete/archive from Ultimate Tasks template pages:
```
RECOMMENDED TO ARCHIVE:
☐ "Task Journal" page → Daily scratchpad (not in your workflow)
☐ "Someday" view → Backlog (not in your workflow)
☐ "Recurring tasks" view → If not using recurring tasks
☐ "Priority View" → If priority is handled in status instead

RECOMMENDED TO KEEP:
✓ "Inbox" → New tasks entry point
✓ "Today" → All team member's tasks due today (master view)
✓ "All Tasks" → Master view of all work
✓ Core navigation
```

### Task 6: Generate Master Integration Script
**Output**: `integrate_ultimate_tasks.py`

One master script that runs everything in order:
1. Run `setup_ultimate_tasks_databases.py` → Creates databases
2. Run `create_filtered_views.py --dry-run` → Preview views
3. Prompt user to verify in Notion
4. Run `create_filtered_views.py` → Create 35 views
5. Generate summary report

Usage:
```bash
python integrate_ultimate_tasks.py --full
```

### Task 7: Generate Complete Integration Checklist
**Output**: `INTEGRATION_CHECKLIST.md`

```
PRE-INTEGRATION:
☐ Backup current VE-Notion workspace
☐ Review this entire prompt
☐ Have Notion workspace open

STEP 1: SETUP DATABASES
☐ Run: python setup_ultimate_tasks_databases.py
☐ Verify 3 new databases appear in Notion
☐ Check properties match schema

STEP 2: CREATE FILTERED VIEWS (PREVIEW)
☐ Run: python create_filtered_views.py --dry-run
☐ Review output - should show 35 views to create
☐ Confirm all team member names are present

STEP 3: CREATE FILTERED VIEWS (APPLY)
☐ Run: python create_filtered_views.py
☐ Wait for completion
☐ Verify in Notion: Tasks [UT] now has 35 new views

STEP 4: RELINK DASHBOARDS
☐ Follow DASHBOARD_RELINK_INSTRUCTIONS.md
☐ For each of 7 dashboards:
  ☐ Update "My Tasks" block → Tasks [UT] + "My Tasks-[Name]" view
  ☐ Update "My Events" block → Events [UT] + "My Events-[Name]" view
  ☐ Update "My Projects" block → Projects [UT] + "My Projects-[Name]" view
  ☐ Test: Verify only [Name]'s items show
  ☐ Save dashboard

STEP 5: CUSTOMIZE TEMPLATE
☐ Follow CUSTOMIZATION_STEPS.md
☐ Archive unused Ultimate Tasks pages
☐ Clean up navigation

STEP 6: FINAL VALIDATION
☐ Each dashboard shows correct person's tasks
☐ Filters working correctly
☐ Sorting by priority/date working
☐ All 7 dashboards tested
☐ "All Tasks" master view still accessible

DONE ✅
Team can begin using new system
```

---

## KEY CONSTRAINTS & GUARDRAILS

**Notion API Limitations** (What can't be automated):
- ❌ Cannot update existing database view blocks in dashboards (manual relink required)
- ❌ Cannot set exact column visibility via API (must be manual)
- ❌ Cannot rearrange dashboard blocks (layout stays as is)

**What Can Be Automated** (What Cursor should do):
- ✅ Create new databases with properties
- ✅ Create relations between databases
- ✅ Generate 35 filtered views with filters and sorts
- ✅ Generate comprehensive documentation
- ✅ Create integration scripts with logging

**What Must Be Manual** (Document clearly):
- Relink database view blocks in each dashboard
- Archive unnecessary Ultimate Tasks pages
- Initial data migration (if applicable)
- Final testing in Notion UI

---

## SUCCESS CRITERIA

When complete:
- ✅ Tasks [UT], Projects [UT], Events [UT] databases created
- ✅ 35 filtered views created (5 per team member)
- ✅ All 7 dashboards relinked to Ultimate Tasks databases
- ✅ Each dashboard shows only that person's tasks/events/projects
- ✅ Unused Ultimate Tasks features archived/hidden
- ✅ Master "All Tasks" view still accessible to entire team
- ✅ All filters, sorts, and views working correctly
- ✅ Complete documentation ready for team onboarding
- ✅ One-command integration script available for troubleshooting

---

## FILES CURSOR SHOULD GENERATE

```
VE-Notion/
├── setup_ultimate_tasks_databases.py          [NEW - Creates 3 databases]
├── create_filtered_views.py                   [NEW - Creates 35 views]
├── integrate_ultimate_tasks.py                [NEW - Master integration script]
├── ULTIMATE_TASKS_SCHEMA.md                   [NEW - Database schema reference]
├── DASHBOARD_RELINK_INSTRUCTIONS.md           [NEW - Manual relink steps]
├── CUSTOMIZATION_STEPS.md                     [NEW - What to hide/archive]
├── INTEGRATION_CHECKLIST.md                   [NEW - Full step-by-step guide]
├── HYBRID_ARCHITECTURE.md                     [NEW - How this all fits together]
└── (existing files remain unchanged)
```

---

## EXECUTION SEQUENCE FOR CURSOR

1. **Understand current state** - Review VE-Notion architecture and existing 7 dashboards
2. **Generate database setup script** - `setup_ultimate_tasks_databases.py`
3. **Generate filtered views script** - `create_filtered_views.py` with --dry-run capability
4. **Generate master integration script** - `integrate_ultimate_tasks.py`
5. **Generate all documentation** - All .md files listed above
6. **Quality check** - Ensure all scripts have proper error handling, logging, rate limiting
7. **Create comprehensive README** - How to use all scripts, troubleshooting, rollback procedures

---

## ONE-LINE SUMMARY

**Task**: Use Cursor to build complete hybrid integration of Ultimate Tasks databases into VE-Notion while preserving all existing dashboard layouts, with automated filtered view creation for 7 team members + comprehensive documentation for manual setup steps.
