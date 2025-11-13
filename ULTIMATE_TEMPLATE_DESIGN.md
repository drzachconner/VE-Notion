# 🏥 Van Every Chiropractic - Ultimate Command Center
## Notion Template Design Document v2.0

**Created:** November 7, 2025
**Status:** Design Phase - Ready to Build
**Vision:** World-class chiropractic practice management system with integrated analytics

---

## 🎯 Core Philosophy

**Simple to use, powerful under the hood**
- One shared login for entire team
- Real-time practice analytics
- Automated data flows from ChiroHD
- Beautiful, modern UI inspired by 2025 best practices

---

## 📊 MASTER DASHBOARD (Home Base)

### Hero Section
```
🏰 Van Every Chiropractic Command Center
[Today's Date]
```

### Live Practice Metrics Dashboard

#### Core Metrics (All show: Daily | Weekly | Monthly | Quarterly | Yearly)

**1. PV (Patient Visits)**
```
┌─────────────────────────────────────────────────────────────┐
│ 📈 PATIENT VISITS (PV)                                       │
├─────────────────────────────────────────────────────────────┤
│ Daily:     18    │ Weekly:    126   │ Monthly:   542         │
│ Quarterly: 1,580 │ Yearly:    6,240                         │
│ Trend: ↑ 8% vs Last Period                                  │
└─────────────────────────────────────────────────────────────┘
```

**2. NP (New Patients)**
```
┌─────────────────────────────────────────────────────────────┐
│ 👤 NEW PATIENTS (NP)                                         │
├─────────────────────────────────────────────────────────────┤
│ Daily:     3     │ Weekly:    12    │ Monthly:   48          │
│ Quarterly: 142   │ Yearly:    568                           │
│ Trend: ↑ 12% vs Last Period                                 │
└─────────────────────────────────────────────────────────────┘
```

**3. PVA (Patient Visit Average)**
```
┌─────────────────────────────────────────────────────────────┐
│ 📊 PATIENT VISIT AVERAGE (PVA)                               │
├─────────────────────────────────────────────────────────────┤
│ Daily:     2.8   │ Weekly:    8.2   │ Monthly:   12.4        │
│ Quarterly: 11.8  │ Yearly:    11.5                          │
│ Trend: → Stable                                              │
└─────────────────────────────────────────────────────────────┘
```

**4. Collections**
```
┌─────────────────────────────────────────────────────────────┐
│ 💰 COLLECTIONS                                               │
├─────────────────────────────────────────────────────────────┤
│ Daily:     $2,340   │ Weekly:    $16,420  │ Monthly: $68,500│
│ Quarterly: $198,600 │ Yearly:    $782,400                   │
│ Trend: ↑ 15% vs Last Period                                 │
└─────────────────────────────────────────────────────────────┘
```

**5. OVA (Office Visit Average)**
```
┌─────────────────────────────────────────────────────────────┐
│ 🏥 OFFICE VISIT AVERAGE (OVA)                                │
├─────────────────────────────────────────────────────────────┤
│ Daily:     52    │ Weekly:    364   │ Monthly:   1,560       │
│ Quarterly: 4,680 │ Yearly:    18,720                        │
│ Trend: ↑ 6% vs Last Period                                  │
└─────────────────────────────────────────────────────────────┘
```

**6. DOV (Drop Off Visit)**
```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ DROP OFF VISIT (DOV)                                      │
├─────────────────────────────────────────────────────────────┤
│ Daily:     N/A   │ Weekly:    N/A   │ Monthly:   Visit 6     │
│ Quarterly: Visit 6│ Yearly:    Visit 7                      │
│ Most Common Drop-Off Point: Visit 6 (23% of patients)       │
└─────────────────────────────────────────────────────────────┘
```

### Quick Analytics (Expandable Sections)

#### 📈 Patient Metrics
- **PV (Patient Visits)** - Total visits across all time periods
- **NP (New Patients)** - New patient acquisition tracking
- **PVA (Patient Visit Average)** - Average visits per patient
- **OVA (Office Visit Average)** - Total office capacity utilization
- **DOV (Drop Off Visit)** - Most common visit number where patients discontinue care

#### 💰 Revenue Metrics
- **Collections** - All payment collections across time periods
- **Revenue per Visit** - Collections / PV
- **Patient Lifetime Value** - Total collections per patient
- **Collection Rate** - Collected vs billed percentage

### ChiroHD Integration Section
```
🔄 ChiroHD Data Sync
Last sync: [2 minutes ago]
Next sync: [Automated - Every 15 minutes]

[Import CSV] [Configure Auto-Sync] [View Sync Log]

Supported Imports:
✅ New Patient Data
✅ Visit Records
✅ Payment Transactions
✅ Treatment Plans
✅ Insurance Claims
```

---

## 👥 TEAM DASHBOARDS (Individual)

Each team member gets a personalized dashboard:

### Dashboard Structure

#### 1. Personal Header
```
👨‍⚕️ Dr. John's Command Center
"Your focus determines your reality"

┌─────────────────┬─────────────────┬─────────────────┐
│   MY TASKS       │   MY MEETINGS    │   MY PATIENTS    │
│   🔴 3 High      │   📅 Today: 4    │   👥 Active: 28  │
│   🟡 7 Medium    │   📅 Week: 12    │   👤 New: 2      │
│   🟢 5 Low       │   ⏰ Next: 2pm   │   📊 Avg PVA: 8.2│
└─────────────────┴─────────────────┴─────────────────┘
```

#### 2. Today's Focus
- Top 3 priorities (manually set)
- Upcoming appointments
- Urgent tasks

