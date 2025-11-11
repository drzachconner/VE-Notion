# 📊 VDA & FDA - Implementation Plan

**Date Created:** 2025-11-08
**Updated:** 2025-11-08 (Added FDA)
**Status:** Pending - To implement after ChiroTouch automation is complete
**Metrics:**
- VDA (Visit Drop Average) - NOT TVA (Terminal Visit Average)
- FDA (Frequency Drop Average) - NEW metric

---

## 🎯 WHAT IS VDA?

**Visit Drop Average (VDA)** is the average visit number at which patients discontinue care (become inactive).

### **Example:**
- If VDA = 8, that means the average patient stops coming in after their 8th visit
- This metric helps identify retention problems and optimize care plans

### **Difference from PVA:**
- **PVA** (Patient Visit Average) = Average visits per NEW patient (includes active patients)
- **VDA** (Visit Drop Average) = Average visits per INACTIVE patient (only those who stopped)

**VDA is typically lower than PVA** since it only counts patients who dropped off, not those still in active care.

---

## 🎯 WHAT IS FDA?

**Frequency Drop Average (FDA)** is the average visit number at which patients first experience a 30+ day gap between visits (frequency drop).

### **Example:**
- Patient visits 1-5 are weekly (optimal frequency)
- 35-day gap occurs before visit 6
- FDA = 5 (patient dropped frequency after 5th visit)

### **Difference from VDA:**
- **FDA** = First time patient has 30+ day gap (frequency drop)
- **VDA** = When patient becomes fully inactive (90+ days)

**FDA is always lower than VDA** since frequency drops happen before full inactivity.

### **Why FDA Matters:**

**Early Warning System:**
- Catches retention problems 60+ days earlier than VDA
- Identifies patients "slipping away" before they're gone
- Creates opportunity for re-engagement intervention

**Example Scenario:**
- Patient optimal frequency: 1-2 weeks
- FDA = 6 (frequency drops after 6th visit)
- VDA = 9 (fully inactive after 9th visit)
- **Intervention window:** 3 visits to re-engage patient

### **FDA Threshold: 30 Days**

**Why 30 days?**
- Typical wellness care: 2-4 week intervals
- Typical active care: 1-2 week intervals
- 30+ days = clear deviation from plan
- Enough time to indicate dropping, not just scheduling delay

**Alternative Thresholds:**
- Conservative: 45 days (fewer false positives)
- Aggressive: 21 days (catches drops sooner)
- Custom: Based on your average recommended frequency

---

## 📁 WHERE VDA DATA LIVES IN CHIROTOUCH

ChiroTouch doesn't have a pre-built "Visit Drop Average" report, but has all the data needed to calculate it.

### **Key ChiroTouch Features:**

1. **Advanced Patient Search**
   - Filter by: Last visit date range
   - Filter by: Visit count
   - Export: CSV with patient visit counts

2. **System Settings: Inactivity Rule**
   - Location: System Settings → "Days before pending inactive"
   - Default: 90 days (customize as needed)
   - Defines when a patient is considered "inactive"

3. **Health Check Report**
   - Location: Health Check → Patients Without Future Appointments
   - Shows: Patients recently seen with no next appointment
   - Export: CSV

4. **Reporting: Pending Inactive**
   - Location: Reporting → Simple Reporting → Pending Inactive
   - Shows: Patients who have crossed the inactivity threshold
   - Export: CSV

5. **Trends Dashboard**
   - Tracks visit-number milestones:
     - NP (New Patient) = 1st visit
     - INP (Initial New Patient) = 2nd visit
     - ENP (Established New Patient) = 5th visit
   - Useful for retention analysis by visit number

6. **Retention Monitoring**
   - Reporting feature explicitly tracks new-patient retention
   - Can be exported for analysis

---

## 📁 WHERE FDA DATA LIVES IN CHIROTOUCH

### **Key ChiroTouch Features for FDA:**

1. **Patient Visit History Report**
   - Location: Reporting → Patient Visit History
   - Shows: All visits for each patient with dates
   - Export: CSV with Patient ID, Visit Number, Visit Date
   - Required for FDA calculation

