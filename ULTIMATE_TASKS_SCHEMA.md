# Ultimate Tasks Database Schema

Reference document for Tasks [UT], Projects [UT], and Events [UT] databases.

---

## Tasks [UT] Database

**Purpose:** Track all team tasks with assignments, priorities, and due dates

### Properties

| Property | Type | Options/Configuration | Required |
|----------|------|----------------------|----------|
| **Name** | Title | - | ✅ |
| **Status** | Select | Options: "To Do", "In Progress", "Done", "Cancelled" | ✅ |
| **Assignee** | Person | - | ✅ |
| **Due Date** | Date | Include time: No | ❌ |
| **Priority** | Select | Options: "Low", "Medium", "High", "Urgent" | ❌ |
| **Project** | Relation | Relation to: Projects [UT] | ❌ |
| **Tags** | Multi-select | Options: (Team-defined) | ❌ |
| **Description** | Text | - | ❌ |

### Default Views
- Inbox (all tasks, no filters)
- Today (Due Date = Today)
- This Week (Due Date = Next 7 days)
- All Tasks (default table view)

### Team Member Views (Created by Script)
For each of 7 team members:
- My Tasks-[Name]
- My Today-[Name]
- My Week-[Name]
- My Overdue-[Name]
- My In Progress-[Name]

---

## Projects [UT] Database

**Purpose:** Track team projects with related tasks and team assignments

### Properties

| Property | Type | Options/Configuration | Required |
|----------|------|----------------------|----------|
| **Name** | Title | - | ✅ |
| **Status** | Select | Options: "Not Started", "Active", "On Hold", "Done" | ✅ |
| **Team Members** | Multi-select | Options: Dr. Saylor, Dr. Zach, Dr. John, Lou Ann, Christina, Tricia, Wendy | ❌ |
| **Start Date** | Date | Include time: No | ❌ |
| **End Date** | Date | Include time: No | ❌ |
| **Description** | Text | - | ❌ |
| **Related Tasks** | Relation | Relation to: Tasks [UT] (shows count) | ❌ |

### Default Views
- Active Projects (Status = Active)
- All Projects (default table view)

### Team Member Views (Created by Script)
For each of 7 team members:
- My Projects-[Name] (filtered by Team Members contains [Name])

---

## Events [UT] Database

**Purpose:** Track team meetings, events, and appointments

### Properties

| Property | Type | Options/Configuration | Required |
|----------|------|----------------------|----------|
| **Name** | Title | - | ✅ |
| **Date** | Date | Include time: Yes | ✅ |
| **Attendees** | Multi-select | Options: Dr. Saylor, Dr. Zach, Dr. John, Lou Ann, Christina, Tricia, Wendy | ❌ |
| **Type** | Select | Options: "Meeting", "Training", "Event", "Other" | ❌ |
| **Location** | Text | - | ❌ |
| **Description** | Text | - | ❌ |

### Default Views
- Calendar (calendar view, sorted by Date)
- Upcoming (list view, filtered: Date > Today)
- All Events (default table view)

### Team Member Views (Created by Script)
For each of 7 team members:
- My Events-[Name] (filtered by Attendees contains [Name])

---

## Relations Between Databases

### Tasks → Projects
- **Property:** "Project" (in Tasks [UT])
- **Type:** Relation to Projects [UT]
- **Direction:** One-to-many (one project can have many tasks)

### Projects → Tasks
- **Property:** "Related Tasks" (in Projects [UT])
- **Type:** Relation from Tasks [UT]
- **Direction:** Shows count and list of related tasks

---

## Team Member Names (Exact Spelling Required)

```python
team_members = [
    "Dr. Saylor",
    "Dr. Zach",
    "Dr. John",
    "Lou Ann",
    "Christina",
    "Tricia",
    "Wendy"
]
```

**Important:** Filter views use exact string matching. Names must be spelled exactly as listed.

---

## View Naming Convention

**Format:** `My [ViewType]-[TeamMemberName]`

**Examples:**
- `My Tasks-Dr. Saylor`
- `My Today-Lou Ann`
- `My Week-Christina`
- `My Projects-Dr. John`
- `My Events-Wendy`

---

## Total Views to Create

- **Tasks views:** 5 types × 7 members = 35 views
- **Projects views:** 1 type × 7 members = 7 views
- **Events views:** 1 type × 7 members = 7 views

**Total:** 49 filtered views

---

## Notion API Property Types Reference

For script implementation:

```python
property_configs = {
    "title": {"title": {}},
    "select": {"select": {"options": [{"name": "Option", "color": "blue"}]}},
    "multi_select": {"multi_select": {"options": [{"name": "Option", "color": "blue"}]}},
    "date": {"date": {}},
    "text": {"rich_text": {}},
    "relation": {"relation": {"database_id": "target_database_id"}},
    "people": {"people": {}}
}
```