#### 3. My Tasks (Filtered by Assignee)
- **Kanban Board View** (Not Started | In Progress | Done)
- **List View** (sorted by priority)
- **Calendar View** (by due date)
- Drag-and-drop to reprioritize

#### 4. My Meetings (Filtered by Attendee)
- Calendar view
- Meeting notes linked
- Action items generated

#### 5. My Projects (Filtered by Team Member)
- Project health indicators
- Timeline views
- Deliverables tracking

#### 6. My Patients (If doctor)
- Active patient list
- Treatment plans
- Follow-up reminders

---

## 🗄️ DATABASE ARCHITECTURE

### 1. **Tasks Database**
**Properties:**
- Task Name (Title)
- Assignee (Person - Multi-select for collaboration)
- Status (Status: Not Started | In Progress | Done | Blocked)
- Priority (Select: 🔴 High | 🟡 Medium | 🟢 Low)
- Due Date (Date)
- Time Estimate (Number - hours)
- Tags (Multi-select: Clinical | Admin | Marketing | Operations | Patient Care)
- Project (Relation → Projects)
- Created By (Created by)
- Created Date (Created time)
- Last Edited (Last edited time)
- Notes (Text)

**Views:**
- Kanban by Status
- List by Priority
- Calendar by Due Date
- My Tasks (Filtered)
- Overdue Tasks
- This Week
- High Priority

**Formulas:**
- Days Until Due: `dateBetween(prop("Due Date"), now(), "days")`
- Is Overdue: `if(prop("Due Date") < now(), "⚠️ OVERDUE", "")`
- Task Score (Priority + Due Date): Complex formula for auto-prioritization

### 2. **Meetings Database**
**Properties:**
- Meeting Name (Title)
- Date & Time (Date with time)
- Attendees (Person - Multi-select)
- Meeting Type (Select: Team | Client | Training | Planning | Review)
- Status (Select: Scheduled | Completed | Cancelled | Rescheduled)
- Duration (Number - minutes)
- Location (Select: Office | Zoom | Offsite)
- Agenda (Text)
- Notes (Text - rich)
- Action Items (Relation → Tasks)
- Recording Link (URL)
- Follow-up Required (Checkbox)

**Views:**
- Calendar View
- Upcoming Meetings
- My Meetings (Filtered)
- By Meeting Type
- Completed Meetings Archive

**Automations:**
- Auto-create follow-up tasks when "Follow-up Required" is checked
- Send Slack reminder 15 min before meeting
- Mark as completed 1 hour after end time if not updated

### 3. **Projects Database**
**Properties:**
- Project Name (Title)
- Status (Status: Planning | Active | On Hold | Completed | Cancelled)
- Team Members (Person - Multi-select)
- Project Owner (Person - single)
- Start Date (Date)
- Target End Date (Date)
- Actual End Date (Date)
- Progress (Number - 0-100%)
- Priority (Select: 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low)
- Budget (Number)
- Tags (Multi-select)
- Related Tasks (Relation → Tasks)
- Related Meetings (Relation → Meetings)
- Project Health (Formula)
- Deliverables (Text)

**Formulas:**
- Project Health: Based on progress vs timeline
- Days Remaining: `dateBetween(prop("Target End Date"), now(), "days")`
- On Track Status: `if(prop("Progress") >= (dateBetween(prop("Start Date"), now(), "days") / dateBetween(prop("Start Date"), prop("Target End Date"), "days") * 100), "✅ On Track", "⚠️ Behind")`

### 4. **Patients Database** (NEW)
**Properties:**
- Patient Name (Title)
- Patient ID (Text - from ChiroHD)
- Status (Select: New | Active | Inactive | Discharged)
- Assigned Doctor (Person)
- First Visit Date (Date)
- Last Visit Date (Date)
- Total Visits (Number)
- Visit Count Goal (Number)
- PVA (Formula: calculated visit average)
- Treatment Plan (Relation → Treatment Plans)
- Next Appointment (Date)
- Phone (Phone)
- Email (Email)
- Insurance Provider (Select)
- Notes (Text)
- Lifetime Value (Number - $)
- Outstanding Balance (Number - $)

**Views:**
- Active Patients
- New Patients This Month
- Patients by Doctor
- Patients Needing Follow-Up
- Drop-Off Risk (visits declining)
- High-Value Patients

**Automations:**
- Flag patients who haven't visited in 30 days
- Create follow-up task for doctors
- Update lifetime value from collections data

### 5. **Collections Database** (NEW - ChiroHD Integration)
**Properties:**
- Transaction Date (Date)
- Patient (Relation → Patients)
- Amount (Number - $)
- Payment Method (Select: Cash | Card | Insurance | Check)
- Service Type (Select: Adjustment | Therapy | Consultation | Other)
- Doctor (Person)
- ChiroHD Transaction ID (Text)
- Status (Select: Paid | Pending | Refunded)
- Import Date (Created time)

**Views:**
- Daily Collections
- Weekly Collections
- Monthly Collections
- Quarterly Collections
- YTD Collections
- By Doctor
- By Payment Method
- By Patient

**Rollup Calculations:**
- Daily Total
- Weekly Total
- Monthly Total
- Quarterly Total
- YTD Total
- Annual Total

### 6. **Visits Database** (NEW - ChiroHD Integration)
**Properties:**
- Visit Date (Date with time)
- Patient (Relation → Patients)
- Doctor (Person)
- Visit Type (Select: New Patient | Follow-Up | Therapy | Re-exam)
- ChiroHD Visit ID (Text)
- Treatment Notes (Text)
- Duration (Number - minutes)
- Import Date (Created time)