2. **Advanced Patient Search (Detailed Visit Data)**
   - Filter by: Date range
   - Include columns: Patient ID, Visit Dates (all)
   - Export: CSV with complete visit timeline
   - Most comprehensive for FDA analysis

3. **Appointment History Export**
   - Location: Reports → Appointment History
   - Shows: Completed appointments with dates
   - Useful for calculating gaps between visits

---

## 🔢 HOW TO CALCULATE VDA

### **Step-by-Step Process:**

#### **Step 1: Set Inactivity Rule**
1. Open ChiroTouch
2. Navigate to: **System Settings → Days before pending inactive**
3. Set to: **90 days** (or your preferred threshold)
4. Save

#### **Step 2: Export Inactive Patient Data**

**Option A: Pending Inactive Report (Recommended)**
1. Navigate to: **Reporting → Simple Reporting → Pending Inactive**
2. Date range: Last 12 months (or custom)
3. Click: **Export CSV**
4. Save as: `Pending_Inactive_[DATE].csv`

**Option B: Health Check Report**
1. Navigate to: **Health Check → Patients Without Future Appointments**
2. Click: **Export CSV**
3. Save as: `No_Future_Appointments_[DATE].csv`

**Option C: Advanced Patient Search (Most Control)**
1. Navigate to: **Advanced Patient Search**
2. Add filters:
   - Last Visit Date: More than 90 days ago
   - Status: Active (to exclude discharged)
3. Include columns:
   - Patient ID (no names - HIPAA!)
   - Last Visit Date
   - **Visit Count** ← Critical field
4. Export CSV
5. Save as: `Inactive_Patients_[DATE].csv`

#### **Step 3: Calculate VDA in Google Sheets**

**Upload CSV to Google Drive:**
- Import CSV into Google Sheets
- Verify "Visit Count" column exists

**Calculate VDA:**
```
=AVERAGE(Visit_Count_Column)
```

**Additional Metrics to Calculate:**
```
Mean VDA:    =AVERAGE(B:B)
Median VDA:  =MEDIAN(B:B)
Mode VDA:    =MODE(B:B)
Min VDA:     =MIN(B:B)
Max VDA:     =MAX(B:B)
```

**Drop-Off Distribution Table:**
```
Visit #  | Count of Patients Who Dropped
---------|-----------------------------
1        | =COUNTIF(B:B,1)
2        | =COUNTIF(B:B,2)
3        | =COUNTIF(B:B,3)
...      | ...
```

---

## 📊 INTEGRATION WITH CURRENT SYSTEM

### **Where VDA Fits:**

```
ChiroTouch
    ↓ (Manual CSV export - Monthly or Quarterly)
Google Sheets "VDA Analysis" Tab (NEW)
    ↓ (Calculate VDA)
Google Sheets "Clinic Totals" Column (NEW: Column O or later)
    ↓ (Automated sync - READY_TO_USE_SYNC_CODE.js)
Notion DAILY_STATS Database
    ↓ (Display in Command Center)
Van Every Command Center Dashboard
```

### **Current Metrics Structure:**

**Already Syncing:**
- Column C: # of New Leads
- Column D: # of New Patient (NP)
- Column E: Lead Conversion %
- Column F: Active Care Presented
- Column G: Active Care Accepted
- Column H: Active Care Conversion %
- Column I: Wellness Presented
- Column J: Wellness Accepted
- Column K: Wellness Conversion %
- Column L: Regular Patient Visits
- Column M: Total Patient Visits (PV)
- Column N: Collections

**Auto-Calculated in Notion:**
- OVA = Collections ÷ Patient Visits
- PVA = Patient Visits ÷ New Patients
- CVA = OVA × PVA

**To Add (Future):**
- Column O: VDA (Visit Drop Average)
- Column P: FDA (Frequency Drop Average)

---

## 🔢 HOW TO CALCULATE FDA

### **Step-by-Step Process:**

#### **Step 1: Export Patient Visit History**

**Patient Visit History Report (Required)**
1. Navigate to: **Reporting → Patient Visit History**
2. Date range: Last 12 months
3. Include columns:
   - Patient ID (no names!)
   - Visit Number
   - Visit Date
4. Export CSV
5. Save as: `Visit_History_[DATE].csv`

#### **Step 2: Calculate Gaps in Google Sheets**

**Upload CSV and add calculation columns:**

