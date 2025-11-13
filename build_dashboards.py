#!/usr/bin/env python3
"""
Build Individual Team Member Dashboards
Completes Phase 3 of the Mastermind Dashboard project
"""

import json
import sys
from typing import List, Dict, Any
from ve_notion_client import NotionDashboardClient
from dashboard_blocks import DashboardBlockBuilder


class DashboardBuilder:
    """Build individual dashboards for all team members."""

    def __init__(self):
        """Initialize the dashboard builder."""
        self.client = NotionDashboardClient()
        self.builder = DashboardBlockBuilder()

        # Load team members from config
        with open('config.json', 'r') as f:
            config = json.load(f)
            self.team_members = config['team_members']

    def read_prototype_structure(self):
        """Read Dr. Zach's prototype to understand the structure."""
        print("\n📖 Reading Dr. Zach's prototype dashboard...")
        try:
            prototype_id = self.client.config['notion_pages']['dr_zach_prototype']
            blocks = self.client.get_block_children(prototype_id)

            print(f"✓ Found {len(blocks)} blocks in prototype")
            print("\nPrototype Structure:")
            for i, block in enumerate(blocks[:10]):  # Show first 10 blocks
                block_type = block.get('type', 'unknown')
                print(f"  {i+1}. {block_type}")

            return blocks
        except Exception as e:
            print(f"✗ Error reading prototype: {e}")
            return []

    def build_dashboard(self, member: Dict[str, Any], clear_existing: bool = False) -> bool:
        """
        Build a dashboard for a team member.

        Args:
            member: Team member dictionary with name, role, dashboard_id, icon
            clear_existing: Whether to clear existing content first

        Returns:
            True if successful, False otherwise
        """
        try:
            name = member['name']
            dashboard_id = member['dashboard_id']
            icon = member.get('icon', '👤')

            print(f"\n🔨 Building dashboard for {name}...")

            # Update page title and icon
            print(f"  → Setting page title and icon...")
            self.client.update_page(
                page_id=dashboard_id,
                properties={
                    "title": {
                        "title": [{
                            "text": {"content": f"{name}'s Dashboard"}
                        }]
                    }
                },
                icon={
                    "type": "emoji",
                    "emoji": icon
                }
            )

            # Clear existing blocks if requested
            if clear_existing:
                print(f"  → Clearing existing content...")
                self.client.delete_all_blocks(dashboard_id)

            # Build dashboard blocks
            print(f"  → Generating dashboard structure...")
            blocks = self.builder.build_dashboard_structure(name, icon)

            # Notion API has a limit on blocks per request (100)
            # So we need to batch the blocks
            batch_size = 100
            for i in range(0, len(blocks), batch_size):
                batch = blocks[i:i + batch_size]
                print(f"  → Adding blocks {i+1} to {min(i+batch_size, len(blocks))}...")
                self.client.append_blocks(dashboard_id, batch)

            print(f"✓ Successfully built dashboard for {name}")
            return True

        except Exception as e:
            print(f"✗ Error building dashboard for {name}: {e}")
            return False

    def build_all_dashboards(self, skip_dr_zach: bool = True, clear_existing: bool = False):
        """
        Build dashboards for all team members.

        Args:
            skip_dr_zach: Skip Dr. Zach since his prototype is already done
            clear_existing: Whether to clear existing content first
        """
        print("\n" + "="*60)
        print("BUILDING INDIVIDUAL DASHBOARDS - PHASE 3")
        print("="*60)

        # Filter team members
        members_to_build = [
            m for m in self.team_members
            if not (skip_dr_zach and m['name'] == 'Dr. Zach')
        ]

        print(f"\nBuilding {len(members_to_build)} dashboards...")

        results = []
        for member in members_to_build:
            success = self.build_dashboard(member, clear_existing)
            results.append({
                'name': member['name'],
                'success': success
            })

        # Print summary
        print("\n" + "="*60)
        print("SUMMARY")
        print("="*60)

        successful = [r for r in results if r['success']]
        failed = [r for r in results if not r['success']]

        print(f"\n✓ Successful: {len(successful)}/{len(results)}")
        for r in successful:
            print(f"  • {r['name']}")

        if failed:
            print(f"\n✗ Failed: {len(failed)}/{len(results)}")
            for r in failed:
                print(f"  • {r['name']}")

        return len(failed) == 0

    def verify_dashboards(self):
        """Verify all dashboards were created successfully."""
        print("\n🔍 Verifying dashboards...")

        for member in self.team_members:
            try:
                page = self.client.get_page(member['dashboard_id'])
                title = page.get('properties', {}).get('title', {})
                print(f"✓ {member['name']}: Dashboard exists")
            except Exception as e:
                print(f"✗ {member['name']}: Error - {e}")


def main():
    """Main entry point."""
    print("""
╔══════════════════════════════════════════════════════════╗
║  VAN EVERY CHIROPRACTIC MASTERMIND DASHBOARD BUILDER     ║
║  Phase 3: Individual Dashboard Creation                  ║
╚══════════════════════════════════════════════════════════╝
    """)

    # Check for command line arguments
    clear_existing = '--clear' in sys.argv
    skip_dr_zach = '--include-dr-zach' not in sys.argv

    if clear_existing:
        print("⚠️  WARNING: This will CLEAR all existing content from dashboards!")
        response = input("Are you sure you want to continue? (yes/no): ")
        if response.lower() != 'yes':
            print("Aborted.")
            return

    try:
        builder = DashboardBuilder()

        # Read prototype structure first
        builder.read_prototype_structure()

        # Build all dashboards
        success = builder.build_all_dashboards(
            skip_dr_zach=skip_dr_zach,
            clear_existing=clear_existing
        )

        # Verify dashboards
        builder.verify_dashboards()

        if success:
            print("\n✅ All dashboards built successfully!")
            print("\n📝 Next Steps:")
            print("   1. Visit each dashboard in Notion")
            print("   2. Add linked database views manually (API limitation)")
            print("   3. Customize the 'Today's Focus' priorities")
            print("   4. Update the Project Tracker to mark Phase 3 complete")
        else:
            print("\n⚠️  Some dashboards failed. Please check errors above.")
            sys.exit(1)

    except Exception as e:
        print(f"\n✗ Fatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
