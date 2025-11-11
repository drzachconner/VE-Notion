# 🤖 Notion AI Prompts - Command Center Simplification

**Date:** 2025-11-08
**Purpose:** Step-by-step prompts to simplify Van Every Command Center
**Usage:** Copy each prompt and paste into Notion AI, execute in order

---

## 📋 PHASE 1: CLEANUP (Start Here)

### Prompt 1: Simplify Hero Section

```
Simplify the hero section of this page to include ONLY:

1. Page title: "VAN EVERY CHIROPRACTIC COMMAND CENTER" (centered, large heading)
2. Today's date (centered, below title)

Remove:
- Template version numbers
- Team member counts
- Week numbers
- Taglines or quotes
- Any other metadata

Use clean, minimal formatting with divider lines above and below for visual separation.
```

---

### Prompt 2: Create Simple Team Dashboards Section

```
Create a "TEAM DASHBOARDS" section on this page with the following structure:

**Doctors:**
- Link to Dr. Zach's dashboard
- Link to Dr. Saylor's dashboard
- Link to Dr. John's dashboard

**Staff:**
- Link to Lou Ann's dashboard
- Link to Christina's dashboard
- Link to Tricia's dashboard
- Link to Windy's dashboard

Use a simple bulleted list format with appropriate emojis (🩺 for doctors, 📋 for staff).
Do NOT create a database - just simple page links.
```

---

### Prompt 3: Reorganize Main Page Structure

```
Reorganize this page into 3 main sections in this exact order:

1. **PRACTICE METRICS** (📊)
   - Include the DAILY_STATS database view
   - Set default view to table showing last 30 days
   - Sort by date descending (newest first)

2. **TEAM DASHBOARDS** (👥)
   - Simple list of links to individual team member pages
   - Group by: Doctors and Staff

3. **PRACTICE MANAGEMENT** (🏢)
   - Links to: Projects, Goals, Documents, Meetings
   - Use inline links or simple bulleted list

Add clear section dividers between each section.
Remove any nested or wrapper pages - keep navigation flat.
```

---

## 📊 PHASE 2: OPTIMIZE METRICS DISPLAY

### Prompt 4: Configure DAILY_STATS Views

```
Create multiple views for the DAILY_STATS database on this page:

**Default View (Table):**
- Name: "Last 30 Days"
- Filter: Date is within the last 30 days
- Sort: Date descending (newest first)
- Show all columns

**Additional Views (Create as tabs):**
1. "This Week" - Filter: Date is within this week
2. "This Month" - Filter: Date is within this month
3. "This Quarter" - Filter: Date is within this quarter
4. "This Year" - Filter: Date is within this year

Display views as tabs (not dropdown) for easy switching.
```

---

### Prompt 5: Add Key Metrics Summary

```
Above the DAILY_STATS table, create a callout or highlighted section showing:

**KEY METRICS (Today):**
- OVA (Office Visit Average) = Collections ÷ Patient Visits
- PVA (Patient Visit Average) = Patient Visits ÷ New Patients
- CVA (Case Visit Average) = OVA × PVA
- Total Collections
- Total Patient Visits

Pull these values from the most recent entry in DAILY_STATS.
Use a clean, easy-to-scan layout (inline or 2-column).
```

---

## 👤 PHASE 3: INDIVIDUAL DASHBOARD TEMPLATE

### Prompt 6: Create Individual Dashboard Template (Apply to Each Person)

```
Redesign this individual dashboard page with the following simplified structure:

**Hero:**
- Page title: "[PERSON'S NAME]'s Dashboard"
- Today's date

**Section 1: MY TASKS** (📋)
- Linked database view of Tasks
- Filter: Assigned to = [This person]
- View type: Kanban grouped by Status (Not Started, In Progress, Completed)
- Show: Task name, Due date, Priority

**Section 2: MY PROJECTS** (🎯)
- Linked database view of Projects
- Filter: Assigned to = [This person]
- View type: Gallery or Board
- Show: Project name, Status, Due date

**Section 3: UPCOMING MEETINGS** (📅)
- Linked database view of Meetings
- Filter: Attendees contains [This person]
- Filter: Date is within next 7 days
- View type: List
- Sort: Date ascending

**Section 4: QUICK LINKS** (📌)
- Bulleted list of frequently used links
- Include: Google Calendar, Task Inbox, Documents

Remove any doctor-specific metrics (OVA, PVA, Collections) - those belong on the main Command Center page only.
Keep it clean and focused on task/project management.
```

---

## 🎨 PHASE 4: POLISH & CONSISTENCY

### Prompt 7: Add Consistent Icons