| Patient ID | Visit # | Visit Date | Days Since Last | First 30+ Day Gap? |
|------------|---------|------------|-----------------|---------------------|
| 1001       | 1       | 2025-01-05 | -               | No                  |
| 1001       | 2       | 2025-01-12 | 7               | No                  |
| 1001       | 3       | 2025-01-19 | 7               | No                  |
| 1001       | 4       | 2025-02-25 | **37**          | **Yes - Visit 3**   |
| 1001       | 5       | 2025-03-05 | 8               | (Already flagged)   |

**Key Insight:** FDA = 3 for this patient (frequency dropped AFTER visit 3, before visit 4)

**Formula for "Days Since Last" (Cell D3):**
```
=IF(A3=A2, C3-C2, "")
```

**Formula for "First 30+ Day Gap?" (Cell E3):**
```
=IF(AND(A3=A2, D3>30, COUNTIFS($A$2:A2,A3,$E$2:E2,"Yes*")=0), "Yes - Visit " & (B3-1), "No")
```

#### **Step 3: Calculate Average FDA**

**Extract FDA values per patient:**
- Filter column E for cells starting with "Yes"
- Extract visit number from text
- Calculate average

**FDA Formula (Cell H2):**
```
=AVERAGE(IF(LEFT(E:E,3)="Yes", VALUE(MID(E:E,13,2)), ""))
```
(Array formula - enter with Ctrl+Shift+Enter)

#### **Step 4: Integration with Clinic Totals**

**Link FDA to Column P:**
```
='FDA Analysis'!$H$2
```

**Updates monthly** (same as VDA)

---

## 🛠️ IMPLEMENTATION ROADMAP

### **Phase 1: Manual Testing (1-2 weeks)**

**Week 1:**
- [ ] Set ChiroTouch inactivity rule to 90 days
- [ ] Run test export using Advanced Patient Search
- [ ] Verify "Visit Count" column is present
- [ ] Import CSV to Google Sheets
- [ ] Calculate manual VDA

**Week 2:**
- [ ] Analyze VDA trends over last 3-6 months
- [ ] Create drop-off distribution chart
- [ ] Identify most common drop-off visit numbers
- [ ] Present findings to team

**Deliverable:** Understanding of current VDA baseline

---

### **Phase 2: Google Sheets Integration (1 week)**

- [ ] Create new tab: "VDA Analysis"
- [ ] Set up CSV import area
- [ ] Add VDA calculation formulas
- [ ] Add Column O to "Clinic Totals": VDA
- [ ] Link VDA from "VDA Analysis" → "Clinic Totals"
- [ ] Test manual updates

**Deliverable:** VDA visible in Clinic Totals, ready for automation

---

### **Phase 3: Notion Sync Update (1 hour)**

**Update READY_TO_USE_SYNC_CODE.js:**

Add VDA and FDA to data extraction (around line 125):
```javascript
const data = {
  newLeads: rowData[2] || 0,              // Column C
  newPatients: rowData[3] || 0,           // Column D
  activeCarePresented: rowData[5] || 0,   // Column F
  activeCareAccepted: rowData[6] || 0,    // Column G
  wellnessPresented: rowData[8] || 0,     // Column I
  wellnessAccepted: rowData[9] || 0,      // Column J
  patientVisits: rowData[12] || 0,        // Column M
  collections: rowData[13] || 0,          // Column N
  vda: rowData[14] || 0,                  // Column O - NEW
  fda: rowData[15] || 0                   // Column P - NEW
};
```

Add VDA and FDA to Notion sync (around line 165):
```javascript
'VDA': {
  number: dailyData.vda
},
'FDA': {
  number: dailyData.fda
}
```

**Add Properties to DAILY_STATS:**
- Type: Number
- Name: VDA
- Format: Decimal (1 decimal place)

- Type: Number
- Name: FDA
- Format: Decimal (1 decimal place)

**Update Command Center Callout:**
Already done! Shows:
```
Latest Stats — [Date]
NP: [value]
PV: [value]
OVA: [value]
PVA: [value]
CVA: [value]
VDA: [value]  ← Ready to populate
FDA: [value]  ← Ready to populate
Collections: [value]
```

