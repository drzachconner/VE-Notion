#!/usr/bin/env python3
"""
Create Filtered Views for Ultimate Tasks
Creates 49 personalized views (7 team members × 7 view types)
"""

import sys
import json
import time
from ve_notion_client import NotionDashboardClient

# Team members
TEAM_MEMBERS = [
    "Dr. Saylor",
    "Dr. Zach",
    "Dr. John",
    "Lou Ann",
    "Christina",
    "Tricia",
    "Wendy"
]


def create_task_views_for_member(client: NotionDashboardClient, tasks_db_id: str, 
                                  member_name: str, dry_run: bool = False) -> int:
    """Create 5 task views for one team member."""
    views_created = 0
    
    views = [
        {
            "name": f"My Tasks-{member_name}",
            "type": "table",
            "filter": {
                "property": "Assignee",
                "select": {"equals": member_name}
            },
            "sorts": [
                {"property": "Priority", "direction": "descending"},
                {"property": "Due Date", "direction": "ascending"}
            ]
        },
        {
            "name": f"My Today-{member_name}",
            "type": "table",
            "filter": {
                "and": [
                    {"property": "Assignee", "select": {"equals": member_name}},
                    {"property": "Due Date", "date": {"equals": {"type": "today"}}}
                ]
            },
            "sorts": [
                {"property": "Priority", "direction": "descending"}
            ]
        },
        {
            "name": f"My Week-{member_name}",
            "type": "table",
            "filter": {
                "and": [
                    {"property": "Assignee", "select": {"equals": member_name}},
                    {"property": "Due Date", "date": {"next_week": {}}}
                ]
            },
            "sorts": [
                {"property": "Due Date", "direction": "ascending"},
                {"property": "Priority", "direction": "descending"}
            ]
        },
        {
            "name": f"My Overdue-{member_name}",
            "type": "table",
            "filter": {
                "and": [
                    {"property": "Assignee", "select": {"equals": member_name}},
                    {"property": "Status", "select": {"does_not_equal": "Done"}},
                    {"property": "Due Date", "date": {"before": {"type": "today"}}}
                ]
            },
            "sorts": [
                {"property": "Due Date", "direction": "ascending"}
            ]
        },
        {
            "name": f"My In Progress-{member_name}",
            "type": "table",
            "filter": {
                "and": [
                    {"property": "Assignee", "select": {"equals": member_name}},
                    {"property": "Status", "select": {"equals": "In Progress"}}
                ]
            },
            "sorts": [
                {"property": "Priority", "direction": "descending"},
                {"property": "Due Date", "direction": "ascending"}
            ]
        }
    ]
    
    for view in views:
        if dry_run:
            print(f"  [DRY-RUN] Would create: {view['name']}")
        else:
            try:
                # Note: Notion API doesn't directly support creating named views via API
                # This is a limitation - views must be created manually in Notion UI
                # This script documents what views should be created
                print(f"  ⚠️  Manual creation needed: {view['name']}")
                print(f"      Filter: Assignee = {member_name}")
                sorts_str = ', '.join([f"{s['property']} {s['direction']}" for s in view['sorts']])
                print(f"      Sorts: {sorts_str}")
            except Exception as e:
                print(f"  ✗ Error creating {view['name']}: {e}")
                continue
        
        views_created += 1
        time.sleep(0.1)  # Rate limiting
    
    return views_created


def create_project_view_for_member(client: NotionDashboardClient, projects_db_id: str,
                                     member_name: str, dry_run: bool = False) -> int:
    """Create 1 project view for one team member."""
    view_name = f"My Projects-{member_name}"
    
    if dry_run:
        print(f"  [DRY-RUN] Would create: {view_name}")
    else:
        print(f"  ⚠️  Manual creation needed: {view_name}")
        print(f"      Filter: Team Members contains {member_name}")
    
    return 1


def create_event_view_for_member(client: NotionDashboardClient, events_db_id: str,
                                   member_name: str, dry_run: bool = False) -> int:
    """Create 1 event view for one team member."""
    view_name = f"My Events-{member_name}"
    
    if dry_run:
        print(f"  [DRY-RUN] Would create: {view_name}")
    else:
        print(f"  ⚠️  Manual creation needed: {view_name}")
        print(f"      Filter: Attendees contains {member_name}")
    
    return 1


