# VE Command Center - Google Sheets Structure

## Sheet 1: Tasks (Main Database)

### Column Structure:
| Column | Type | Description | Example |
|--------|------|-------------|---------|
| Task ID | Auto-number | Unique identifier | TASK-001 |
| Task Name | Text | Task title | "Review patient care protocols" |
| Team Member | Dropdown | Assigned person | Dr. Saylor, Dr. Zach, Dr. John, Lou Ann, Christina, Tricia, Windy |
| Assigned To | Text | Future use for email/Notion user | blank for now |
| Due Date | Date | Deadline | 2025-11-15 |
| Priority | Dropdown | Urgency level | High, Medium, Low |
| Status | Dropdown | Current state | Not Started, In Progress, Done, Blocked |
| Related Project | Dropdown | Linked project | Patient Care Initiative, Marketing Q4, etc. |
| Tags | Multi-select | Categories | Clinical, Admin, Marketing, Operations |
| Type | Dropdown | Item type | Task, Project, Meeting |
| Meetings | Text/Link | Related meeting | Link to meeting note |
| Recurring | Checkbox | Repeating task | Yes/No |
| Time Estimate (hrs) | Number | Effort estimate | 2.5 |
| Created Date | Date | When added | Auto-populated |
| Completed Date | Date | When finished | Auto-populated when Status = Done |
| Notes | Text | Additional info | Long-form description |
| Slack Thread URL | Text | Link to Slack discussion | Auto-populated from Slack |

### Data Validation Setup:

**Team Member (Dropdown):**
- Dr. Saylor
- Dr. Zach
- Dr. John
- Lou Ann
- Christina
- Tricia
- Windy

**Priority (Dropdown):**
- High
- Medium
- Low

**Status (Dropdown):**
- Not Started
- In Progress
- Done
- Blocked
- On Hold

**Type (Dropdown):**
- Task
- Project
- Meeting

**Tags (Multi-select):**
- Clinical
- Admin
- Marketing
- Operations
- Patient Care
- Training
- Finance
- HR

---

## Sheet 2: Projects

### Column Structure:
| Column | Type | Description |
|--------|------|-------------|
| Project ID | Auto-number | Unique identifier |
| Project Name | Text | Project title |
| Owner | Dropdown | Team member list |
| Status | Dropdown | Backlog, In Progress, Completed, On Hold |
| Priority | Dropdown | High, Medium, Low |
| Department | Dropdown | Clinical, Admin, Marketing, Operations |
| Budget | Currency | Project budget |
| Start Date | Date | Project start |
| End Date | Date | Project deadline |
| Task Count | Formula | Count of related tasks |
| Task Completion % | Formula | Progress percentage |
| Documents | Text/Link | Related files/links |
| Notes | Text | Project description |

---

## Sheet 3: Events and Meetings

### Column Structure:
| Column | Type | Description |
|--------|------|-------------|
| Event ID | Auto-number | Unique identifier |
| Title | Text | Event/Meeting name |
| Date | Date | Event date |
| Time | Time | Event time |
| Duration | Number | Minutes |
| Attendees | Multi-select | Team members |
| Location | Text | Room/Zoom link/Venue |
| Type | Dropdown | Meeting, Event, All Hands, 1:1, Team, Client, Conference, Workshop |
| Status | Dropdown | Scheduled, Completed, Cancelled, Rescheduled |
| Related Project | Dropdown | Linked project |
| Agenda | Text | Event/Meeting topics |
| Notes Link | Text/Link | Link to meeting notes |
| Recording Link | Text/Link | Link to recording |

---

## Sheet 4: Team Members

### Column Structure:
| Column | Type | Description |
|--------|------|-------------|
| Name | Text | Full name |
| Role | Dropdown | Doctor, Staff |
| Department | Dropdown | Clinical, Admin |
| Email | Email | Contact email |
| Slack User ID | Text | For @mentions |
| Active | Checkbox | Currently employed |
| Start Date | Date | Employment start |

### Data:
| Name | Role | Department | Email | Slack User ID | Active |
|------|------|------------|-------|---------------|--------|
| Dr. Saylor | Doctor | Clinical | saylor@vaneverychiro.com | U12345ABC | TRUE |
| Dr. Zach | Doctor | Clinical | zach@vaneverychiro.com | U12345DEF | TRUE |
| Dr. John | Doctor | Clinical | john@vaneverychiro.com | U12345GHI | TRUE |
| Lou Ann | Staff | Admin | louann@vaneverychiro.com | U12345JKL | TRUE |
| Christina | Staff | Admin | christina@vaneverychiro.com | U12345MNO | TRUE |
| Tricia | Staff | Admin | tricia@vaneverychiro.com | U12345PQR | TRUE |
| Windy | Staff | Admin | windy@vaneverychiro.com | U12345STU | TRUE |

---

## Formulas to Include

### In Tasks Sheet:

**Task Completion % (for Projects):**
```
=COUNTIF(Tasks!Status:Status, "Done") / COUNTA(Tasks!Status:Status)
```

**Auto-populate Created Date:**
```
=IF(A2<>"", IF(O2="", NOW(), O2), "")
```

**Auto-populate Completed Date:**
```
=IF(G2="Done", IF(P2="", NOW(), P2), "")
```

---

## Next Steps:

1. Create Google Sheet with these 4 tabs
2. Set up data validation for dropdowns
3. Add conditional formatting (color-code by Status/Priority)
4. Connect to Notion via Make.com or Zapier
5. Set up Slack integration for task creation/updates

