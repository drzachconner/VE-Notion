from notion_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

# Find Tasks database
response = client.search(query="Tasks")

tasks_db_id = None
for result in response['results']:
    title = "Untitled"
    if 'properties' in result and 'title' in result['properties']:
        title_prop = result['properties']['title']
        if 'title' in title_prop and title_prop['title']:
            title = title_prop['title'][0].get('plain_text', 'Untitled')
    elif 'title' in result and result['title']:
        title = result['title'][0].get('plain_text', 'Untitled')
    
    if 'task' in title.lower() and result.get('object') in ['database', 'data_source']:
        tasks_db_id = result['id']
        print(f"✓ Found Tasks database: {title}")
        print(f"  ID: {tasks_db_id}\n")
        break

if not tasks_db_id:
    print("✗ Could not find Tasks database")
    exit(1)

# Team member names
team_members = [
    {"name": "Dr. Saylor", "color": "blue"},
    {"name": "Dr. Zach", "color": "blue"},
    {"name": "Dr. John", "color": "blue"},
    {"name": "Lou Ann", "color": "purple"},
    {"name": "Christina", "color": "purple"},
    {"name": "Tricia", "color": "purple"},
    {"name": "Windy", "color": "purple"}
]

print("Updating Tasks database properties...\n")

try:
    # Update database with new properties
    update = {
        "properties": {
            "Assigned To": {
                "select": {
                    "options": [{"name": m["name"], "color": m["color"]} for m in team_members]
                }
            },
            "Completed By": {
                "select": {
                    "options": [{"name": m["name"], "color": m["color"]} for m in team_members]
                }
            },
            "Status": {
                "select": {
                    "options": [
                        {"name": "Not Started", "color": "gray"},
                        {"name": "In Progress", "color": "yellow"},
                        {"name": "Complete", "color": "green"},
                        {"name": "On Hold", "color": "orange"}
                    ]
                }
            }
        }
    }
    
    result = client.databases.update(database_id=tasks_db_id, **update)
    
    print("✅ Updated Tasks database properties:")
    print("   • Assigned To (dropdown with 7 team members)")
    print("   • Completed By (dropdown with 7 team members)")
    print("   • Status (Not Started, In Progress, Complete, On Hold)")
    print("\n✓ Database is ready for use!")
    
except Exception as e:
    print(f"✗ Error updating database: {e}")
    print("\nThis might mean:")
    print("  - Database needs to be shared with integration")
    print("  - Properties already exist with different types")