**Views:**
- Today's Visits
- This Week's Visits
- By Doctor
- By Patient
- Visit Type Analysis

**Rollup Calculations:**
- Daily Visit Count
- Weekly Visit Count
- OVA (Office Visit Average)

### 7. **Treatment Plans Database** (NEW)
**Properties:**
- Plan Name (Title)
- Patient (Relation → Patients)
- Doctor (Person)
- Start Date (Date)
- Recommended Visits (Number)
- Completed Visits (Rollup from Visits)
- Completion % (Formula)
- Status (Select: Active | Completed | Discontinued)
- Plan Cost (Number - $)
- Notes (Text)

### 8. **Business Goals Database** (Enhanced)
**Properties:**
- Goal Name (Title)
- Category (Select: Revenue | Patient Growth | Team | Operations | Marketing)
- Target Metric (Number)
- Current Progress (Number)
- Progress % (Formula)
- Target Date (Date)
- Owner (Person)
- Status (Status)
- Related Projects (Relation → Projects)

**Auto-Update from Analytics:**
- Revenue goals pull from Collections
- Patient goals pull from Patients database
- Visit goals pull from Visits database

### 9. **Resources & Documents Database** (Enhanced)
**Properties:**
- Document Name (Title)
- Type (Select: Policy | Protocol | Training | Clinical | Marketing | Form)
- Owner (Person)
- Status (Select: Draft | Published | Archived)
- Department (Select: Clinical | Admin | Marketing | Operations)
- Tags (Multi-select)
- Access Level (Select: All Staff | Doctors Only | Admin Only | Leadership)
- Last Updated (Last edited time)
- File/Link (Files & media or URL)
- Version (Text)

---

## 🎨 DESIGN SYSTEM (2025 Modern UI)

### Color Palette
```
Primary Brand: #2C5F7A (Professional Teal)
Secondary: #6B9AC4 (Soft Blue)
Success: #4CAF50 (Growth Green)
Warning: #FF9800 (Alert Orange)
Danger: #F44336 (Urgent Red)
Neutral: #455A64 (Dark Gray)
Background: #FAFAFA (Light Gray)
```

### Icons System
- 🏰 Home/Dashboard
- 👥 Team/People
- 📊 Analytics/Charts
- 💰 Money/Revenue
- 👤 New/Add
- ✅ Complete/Done
- 🔴 High Priority
- 🟡 Medium Priority
- 🟢 Low Priority
- 📅 Calendar/Schedule
- 🎯 Goals/Targets
- 📈 Growth/Trending Up
- 📉 Decline/Trending Down
- ⚠️ Warning/Alert
- 🔄 Sync/Refresh
- 📝 Notes/Documentation
- 🩺 Clinical/Medical
- 💊 Treatment/Care

### Typography
- **Headings:** Inter (clean, modern)
- **Body:** System default (performance)
- **Emojis:** Sparingly, only for quick visual scanning

### Layout Principles
- **Card-based design** for metrics
- **White space** for breathing room
- **Progressive disclosure** - details on demand
- **Mobile-responsive** layouts
- **Quick actions** always visible

---

## 🤖 AUTOMATIONS & BUTTONS

### 1. "Start My Day" Button
**Actions:**
- Opens daily note page (auto-created)
- Shows today's schedule
- Lists top 3 priorities
- Displays urgent tasks
- Shows today's patient appointments

### 2. "End of Day Report" Button
**Actions:**
- Generates summary:
  - Tasks completed today
  - Patients seen
  - Collections total
  - Tomorrow's priorities
- Emails report to team
- Archives completed items

### 3. "New Patient Intake" Button (For Doctors)
**Actions:**
- Creates new patient record
- Sets up initial treatment plan
- Creates follow-up tasks
- Assigns to doctor
- Sends welcome email template

### 4. "Quick Meeting Notes" Button
**Actions:**
- Creates meeting note page
- Auto-fills date/time
- Links to attendees
- Template for action items
- Adds to Meetings database

### 5. "Import ChiroHD Data" Button
**Actions:**
- Opens CSV upload
- Maps fields automatically
- Validates data
- Updates relevant databases
- Shows import summary
- Logs import history

### 6. "Weekly Team Sync" Automation
**Trigger:** Every Monday 8am
**Actions:**
- Creates team meeting page
- Pulls last week's metrics
- Lists outstanding projects
- Notifies team via Slack
- Adds to Meetings database

### 7. "Patient Follow-Up Reminder" Automation
**Trigger:** Patient hasn't visited in 25 days
**Actions:**
- Creates task for assigned doctor
- Sets priority to High
- Adds patient link
- Due in 5 days
- Sends notification

### 8. "Goal Progress Update" Automation
**Trigger:** End of each day
**Actions:**
- Updates goal progress from databases
- Calculates percentages
- Flags at-risk goals
- Sends weekly summary

---

## 📱 MOBILE OPTIMIZATION

### Mobile Dashboard Features
- Simplified metric cards
- Quick action buttons (larger)
- Swipe gestures for task management
- Voice notes for meeting summaries
- Offline mode for patient notes
- Push notifications for urgent items

---

## 🔄 CHIROHD INTEGRATION WORKFLOW

### Data Flow Architecture
```
ChiroHD → CSV Export → Notion Import
         ↓
    Automated/Manual Trigger
         ↓
    Data Validation & Mapping
         ↓
    Update Databases:
    - Patients
    - Visits
    - Collections
         ↓
    Trigger Automations:
    - Update Analytics
    - Flag Follow-Ups
    - Recalculate Goals
         ↓
    Dashboard Updates (Real-time)
```

