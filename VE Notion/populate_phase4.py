from notion_client import Client
import os
from dotenv import load_dotenv
import sys
sys.path.insert(0, os.getcwd())
from phase4_builder import Phase4Builder

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

# Read phase 4 page IDs
page_ids = {}
with open('phase4_page_ids.txt', 'r') as f:
    lines = f.readlines()
    for i in range(0, len(lines), 4):
        if i+1 < len(lines):
            title = lines[i].strip()
            page_id = lines[i+1].replace('ID: ', '').strip()
            page_ids[title] = page_id

print("Populating Phase 4 pages with content...\n")

builder = Phase4Builder()

# Generate blocks for each page
pages_content = {
    "📊 Practice Performance Dashboard": builder.create_practice_performance_blocks(),
    "📚 Clinical Resources Hub": builder.create_clinical_resources_blocks(),
    "🎯 TTC Technique Database": builder.create_ttc_technique_blocks(),
    "🎓 Continuing Education Tracker": builder.create_ce_tracker_blocks(),
    "📋 License Renewal Tracker": builder.create_license_renewal_blocks(),
    "🔧 Equipment Maintenance Log": builder.create_equipment_maintenance_blocks()
}

for title, blocks in pages_content.items():
    if title in page_ids:
        page_id = page_ids[title]
        print(f"Adding content to {title}...")
        
        try:
            # Add blocks in batches of 100
            batch_size = 100
            for i in range(0, len(blocks), batch_size):
                batch = blocks[i:i + batch_size]
                client.blocks.children.append(block_id=page_id, children=batch)
            
            print(f"  ✓ Added {len(blocks)} blocks\n")
        except Exception as e:
            print(f"  ✗ Error: {e}\n")

print("✅ Phase 4 pages populated!")
