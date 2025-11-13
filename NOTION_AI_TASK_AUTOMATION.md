# Notion AI Task Automation Guide
## Van Every Family Chiropractic

> Based on Notion AI's "Create Tasks from Messy Notes" feature

---

## Overview

This guide explains how to use Notion AI to automatically convert messy notes, to-do blocks, and brainstorming sessions into structured tasks and projects in your Van Every workspace.

## Your Database IDs (from config.json)

```
Tasks Database:     2a380ff9d4f58138942bf525def45ba0
Projects Database:  2a380ff9d4f581aab5e7ff996f31a40b
Meetings Database:  2a380ff9d4f581468537e6e63fc6d0b6
```

## Setting Up Your Notion AI Profile

1. Go to Notion Settings → My Profile
2. Under "Personalization" or "AI Settings", create a profile that includes:

```
When I ask you to create tasks, use this database: [link to Tasks DB]
When I ask you to create projects, use this database: [link to Projects DB]

Default properties for new tasks:
- Priority: Medium (unless specified)
- Department: [Based on context or person mentioned]
- Status: Not Started
- Time Estimate: [Infer from task description]

Team Members:
- Dr. Saylor (Doctor)
- Dr. Zach (Doctor)
- Dr. John (Doctor)
- Lou Ann (Staff)
- Christina (Staff)
- Tricia (Staff)
- Windy (Staff)
```

---

## Use Case 1: Slack Discussions → Tasks

### Scenario
Your team has a Slack discussion about upcoming projects and action items.

### Workflow

1. **Capture the Slack thread**
   - Copy relevant messages to a Notion page
   - Format key action items as to-do blocks

2. **Create a page with to-do blocks**
   ```
   Meeting notes from #team-planning:

   [ ] Schedule equipment maintenance (Lou Ann)
   [ ] Update patient handouts for new protocols (Dr. Saylor)
   [ ] Review continuing education requirements (All Doctors)
   [ ] Create social media content calendar (Christina)
   [ ] Organize TTC technique video library (Dr. Zach)
   ```

3. **Prompt Notion AI**
   ```
   Please create tasks from all to-do blocks on this page.
   For each task:
   - Assign to the person mentioned in parentheses
   - Set Priority based on urgency mentioned
   - Add appropriate Department tag
   - Apply "from-slack" label
   - Include the full original text in the task body
   ```

4. **Result**
   - 5 tasks created in Tasks database
   - Each assigned to correct team member
   - Proper properties set (Priority, Department, Labels)
   - Full context preserved in task body

---

## Use Case 2: Meeting Notes → Tasks + Project

### Scenario
After a team meeting about a new clinic initiative, you have messy notes with action items.

### Workflow

1. **Meeting notes page** (linked to your Meetings database)
   ```
   Meeting: New Patient Onboarding System
   Date: November 12, 2025
   Attendees: Dr. Zach, Lou Ann, Christina

   Discussion points:
   - Need to streamline intake process
   - Create welcome packet
   - Update forms

   Action items:
   [ ] Design new intake form (Lou Ann - by Nov 20)
   [ ] Create welcome video (Dr. Zach - by Nov 25)
   [ ] Update patient portal with new info (Christina - by Nov 27)
   [ ] Print welcome packets (Lou Ann - by Dec 1)
   [ ] Train all staff on new process (Dr. Zach - by Dec 5)
   ```

2. **Prompt Notion AI**
   ```
   Create a new project called "New Patient Onboarding System"
   and create tasks from all to-do blocks on this page.

   For each task:
   - Link to the new project
   - Assign to the person in parentheses
   - Set due date based on the date mentioned
   - Set Priority to High (this is a key initiative)
   - Add Department: "Operations"
   - Apply tag "new-patient-experience"
   - Link to this meeting page

   Create a 6th task: "Review project completion" assigned to Dr. Zach for Dec 10
   ```

3. **Result**
   - New project created in Projects database
   - 6 tasks created and linked to project
   - All tasks assigned with due dates
   - Meeting page linked to tasks
   - Ready to track on team dashboards

---

## Use Case 3: Google Sheets Import → Tasks