### Import Mapping
**CSV Columns → Notion Properties**
- Patient_ID → Patient ID
- Patient_Name → Patient Name
- Visit_Date → Visit Date
- Payment_Amount → Amount
- Payment_Method → Payment Method
- Doctor_Name → Doctor (matched to Person)
- Service_Type → Service Type/Visit Type

### Validation Rules
- Check for duplicate entries
- Verify doctor names exist
- Validate date formats
- Confirm payment amounts are positive
- Flag missing required fields

---

## 📈 ANALYTICS FORMULAS

### Key Formulas

**Patient Visit Average (PVA)**
```
Total Visits for Patient / Months Since First Visit
```

**Office Visit Average (OVA) - Daily**
```
Sum of all visits today / Number of doctors working
```

**Patient Drop-Off Analysis**
```
Most common visit count where patients stop:
Mode of "Total Visits" for Inactive patients
```

**Revenue per Visit**
```
Total Collections / Total Visits
```

**Patient Lifetime Value**
```
Sum of all collections for patient
```

**Retention Rate**
```
(Active patients this month who were active last month) /
(Total active patients last month) × 100
```

**Collection Rate**
```
(Amount collected / Amount billed) × 100
```

---

## 🏗️ COMPLETE NOTION TEMPLATE BUILD GUIDE

### PART 1: METRICS CALCULATION DATABASES

#### Database 1: **METRICS_TRACKING** (Master Calculation Database)

This database automatically calculates all metrics across all time periods.

**Properties:**
1. **Metric Name** (Title) - Formula auto-populated
2. **Metric Type** (Select: PV | NP | PVA | Collections | OVA | DOV)
3. **Time Period** (Select: Daily | Weekly | Monthly | Quarterly | Yearly)
4. **Date Reference** (Date) - The date this metric is for
5. **Value** (Number) - The calculated value
6. **Previous Period Value** (Number) - For comparison
7. **Trend %** (Formula) - Percentage change
8. **Trend Indicator** (Formula) - ↑ ↓ → symbols
9. **Last Updated** (Last edited time)

**Metric-Specific Properties:**

For **PV (Patient Visits):**
- **Daily PV** (Rollup from Visits DB) - Count visits where Visit Date = today
- **Weekly PV** (Rollup) - Count visits in last 7 days
- **Monthly PV** (Rollup) - Count visits this month
- **Quarterly PV** (Rollup) - Count visits this quarter
- **Yearly PV** (Rollup) - Count visits this year

For **NP (New Patients):**
- **Daily NP** (Rollup from Patients DB) - Count where First Visit Date = today
- **Weekly NP** (Rollup) - Count where First Visit Date in last 7 days
- **Monthly NP** (Rollup) - Count where First Visit Date this month
- **Quarterly NP** (Rollup) - Count where First Visit Date this quarter
- **Yearly NP** (Rollup) - Count where First Visit Date this year

For **PVA (Patient Visit Average):**
- **Daily PVA** (Formula) - Today's visits / Active patients
- **Weekly PVA** (Formula) - Week visits / Active patients
- **Monthly PVA** (Formula) - Month visits / Active patients
- **Quarterly PVA** (Formula) - Quarter visits / Active patients
- **Yearly PVA** (Formula) - Year visits / Total patients

For **Collections:**
- **Daily Collections** (Rollup from Collections DB) - Sum where Transaction Date = today
- **Weekly Collections** (Rollup) - Sum last 7 days
- **Monthly Collections** (Rollup) - Sum this month
- **Quarterly Collections** (Rollup) - Sum this quarter
- **Yearly Collections** (Rollup) - Sum this year

For **OVA (Office Visit Average):**
- **Daily OVA** (Formula) - Total visits today / Number of doctors working
- **Weekly OVA** (Formula) - Total visits this week / 7 / Number of doctors
- **Monthly OVA** (Formula) - Total visits this month / Days in month / Doctors
- **Quarterly OVA** (Formula) - Total visits this quarter / Days in quarter / Doctors
- **Yearly OVA** (Formula) - Total visits this year / 365 / Doctors

For **DOV (Drop Off Visit):**
- **Monthly DOV** (Formula) - Mode of visit count where patients became inactive this month
- **Quarterly DOV** (Formula) - Mode of visit count where patients became inactive this quarter
- **Yearly DOV** (Formula) - Mode of visit count where patients became inactive this year
- **Drop Off Percentage** (Formula) - % of patients who dropped at this visit number

#### Database 2: **VISITS** (Enhanced from previous design)

**Core Properties:**
1. **Visit ID** (Title) - Auto-generated
2. **Visit Date** (Date with time) - When visit occurred
3. **Patient** (Relation → Patients)
4. **Doctor** (Person)
5. **Visit Type** (Select: New Patient | Follow-Up | Therapy | Re-exam | Adjustment)
6. **Visit Number** (Formula) - Count of this patient's visits up to this date
7. **ChiroHD Visit ID** (Text) - From import
8. **Treatment Notes** (Text)
9. **Duration** (Number - minutes)
10. **Amount Collected** (Number - $) - If payment made
11. **Import Date** (Created time)

**Calculated Properties for Metrics:**
12. **Is Today** (Formula)
```notion
if(formatDate(prop("Visit Date"), "YYYY-MM-DD") == formatDate(now(), "YYYY-MM-DD"), true, false)
```

13. **Is This Week** (Formula)
```notion
if(dateBetween(now(), prop("Visit Date"), "days") <= 7 and dateBetween(now(), prop("Visit Date"), "days") >= 0, true, false)
```

14. **Is This Month** (Formula)
```notion
if(formatDate(prop("Visit Date"), "YYYY-MM") == formatDate(now(), "YYYY-MM"), true, false)
```

