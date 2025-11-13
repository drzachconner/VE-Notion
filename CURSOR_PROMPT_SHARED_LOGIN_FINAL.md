# Cursor Prompt: Create Team Filtered Views for Ultimate Tasks
## Single Login, Multiple Individual Dashboards Architecture

## SETUP CLARIFICATION
🔑 **One Shared Notion Login** - All 7 team members log in with the same credentials  
📊 **7 Separate Individual Dashboards** - Each person has their own dashboard page  
👁️ **Filtered Personal Views** - Each dashboard shows ONLY that person's assigned tasks

**How it works:**
- Dr. Saylor opens his Dashboard → sees "My Tasks-Dr. Saylor" view (only his tasks)
- Lou Ann opens her Dashboard → sees "My Tasks-Lou Ann" view (only her tasks)  
- Everyone can still see the Master "All Tasks" view if they navigate to it
- One account, shared access, individual focus areas

---

## DISCOVERY
✅ Thomas Frank's Ultimate Tasks template **already has an Assignee property**  
✅ It's ready to use, just needs team-specific filtered views for individual dashboards

---

## THE CORE TASK
Create Python script that builds 5 filtered views for EACH of 7 team members using the existing "Assignee" property:

### View Type 1: "My Tasks-[Name]"
- **Purpose**: Complete task list for this person's dashboard
- **Filter**: Assignee = [Name]
- **Sort**: Priority DESC, Due Date ASC
- **Columns**: Name, Assignee, Status, Due, Project, Priority

### View Type 2: "My Today-[Name]"
- **Purpose**: Daily focus - what's due today
- **Filter**: (Assignee = [Name]) AND (Due Date = today)
- **Sort**: Priority DESC
- **Columns**: Name, Status, Priority, Due, Project

### View Type 3: "My Week-[Name]"
- **Purpose**: Weekly planning - next 7 days
- **Filter**: (Assignee = [Name]) AND (Due Date is next 7 days)
- **Sort**: Due Date ASC, Priority DESC
- **Columns**: Name, Status, Due, Priority, Project

### View Type 4: "My Overdue-[Name]"
- **Purpose**: Urgent attention - past due items
- **Filter**: (Assignee = [Name]) AND (Status ≠ "Done") AND (Due Date < today)
- **Sort**: Due Date ASC (oldest first)
- **Columns**: Name, Status, Due, Priority, Project

### View Type 5: "My In Progress-[Name]"
- **Purpose**: Active work - currently in progress
- **Filter**: (Assignee = [Name]) AND (Status = "In Progress")
- **Sort**: Priority DESC, Due Date ASC
- **Columns**: Name, Status, Due, Priority, Project

---

## Team Members
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

## Generate This
**File**: `create_team_views.py`

A Python script that:
- Uses Notion API to create the 5 filtered views for each team member
- Takes `--dry-run` flag to preview without making changes to Notion
- Validates that "Assignee" property exists before proceeding
- Logs all views created with success/failure status
- Includes rate limiting for API calls
- Shows summary: "Created 35 views (5 views × 7 people)"

**Requirements:**
- Use Notion API filters with proper query syntax
- Reference: Tasks [UT] database (the one with the Assignee column visible)
- View naming: "My [Type]-[Name]" format consistently
- Sort order: Use Notion API sort structure (direction + property)
- Error handling: Clear messages if Assignee property not found or API fails

---

## What NOT to Do
- ❌ Don't create the Assignee property (already exists)
- ❌ Don't modify existing Ultimate Tasks views (Inbox, Today, All Tasks, Projects, etc.)
- ❌ Don't change the Tasks database schema
- ❌ Don't create separate user accounts or logins (this is one shared account)

---

## Implementation Context
**Use Case**: Van Every Family Chiropractic Center team management  
**Project**: https://github.com/drzachconner/VE-Notion  
**Current Phase**: Phase 3 (Individual Dashboard Upgrades)  
**Database**: Tasks [UT] (from Thomas Frank's Ultimate Tasks template)  
**Team Access**: Single shared Notion login, 7 individual dashboards

---

## What You'll Do After Script Succeeds

### Step 1: Run Script with Dry-Run (Preview)
```bash
python create_team_views.py --dry-run
```

Expected output:
```
[DRY-RUN] Creating views for Dr. Saylor
  ✓ My Tasks-Dr. Saylor (Assignee filter)
  ✓ My Today-Dr. Saylor (Assignee + Due today)
  ✓ My Week-Dr. Saylor (Assignee + Due next 7 days)
  ✓ My Overdue-Dr. Saylor (Assignee + Overdue)
  ✓ My In Progress-Dr. Saylor (Assignee + In Progress)

[DRY-RUN] Creating views for Dr. Zach
  ✓ My Tasks-Dr. Zach (Assignee filter)
  ✓ My Today-Dr. Zach (Assignee + Due today)
  ...

[DRY-RUN] Total: 35 views to create (5 views × 7 team members)
[DRY-RUN] Run without --dry-run flag to commit these changes to Notion.
```

### Step 2: Run Script for Real (Apply Changes)
```bash
python create_team_views.py
```

This creates all 35 filtered views in Notion.

### Step 3: Manual Setup in Notion (Per Dashboard)
For each team member's individual dashboard:
1. Go to [Name]'s Dashboard page
2. Add a new section called "📋 My Tasks" (or similar)
3. Insert a "Database View" block
4. Select database: "Tasks [UT]"
5. Select view: "My Tasks-[Name]"
6. Configure block display settings as needed
7. Repeat for other view types (My Today, My Week, etc.) in additional sections if desired
8. Test: Verify only [Name]'s assigned tasks appear

**Result**: Each person's dashboard shows only their tasks, but everyone uses the same login.

---

## Why This Works Well

✅ **Centralized Management**: One account, easy to see team status  
✅ **Individual Focus**: Each dashboard shows only that person's work  
✅ **Transparency**: All views accessible to entire team if needed  
✅ **Simplified Setup**: No user management, no permission complexity  
✅ **Scalable**: Easy to add/remove team members or tasks  

---

## Template Guidance

The Assignee property popup literally says:
> "to make this property useful, you'll want to create filtered views that only show tasks assigned to specific people"

This script does exactly that for your team structure. ✅

---

## Success Criteria
- ✅ Script runs without errors in --dry-run mode
- ✅ Preview shows all 35 views will be created
- ✅ Script applies changes successfully without --dry-run
- ✅ In Notion, each view filter shows only the assigned person's tasks
- ✅ Each team member's dashboard can display their filtered view
- ✅ All 7 people see their own tasks on their own dashboards
- ✅ Master views (All Tasks, Inbox) still visible to everyone

---

## Technical Details

**Database**: Tasks [UT]  
**Property to filter on**: Assignee (Person type, already exists)  
**View naming convention**: "My [ViewType]-[TeamMemberName]"  
**Total views to create**: 35 (5 types × 7 members)  
**Shared login**: Yes - all team members use same account  
**Individual dashboards**: Yes - 7 separate dashboard pages  

---

## File Location
Place `create_team_views.py` in the VE-Notion project root alongside other Python scripts like `build_dashboards.py` and `notion_client.py`.