### Scenario
You have a Google Sheet with equipment maintenance items that need to become tasks.

### Workflow

1. **From Google Sheets**
   ```
   Equipment          | Next Service | Assigned To
   Adjustment Table 1 | Nov 15       | Lou Ann
   Adjustment Table 2 | Nov 18       | Lou Ann
   X-Ray Machine      | Nov 22       | Dr. John
   Laser Therapy Unit | Nov 25       | Christina
   ```

2. **Convert to Notion with to-do blocks**
   ```
   Equipment Maintenance Q4:

   [ ] Service Adjustment Table 1 - Nov 15 (Lou Ann)
   [ ] Service Adjustment Table 2 - Nov 18 (Lou Ann)
   [ ] Service X-Ray Machine - Nov 22 (Dr. John)
   [ ] Service Laser Therapy Unit - Nov 25 (Christina)
   ```

3. **Prompt Notion AI**
   ```
   Create tasks from these to-do blocks.

   For each task:
   - Set Department: "Facilities"
   - Set Priority: High (equipment maintenance is critical)
   - Add label: "equipment-maintenance"
   - Set due date based on the date in the to-do text
   - Assign to the person in parentheses
   - Time Estimate: 2 hours
   ```

4. **Result**
   - 4 tasks created with proper scheduling
   - Shows up on assigned team members' dashboards
   - Filtered views show all equipment tasks together
   - Automatic reminders as due dates approach

---

## Use Case 4: Research Page → Project Tasks

### Scenario
You're researching a new service offering and have a messy page with ideas and to-dos.

### Workflow

1. **Research page with scattered to-dos**
   ```
   Research: Adding Massage Therapy Services

   Market research shows 65% of chiro patients want massage...

   [ ] Survey current patients about interest
   [ ] Research massage therapy licensing requirements in NC
   [ ] Calculate space requirements for massage room

   Competitor analysis:
   - Smith Chiropractic offers massage, $75/session...

   [ ] Get quotes for massage equipment
   [ ] Interview potential massage therapists
   [ ] Create financial projections

   Insurance considerations...

   [ ] Check if massage is covered under current insurance
   [ ] Update intake forms for massage services
   ```

2. **Prompt Notion AI**
   ```
   Create a project called "Add Massage Therapy Services"
   and create tasks from all to-do blocks on this page.

   For tasks about research/planning, assign to Dr. Zach
   For tasks about facilities/equipment, assign to Lou Ann
   For tasks about forms/admin, assign to Christina

   Set all tasks to:
   - Department: "Business Development"
   - Priority: Medium
   - Add label: "massage-therapy-expansion"
   - Link to this research page
   - Link to the new project
   ```

3. **Result**
   - New project created
   - 8 tasks created and intelligently assigned
   - Research page linked for context
   - Shows up in Business Development views
   - Project tracking on main dashboard

---

## Advanced Prompts for Your Databases

### For Tasks with Subtasks
```
Create a task called "Plan Spring Health Fair"
and create 5 subtasks as separate tasks:
1. Book venue
2. Order promotional materials
3. Recruit volunteers
4. Create event schedule
5. Send patient invitations

Set the main task as High priority, subtasks as Medium.
Assign main task to Dr. Zach, distribute subtasks among staff.
All should have Department: "Marketing" and label: "health-fair-2025"
```

### For Project with Phases
```
Create a project called "Office Expansion"
and create tasks organized in 3 phases:

Phase 1 - Planning (assign to Dr. Zach):
[ ] Get architectural drawings
[ ] Obtain building permits
[ ] Finalize budget

Phase 2 - Construction (assign to Lou Ann to coordinate):
[ ] Interview contractors
[ ] Schedule construction timeline
[ ] Order new equipment

Phase 3 - Setup (assign to Christina):
[ ] Coordinate move
[ ] Update office systems
[ ] Train staff on new layout

Set Phase 1 tasks to High priority, others to Medium.
Add label "expansion-2025" to all tasks.
```

---

## Integration with Your Existing Workflow