15. **Is This Quarter** (Formula)
```notion
if(formatDate(prop("Visit Date"), "YYYY-Q") == formatDate(now(), "YYYY-Q"), true, false)
```

16. **Is This Year** (Formula)
```notion
if(formatDate(prop("Visit Date"), "YYYY") == formatDate(now(), "YYYY"), true, false)
```

17. **Week Number** (Formula)
```notion
formatDate(prop("Visit Date"), "w")
```

18. **Month Number** (Formula)
```notion
formatDate(prop("Visit Date"), "M")
```

19. **Quarter Number** (Formula)
```notion
formatDate(prop("Visit Date"), "Q")
```

20. **Year** (Formula)
```notion
formatDate(prop("Visit Date"), "YYYY")
```

**Views:**
- **All Visits** - Default table
- **Today's Visits** - Filter: Is Today = true
- **This Week** - Filter: Is This Week = true
- **This Month** - Filter: Is This Month = true
- **This Quarter** - Filter: Is This Quarter = true
- **This Year** - Filter: Is This Year = true
- **By Doctor** - Group by Doctor
- **By Patient** - Group by Patient
- **Calendar View** - By Visit Date

#### Database 3: **PATIENTS** (Enhanced)

**Core Properties:**
1. **Patient Name** (Title)
2. **Patient ID** (Text - from ChiroHD)
3. **Status** (Select: New | Active | Inactive | Discharged | At Risk)
4. **Assigned Doctor** (Person)
5. **First Visit Date** (Date)
6. **Last Visit Date** (Date)
7. **Phone** (Phone)
8. **Email** (Email)
9. **Insurance Provider** (Select)
10. **Notes** (Text)

**Visit Tracking Properties:**
11. **All Visits** (Relation → Visits) - All visits for this patient
12. **Total Visits** (Rollup from All Visits) - Count
13. **Visit Count Goal** (Number) - Target visits
14. **Visits This Week** (Rollup) - Count where Is This Week = true
15. **Visits This Month** (Rollup) - Count where Is This Month = true
16. **Visits This Quarter** (Rollup) - Count where Is This Quarter = true
17. **Visits This Year** (Rollup) - Count where Is This Year = true

**PVA Calculations:**
18. **Months Since First Visit** (Formula)
```notion
if(prop("First Visit Date"), dateBetween(now(), prop("First Visit Date"), "months"), 0)
```

19. **Days Since Last Visit** (Formula)
```notion
if(prop("Last Visit Date"), dateBetween(now(), prop("Last Visit Date"), "days"), 0)
```

20. **PVA (Overall)** (Formula)
```notion
if(prop("Months Since First Visit") > 0,
  round(prop("Total Visits") / prop("Months Since First Visit") * 10) / 10,
  prop("Total Visits"))
```

21. **Weekly PVA** (Formula)
```notion
if(dateBetween(now(), prop("First Visit Date"), "weeks") > 0,
  round(prop("Total Visits") / dateBetween(now(), prop("First Visit Date"), "weeks") * 10) / 10,
  prop("Total Visits"))
```

22. **At Risk Flag** (Formula)
```notion
if(prop("Days Since Last Visit") > 30 and prop("Status") == "Active", "⚠️ AT RISK", "")
```

**Financial Properties:**
23. **All Collections** (Relation → Collections)
24. **Lifetime Value** (Rollup from Collections) - Sum of Amount
25. **Collections This Month** (Rollup) - Sum where Is This Month = true
26. **Collections This Year** (Rollup) - Sum where Is This Year = true
27. **Outstanding Balance** (Number - $)
28. **Average Collection Per Visit** (Formula)
```notion
if(prop("Total Visits") > 0,
  round(prop("Lifetime Value") / prop("Total Visits") * 100) / 100,
  0)
```

**Status Auto-Update Formulas:**
29. **Auto Status** (Formula)
```notion
if(prop("Days Since Last Visit") == 0, "New",
  if(prop("Days Since Last Visit") > 90, "Inactive",
    if(prop("Days Since Last Visit") > 30, "At Risk",
      "Active")))
```

**Views:**
- **Active Patients** - Filter: Status = Active
- **New This Month** - Filter: First Visit Date this month
- **At Risk** - Filter: Days Since Last Visit > 30
- **Inactive** - Filter: Status = Inactive
- **By Doctor** - Group by Assigned Doctor
- **High Value** - Sort by Lifetime Value descending
- **Drop Off Analysis** - Group by Total Visits (for DOV calculation)

#### Database 4: **COLLECTIONS** (Enhanced)

**Core Properties:**
1. **Transaction ID** (Title) - Auto-generated
2. **Transaction Date** (Date)
3. **Patient** (Relation → Patients)
4. **Amount** (Number - $)
5. **Payment Method** (Select: Cash | Card | Insurance | Check | Other)
6. **Service Type** (Select: Adjustment | Therapy | Consultation | X-Ray | Other)
7. **Doctor** (Person)
8. **ChiroHD Transaction ID** (Text)
9. **Status** (Select: Paid | Pending | Refunded)
10. **Import Date** (Created time)

**Time Period Formulas (Same as Visits):**
11. **Is Today** (Formula) - Same as Visits #12
12. **Is This Week** (Formula) - Same as Visits #13
13. **Is This Month** (Formula) - Same as Visits #14
14. **Is This Quarter** (Formula) - Same as Visits #15
15. **Is This Year** (Formula) - Same as Visits #16
16. **Week Number** (Formula)
17. **Month Number** (Formula)
18. **Quarter Number** (Formula)
19. **Year** (Formula)