**Deliverable:** VDA and FDA auto-syncing from Google Sheets to Notion

---

### **Phase 4: Automation (Future - Optional)**

**n8n Workflow for VDA:**

**Trigger:** Monthly (1st of month at 9am)

**Process:**
1. Export Pending Inactive report from ChiroTouch (if API access possible)
2. Parse CSV to JSON
3. Calculate VDA (average of visit counts)
4. Update Google Sheets "VDA Analysis" tab
5. VDA flows to "Clinic Totals" via existing formulas
6. Existing sync pushes to Notion at 8pm

**Alternative (No API):**
- Keep monthly manual export (5 minutes)
- Import CSV to Google Sheets
- VDA calculates automatically via formulas
- Syncs to Notion automatically

**Deliverable:** Fully automated VDA tracking (or semi-automated if no API)

---

## 📈 GOOGLE SHEETS FORMULAS (READY TO USE)

### **Tab: "VDA Analysis" - Setup**

**Column Headers:**
- A: Patient ID (no names!)
- B: Last Visit Date
- C: Visit Count
- D: Days Since Last Visit

**Formulas:**

**Cell F2: Mean VDA**
```
=AVERAGE(C2:C1000)
```

**Cell F3: Median VDA**
```
=MEDIAN(C2:C1000)
```

**Cell F4: Mode VDA (Most Common)**
```
=MODE(C2:C1000)
```

**Cell F5: Total Inactive Patients**
```
=COUNTA(C2:C1000)
```

---

### **Drop-Off Distribution Table**

**Starting at H1:**

| Visit # | Count | Percentage |
|---------|-------|------------|
| 1       | =COUNTIF(C:C,1) | =I2/$F$5 |
| 2       | =COUNTIF(C:C,2) | =I3/$F$5 |
| 3       | =COUNTIF(C:C,3) | =I4/$F$5 |
| 4       | =COUNTIF(C:C,4) | =I5/$F$5 |
| 5       | =COUNTIF(C:C,5) | =I6/$F$5 |
| 6       | =COUNTIF(C:C,6) | =I7/$F$5 |
| 7       | =COUNTIF(C:C,7) | =I8/$F$5 |
| 8       | =COUNTIF(C:C,8) | =I9/$F$5 |
| 9       | =COUNTIF(C:C,9) | =I10/$F$5 |
| 10      | =COUNTIF(C:C,10) | =I11/$F$5 |

Continue to visit 20+

---

### **Link VDA to Clinic Totals**

**In "Clinic Totals" Column O (Row 2):**
```
='VDA Analysis'!$F$2
```

**Copy down for all rows** (VDA updates monthly, so same value repeats until next calculation)

**Alternative (Monthly Update):**
- Only update VDA on 1st of month
- Use IF statement to check date:
```
=IF(DAY(B2)=1,'VDA Analysis'!$F$2,O1)
```
This copies previous VDA except on 1st of month when it updates.

---

## 📊 INTERPRETING VDA & FDA

### **VDA Benchmark Ranges:**

- **VDA < 5:** Poor retention - patients dropping before completing initial care
- **VDA 5-8:** Below average - opportunity for improvement
- **VDA 8-12:** Average retention - typical for many practices
- **VDA 12-20:** Good retention - patients completing care plans
- **VDA > 20:** Excellent retention - strong patient commitment

### **FDA Benchmark Ranges:**

- **FDA < 3:** Critical - patients dropping frequency before completing initial care phase
- **FDA 3-5:** Poor - frequency drops early in care plan
- **FDA 6-10:** Average - typical frequency drop mid-care
- **FDA 11-15:** Good - maintaining frequency through most of care plan
- **FDA > 15:** Excellent - strong adherence to recommended frequency

**Note:** FDA should always be **lower than VDA** (frequency drops before full inactivity)

### **VDA vs PVA Relationship:**

**Healthy Practice:**
- PVA should be **higher than VDA**
- Indicates active patients stay longer than dropouts
- Example: VDA = 8, PVA = 15 (good sign)

**Warning Sign:**
- VDA equal to or higher than PVA
- Suggests few patients completing care plans
- Example: VDA = 12, PVA = 10 (concerning)

### **Action Items Based on VDA:**

