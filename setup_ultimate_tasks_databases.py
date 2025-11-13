#!/usr/bin/env python3
"""
Setup Ultimate Tasks Databases
Creates Tasks [UT], Projects [UT], and Events [UT] databases in Notion workspace
"""

import json
from ve_notion_client import NotionDashboardClient

# Team members for multi-select options
TEAM_MEMBERS = [
    "Dr. Saylor",
    "Dr. Zach",
    "Dr. John",
    "Lou Ann",
    "Christina",
    "Tricia",
    "Wendy"
]


def create_tasks_database(client: NotionDashboardClient, parent_page_id: str) -> str:
    """Create Tasks [UT] database with all properties."""
    print("Creating Tasks [UT] database...")
    
    properties = {
        "Name": {"title": {}},
        "Status": {
            "select": {
                "options": [
                    {"name": "To Do", "color": "gray"},
                    {"name": "In Progress", "color": "blue"},
                    {"name": "Done", "color": "green"},
                    {"name": "Cancelled", "color": "red"}
                ]
            }
        },
        "Assignee": {
            "select": {
                "options": [{"name": name, "color": "default"} for name in TEAM_MEMBERS]
            }
        },
        "Due Date": {"date": {}},
        "Priority": {
            "select": {
                "options": [
                    {"name": "Low", "color": "gray"},
                    {"name": "Medium", "color": "yellow"},
                    {"name": "High", "color": "orange"},
                    {"name": "Urgent", "color": "red"}
                ]
            }
        },
        "Tags": {"multi_select": {"options": []}},
        "Description": {"rich_text": {}}
    }
    
    response = client.client.databases.create(
        parent={"page_id": parent_page_id},
        title=[{"type": "text", "text": {"content": "Tasks [UT]"}}],
        properties=properties
    )
    
    database_id = response['id']
    print(f"✓ Created Tasks [UT] database: {database_id}")
    return database_id


def create_projects_database(client: NotionDashboardClient, parent_page_id: str, tasks_db_id: str) -> str:
    """Create Projects [UT] database with all properties."""
    print("Creating Projects [UT] database...")
    
    properties = {
        "Name": {"title": {}},
        "Status": {
            "select": {
                "options": [
                    {"name": "Not Started", "color": "gray"},
                    {"name": "Active", "color": "blue"},
                    {"name": "On Hold", "color": "yellow"},
                    {"name": "Done", "color": "green"}
                ]
            }
        },
        "Team Members": {
            "multi_select": {
                "options": [{"name": name, "color": "default"} for name in TEAM_MEMBERS]
            }
        },
        "Start Date": {"date": {}},
        "End Date": {"date": {}},
        "Description": {"rich_text": {}},
        "Related Tasks": {
            "relation": {
                "database_id": tasks_db_id,
                "type": "dual_property",
                "dual_property": {"synced_property_name": "Project"}
            }
        }
    }
    
    response = client.client.databases.create(
        parent={"page_id": parent_page_id},
        title=[{"type": "text", "text": {"content": "Projects [UT]"}}],
        properties=properties
    )
    
    database_id = response['id']
    print(f"✓ Created Projects [UT] database: {database_id}")
    return database_id


def update_tasks_with_project_relation(client: NotionDashboardClient, tasks_db_id: str, projects_db_id: str):
    """Add Project relation property to Tasks database."""
    print("Adding Project relation to Tasks [UT]...")
    
    client.client.databases.update(
        database_id=tasks_db_id,
        properties={
            "Project": {
                "relation": {
                    "database_id": projects_db_id,
                    "type": "dual_property",
                    "dual_property": {"synced_property_name": "Related Tasks"}
                }
            }
        }
    )
    
    print("✓ Added Project relation to Tasks [UT]")


def create_events_database(client: NotionDashboardClient, parent_page_id: str) -> str:
    """Create Events [UT] database with all properties."""
    print("Creating Events [UT] database...")
    
    properties = {
        "Name": {"title": {}},
        "Date": {"date": {}},
        "Attendees": {
            "multi_select": {
                "options": [{"name": name, "color": "default"} for name in TEAM_MEMBERS]
            }
        },
        "Type": {
            "select": {
                "options": [
                    {"name": "Meeting", "color": "blue"},
                    {"name": "Training", "color": "purple"},
                    {"name": "Event", "color": "green"},
                    {"name": "Other", "color": "gray"}
                ]
            }
        },
        "Location": {"rich_text": {}},
        "Description": {"rich_text": {}}
    }
    
    response = client.client.databases.create(
        parent={"page_id": parent_page_id},
        title=[{"type": "text", "text": {"content": "Events [UT]"}}],
        properties=properties
    )
    
    database_id = response['id']
    print(f"✓ Created Events [UT] database: {database_id}")
    return database_id


def update_config_file(tasks_id: str, projects_id: str, events_id: str):
    """Update config.json with new database IDs."""
    print("\nUpdating config.json...")
    
    with open('config.json', 'r') as f:
        config = json.load(f)
    
    # Add Ultimate Tasks database IDs
    config['ultimate_tasks_databases'] = {
        'tasks': tasks_id,
        'projects': projects_id,
        'events': events_id
    }
    
    with open('config.json', 'w') as f:
        json.dump(config, f, indent=2)
    
    print("✓ Updated config.json with Ultimate Tasks database IDs")


def main():
    """Main setup function."""
    print("""
╔══════════════════════════════════════════════════════════╗
║  ULTIMATE TASKS DATABASE SETUP                           ║
║  Creating Tasks [UT], Projects [UT], Events [UT]        ║
╚══════════════════════════════════════════════════════════╝
    """)
    
    try:
        client = NotionDashboardClient()
        
        # Get parent page ID from config
        parent_page_id = client.config['notion_pages']['main_template']
        
        print(f"Parent page: {parent_page_id}\n")
        
        # Create databases in order
        tasks_id = create_tasks_database(client, parent_page_id)
        projects_id = create_projects_database(client, parent_page_id, tasks_id)
        update_tasks_with_project_relation(client, tasks_id, projects_id)
        events_id = create_events_database(client, parent_page_id)
        
        # Update config file
        update_config_file(tasks_id, projects_id, events_id)
        
        print("""
╔══════════════════════════════════════════════════════════╗
║  ✅ SUCCESS - All databases created                      ║
╚══════════════════════════════════════════════════════════╝

📊 Created Databases:
   • Tasks [UT]: {tasks_id}
   • Projects [UT]: {projects_id}
   • Events [UT]: {events_id}

📝 Next Steps:
   1. Verify databases appear in your Notion workspace
   2. Run: python create_filtered_views.py --dry-run
   3. Review the preview of views to be created
   4. Run: python create_filtered_views.py (without --dry-run)
        """.format(tasks_id=tasks_id, projects_id=projects_id, events_id=events_id))
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("\nTroubleshooting:")
        print("  1. Verify your .env file contains NOTION_API_KEY")
        print("  2. Check that main_template page ID is correct in config.json")
        print("  3. Ensure your integration has access to the parent page")
        return 1
    
    return 0


if __name__ == "__main__":
    exit(main())