**Views:**
- **All Collections**
- **Today** - Filter: Is Today = true
- **This Week** - Filter: Is This Week = true
- **This Month** - Filter: Is This Month = true
- **This Quarter** - Filter: Is This Quarter = true
- **This Year** - Filter: Is This Year = true
- **By Doctor** - Group by Doctor
- **By Patient** - Group by Patient
- **By Payment Method** - Group by Payment Method
- **Calendar View** - By Transaction Date

#### Database 5: **DASHBOARD_METRICS** (Live Dashboard Data)

This database holds one row per metric that displays on the dashboard.

**Properties:**
1. **Metric Display Name** (Title) - e.g., "PV - Daily"
2. **Metric Code** (Select: PV | NP | PVA | Collections | OVA | DOV)
3. **Time Period** (Select: Daily | Weekly | Monthly | Quarterly | Yearly)
4. **Current Value** (Formula) - Pulls from appropriate database
5. **Previous Period Value** (Formula)
6. **Trend %** (Formula)
7. **Trend Icon** (Formula)
8. **Display Order** (Number) - For sorting on dashboard
9. **Card Color** (Select) - For visual organization
10. **Last Calculated** (Last edited time)

**Example Formula for "PV - Daily Current Value":**
```notion
let visits = prop("Related Visits");
let todayVisits = filter(visits, current.prop("Is Today") == true);
length(todayVisits)
```

**Example Formula for "Collections - Monthly Current Value":**
```notion
let collections = prop("Related Collections");
let thisMonth = filter(collections, current.prop("Is This Month") == true and current.prop("Status") == "Paid");
sum(map(thisMonth, current.prop("Amount")))
```

**Example Formula for "PVA - Yearly":**
```notion
let patients = prop("Related Patients");
let activePatients = filter(patients, current.prop("Status") == "Active");
let totalVisits = sum(map(activePatients, current.prop("Visits This Year")));
let patientCount = length(activePatients);
if(patientCount > 0, round(totalVisits / patientCount * 10) / 10, 0)
```

**Example Formula for "DOV - Monthly":**
```notion
// Find most common visit count where patients became inactive this month
let patients = prop("Related Patients");
let inactiveThisMonth = filter(patients,
  current.prop("Status") == "Inactive" and
  formatDate(current.prop("Last Visit Date"), "YYYY-MM") == formatDate(now(), "YYYY-MM")
);
// Calculate mode of Total Visits
// This requires a complex formula or manual tracking
// For Notion, recommend creating a separate analysis view
"Visit " + prop("Manual DOV Entry")
```

**Trend % Formula:**
```notion
if(prop("Previous Period Value") > 0,
  round((prop("Current Value") - prop("Previous Period Value")) / prop("Previous Period Value") * 1000) / 10,
  0)
```

**Trend Icon Formula:**
```notion
if(prop("Trend %") > 5, "↑",
  if(prop("Trend %") < -5, "↓",
    "→"))
```

### PART 2: DASHBOARD PAGE SETUP

#### Master Dashboard Page Structure

**Page Layout:**
```
🏰 Van Every Chiropractic Command Center
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Today's Date: {{now|date}}

┌─────────────────────────────────────────┐
│          LIVE PRACTICE METRICS          │
└─────────────────────────────────────────┘

[Toggle Block: PV - Patient Visits]
  ├─ Linked Database View → DASHBOARD_METRICS
  ├─ Filter: Metric Code = PV
  ├─ Board View by Time Period
  └─ Show: Metric Name | Current Value | Trend % | Trend Icon

[Toggle Block: NP - New Patients]
  ├─ Linked Database View → DASHBOARD_METRICS
  ├─ Filter: Metric Code = NP
  ├─ Board View by Time Period
  └─ Show: Metric Name | Current Value | Trend % | Trend Icon

[Toggle Block: PVA - Patient Visit Average]
  ├─ Linked Database View → DASHBOARD_METRICS
  ├─ Filter: Metric Code = PVA
  ├─ Board View by Time Period
  └─ Show: Metric Name | Current Value | Trend % | Trend Icon

[Toggle Block: Collections]
  ├─ Linked Database View → DASHBOARD_METRICS
  ├─ Filter: Metric Code = Collections
  ├─ Board View by Time Period
  └─ Show: Metric Name | Current Value | Trend % | Trend Icon

[Toggle Block: OVA - Office Visit Average]
  ├─ Linked Database View → DASHBOARD_METRICS
  ├─ Filter: Metric Code = OVA
  ├─ Board View by Time Period
  └─ Show: Metric Name | Current Value | Trend % | Trend Icon

[Toggle Block: DOV - Drop Off Visit]
  ├─ Linked Database View → DASHBOARD_METRICS
  ├─ Filter: Metric Code = DOV
  ├─ Board View by Time Period
  └─ Show: Metric Name | Current Value | Trend % | Trend Icon

┌─────────────────────────────────────────┐
│         CHIROHD DATA SYNC               │
└─────────────────────────────────────────┘

[Button: Import ChiroHD Data]
[Display: Last Sync Time]
[Display: Records Imported Count]
```

#### Creating Metric Cards (Step-by-Step)

**For Each Metric (PV, NP, PVA, Collections, OVA, DOV):**

1. Create 5 entries in DASHBOARD_METRICS:
   - [Metric] - Daily
   - [Metric] - Weekly
   - [Metric] - Monthly
   - [Metric] - Quarterly
   - [Metric] - Yearly

2. Set up formulas for each to pull from appropriate source

3. Create linked database view on Dashboard

4. Apply filters and formatting

5. Use callout blocks or synced blocks for visual appeal

### PART 3: COMPLETE FORMULA REFERENCE

#### Time Period Detection Formulas