**If VDA = 1-3 (Very Low):**
- Review new patient onboarding process
- Improve first visit experience
- Strengthen care plan presentation
- Consider pricing/insurance issues

**If VDA = 4-6 (Low):**
- Analyze drop-off after report of findings
- Review financial acceptance barriers
- Improve patient education on care plans
- Increase touchpoints in first month

**If VDA = 7-10 (Moderate):**
- Focus on mid-care engagement
- Add re-exams at strategic visits
- Celebrate milestone visits
- Send re-engagement campaigns

**If VDA > 15 (High):**
- Strong practice! Maintain systems
- Document what's working
- Share best practices with team
- Consider wellness plan transitions

### **Action Items Based on FDA:**

**If FDA < 3 (Critical):**
- **Immediate intervention needed**
- Review first 3-visit patient experience
- Strengthen report of findings presentation
- Address financial barriers early
- Increase first-week touchpoints (calls, texts)
- Consider "first visit free" promotion issues

**If FDA = 3-5 (Poor):**
- **Early retention problem**
- Add re-exam at visit 5-6
- Celebrate milestone visits (5th, 10th)
- Send "frequency check-in" at visit 4
- Review scheduling convenience
- Automate appointment reminders

**If FDA = 6-10 (Average):**
- **Opportunity for improvement**
- Implement mid-care re-engagement campaign
- Add wellness education at visit 8
- Send "how are you feeling?" surveys
- Offer flexible scheduling options
- Consider care plan adjustments

**If FDA > 10 (Good):**
- **Strong adherence!**
- Maintain current systems
- Document successful practices
- Use as model for new patients
- Transition to wellness care smoothly

### **FDA → VDA Gap Analysis:**

**Healthy Gap (VDA - FDA = 3-6 visits):**
- Shows patients who drop frequency can often be re-engaged
- 3-6 visit window to intervene before full drop-off
- **Action:** Focus re-engagement campaigns on frequency-drop patients

**Warning: Small Gap (VDA - FDA = 1-2 visits):**
- Patients who drop frequency quickly become inactive
- Little intervention window
- **Action:** Strengthen initial frequency adherence and scheduling

**Warning: Large Gap (VDA - FDA > 8 visits):**
- Patients continue sporadically after dropping optimal frequency
- May indicate wellness vs active care confusion
- **Action:** Clarify care plan phases, set frequency expectations

---

## 🎯 GOALS & TRACKING

### **Quarterly Goals:**

**VDA Goals:**
- **Q1 2025:** Establish baseline VDA
- **Q2 2025:** Improve VDA by 10%
- **Q3 2025:** Improve VDA by 20%
- **Q4 2025:** Maintain improved VDA

**FDA Goals:**
- **Q1 2025:** Establish baseline FDA
- **Q2 2025:** Improve FDA by 15% (easier to move than VDA)
- **Q3 2025:** Improve FDA by 25%
- **Q4 2025:** Maintain improved FDA

**Gap Goal:**
- **Maintain healthy VDA - FDA gap of 3-6 visits**

### **Monthly Review Process:**

**1st of month - Data Export & Calculation:**
- Export Pending Inactive report (VDA)
- Export Visit History report (FDA)
- Import to Google Sheets
- Calculate new VDA and FDA

**Team Meeting - Metric Review:**
- Compare VDA month-over-month
- Compare FDA month-over-month
- Analyze VDA-FDA gap
- Identify at-risk patient cohorts:
  - Patients approaching FDA visit count → Frequency intervention
  - Patients approaching VDA visit count → Retention intervention

**Action Planning:**
- Implement targeted re-engagement campaigns
- Adjust care plan communication
- Celebrate improvements with team

### **Dashboard Integration:**

**Command Center Display:**
```
📊 PRACTICE METRICS

Latest Stats — November 8, 2025
NP: 12
PV: 245
OVA: $52
PVA: 18.5
CVA: $962
VDA: 9.2  ← Track monthly changes
FDA: 6.5  ← Track monthly changes (should be lower than VDA)
Collections: $12,740
```

**Weekly View:**
- VDA shows same value all week (monthly metric)
- FDA shows same value all week (monthly metric)

**Monthly View:**
- VDA updates 1st of each month
- FDA updates 1st of each month
- Compare month-over-month trends for both
- Track VDA-FDA gap

