# Manual Steps Required (Notion API Limitations)

> **Important:** The Notion API cannot create certain block types. These must be added manually in Notion.

## 🚨 What Cannot Be Automated

The following **CANNOT** be created via the Notion API and must be done manually:

1. ❌ **Linked Database Views** - Cannot be created programmatically
2. ❌ **Inline Database Views** - Must be added through UI
3. ❌ **Column-specific Database Properties** - Some advanced properties
4. ❌ **Advanced Blocks** - Synced blocks, some embeds, etc.

## 📋 Manual Steps After Running Scripts

### For Each Individual Dashboard (6 dashboards total)

After running `build_dashboards.py`, you need to manually add database views to each dashboard:

#### 1. Add "This Week at a Glance" Metric Cards

**Location:** Under the "📊 This Week at a Glance" heading

**Steps:**
1. Delete the placeholder callout box
2. Type `/column` and create a 3-column layout
3. In each column, add a callout block with the following:

**Column 1 - My Tasks:**
```
Icon: ✅
Background: Red
Content:
MY TASKS
[Count number from Tasks database filtered to you]
```

**Column 2 - My Meetings:**
```
Icon: 📅
Background: Purple
Content:
MY MEETINGS
[Count number from Meetings database filtered to you]
```

**Column 3 - My Projects:**
```
Icon: 🎯
Background: Blue
Content:
MY PROJECTS
[Count number from Projects database filtered to you]
```

#### 2. Add "My Tasks" Linked Database

**Location:** Under the "✅ My Tasks" heading

**Steps:**
1. Delete the placeholder callout and instructions
2. Type `/linked` or `/create linked database`
3. Search for "Tasks" database
4. Select the Tasks database
5. Add filter:
   - Property: "Assigned To"
   - Condition: "Contains"
   - Value: [Team Member Name]
6. Set default view to "Table" or "Board"
7. Add sorts (optional):
   - Sort by: Priority (descending)
   - Then by: Due Date (ascending)

#### 3. Add "My Meetings" Linked Database

**Location:** Under the "📅 My Meetings" heading

**Steps:**
1. Delete the placeholder callout and instructions
2. Type `/linked` or `/create linked database`
3. Search for "Meetings" database
4. Select the Meetings database
5. Add filter:
   - Property: "Attendees"
   - Condition: "Contains"
   - Value: [Team Member Name]
6. Set default view to "Calendar" or "Table"
7. Add sorts (optional):
   - Sort by: Date (ascending)

#### 4. Add "My Projects" Linked Database

**Location:** Under the "🎯 My Projects" heading

**Steps:**
1. Delete the placeholder callout and instructions
2. Type `/linked` or `/create linked database`
3. Search for "Projects" database
4. Select the Projects database
5. Add filter:
   - Property: "Team Members"
   - Condition: "Contains"
   - Value: [Team Member Name]
6. Set default view to "Board" or "Table"
7. Add sorts (optional):
   - Sort by: Status (custom order)
   - Then by: Priority (descending)

#### 5. Update Quick Links

**Location:** Under the "🔗 Quick Links" heading

**Steps:**
1. Replace placeholder text with actual links:
   - Tasks Database → Link to main Tasks database
   - Projects Database → Link to main Projects database
   - Main Dashboard → Link to main workspace/template page

---

## 📝 Checklist for Each Dashboard

Use this checklist when setting up each team member's dashboard:

### Dr. Saylor's Dashboard
- [ ] Add "This Week at a Glance" 3-column layout
- [ ] Add "My Tasks" linked database view (filtered to Dr. Saylor)
- [ ] Add "My Meetings" linked database view (filtered to Dr. Saylor)
- [ ] Add "My Projects" linked database view (filtered to Dr. Saylor)
- [ ] Update Quick Links with actual page links
- [ ] Customize "Today's Focus" priorities
- [ ] Test all filters work correctly

### Dr. John's Dashboard
- [ ] Add "This Week at a Glance" 3-column layout
- [ ] Add "My Tasks" linked database view (filtered to Dr. John)
- [ ] Add "My Meetings" linked database view (filtered to Dr. John)
- [ ] Add "My Projects" linked database view (filtered to Dr. John)
- [ ] Update Quick Links with actual page links
- [ ] Customize "Today's Focus" priorities
- [ ] Test all filters work correctly

### Lou Ann's Dashboard
- [ ] Add "This Week at a Glance" 3-column layout
- [ ] Add "My Tasks" linked database view (filtered to Lou Ann)
- [ ] Add "My Meetings" linked database view (filtered to Lou Ann)
- [ ] Add "My Projects" linked database view (filtered to Lou Ann)
- [ ] Update Quick Links with actual page links
- [ ] Customize "Today's Focus" priorities
- [ ] Test all filters work correctly

### Christina's Dashboard
- [ ] Add "This Week at a Glance" 3-column layout
- [ ] Add "My Tasks" linked database view (filtered to Christina)
- [ ] Add "My Meetings" linked database view (filtered to Christina)
- [ ] Add "My Projects" linked database view (filtered to Christina)
- [ ] Update Quick Links with actual page links
- [ ] Customize "Today's Focus" priorities
- [ ] Test all filters work correctly

### Tricia's Dashboard
- [ ] Add "This Week at a Glance" 3-column layout
- [ ] Add "My Tasks" linked database view (filtered to Tricia)
- [ ] Add "My Meetings" linked database view (filtered to Tricia)
- [ ] Add "My Projects" linked database view (filtered to Tricia)
- [ ] Update Quick Links with actual page links
- [ ] Customize "Today's Focus" priorities
- [ ] Test all filters work correctly

### Wendy's Dashboard
- [ ] Add "This Week at a Glance" 3-column layout
- [ ] Add "My Tasks" linked database view (filtered to Wendy)
- [ ] Add "My Meetings" linked database view (filtered to Wendy)
- [ ] Add "My Projects" linked database view (filtered to Wendy)
- [ ] Update Quick Links with actual page links
- [ ] Customize "Today's Focus" priorities
- [ ] Test all filters work correctly

---

## 🎯 After All Dashboards Are Complete

Once all individual dashboards are set up:

1. **Update Main Dashboard**
   - [ ] Ensure all team member cards link to their respective dashboards
   - [ ] Test all links work correctly

2. **Verify Everything Works**
   - [ ] Test each dashboard loads correctly
   - [ ] Verify database filters show correct data
   - [ ] Ensure all links navigate properly
   - [ ] Test on mobile (optional, but good to check)

3. **Team Onboarding**
   - [ ] Share dashboards with team
   - [ ] Give brief tour (5 minutes per person)
   - [ ] Encourage usage for 1-2 weeks
   - [ ] Collect feedback on what's working/not working

---

## 🔧 Troubleshooting

### "I can't find the database to link"

**Solution:** Make sure the database pages have been shared with your Notion integration:
1. Open the database page
2. Click "..." → "Add connections"
3. Select your integration

### "The filter doesn't work"

**Solution:** Check the property names match exactly:
- Tasks database: "Assigned To" (not "Assigned" or "Owner")
- Meetings database: "Attendees" (not "Participants")
- Projects database: "Team Members" (not "Members" or "Team")

### "I want to customize the layout"

**Solution:** Feel free to customize! The structure is a template. You can:
- Change colors
- Rearrange sections
- Add additional views
- Modify database properties

Just maintain consistency across all dashboards for the best team experience.

---

**Time Estimate:** 15-20 minutes per dashboard (~2 hours total for all 6)

**Difficulty:** Easy - All point-and-click in Notion UI

**When to do this:** After running `build_dashboards.py` successfully