**Is Today:**
```notion
formatDate(prop("Date Field"), "YYYY-MM-DD") == formatDate(now(), "YYYY-MM-DD")
```

**Is This Week:**
```notion
and(
  dateBetween(now(), prop("Date Field"), "days") <= 7,
  dateBetween(now(), prop("Date Field"), "days") >= 0,
  toNumber(formatDate(prop("Date Field"), "w")) == toNumber(formatDate(now(), "w"))
)
```

**Is This Month:**
```notion
formatDate(prop("Date Field"), "YYYY-MM") == formatDate(now(), "YYYY-MM")
```

**Is This Quarter:**
```notion
and(
  formatDate(prop("Date Field"), "YYYY") == formatDate(now(), "YYYY"),
  ceil(toNumber(formatDate(prop("Date Field"), "M")) / 3) == ceil(toNumber(formatDate(now(), "M")) / 3)
)
```

**Is This Year:**
```notion
formatDate(prop("Date Field"), "YYYY") == formatDate(now(), "YYYY")
```

#### Metric Calculation Formulas

**PV (Patient Visits) - Daily:**
```notion
// In DASHBOARD_METRICS, create relation to Visits
// Then use rollup: Count of Related Visits where Is Today = true
```

**NP (New Patients) - Weekly:**
```notion
// In DASHBOARD_METRICS, create relation to Patients
// Rollup: Count where Is This Week = true (based on First Visit Date)
```

**PVA (Patient Visit Average) - Monthly:**
```notion
let activePatients = length(filter(prop("Related Patients"), current.prop("Status") == "Active"));
let monthVisits = sum(filter(prop("Related Visits"), current.prop("Is This Month") == true));
if(activePatients > 0, round(monthVisits / activePatients * 10) / 10, 0)
```

**Collections - Quarterly:**
```notion
sum(map(
  filter(prop("Related Collections"),
    current.prop("Is This Quarter") == true and current.prop("Status") == "Paid"
  ),
  current.prop("Amount")
))
```

**OVA (Office Visit Average) - Daily:**
```notion
let doctorsWorking = 3; // Set based on your practice
let todayVisits = length(filter(prop("Related Visits"), current.prop("Is Today") == true));
if(doctorsWorking > 0, round(todayVisits / doctorsWorking * 10) / 10, todayVisits)
```

**DOV (Drop Off Visit) - Calculation Method:**
```notion
// Create a separate analysis database
// Group inactive patients by Total Visits
// Manually identify the visit number with highest count
// This is difficult to automate in Notion formulas
// Recommend using a helper database:

DATABASE: DOV_ANALYSIS
- Visit Number (1-50)
- Inactive Count (Rollup: Count of patients with this visit count who are inactive)
- Percentage (Formula: This count / Total inactive * 100)
- Sort by Inactive Count descending
- Top result = DOV
```

### PART 4: AUTOMATION SETUP

#### Button 1: Daily Metrics Refresh

**Button Name:** "🔄 Refresh All Metrics"

**Actions:**
1. Update timestamp on DASHBOARD_METRICS entries
2. Trigger recalculation of all formulas
3. Show toast: "Metrics refreshed at [time]"

**Implementation:**
- Add button to dashboard
- Action: Edit property on all DASHBOARD_METRICS entries
- Change "Last Calculated" to now()
- This forces Notion to recalculate all formulas

#### Button 2: Import ChiroHD Data

**Button Name:** "📥 Import ChiroHD CSV"

**Actions:**
1. Open import dialog
2. Map CSV columns to database properties
3. Validate data
4. Insert into appropriate databases
5. Update Last Sync timestamp

**CSV Column Mapping:**
```
ChiroHD CSV → Notion Database

VISITS CSV:
- visit_id → Visits: ChiroHD Visit ID
- patient_id → Find/Create in Patients: Patient ID
- visit_date → Visits: Visit Date
- doctor_name → Visits: Doctor (match to Person)
- visit_type → Visits: Visit Type
- notes → Visits: Treatment Notes

COLLECTIONS CSV:
- transaction_id → Collections: ChiroHD Transaction ID
- patient_id → Collections: Patient (relation)
- amount → Collections: Amount
- payment_date → Collections: Transaction Date
- payment_method → Collections: Payment Method
- doctor_name → Collections: Doctor

PATIENTS CSV:
- patient_id → Patients: Patient ID
- patient_name → Patients: Patient Name
- first_visit → Patients: First Visit Date
- phone → Patients: Phone
- email → Patients: Email
- insurance → Patients: Insurance Provider
```

#### Automation 1: Daily Metrics Email

**Trigger:** Every day at 8:00 AM

**Actions:**
1. Generate summary of yesterday's metrics
2. Email to team with:
   - PV (all time periods)
   - NP (all time periods)
   - Collections (all time periods)
   - Top performing doctor
   - Patients at risk
3. Include comparison to previous period

#### Automation 2: Patient At-Risk Alerts

**Trigger:** Daily at 9:00 AM

**Actions:**
1. Check all Active patients
2. Find patients where Days Since Last Visit > 30
3. Create task for assigned doctor
4. Send notification
5. Update patient status to "At Risk"

#### Automation 3: Weekly Team Report

**Trigger:** Every Monday at 7:00 AM

**Actions:**
1. Generate comprehensive weekly report
2. Include all metrics
3. Show week-over-week trends
4. List top achievements
5. Flag areas needing attention
6. Email to entire team

### PART 5: STEP-BY-STEP BUILD INSTRUCTIONS

#### Step 1: Create Core Databases (30 minutes)

