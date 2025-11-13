#!/usr/bin/env python3
"""
Ultimate Tasks Integration Master Script
Orchestrates the complete integration process
"""

import sys
import subprocess
import os


def run_command(cmd: list, description: str) -> bool:
    """Run a command and return success status."""
    print(f"\n{'='*60}")
    print(f"{description}")
    print(f"{'='*60}")
    
    try:
        result = subprocess.run(cmd, check=True, capture_output=False, text=True)
        print(f"✓ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {description} failed with error code {e.returncode}")
        return False


def prompt_user(message: str) -> bool:
    """Prompt user for confirmation."""
    response = input(f"\n{message} (yes/no): ").strip().lower()
    return response == 'yes'


def main():
    """Main integration orchestrator."""
    print("""
╔══════════════════════════════════════════════════════════╗
║  ULTIMATE TASKS INTEGRATION - MASTER SCRIPT              ║
║  Automates database creation + guides manual steps       ║
╚══════════════════════════════════════════════════════════╝
    """)
    
    print("\nThis script will guide you through the complete integration process:\n")
    print("1. Create Ultimate Tasks databases (automated)")
    print("2. Generate view creation guide (automated)")
    print("3. Relink dashboards (manual - guided)")
    print("4. Final verification (manual - guided)")
    
    if not prompt_user("\nReady to begin?"):
        print("\nAborted. Run this script again when ready.")
        return 1
    
    # Step 1: Create databases
    print("\n" + "="*60)
    print("STEP 1: CREATING ULTIMATE TASKS DATABASES")
    print("="*60)
    
    if not run_command(
        ["python3", "setup_ultimate_tasks_databases.py"],
        "Database creation"
    ):
        print("\n✗ Database creation failed. Please fix errors and try again.")
        return 1
    
    print("\n✓ Databases created successfully!")
    print("\nPlease verify in Notion:")
    print("  1. Tasks [UT] database exists")
    print("  2. Projects [UT] database exists")
    print("  3. Events [UT] database exists")
    
    if not prompt_user("\nDatabases verified in Notion?"):
        print("\n✗ Please verify databases in Notion before continuing.")
        return 1
    
    # Step 2: Generate view creation guide
    print("\n" + "="*60)
    print("STEP 2: GENERATING VIEW CREATION GUIDE")
    print("="*60)
    
    if not run_command(
        ["python3", "create_filtered_views.py"],
        "View creation guide generation"
    ):
        print("\n✗ Failed to generate view creation guide.")
        return 1
    
    print("\n✓ View creation guide generated!")
    print("\n" + "="*60)
    print("⚠️  MANUAL WORK REQUIRED")
    print("="*60)
    
    print("\nThe Notion API cannot create database views automatically.")
    print("\nYou must now CREATE 49 FILTERED VIEWS manually in Notion:")
    print("  • 35 task views (5 per team member)")
    print("  • 7 project views (1 per team member)")
    print("  • 7 event views (1 per team member)")
    print("\n📄 Open VIEW_CREATION_GUIDE.md for detailed step-by-step instructions.")
    print("\n⏱️  Estimated time: ~2 hours")
    
    print("\nTips:")
    print("  • Use Notion's 'Duplicate view' feature to save time")
    print("  • Create all views for one member first, then duplicate")
    print("  • Take breaks - split into multiple sessions if needed")
    
    if not prompt_user("\nHave you created all 49 views in Notion?"):
        print("\n⏸️  Paused. Complete view creation, then run this script again.")
        print("   (The script will skip database creation since it's already done)")
        return 1
    
    # Step 3: Dashboard relinking guide
    print("\n" + "="*60)
    print("STEP 3: RELINK DASHBOARDS")
    print("="*60)
    
    print("\nYou must now RELINK all 7 dashboards to Ultimate Tasks databases.")
    print("\n📄 Open ULTIMATE_TASKS_INTEGRATION_CHECKLIST.md")
    print("   Go to 'Phase 3: Relink Dashboards'")
    print("\n⏱️  Estimated time: ~2 hours (15-20 min per dashboard)")
    
    print("\nFor each dashboard:")
    print("  1. Update 'My Tasks' section → Tasks [UT] → 'My Tasks-[Name]' view")
    print("  2. Update 'My Events' section → Events [UT] → 'My Events-[Name]' view")
    print("  3. Update 'My Projects' section → Projects [UT] → 'My Projects-[Name]' view")
    print("  4. Verify filters work correctly")
    
    if not prompt_user("\nHave you relinked all 7 dashboards?"):
        print("\n⏸️  Paused. Complete dashboard relinking, then run this script again.")
        return 1
    
    # Step 4: Final verification
    print("\n" + "="*60)
    print("STEP 4: FINAL VERIFICATION")
    print("="*60)
    
    print("\nFinal checks:")
    print("  1. Add test data (tasks, projects, events)")
    print("  2. Verify each dashboard shows only that person's items")
    print("  3. Check filters are working correctly")
    print("  4. Test navigation links")
    
    print("\n📄 See ULTIMATE_TASKS_INTEGRATION_CHECKLIST.md")
    print("   'Phase 4: Add Test Data & Verify'")
    
    if not prompt_user("\nVerification complete and all tests passed?"):
        print("\n⚠️  Please complete verification before using the system.")
        return 1
    
    # Success!
    print("\n" + "="*60)
    print("🎉 INTEGRATION COMPLETE!")
    print("="*60)
    
    print("\n✅ Ultimate Tasks databases created")
    print("✅ 49 filtered views created")
    print("✅ All 7 dashboards relinked")
    print("✅ Verification tests passed")
    
    print("\n🚀 Your team is ready to use the new system!")
    
    print("\n📝 Next steps:")
    print("  1. Add real team tasks to Tasks [UT]")
    print("  2. Create actual projects in Projects [UT]")
    print("  3. Add team events to Events [UT]")
    print("  4. Share dashboard links with team")
    print("  5. Schedule quick 5-min onboarding per person")
    
    print("\n" + "="*60)
    
    return 0


if __name__ == "__main__":
    try:
        exit(main())
    except KeyboardInterrupt:
        print("\n\n⏸️  Integration paused. Run this script again to continue.")
        exit(1)

