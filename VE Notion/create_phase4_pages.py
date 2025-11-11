from notion_client import Client
import os
from dotenv import load_dotenv
from dashboard_blocks import DashboardBlockBuilder

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))
builder = DashboardBlockBuilder()

# Get main template page ID
main_template_id = "2a380ff9-d4f5-817b-8a11-eca658f9a815"

# Phase 4 pages to create
phase4_pages = [
    {"title": "📊 Practice Performance Dashboard", "icon": "📊"},
    {"title": "📚 Clinical Resources Hub", "icon": "📚"},
    {"title": "🎯 TTC Technique Database", "icon": "🎯"},
    {"title": "🎓 Continuing Education Tracker", "icon": "🎓"},
    {"title": "📋 License Renewal Tracker", "icon": "📋"},
    {"title": "🔧 Equipment Maintenance Log", "icon": "🔧"}
]

print("Creating Phase 4 pages...\n")

created_pages = []

for page_info in phase4_pages:
    try:
        # Create new page
        new_page = client.pages.create(
            parent={"page_id": main_template_id},
            icon={"type": "emoji", "emoji": page_info["icon"]},
            properties={
                "title": {
                    "title": [{"text": {"content": page_info["title"]}}]
                }
            }
        )
        
        created_pages.append({
            "title": page_info["title"],
            "id": new_page["id"],
            "url": new_page["url"]
        })
        
        print(f"✓ Created: {page_info['title']}")
        print(f"  URL: {new_page['url']}\n")
        
    except Exception as e:
        print(f"✗ Failed to create {page_info['title']}: {e}\n")

print(f"\n✅ Created {len(created_pages)} Phase 4 pages")

# Save page IDs to file
with open('phase4_page_ids.txt', 'w') as f:
    for page in created_pages:
        f.write(f"{page['title']}\n")
        f.write(f"ID: {page['id']}\n")
        f.write(f"URL: {page['url']}\n\n")

print("✓ Page IDs saved to phase4_page_ids.txt")