1. **Create Visits Database**
   - New database (table)
   - Name: "VISITS"
   - Add all properties from Database 2 above
   - Add all formulas (Is Today, Is This Week, etc.)
   - Create all views

2. **Create Patients Database**
   - New database (table)
   - Name: "PATIENTS"
   - Add all properties from Database 3
   - Create relation to Visits
   - Add rollup and formula properties
   - Create all views

3. **Create Collections Database**
   - New database (table)
   - Name: "COLLECTIONS"
   - Add all properties from Database 4
   - Create relation to Patients
   - Add time period formulas
   - Create all views

#### Step 2: Set Up Relations (15 minutes)

1. **Patients ↔ Visits**
   - In Visits: Add relation property "Patient" → Patients database
   - In Patients: Relation auto-created "All Visits"
   - Set up rollups in Patients for visit counts

2. **Patients ↔ Collections**
   - In Collections: Add relation "Patient" → Patients database
   - In Patients: Relation auto-created "All Collections"
   - Set up rollups for financial metrics

#### Step 3: Create Dashboard Metrics Database (45 minutes)

1. **Create DASHBOARD_METRICS database**
   - New database (table)
   - Name: "DASHBOARD_METRICS"
   - Add all properties from Database 5

2. **Create 30 entries** (6 metrics × 5 time periods):
   - PV - Daily, Weekly, Monthly, Quarterly, Yearly
   - NP - Daily, Weekly, Monthly, Quarterly, Yearly
   - PVA - Daily, Weekly, Monthly, Quarterly, Yearly
   - Collections - Daily, Weekly, Monthly, Quarterly, Yearly
   - OVA - Daily, Weekly, Monthly, Quarterly, Yearly
   - DOV - Monthly, Quarterly, Yearly (only these)

3. **Add relations**:
   - Related Visits → Visits database
   - Related Patients → Patients database
   - Related Collections → Collections database

4. **Configure formulas** for each entry:
   - Current Value (pulls from appropriate source)
   - Previous Period Value
   - Trend %
   - Trend Icon

#### Step 4: Build Dashboard Page (30 minutes)

1. **Create new page**: "🏰 Van Every Chiropractic Command Center"

2. **Add Hero Section**:
   - Heading 1: "🏰 Van Every Chiropractic Command Center"
   - Text: "Today's Date: " + {{date:now}}

3. **Add Metric Sections**:
   For each metric (PV, NP, PVA, Collections, OVA, DOV):

   a. Add toggle block with metric name

   b. Inside toggle: Add linked database

   c. Source: DASHBOARD_METRICS

   d. Filter: Metric Code = [current metric]

   e. View: Board grouped by Time Period

   f. Properties to show:
      - Metric Display Name
      - Current Value
      - Previous Period Value
      - Trend %
      - Trend Icon

   g. Apply conditional formatting:
      - Trend % > 5: Green
      - Trend % < -5: Red
      - Else: Yellow

4. **Add ChiroHD Integration Section**:
   - Callout block
   - Add "Import ChiroHD Data" button
   - Add text: "Last Sync: [timestamp]"

#### Step 5: Test with Sample Data (20 minutes)

1. **Add sample visits** (20-30 entries):
   - Various dates (today, this week, last month, etc.)
   - Multiple patients
   - Different doctors

2. **Add sample patients** (10-15 entries):
   - Mix of new, active, inactive
   - Various first visit dates
   - Different visit counts

3. **Add sample collections** (20-30 entries):
   - Matching visit dates
   - Various amounts
   - Different payment methods

4. **Verify metrics calculate correctly**:
   - Check each dashboard card
   - Verify formulas working
   - Confirm trends showing

#### Step 6: Configure Automations (15 minutes)

1. **Add refresh button**:
   - Button block on dashboard
   - Action: Update "Last Calculated" property on all DASHBOARD_METRICS

2. **Set up import process**:
   - Document CSV format requirements
   - Create import template
   - Test import with sample data

3. **Configure notifications** (if using Notion automation tools):
   - Daily metrics email
   - At-risk patient alerts
   - Weekly team report

---

## 🎯 IMPLEMENTATION PHASES

### Phase 1: Core Structure ✅ (We are here)
- Main dashboard
- Team dashboards
- Basic databases (Tasks, Meetings, Projects)

### Phase 2: Analytics Integration (Next)
- Patients database
- Visits database
- Collections database
- Treatment Plans database
- Analytics formulas

### Phase 3: Automation Layer
- All button automations
- Scheduled automations
- ChiroHD integration setup

### Phase 4: Advanced Features
- Mobile optimization
- Advanced reporting
- Predictive analytics
- AI-powered insights

---

## 📦 TEMPLATE DELIVERABLES

When complete, you'll receive:

1. **Notion Template Link** - One-click duplicate
2. **Setup Guide** (PDF) - Step-by-step configuration
3. **ChiroHD Integration Guide** - CSV import instructions
4. **Formula Reference Sheet** - All calculations explained
5. **Video Walkthrough** - 15-minute template tour
6. **Team Training Slides** - For staff onboarding

---

## 🚀 NEXT STEPS

1. ✅ Research complete
2. ⏳ Build template in test workspace
3. ⏳ Add all databases with formulas
4. ⏳ Set up automations
5. ⏳ Design analytics dashboards
6. ⏳ Test all features
7. ⏳ Create documentation
8. ⏳ Export as duplicatable template
9. ⏳ Deliver to you!

**Estimated Completion:** 4-6 hours of focused work
**Your Action Required:** Duplicate template + 30 min setup

---

**This is going to be AMAZING!** 🚀

You'll have a practice management system that rivals $10k/month SaaS platforms,
all running in Notion with your team's familiar workflow.
