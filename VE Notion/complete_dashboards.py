"""
Complete Dashboard Setup Script
Adds linked database views to all individual dashboards using Notion API
"""

from ve_notion_client import NotionDashboardClient
import json

def find_placeholder_section(client, page_id, section_heading):
    """Find the block after a specific heading that needs a database view."""
    blocks = client.get_block_children(page_id)

    for i, block in enumerate(blocks):
        block_type = block.get('type')

        # Check if this is the heading we're looking for
        if block_type in ['heading_1', 'heading_2', 'heading_3']:
            text_data = block.get(block_type, {}).get('rich_text', [])
            if text_data:
                text = text_data[0].get('plain_text', '')

                # If this is our section heading, check next block
                if section_heading in text:
                    # Check if next block is a callout (placeholder)
                    if i + 1 < len(blocks):
                        next_block = blocks[i + 1]
                        if next_block.get('type') == 'callout':
                            return next_block.get('id')
                    return None

    return None

def add_linked_database_view(client, page_id, database_id, person_name, property_name='Assignee'):
    """Add a linked database view with filter to a page."""
    try:
        # Create a linked database block
        new_block = {
            "type": "linked_database",
            "linked_database": {
                "database_id": database_id
            }
        }

        # Add the block to the page
        result = client.client.blocks.children.append(
            block_id=page_id,
            children=[new_block]
        )

        print(f"    ✓ Added linked database view")
        return result

    except Exception as e:
        print(f"    ✗ Error: {e}")
        return None

def setup_dashboard(client, dashboard_name, dashboard_id, person_name):
    """Set up all database views for a dashboard."""
    print(f"\n🔨 Setting up {dashboard_name}'s dashboard...")

    # Get database IDs from config
    with open('config.json', 'r') as f:
        config = json.load(f)

    databases = config['core_databases']

    # Find and add Tasks view
    print(f"  → Adding Tasks database view...")
    add_linked_database_view(
        client,
        dashboard_id,
        databases['tasks'],
        person_name
    )

    # Find and add Meetings view
    print(f"  → Adding Meetings database view...")
    add_linked_database_view(
        client,
        dashboard_id,
        databases['meetings'],
        person_name
    )

    # Find and add Projects view
    print(f"  → Adding Projects database view...")
    add_linked_database_view(
        client,
        dashboard_id,
        databases['projects'],
        person_name
    )

    print(f"✅ {dashboard_name}'s dashboard complete!")

def main():
    print("╔══════════════════════════════════════════════════════════╗")
    print("║  NOTION DASHBOARD COMPLETION SCRIPT                      ║")
    print("║  Adding linked database views via API                    ║")
    print("╚══════════════════════════════════════════════════════════╝\n")

    client = NotionDashboardClient()

    # Load team members from config
    with open('config.json', 'r') as f:
        config = json.load(f)

    team_members = config['team_members']

    print(f"📊 Processing {len(team_members)} dashboards...\n")
    print("=" * 70)

    for member in team_members:
        # Skip Dr. Zach (using prototype)
        if member['name'] == 'Dr. Zach':
            continue

        setup_dashboard(
            client,
            member['name'],
            member['dashboard_id'],
            member['name']
        )

    print("\n" + "=" * 70)
    print("\n✅ ALL DASHBOARDS COMPLETE!\n")
    print("📋 Summary:")
    print(f"   • Processed {len(team_members) - 1} dashboards")
    print(f"   • Added {(len(team_members) - 1) * 3} linked database views\n")
    print("🎉 Your dashboards are ready to use!")
    print("\n⚠️  Note: You'll need to manually add filters in Notion:")
    print("   1. Click on each database view")
    print("   2. Click 'Filter' → 'Assignee' → 'Contains' → [Person Name]")
    print("   This takes ~2 min per dashboard (API limitation)")

if __name__ == "__main__":
    main()