### Slack Integration Enhancement
When you get your Slack integration working:
1. Create a Notion page that mirrors important Slack channels
2. Use Slack's "Save to Notion" feature (or manual copy)
3. Ask Notion AI to extract tasks and assign to team members
4. Tasks appear on individual dashboards automatically

### Google Sheets Sync Enhancement
For your existing Google Sheets sync:
1. Import sheet data to Notion page first
2. Format as to-do blocks
3. Let Notion AI create structured tasks
4. Maintains your custom properties
5. Syncs back to sheets if needed

### Calendar Integration
When creating tasks from meeting notes:
1. Link tasks to the meeting in Meetings database
2. Set due dates in tasks
3. These sync to Notion Calendar
4. Team members see tasks in calendar view

---

## Best Practices

1. **Always specify assignment**
   - Include "(Person Name)" in to-do text
   - AI will extract and assign correctly

2. **Include dates in natural language**
   - "by Nov 20" or "due next Friday"
   - AI interprets and sets due dates

3. **Use consistent labels**
   - Create a label taxonomy
   - Reference in your AI profile
   - AI applies consistently

4. **Link to source material**
   - Meeting pages
   - Research documents
   - Slack threads
   - Maintains context

5. **Create templates for common scenarios**
   - Meeting notes → tasks template
   - Project kickoff → tasks template
   - Equipment maintenance → tasks template

---

## Sample AI Profile for Van Every

```
I'm working with Van Every Family Chiropractic's Notion workspace.

When I ask you to create tasks, use the Tasks database at:
https://www.notion.so/2a380ff9d4f58138942bf525def45ba0

When I ask you to create projects, use the Projects database at:
https://www.notion.so/2a380ff9d4f581aab5e7ff996f31a40b

Team members:
- Dr. Saylor (Doctor) - Clinical focus
- Dr. Zach (Doctor) - Business development, technology
- Dr. John (Doctor) - Clinical focus
- Lou Ann (Staff) - Operations, facilities
- Christina (Staff) - Marketing, admin
- Tricia (Staff) - Patient services
- Windy (Staff) - Front desk

Departments:
- Clinical
- Operations
- Marketing
- Facilities
- Business Development
- Administration

When creating tasks, always include:
- Assigned team member
- Department
- Priority (High/Medium/Low)
- Time Estimate if mentioned
- Relevant labels/tags
- Link to source material

For tasks from meetings, always link to the meeting page in the Meetings database.

For project-related tasks, create the project first, then link all tasks to it.

Use descriptive task titles (summary style) and put full original text in the task body.
```

---

## Troubleshooting

### AI doesn't find your databases
- Make sure databases are shared with your Notion AI
- Add direct links in your profile
- Use database names exactly as they appear in Notion

### Tasks missing properties
- Specify all properties explicitly in prompt
- Reference your property names exactly
- Create a prompt template for consistency

### Wrong team member assignments
- Use exact names as they appear in your workspace
- Put names in parentheses in to-do blocks
- Verify names in your AI profile match Notion users

---

## Next Steps

1. **Set up your AI profile** (15 minutes)
   - Add database links
   - Define team members
   - Specify default properties

2. **Test with a simple example** (10 minutes)
   - Create page with 3-5 to-do blocks
   - Run AI prompt
   - Verify tasks created correctly

3. **Create prompt templates** (30 minutes)
   - Meeting notes template
   - Project kickoff template
   - Equipment maintenance template

4. **Train your team** (1 hour)
   - Show them how to use to-do blocks
   - Demonstrate AI conversion
   - Share prompt templates

5. **Integrate with existing workflows**
   - Add to Slack process
   - Add to Google Sheets sync
   - Add to meeting workflow

---

## Resources

- [Notion AI Documentation](https://www.notion.so/help/guides/notion-ai)
- [Notion Databases Guide](https://www.notion.so/help/guides/creating-a-database)
- Your project files:
  - `config.json` - Database IDs
  - `PROJECT_TRACKER.md` - Current project status
  - `README.md` - Project overview

---

**Last Updated:** November 12, 2025
**Status:** Ready to implement
**Estimated Setup Time:** 1-2 hours total
