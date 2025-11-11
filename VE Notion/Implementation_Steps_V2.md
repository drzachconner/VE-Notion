# Implementation Steps for V2 Structure

## Overview
This guide will help you update from the individual-based system to the role-based system with advanced features.

**Time Required:** 30-45 minutes

---

## PHASE 1: Update Column Structure (15 mins)

### Step 1: Update Column Headers in Tasks Sheet

1. Open your **Tasks** sheet
2. Update these column headers:

| OLD Header | NEW Header | Column |
|------------|------------|--------|
| Team Member | Assigned To | C |
| Created Date | Assigned Date | (will move later) |
| - | Recurrence Frequency | M (new column) |

3. **Right-click column C header** → Rename to "Assigned To"
4. **Right-click column N header** → Rename to "Assigned Date"

### Step 2: Reorder Columns

**Target Order:**
- A: Task ID
- B: Task Name
- C: Assigned To
- D: Assigned Date (move from N)
- E: Due Date
- F: Completed Date (move from O)
- G: Priority
- H: Status
- I: Related Project
- J: Tags
- K: Type
- L: Recurring
- M: Recurrence Frequency (NEW - insert blank column)
- N: Time Estimate (hrs)
- O: Notes
- P: Slack Thread URL
- Q: Notion URL

**How to reorder:**
1. Select **column N** (Assigned Date) → Right-click → Cut
2. Right-click **column D** header → Insert 1 left
3. Paste the cut column
4. Select **column O** (Completed Date) → Cut
5. Right-click **column F** header → Insert 1 left
6. Paste

**Add new column:**
7. Right-click **column M** → Insert 1 right
8. Name it "Recurrence Frequency"

### Step 3: Update Team Members Sheet

**OPTION A: Replace with Roles (Recommended)**
1. Go to **Team Members** sheet
2. Delete all individual names (rows 2-8)
3. Add new rows:
   ```
   Billing
   Front Desk
   Doctors
   Chiro Assistant
   Anyone
   ```

**OPTION B: Keep Both (if you need person tracking elsewhere)**
1. Rename sheet to "Team Members (Individuals)"
2. Create new sheet: "Assignment Roles"
3. Add the 5 roles above
4. Update scripts to reference "Assignment Roles" instead

---

## PHASE 2: Run Updated Apps Script (5 mins)

### Step 1: Install Updated Script

1. **Extensions → Apps Script**
2. **Delete all existing code** in the editor
3. **Open file:** `Updated_Apps_Script_V2.js`
4. **Copy all code** and paste into Apps Script editor
5. **Click Save** (💾 icon)
6. Name the project: "VE Command Center V2"

### Step 2: Run Setup Function

1. In the function dropdown (top), select: `setupAllDataValidation`
2. **Click Run** (▶️ button)
3. **Authorize** when prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to VE Command Center V2 (unsafe)"
   - Click "Allow"
4. Wait 30-60 seconds for completion
5. You'll see: "✅ Success! All data validation rules have been set up..."

### Step 3: Set Up Recurring Tasks Automation

1. In function dropdown, select: `setupRecurringTasksTrigger`
2. **Click Run** (▶️ button)
3. You'll see: "✅ Recurring tasks trigger set up!"
4. Verify trigger:
   - Click **Triggers** icon (⏰ left sidebar)
   - Should see: `processRecurringTasks` runs daily at midnight

---

## PHASE 3: Test New Features (10 mins)

### Test 1: Role-Based Assignment

1. Go to **Tasks** sheet
2. Click any cell in **column C** (Assigned To)
3. Should see dropdown with:
   - Billing
   - Front Desk
   - Doctors
   - Chiro Assistant
   - Anyone
4. ✅ Select "Doctors"

### Test 2: Dynamic Projects

1. Click any cell in **column I** (Related Project)
2. Dropdown shows existing projects
3. **Type a NEW project name:** "Test New Project"
4. Press Enter
5. Go to **Projects** sheet
6. ✅ Should see "Test New Project" automatically added

### Test 3: Tags

1. Click cell in **column J** (Tags)
2. Type: `Clinical, Urgent, Follow-up`
3. Press Enter
4. Go to **Tags** sheet (should be auto-created)
5. ✅ Should see starter tags listed

### Test 4: Recurring Tasks

1. Create a test task:
   - Task Name: "Weekly Test"
   - Recurring: Yes
   - Recurrence Frequency: Weekly
   - Due Date: Today
   - Status: Done
2. **Tomorrow**, check if new instance was created
3. ✅ Should see duplicate task with Due Date = +7 days

### Test 5: Auto-Dates

1. Create new task
2. **Assigned To:** Select "Front Desk"
3. ✅ **Assigned Date** should auto-populate with today
4. Change **Status** to "Done"
5. ✅ **Completed Date** should auto-populate

---

## PHASE 4: Update Projects & Events Sheets (5 mins)

### Projects Sheet

1. Update **column C header** to match: "Owner"
2. Test dropdown - should show roles (Billing, Front Desk, etc.)

### Events and Meetings Sheet

- No changes needed! ✅

---

## PHASE 5: Clean Up Sample Data (5 mins)

### Option A: Keep Sample Data (Recommended for testing)
- Leave the 3 sample tasks
- Use them to test all features
- Delete later when you add real tasks

### Option B: Clear Sample Data Now
1. Select **rows 2-4** in Tasks sheet
2. Right-click → Delete rows 2-4
3. Your sheet is now empty and ready for real data

---

## PHASE 6: Update Notion to Match (Later)

**After Google Sheets is working**, update Notion:

### Changes Needed in Notion:

1. **Team Work Hub database:**
   - Rename "Team Member" property to "Assigned To"
   - Change from "Person" type to "Select" type
   - Add options: Billing, Front Desk, Doctors, Chiro Assistant, Anyone
   - Rename "Created Date" to "Assigned Date"
   - Add "Recurrence Frequency" Select property
   - Remove "Meeting" from Type options

2. **Test sync** to ensure N8N handles new structure

---

## Verification Checklist

After completing all phases:

- ✅ Tasks sheet has new column order
- ✅ Assigned To shows role options (not people)
- ✅ New columns exist: Assigned Date, Recurrence Frequency
- ✅ Dropdowns work for all columns
- ✅ Dynamic projects auto-create when typed
- ✅ Tags sheet exists with starter tags
- ✅ Auto-dates populate correctly
- ✅ Recurring tasks trigger is set up
- ✅ Projects sheet shows role options
- ✅ Events sheet unchanged

---

## Troubleshooting

### Dropdowns don't appear
- Click directly IN a cell (not just select it)
- Check Data → Data validation shows rules

### Dynamic projects don't auto-create
- Check **Triggers** icon - should see `onEdit` trigger
- If missing, run `setupDynamicDropdownTriggers()` function

### Recurring tasks not creating
- Check **Triggers** icon - should see `processRecurringTasks` daily trigger
- Manually run `processRecurringTasks()` to test
- Check execution log for errors

### Column reorder is confusing
- **EASIER METHOD:** Just update the headers for now
- Use the existing column positions
- Reorder later when comfortable

---

## Next Steps

After V2 structure is working:

1. ✅ Update N8N workflows to match new column structure
2. ✅ Update Notion database properties
3. ✅ Test full sync: Google Sheets ↔ Notion ↔ Slack
4. ✅ Train team on new role-based system
5. ✅ Import real tasks and projects

---

## Need Help?

If you get stuck:
1. Check the **Execution log** in Apps Script (View → Logs)
2. Check **Triggers** are set up correctly
3. Test one feature at a time
4. Ask me - I can help troubleshoot!