```
Review all section headers across this page and add consistent emoji icons:

- 📊 for "Practice Metrics" or "Dashboard" or "Statistics"
- 👥 for "Team" or "People"
- 🏢 for "Practice Management"
- 📋 for "Tasks"
- 🎯 for "Projects" or "Goals"
- 📄 for "Documents"
- 📅 for "Calendar" or "Meetings"
- ⚙️ for "Settings" or "System Info"
- 🩺 for individual doctors
- 💼 for staff members

Ensure icons are used consistently across all pages in the workspace.
```

---

### Prompt 8: Create System Info Footer

```
At the bottom of the main Command Center page, create a minimal "System Info" footer section:

Include:
- Last Sync: [Display time from last DAILY_STATS update]
- Data Source: Google Sheets → Notion (Automated)
- Template Version: 2.0

Use subtle text formatting (smaller, gray text) so it doesn't clutter the main view.
Add a divider line above this section.
```

---

### Prompt 9: Clean Up Navigation

```
Review the page tree/navigation structure in the sidebar and organize as follows:

**Top Level (Only these items):**
1. Van Every Command Center (main page)
2. DAILY_STATS (database)

**Under Command Center:**
- Dr. Zach's Dashboard
- Dr. Saylor's Dashboard
- Dr. John's Dashboard
- Lou Ann's Dashboard
- Christina's Dashboard
- Tricia's Dashboard
- Windy's Dashboard
- Projects (database or page)
- Goals (database or page)
- Documents (database or page)
- Meetings (database or page)

Remove:
- Any duplicate "Command Center" pages
- "Team Command Centers" wrapper pages
- "Team Directory" or "Team Members" database (if exists)
- Any other nested wrapper pages

Keep navigation flat - maximum 2 levels deep.
```

---

## 🔍 PHASE 5: VERIFICATION PROMPTS

### Prompt 10: Audit for Redundancies

```
Review this Notion workspace and identify:

1. Duplicate pages with similar names
2. Unused databases or pages (not accessed in 30+ days)
3. Empty pages or placeholder content
4. Deeply nested pages (3+ levels deep)

Create a list of items to archive or delete.
Do NOT delete anything yet - just create the list for review.
```

---

### Prompt 11: Test All Links

```
Check all page links on this Command Center page and verify:

1. All team member dashboard links work correctly
2. All database links (Projects, Goals, Docs, Meetings) work
3. All "Quick Links" on individual dashboards work
4. No broken links or "Page not found" errors

Create a checklist of verified links vs broken links that need fixing.
```

---

## 🎯 SPECIALIZED PROMPTS (Optional)

### Prompt 12: Create Practice Management Hub (If Separate Page Needed)

```
Create a "Practice Management Hub" page with organized access to:

**PROJECTS** (📋)
- Linked database view: Projects
- Default view: Active projects (Status ≠ Completed)
- View options: Kanban by Status, Table by Priority

**GOALS** (🎯)
- Linked database view: Goals
- Default view: Current goals (Status = In Progress)
- Group by: Category or Quarter

**DOCUMENTS** (📄)
- Linked database view: Documents
- Default view: Recently updated
- Group by: Category

**MEETINGS** (📅)
- Linked database view: Meetings
- Default view: Upcoming meetings (next 30 days)
- Calendar view available

Keep layout clean with clear section headers.
Add breadcrumb link back to main Command Center at top.
```

---

### Prompt 13: Create Database Templates (For Tasks)

```
For the Tasks database, create these templates for quick task creation:

**Template 1: Standard Task**
- Fields: Title, Description, Assigned To, Due Date, Priority (Medium), Status (Not Started)

**Template 2: Urgent Task**
- Fields: Title, Description, Assigned To, Due Date (defaults to today), Priority (High), Status (In Progress)
- Add "🚨 URGENT" tag automatically

**Template 3: Project Task**
- Fields: Title, Description, Assigned To, Related Project (relation field), Due Date, Priority, Status

Make templates easily accessible from all task views.
```

---

### Prompt 14: Add Filters for Quick Access

```
For each linked database view on individual dashboards, add these quick filter options:

**Tasks View:**
- "Due This Week"
- "High Priority"
- "Overdue"
- "Completed This Week"

**Projects View:**
- "Active Projects"
- "Projects Due Soon" (due within 14 days)
- "Completed Projects"

Implement as filter tabs or saved views for one-click access.
```

---

## 📋 IMPLEMENTATION ORDER

### Weekend Session (2 hours):

1. ✅ **Prompt 1** - Simplify hero section (5 min)
2. ✅ **Prompt 9** - Clean up navigation (15 min)
3. ✅ **Prompt 2** - Create simple team dashboards section (10 min)
4. ✅ **Prompt 3** - Reorganize main page structure (15 min)
5. ✅ **Prompt 7** - Add consistent icons (10 min)
6. ✅ **Prompt 8** - Create system info footer (5 min)
7. ✅ **Prompt 10** - Audit for redundancies (10 min)
8. ✅ **Prompt 11** - Test all links (10 min)