def generate_view_creation_guide(output_file: str = "VIEW_CREATION_GUIDE.md"):
    """Generate detailed guide for manually creating views in Notion."""
    guide = """# View Creation Guide - Manual Steps Required

## ⚠️ Notion API Limitation

The Notion API **does not support creating named database views programmatically**. 
All 49 filtered views must be created manually in the Notion UI.

This guide provides step-by-step instructions for each view.

---

## Views to Create

### Tasks [UT] Database (35 views total)

For EACH team member, create these 5 views:

"""
    
    for member in TEAM_MEMBERS:
        guide += f"\n#### {member}'s Task Views\n\n"
        
        guide += f"**1. My Tasks-{member}**\n"
        guide += f"- View type: Table\n"
        guide += f"- Filter: Assignee = {member}\n"
        guide += f"- Sort: Priority (descending), Due Date (ascending)\n"
        guide += f"- Columns: Name, Status, Due Date, Priority, Project\n\n"
        
        guide += f"**2. My Today-{member}**\n"
        guide += f"- View type: Table\n"
        guide += f"- Filter: Assignee = {member} AND Due Date = Today\n"
        guide += f"- Sort: Priority (descending)\n"
        guide += f"- Columns: Name, Status, Priority, Due Date, Project\n\n"
        
        guide += f"**3. My Week-{member}**\n"
        guide += f"- View type: Table\n"
        guide += f"- Filter: Assignee = {member} AND Due Date = Next 7 days\n"
        guide += f"- Sort: Due Date (ascending), Priority (descending)\n"
        guide += f"- Columns: Name, Status, Due Date, Priority, Project\n\n"
        
        guide += f"**4. My Overdue-{member}**\n"
        guide += f"- View type: Table\n"
        guide += f"- Filter: Assignee = {member} AND Status ≠ Done AND Due Date < Today\n"
        guide += f"- Sort: Due Date (ascending)\n"
        guide += f"- Columns: Name, Status, Due Date, Priority, Project\n\n"
        
        guide += f"**5. My In Progress-{member}**\n"
        guide += f"- View type: Table\n"
        guide += f"- Filter: Assignee = {member} AND Status = In Progress\n"
        guide += f"- Sort: Priority (descending), Due Date (ascending)\n"
        guide += f"- Columns: Name, Status, Due Date, Priority, Project\n\n"
    
    guide += "\n---\n\n### Projects [UT] Database (7 views total)\n\n"
    
    for member in TEAM_MEMBERS:
        guide += f"**My Projects-{member}**\n"
        guide += f"- View type: Table\n"
        guide += f"- Filter: Team Members contains {member}\n"
        guide += f"- Sort: Status (custom order)\n"
        guide += f"- Columns: Name, Status, Team Members, Start Date, End Date\n\n"
    
    guide += "\n---\n\n### Events [UT] Database (7 views total)\n\n"
    
    for member in TEAM_MEMBERS:
        guide += f"**My Events-{member}**\n"
        guide += f"- View type: List\n"
        guide += f"- Filter: Attendees contains {member}\n"
        guide += f"- Sort: Date (ascending)\n"
        guide += f"- Columns: Name, Date, Type, Location\n\n"
    
    guide += """
---

## How to Create a View in Notion

1. Open the database (Tasks [UT], Projects [UT], or Events [UT])
2. Click "+ New view" button at top left
3. Choose view type (Table or List)
4. Name the view (e.g., "My Tasks-Dr. Saylor")
5. Click "Filter" → Add filter conditions as specified above
6. Click "Sort" → Add sort rules as specified above
7. Click "Properties" → Show/hide columns as specified above
8. Save the view

---

## Time Estimate

- **Per view:** 2-3 minutes
- **Tasks views:** 35 views × 2.5 min = ~90 minutes
- **Projects views:** 7 views × 2.5 min = ~18 minutes
- **Events views:** 7 views × 2.5 min = ~18 minutes

**Total:** ~2 hours of manual work

---

## Tips to Work Faster

1. Create all views for one team member first, then duplicate and modify
2. Use Notion's "Duplicate view" feature when possible
3. Batch similar work (all "My Tasks" views, then all "My Today" views, etc.)
4. Test the first view thoroughly before creating the rest

---

## Verification Checklist

After creating all views:

- [ ] Tasks [UT] has 35 + 4 default views = 39 total views
- [ ] Projects [UT] has 7 + 2 default views = 9 total views
- [ ] Events [UT] has 7 + 3 default views = 10 total views
- [ ] Test: Open "My Tasks-Dr. Saylor" → only Dr. Saylor's tasks appear
- [ ] Test: Open "My Events-Lou Ann" → only Lou Ann's events appear
- [ ] All filters working correctly
- [ ] All sorts working correctly
"""
    
    with open(output_file, 'w') as f:
        f.write(guide)
    
    print(f"\n📄 Generated: {output_file}")
    print(f"   This file contains detailed instructions for creating all 49 views manually.")


def main():
    """Main entry point."""
    dry_run = '--dry-run' in sys.argv
    
    print("""
╔══════════════════════════════════════════════════════════╗
║  CREATE FILTERED VIEWS FOR ULTIMATE TASKS               ║
║  49 personalized views (7 members × 7 view types)       ║
╚══════════════════════════════════════════════════════════╝
    """)
    
    if dry_run:
        print("🔍 DRY-RUN MODE - No changes will be made\n")
    
    try:
        client = NotionDashboardClient()
        
        # Load database IDs from config
        with open('config.json', 'r') as f:
            config = json.load(f)
        
        if 'ultimate_tasks_databases' not in config:
            print("✗ Error: Ultimate Tasks databases not found in config.json")
            print("   Run: python setup_ultimate_tasks_databases.py first")
            return 1
        
        tasks_db_id = config['ultimate_tasks_databases']['tasks']
        projects_db_id = config['ultimate_tasks_databases']['projects']
        events_db_id = config['ultimate_tasks_databases']['events']
        
        print(f"📊 Databases:")
        print(f"   Tasks [UT]: {tasks_db_id}")
        print(f"   Projects [UT]: {projects_db_id}")
        print(f"   Events [UT]: {events_db_id}\n")
        
        # Generate view creation guide
        print("📋 Generating view creation guide...")
        generate_view_creation_guide()
        
        print("""
╔══════════════════════════════════════════════════════════╗
║  ⚠️  NOTION API LIMITATION NOTICE                        ║
╚══════════════════════════════════════════════════════════╝

The Notion API does not support creating named database views.

All 49 filtered views must be created MANUALLY in Notion:
- 35 task views (5 per team member)
- 7 project views (1 per team member)
- 7 event views (1 per team member)

📄 See VIEW_CREATION_GUIDE.md for detailed step-by-step instructions.

⏱️  Estimated time: ~2 hours

💡 Tip: Use Notion's "Duplicate view" feature to work faster!
        """)
        
        return 0
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return 1


if __name__ == "__main__":
    exit(main())

