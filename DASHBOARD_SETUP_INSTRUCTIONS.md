# Dashboard Setup Instructions - Manual Work Required

**All 7 dashboards have been rebuilt with the new clean structure.**

Now you need to complete the manual work that the Notion API cannot do.

---

## Part 1: Create Team-Wide Pages First (30 minutes)

These pages will be linked from all individual dashboards, so create them first.

### Step 1: Create "All Tasks" Page

1. In your Notion workspace, create a new page
2. Name it: **All Tasks**
3. Add this structure:

   **Content:**
   - Add heading: `📋 All Tasks`
   - Type `/linked database` and select your **Tasks** database
   - Configure the view:
     - View type: **Table**
     - Columns to show: **Name | Assigned To | Due Date | Priority | Related Project | Status**
     - Sort by: **Due Date** (ascending)
     - No filters (show all team tasks)
   - Add a **New** button at the top (Notion does this automatically)

4. Copy the page URL - you'll need it for navigation links

---

### Step 2: Create "All Projects" Page

1. In your Notion workspace, create a new page
2. Name it: **All Projects**
3. Add this structure:

   **Content:**
   - Add heading: `📊 All Projects`
   - Type `/linked database` and select your **Projects** database
   - Configure the view:
     - View type: **Table**
     - Columns to show: **Name | Team Members | Status | Related Tasks Count**
     - Sort by: **Status** (custom order if possible)
     - No filters (show all projects)
   - Add a **New** button at the top

4. Copy the page URL - you'll need it for navigation links

---

### Step 3: Create "All Events" Page (Calendar)

1. In your Notion workspace, create a new page
2. Name it: **All Events** or **Team Calendar**
3. Add this structure:

   **Content:**
   - Add heading: `📅 Team Calendar`
   - Type `/linked database` and select your **Events/Meetings** database
   - Configure the first view:
     - View type: **Calendar**
     - Date property: **Date** (or whatever your date field is called)
     - Show all events for all team members
   - Below the calendar, add another linked view:
     - View type: **List**
     - Sort by: **Date** (ascending)
     - Filter: **Date is after today**

4. Copy the page URL - you'll need it for navigation links

**Note:** Notion doesn't support "toggle buttons to filter by team member" via API, but you can create multiple views:
   - View 1: Calendar (All Events)
   - View 2: Dr. Saylor's Events
   - View 3: Dr. John's Events
   - etc.

---

## Part 2: Update Individual Dashboards (15 min × 7 = ~2 hours)

Do this for EACH of the 7 team member dashboards.

**Team Members:**
1. Dr. Saylor
2. Dr. Zach
3. Dr. John
4. Lou Ann
5. Christina
6. Tricia
7. Wendy

---

### For Each Dashboard:

#### A. Navigation Section

**Find:** `☰ Navigation` heading with placeholder text

**Replace with:**
1. Delete the placeholder text
2. Type the following on one line separated by ` | `:
   - `All Tasks` → Link to your "All Tasks" page
   - `All Projects` → Link to your "All Projects" page
   - `All Events` → Link to your "All Events" page

**How to create inline links:**
- Type the text: `All Tasks`
- Highlight it
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)
- Paste the URL of your "All Tasks" page
- Repeat for All Projects and All Events

**Result should look like:**
```
☰ Navigation
[All Tasks] | [All Projects] | [All Events]
```
(where each is a clickable link)

---

#### B. 🗂️ My Tasks Section

**Find:** `🗂️ My Tasks` heading with placeholder instructions

**Do this:**
1. Delete the placeholder text (gray italics)
2. Type `/linked database`
3. Select your **Tasks** database
4. Configure the view:
   - View type: **Table**
   - Add filter: **Assigned to → Contains → [Team Member Name]**
   - Columns to show: **Name | Due Date | Priority | Related Project | Status**
   - Sort by: **Due Date** (ascending), then **Priority** (high to low)
5. Below the database view, keep the text: `→ View All Tasks`
6. Make "View All Tasks" a link to your "All Tasks" page

**Important:** Make sure "Assigned to" filter matches the team member's name exactly.

---

#### C. 📅 My Events Section

**Find:** `📅 My Events` heading with placeholder instructions

**Do this:**
1. Delete the placeholder text
2. Type `/linked database`
3. Select your **Events/Meetings** database
4. Configure the view:
   - View type: **List** (not calendar, not board)
   - Add filter: **Attendees → Contains → [Team Member Name]**
   - Add filter: **Date → Is after → Today** (show upcoming only)
   - Sort by: **Date** (ascending)