**Quarterly View:**
- Track VDA and FDA improvement over time
- Analyze VDA-FDA gap trends
- Correlate with other metrics (PVA, Collections)
- Identify which interventions moved the needle

---

## 🔐 HIPAA COMPLIANCE FOR VDA & FDA

### **Important:**

**✅ DO:**
- Export Patient IDs (numbers only)
- Export Visit Counts
- Export Visit Dates (for FDA gap calculation)
- Export Last Visit Dates
- Calculate aggregate VDA and FDA (no individual data in Notion)

**❌ DON'T:**
- Export patient names
- Export phone numbers or emails
- Store individual patient data in Notion
- Share VDA/FDA analysis tabs outside practice

**Data Flow:**
```
ChiroTouch (PHI - secure)
    ↓ Export (Patient ID + Visit Count/Dates only)
Google Sheets "VDA Analysis" (Patient IDs - restricted access)
Google Sheets "FDA Analysis" (Patient IDs + Visit Dates - restricted access)
    ↓ Calculate aggregate VDA and FDA
Google Sheets "Clinic Totals" (Aggregate only - Columns O & P)
    ↓ Sync
Notion DAILY_STATS (Aggregate only - VDA & FDA properties)
    ↓ Display
Command Center (Aggregate only - safe to share)
```

**Access Control:**
- VDA Analysis tab: Restricted to practice manager only
- FDA Analysis tab: Restricted to practice manager only (contains visit timelines)
- Clinic Totals tab: Full team access (no PHI)
- Notion: Full team access (no PHI)

---

## 📞 NEXT STEPS (WHEN READY TO IMPLEMENT)

### **Prerequisites:**
1. ✅ ChiroTouch → Google Sheets automation complete (CHIROTOUCH_GAME_PLAN.md)
2. ✅ Existing sync working smoothly for 1+ month
3. ✅ Team trained on current metrics (NP, PV, OVA, PVA, CVA)

### **Action Items:**

**This Week:**
- Read this file thoroughly
- Discuss VDA goals with team
- Decide on inactivity threshold (90 days default)

**When Ready:**
- Contact ChiroTouch support
- Set inactivity rule in System Settings
- Run first test export
- Share with Claude for Google Sheets formula setup

**Timeline:**
- Earliest: After ChiroTouch automation Phase 1 complete
- Recommended: 1-2 months after main automation stable
- No rush - get core metrics automated first

---

## 📂 RELATED FILES

- **CHIROTOUCH_GAME_PLAN.md** - Main automation plan (implement first)
- **READY_TO_USE_SYNC_CODE.js** - Current sync code (will update for VDA)
- **PROJECT_STATUS_AND_REMINDERS.md** - Overall project tracking
- **ZERO_COST_CHIROTOUCH_SOLUTION.md** - Integration approach

---

## 💡 FINAL NOTES

**VDA and FDA are powerful metrics** but require:
- Consistent threshold definitions (90 days for VDA, 30 days for FDA)
- Regular monthly exports (until automated)
- Team understanding of what each metric means
- Action plans based on VDA and FDA insights
- Understanding the VDA-FDA gap for intervention timing

**Key Difference:**
- **VDA** = Full inactivity (90+ days) - late-stage retention issue
- **FDA** = Frequency drop (30+ days) - early warning system

**Don't rush implementation.** Get your core automation working first:
1. ChiroTouch → Google Sheets (daily stats)
2. Google Sheets → Notion (automated sync) ✅ Done
3. Team using metrics for decisions
4. **Then** add VDA and FDA as enhancements

**Recommended Implementation Order:**
1. Start with VDA (simpler calculation)
2. Add FDA 1-2 months later (more complex, requires visit history)
3. Analyze VDA-FDA gap for intervention strategies

**When you're ready to implement VDA and FDA, tell Claude:**
> "I'm ready to set up VDA and FDA tracking. I've exported the Pending Inactive report and Visit History report from ChiroTouch."

Then share the CSVs and I'll create the exact Google Sheets formulas and sync code updates.

---

*Created: 2025-11-08*
*Status: Saved for future implementation*
*Priority: After core ChiroTouch automation complete*
*File: VDA_IMPLEMENTATION_PLAN.md*