**Time: ~1.5 hours**

---

### Week 2 Session (1 hour):

9. ✅ **Prompt 4** - Configure DAILY_STATS views (15 min)
10. ✅ **Prompt 5** - Add key metrics summary (10 min)
11. ✅ **Prompt 6** - Apply individual dashboard template to all 7 team members (25 min)
12. ✅ **Prompt 11** - Final link verification (10 min)

**Time: ~1 hour**

---

### Optional Enhancements (Future):

- **Prompt 12** - Practice Management Hub (if desired)
- **Prompt 13** - Database templates (convenience feature)
- **Prompt 14** - Quick filter views (power user feature)

---

## 💡 TIPS FOR USING THESE PROMPTS

### Best Practices:

1. **Execute in order** - Each prompt builds on previous changes

2. **Review before confirming** - Notion AI will show preview, verify it looks right

3. **One page at a time** - Navigate to the specific page before running the prompt

4. **For Prompt 6 (Individual Dashboards):**
   - Run once for Dr. Zach
   - Adjust prompt to say "Dr. Saylor" and run again
   - Repeat for all 7 team members
   - Just change the name in the prompt each time

5. **If Notion AI misunderstands:**
   - Break prompt into smaller chunks
   - Be more specific about location ("At the top of this page...")
   - Use "Redo" and rephrase

6. **Save your work:**
   - Notion auto-saves, but verify changes before moving to next prompt
   - Can always use Undo (Cmd/Ctrl+Z) if something goes wrong

---

## 🚫 WHAT NOTION AI CAN'T DO

### Manual Actions Still Required:

1. **Deleting duplicate pages:**
   - Notion AI can identify them (Prompt 10)
   - But you must manually delete in page tree
   - Right-click page → Delete

2. **Moving pages in sidebar:**
   - Notion AI can't reorder sidebar navigation
   - Manually drag-and-drop pages to reorganize
   - Drag dashboards under Command Center page

3. **Changing database permissions:**
   - If databases need sharing/permission changes
   - Do this in database settings manually

4. **Creating integration connections:**
   - The Google Sheets sync is already set up
   - Don't change anything in Apps Script
   - Notion AI can't modify external integrations

---

## ✅ SUCCESS CHECKLIST

After running all prompts, verify:

- [ ] Main Command Center page has clean hero (title + date only)
- [ ] Only 3 main sections: Practice Metrics, Team Dashboards, Practice Management
- [ ] No duplicate "Command Center" pages in sidebar
- [ ] All 7 team member dashboards have consistent layout
- [ ] DAILY_STATS has multiple view tabs (Daily, Weekly, Monthly, etc.)
- [ ] All navigation links work (no broken links)
- [ ] Icons used consistently across all pages
- [ ] Sidebar navigation is flat (max 2 levels)
- [ ] System info footer at bottom of main page
- [ ] Automated sync still working (check Apps Script logs)

---

## 🆘 TROUBLESHOOTING

### If Notion AI gives unexpected results:

**Problem:** "I can't modify that section"
- **Solution:** You may be on wrong page - navigate to correct page first

**Problem:** "I don't see that database"
- **Solution:** Database may be in a different location - find it first, then link it

**Problem:** Changes look different than expected
- **Solution:** Use Undo, rephrase prompt to be more specific

**Problem:** Prompt is too complex
- **Solution:** Break into 2-3 smaller prompts, execute sequentially

**Problem:** Some prompts duplicate effort
- **Solution:** Skip redundant prompts if change already made

---

## 🎯 PRIORITY PROMPTS (If Short on Time)

### Must Do (30 min - Biggest impact):

1. **Prompt 9** - Clean up navigation (remove duplicates)
2. **Prompt 2** - Simplify team dashboards section
3. **Prompt 3** - Reorganize main page structure

**These 3 prompts alone will give you 80% of the simplification benefit.**

---

### Nice to Have (1 hour - Polish):

4. **Prompt 1** - Simplify hero
5. **Prompt 7** - Add consistent icons
6. **Prompt 4** - Configure DAILY_STATS views

---

### Future Enhancement (1+ hour - Optional):

7. **Prompt 6** - Individual dashboard templates (all 7 people)
8. **Prompt 5** - Key metrics summary
9. **Prompt 12-14** - Advanced features

---

**Start with the "Must Do" prompts this weekend. You'll immediately feel the difference in simplicity and speed.**

**Remember:** The goal is to get back to the clean simplicity of your original template while keeping the automation and functionality you've built.

---

*Created: 2025-11-08*
*Usage: Copy/paste prompts into Notion AI one at a time*
*Estimated total time: 2-3 hours for complete implementation*