5. Below the database view, keep the text: `→ View Calendar`
6. Make "View Calendar" a link to your "All Events" page

---

#### D. 📊 My Projects Section

**Find:** `📊 My Projects` heading with placeholder instructions

**Do this:**
1. Delete the placeholder text
2. Type `/linked database`
3. Select your **Projects** database
4. Configure the view:
   - View type: **Table**
   - Add filter: **Team Members → Contains → [Team Member Name]**
   - Columns to show: **Name | Status | Related Tasks Count**
   - Sort by: **Status** (custom order if possible)
5. Below the database view, keep the text: `→ View All Projects`
6. Make "View All Projects" a link to your "All Projects" page

---

## Part 3: Quality Check (10 minutes)

After completing all 7 dashboards, verify:

### Navigation Links
- [ ] Open each dashboard and click "All Tasks" - does it go to the right page?
- [ ] Click "All Projects" - does it go to the right page?
- [ ] Click "All Events" - does it go to the right page?

### Database Filters
- [ ] Open Dr. Saylor's dashboard → My Tasks should show ONLY Dr. Saylor's tasks
- [ ] Open Lou Ann's dashboard → My Events should show ONLY Lou Ann's events
- [ ] Open each dashboard and verify filters work correctly

### Bottom Links
- [ ] Click "→ View All Tasks" from any dashboard - goes to All Tasks page?
- [ ] Click "→ View Calendar" from any dashboard - goes to All Events page?
- [ ] Click "→ View All Projects" from any dashboard - goes to All Projects page?

### Test New Task Creation
- [ ] From Dr. John's dashboard, click "New" in My Tasks section
- [ ] Create a test task assigned to Dr. John
- [ ] Verify it appears in his My Tasks section
- [ ] Verify it also appears in the "All Tasks" page

---

## Time Estimates

**Part 1: Create 3 team-wide pages:** 30 minutes total
- All Tasks page: 10 min
- All Projects page: 10 min
- All Events page: 10 min

**Part 2: Update 7 individual dashboards:** ~2 hours total
- First dashboard: 20 minutes (you're learning)
- Remaining 6 dashboards: 12-15 min each (you'll get faster)

**Part 3: Quality check:** 10 minutes

**Total time:** ~2.5-3 hours

---

## Tips to Work Faster

1. **Do Part 1 first** - Create the 3 team pages before touching individual dashboards
2. **Copy URLs** - Keep the URLs of All Tasks, All Projects, All Events in a text file for quick pasting
3. **Batch similar work** - Do navigation for all 7 dashboards, then do My Tasks for all 7, etc.
4. **Use keyboard shortcuts:**
   - `Cmd+K` (Mac) or `Ctrl+K` (Windows) to create links
   - `Cmd+D` (Mac) or `Ctrl+D` (Windows) to duplicate views
5. **Test as you go** - After completing one dashboard, test it before moving to the next

---

## Common Issues

**"I can't find the Tasks database to link"**
- Make sure you've shared the Tasks database with your Notion integration
- Or search for "Tasks" in the database picker

**"The filter isn't working - I see everyone's tasks"**
- Check that the filter property name is exactly "Assigned to" (case-sensitive)
- Check that the team member's name matches exactly

**"The bottom link isn't working"**
- You need to manually turn the text into a link (select text, Cmd+K, paste URL)
- Notion won't automatically detect link text

**"This is taking forever"**
- First dashboard always takes longest (~20 min)
- By dashboard 3-4, you'll be doing it in 10 minutes
- Take a break after dashboard 3

---

## What Success Looks Like

When you're done:
- ✅ All 7 dashboards have working navigation at the top
- ✅ Each dashboard shows only that person's tasks, events, projects
- ✅ Bottom links go to the team-wide pages
- ✅ Team-wide pages show all tasks/projects/events
- ✅ Creating a new task from any dashboard works correctly

---

## After Setup Is Complete

1. **Test with real data:**
   - Add 2-3 real tasks for each team member
   - Add 1-2 real projects with team assignments
   - Add upcoming team events

2. **Get team using it:**
   - Send each person their dashboard link
   - Quick 5-min demo: "Here's your dashboard, here's your tasks, here's how to update status"
   - Encourage them to check it daily

3. **Collect feedback (but don't act on it yet):**
   - What's confusing?
   - What do they wish was different?
   - What's working well?
   - Write it down, review after 1-2 weeks

---

**Ready? Start with Part 1. Create those 3 team-wide pages first.** 🚀

Estimated start-to-finish time: **2.5-3 hours**

Set aside time, put on music, and knock it out in one session if possible.

