# 🚀 Van Every Chiropractic - Notion Template Build Checklist

## Quick Start Guide - Step-by-Step Implementation

**Estimated Total Time:** 2.5 - 3 hours
**Difficulty Level:** Intermediate

---

## ✅ PRE-BUILD CHECKLIST

Before you start building, make sure you have:

- [ ] Notion workspace with admin access
- [ ] List of all doctors/team members (for Person properties)
- [ ] Access to ChiroHD data (or sample CSV files)
- [ ] ULTIMATE_TEMPLATE_DESIGN.md document open for reference
- [ ] 2-3 hours of uninterrupted time

---

## 📋 PHASE 1: BUILD CORE DATABASES (45 minutes)

### Database 1: VISITS (15 minutes)

- [ ] Create new database (Full Page)
- [ ] Name it "VISITS"
- [ ] Add these properties in order:

**Basic Properties:**
- [ ] Visit ID (Title) - already created
- [ ] Visit Date (Date - with time enabled)
- [ ] Doctor (Person)
- [ ] Visit Type (Select) - Add options: New Patient, Follow-Up, Therapy, Re-exam, Adjustment
- [ ] ChiroHD Visit ID (Text)
- [ ] Treatment Notes (Text - long form)
- [ ] Duration (Number - minutes)
- [ ] Amount Collected (Number - currency format)

**Formula Properties (Copy from design doc):**
- [ ] Is Today (Formula) - Copy from line 686
- [ ] Is This Week (Formula) - Copy from line 691
- [ ] Is This Month (Formula) - Copy from line 696
- [ ] Is This Quarter (Formula) - Copy from line 701
- [ ] Is This Year (Formula) - Copy from line 706
- [ ] Week Number (Formula) - Copy from line 711
- [ ] Month Number (Formula) - Copy from line 716
- [ ] Quarter Number (Formula) - Copy from line 720
- [ ] Year (Formula) - Copy from line 726

**Create Views:**
- [ ] All Visits (default table)
- [ ] Today's Visits (filter: Is Today = ☑️ checkbox checked)
- [ ] This Week (filter: Is This Week = ☑️)
- [ ] This Month (filter: Is This Month = ☑️)
- [ ] This Quarter (filter: Is This Quarter = ☑️)
- [ ] This Year (filter: Is This Year = ☑️)
- [ ] Calendar View (calendar by Visit Date)

### Database 2: PATIENTS (20 minutes)

- [ ] Create new database (Full Page)
- [ ] Name it "PATIENTS"

**Basic Properties:**
- [ ] Patient Name (Title)
- [ ] Patient ID (Text)
- [ ] Status (Select) - Options: New, Active, Inactive, Discharged, At Risk
- [ ] Assigned Doctor (Person)
- [ ] First Visit Date (Date)
- [ ] Last Visit Date (Date)
- [ ] Phone (Phone)
- [ ] Email (Email)
- [ ] Insurance Provider (Select) - Add your insurance providers
- [ ] Notes (Text - long form)

**Will add after relation to VISITS:**
- [ ] All Visits (Relation → VISITS) - Will add in Phase 2
- [ ] Total Visits (Rollup) - Will configure in Phase 2
- [ ] Visit Count Goal (Number)

**Formula Properties (will add after relations):**
- [ ] Months Since First Visit - Line 766
- [ ] Days Since Last Visit - Line 771
- [ ] PVA (Overall) - Line 776
- [ ] Weekly PVA - Line 783
- [ ] At Risk Flag - Line 790
- [ ] Auto Status - Line 809

**Create Basic Views (will add filter views after formulas):**
- [ ] All Patients (default table)

### Database 3: COLLECTIONS (10 minutes)

- [ ] Create new database (Full Page)
- [ ] Name it "COLLECTIONS"

**Basic Properties:**
- [ ] Transaction ID (Title)
- [ ] Transaction Date (Date)
- [ ] Amount (Number - currency format, add $ prefix)
- [ ] Payment Method (Select) - Options: Cash, Card, Insurance, Check, Other
- [ ] Service Type (Select) - Options: Adjustment, Therapy, Consultation, X-Ray, Other
- [ ] Doctor (Person)
- [ ] ChiroHD Transaction ID (Text)
- [ ] Status (Select) - Options: Paid, Pending, Refunded

**Formula Properties (same as VISITS):**
- [ ] Is Today (Formula) - Copy from VISITS
- [ ] Is This Week (Formula) - Copy from VISITS
- [ ] Is This Month (Formula) - Copy from VISITS
- [ ] Is This Quarter (Formula) - Copy from VISITS
- [ ] Is This Year (Formula) - Copy from VISITS
- [ ] Week Number (Formula) - Copy from VISITS
- [ ] Month Number (Formula) - Copy from VISITS
- [ ] Quarter Number (Formula) - Copy from VISITS
- [ ] Year (Formula) - Copy from VISITS

**Create Views:**
- [ ] All Collections (default)
- [ ] Today (filter: Is Today = ☑️)
- [ ] This Week (filter: Is This Week = ☑️)
- [ ] This Month (filter: Is This Month = ☑️)
- [ ] This Quarter (filter: Is This Quarter = ☑️)
- [ ] This Year (filter: Is This Year = ☑️)

---

## 🔗 PHASE 2: SET UP RELATIONS & ROLLUPS (30 minutes)

### Connect PATIENTS to VISITS

**In VISITS database:**
- [ ] Add new property "Patient"
- [ ] Type: Relation
- [ ] Select database: PATIENTS
- [ ] Enable "Show on PATIENTS"
- [ ] Relation name in PATIENTS: "All Visits"

**In PATIENTS database (the relation auto-created "All Visits"):**

Now add Rollup properties based on All Visits:

- [ ] Total Visits (Rollup)
  - Relation: All Visits
  - Property: Visit ID
  - Calculate: Count all

- [ ] Visits This Week (Rollup)
  - Relation: All Visits
  - Property: Is This Week
  - Calculate: Count values → Checked

- [ ] Visits This Month (Rollup)
  - Relation: All Visits
  - Property: Is This Month
  - Calculate: Count values → Checked

- [ ] Visits This Quarter (Rollup)
  - Relation: All Visits
  - Property: Is This Quarter
  - Calculate: Count values → Checked

- [ ] Visits This Year (Rollup)
  - Relation: All Visits
  - Property: Is This Year
  - Calculate: Count values → Checked

**Now add Formula properties to PATIENTS:**
- [ ] Months Since First Visit (Formula) - Line 766
- [ ] Days Since Last Visit (Formula) - Line 771
- [ ] PVA (Overall) (Formula) - Line 776
- [ ] Weekly PVA (Formula) - Line 783
- [ ] At Risk Flag (Formula) - Line 790
- [ ] Auto Status (Formula) - Line 809

### Connect PATIENTS to COLLECTIONS

**In COLLECTIONS database:**
- [ ] Add new property "Patient"
- [ ] Type: Relation
- [ ] Select database: PATIENTS
- [ ] Enable "Show on PATIENTS"
- [ ] Relation name in PATIENTS: "All Collections"

**In PATIENTS database (the relation auto-created "All Collections"):**

Add Rollup properties:

- [ ] Lifetime Value (Rollup)
  - Relation: All Collections
  - Property: Amount
  - Calculate: Sum

- [ ] Collections This Month (Rollup)
  - Relation: All Collections
  - Property: Is This Month
  - Calculate: Show original (then sum the amounts)

- [ ] Collections This Year (Rollup)
  - Relation: All Collections
  - Property: Is This Year
  - Calculate: Show original

- [ ] Outstanding Balance (Number) - Manual entry

**Add Formula:**
- [ ] Average Collection Per Visit (Formula) - Line 801

### Add Patient Views

Now that formulas are working, add filtered views to PATIENTS:

- [ ] Active Patients (filter: Status = Active)
- [ ] New This Month (filter: First Visit Date is this month)
- [ ] At Risk (filter: At Risk Flag is not empty)
- [ ] Inactive (filter: Status = Inactive)
- [ ] By Doctor (group by Assigned Doctor)
- [ ] High Value (sort by Lifetime Value descending)
- [ ] Drop Off Analysis (group by Total Visits, sort by count)

---

## 📊 PHASE 3: CREATE DASHBOARD METRICS DATABASE (45 minutes)

### Create DASHBOARD_METRICS Database

- [ ] Create new database (Full Page)
- [ ] Name it "DASHBOARD_METRICS"

**Add Properties:**
- [ ] Metric Display Name (Title)
- [ ] Metric Code (Select) - Options: PV, NP, PVA, Collections, OVA, DOV
- [ ] Time Period (Select) - Options: Daily, Weekly, Monthly, Quarterly, Yearly
- [ ] Display Order (Number)
- [ ] Card Color (Select) - Options: Blue, Green, Yellow, Orange, Red, Purple

**Add Relations (these allow formulas to pull data):**
- [ ] Related Visits (Relation → VISITS database)
- [ ] Related Patients (Relation → PATIENTS database)
- [ ] Related Collections (Relation → COLLECTIONS database)

**Add Calculation Properties:**
- [ ] Current Value (Formula) - Will customize per metric
- [ ] Previous Period Value (Number) - Manual entry for now
- [ ] Trend % (Formula) - Line 916
- [ ] Trend Icon (Formula) - Line 923

### Create Metric Entries (30 entries total)

**PV (Patient Visits) - 5 entries:**
- [ ] "PV - Daily" | Metric Code: PV | Time Period: Daily | Order: 1
- [ ] "PV - Weekly" | Metric Code: PV | Time Period: Weekly | Order: 2
- [ ] "PV - Monthly" | Metric Code: PV | Time Period: Monthly | Order: 3
- [ ] "PV - Quarterly" | Metric Code: PV | Time Period: Quarterly | Order: 4
- [ ] "PV - Yearly" | Metric Code: PV | Time Period: Yearly | Order: 5

**NP (New Patients) - 5 entries:**
- [ ] "NP - Daily" | Metric Code: NP | Time Period: Daily | Order: 6
- [ ] "NP - Weekly" | Metric Code: NP | Time Period: Weekly | Order: 7
- [ ] "NP - Monthly" | Metric Code: NP | Time Period: Monthly | Order: 8
- [ ] "NP - Quarterly" | Metric Code: NP | Time Period: Quarterly | Order: 9
- [ ] "NP - Yearly" | Metric Code: NP | Time Period: Yearly | Order: 10

**PVA (Patient Visit Average) - 5 entries:**
- [ ] "PVA - Daily" | Metric Code: PVA | Time Period: Daily | Order: 11
- [ ] "PVA - Weekly" | Metric Code: PVA | Time Period: Weekly | Order: 12
- [ ] "PVA - Monthly" | Metric Code: PVA | Time Period: Monthly | Order: 13
- [ ] "PVA - Quarterly" | Metric Code: PVA | Time Period: Quarterly | Order: 14
- [ ] "PVA - Yearly" | Metric Code: PVA | Time Period: Yearly | Order: 15

**Collections - 5 entries:**
- [ ] "Collections - Daily" | Metric Code: Collections | Time Period: Daily | Order: 16
- [ ] "Collections - Weekly" | Metric Code: Collections | Time Period: Weekly | Order: 17
- [ ] "Collections - Monthly" | Metric Code: Collections | Time Period: Monthly | Order: 18
- [ ] "Collections - Quarterly" | Metric Code: Collections | Time Period: Quarterly | Order: 19
- [ ] "Collections - Yearly" | Metric Code: Collections | Time Period: Yearly | Order: 20

**OVA (Office Visit Average) - 5 entries:**
- [ ] "OVA - Daily" | Metric Code: OVA | Time Period: Daily | Order: 21
- [ ] "OVA - Weekly" | Metric Code: OVA | Time Period: Weekly | Order: 22
- [ ] "OVA - Monthly" | Metric Code: OVA | Time Period: Monthly | Order: 23
- [ ] "OVA - Quarterly" | Metric Code: OVA | Time Period: Quarterly | Order: 24
- [ ] "OVA - Yearly" | Metric Code: OVA | Time Period: Yearly | Order: 25

**DOV (Drop Off Visit) - 3 entries (only monthly, quarterly, yearly):**
- [ ] "DOV - Monthly" | Metric Code: DOV | Time Period: Monthly | Order: 26
- [ ] "DOV - Quarterly" | Metric Code: DOV | Time Period: Quarterly | Order: 27
- [ ] "DOV - Yearly" | Metric Code: DOV | Time Period: Yearly | Order: 28

### Configure Current Value Formulas

**For PV entries, use rollups instead of formulas:**

For each PV entry:
- [ ] PV - Daily: Relation to ALL visits, Rollup count where Is Today = checked
- [ ] PV - Weekly: Relation to ALL visits, Rollup count where Is This Week = checked
- [ ] PV - Monthly: Relation to ALL visits, Rollup count where Is This Month = checked
- [ ] PV - Quarterly: Relation to ALL visits, Rollup count where Is This Quarter = checked
- [ ] PV - Yearly: Relation to ALL visits, Rollup count where Is This Year = checked

**For NP entries:**
- [ ] NP - Daily: Relation to ALL patients, Rollup count where First Visit Date is today
- [ ] NP - Weekly: Relation to ALL patients, Rollup count where First Visit Date is this week
- [ ] (Continue for Monthly, Quarterly, Yearly)

**For Collections entries:**
- [ ] Collections - Daily: Relation to ALL collections (where Is Today = checked), Rollup sum Amount
- [ ] Collections - Weekly: Relation to ALL collections (where Is This Week = checked), Rollup sum Amount
- [ ] (Continue for Monthly, Quarterly, Yearly)

**Note:** Due to Notion's limitations, you may need to:
1. Create separate relation properties for each time period, OR
2. Use simpler counting methods and manual refresh

---

## 🏠 PHASE 4: BUILD DASHBOARD PAGE (30 minutes)

### Create Dashboard Page

- [ ] Create new page (Full Page)
- [ ] Title: "🏰 Van Every Chiropractic Command Center"

### Add Hero Section

- [ ] Add Heading 1: "🏰 Van Every Chiropractic Command Center"
- [ ] Add text block: "Today's Date: " (Notion will auto-show current date)
- [ ] Add divider

### Add Metric Sections

**For PV (Patient Visits):**
- [ ] Add Toggle block titled "📈 PV - Patient Visits"
- [ ] Inside toggle: Click "+" → "Linked view of database"
- [ ] Select: DASHBOARD_METRICS
- [ ] Create new view: "PV Metrics"
- [ ] Filter: Metric Code = PV
- [ ] View type: Board
- [ ] Group by: Time Period
- [ ] Show properties: Metric Display Name, Current Value, Trend %, Trend Icon
- [ ] Hide: All other properties

**For NP (New Patients):**
- [ ] Add Toggle block titled "👤 NP - New Patients"
- [ ] Inside toggle: Linked database → DASHBOARD_METRICS
- [ ] Filter: Metric Code = NP
- [ ] Board view grouped by Time Period
- [ ] Show same properties as above

**For PVA (Patient Visit Average):**
- [ ] Add Toggle block titled "📊 PVA - Patient Visit Average"
- [ ] Inside toggle: Linked database → DASHBOARD_METRICS
- [ ] Filter: Metric Code = PVA
- [ ] Board view grouped by Time Period

**For Collections:**
- [ ] Add Toggle block titled "💰 Collections"
- [ ] Inside toggle: Linked database → DASHBOARD_METRICS
- [ ] Filter: Metric Code = Collections
- [ ] Board view grouped by Time Period

**For OVA (Office Visit Average):**
- [ ] Add Toggle block titled "🏥 OVA - Office Visit Average"
- [ ] Inside toggle: Linked database → DASHBOARD_METRICS
- [ ] Filter: Metric Code = OVA
- [ ] Board view grouped by Time Period

**For DOV (Drop Off Visit):**
- [ ] Add Toggle block titled "⚠️ DOV - Drop Off Visit"
- [ ] Inside toggle: Linked database → DASHBOARD_METRICS
- [ ] Filter: Metric Code = DOV
- [ ] Board view grouped by Time Period

### Add ChiroHD Integration Section

- [ ] Add divider
- [ ] Add Heading 2: "🔄 ChiroHD Data Sync"
- [ ] Add text: Instructions for CSV import
- [ ] Add text: "Last Sync: [Manual entry or automated]"

---

## 🧪 PHASE 5: TEST WITH SAMPLE DATA (20 minutes)

### Add Sample Visits (20-30 entries)

Create visits with different dates to test all time period filters:

**Today (3-5 visits):**
- [ ] Visit 1: Today, 9:00 AM, Dr. Smith, Patient A, New Patient
- [ ] Visit 2: Today, 10:30 AM, Dr. Smith, Patient B, Follow-Up
- [ ] Visit 3: Today, 2:00 PM, Dr. Jones, Patient C, Therapy

**This Week (5-7 visits):**
- [ ] Visit 4: 2 days ago, Dr. Smith, Patient A, Follow-Up
- [ ] Visit 5: 3 days ago, Dr. Jones, Patient D, New Patient
- [ ] Visit 6: 4 days ago, Dr. Smith, Patient E, Adjustment

**This Month (8-10 visits):**
- [ ] Visit 7: 10 days ago, Dr. Smith, Patient A, Follow-Up
- [ ] Visit 8: 15 days ago, Dr. Jones, Patient F, New Patient
- [ ] (Add more with various dates this month)

**This Quarter (5-8 visits):**
- [ ] Visits from 1-2 months ago

**Earlier This Year (3-5 visits):**
- [ ] Visits from 3-6 months ago

### Add Sample Patients (10-15 entries)

- [ ] Patient A: New, First Visit = Today, Assigned to Dr. Smith
- [ ] Patient B: Active, First Visit = 30 days ago, 8 total visits
- [ ] Patient C: Active, First Visit = 60 days ago, 12 total visits
- [ ] Patient D: New, First Visit = 3 days ago
- [ ] Patient E: At Risk, First Visit = 90 days ago, Last Visit = 35 days ago
- [ ] Patient F: Inactive, First Visit = 180 days ago, Last Visit = 95 days ago
- [ ] (Add 4-9 more with varied statuses and dates)

**Connect patients to visits:**
- [ ] Go through each visit and link to appropriate patient

### Add Sample Collections (20-30 entries)

- [ ] For each visit, create a matching collection entry
- [ ] Amount: $50-150 (vary amounts)
- [ ] Payment Method: Mix of Cash, Card, Insurance
- [ ] Status: Paid (for most), 2-3 Pending
- [ ] Link to same patient as visit

### Verify Metrics

**Check PATIENTS database:**
- [ ] Verify Total Visits counting correctly
- [ ] Verify PVA calculating correctly
- [ ] Verify Days Since Last Visit showing correctly
- [ ] Verify Lifetime Value summing collections
- [ ] Verify At Risk Flag appearing for patients >30 days

**Check DASHBOARD_METRICS:**
- [ ] PV - Daily showing correct count (3-5)
- [ ] PV - Weekly showing correct count
- [ ] PV - Monthly showing correct count
- [ ] NP - Daily showing new patients from today
- [ ] Collections - Daily showing sum of today's payments
- [ ] Collections - Monthly showing total for month

**Check Dashboard Page:**
- [ ] Each toggle section showing correct data
- [ ] Metrics displaying in cards
- [ ] Trend icons showing (if Previous Period Value entered)

---

## 🎨 PHASE 6: POLISH & CUSTOMIZE (15 minutes)

### Apply Formatting

**DASHBOARD_METRICS database:**
- [ ] Add conditional formatting to Trend %
  - If Trend % > 5: Green background
  - If Trend % < -5: Red background
  - Else: Yellow background

**Dashboard Page:**
- [ ] Add callout blocks around each metric section
- [ ] Apply color coding:
  - PV: Blue callout
  - NP: Green callout
  - PVA: Yellow callout
  - Collections: Green callout
  - OVA: Blue callout
  - DOV: Orange callout

- [ ] Adjust board card sizes for readability
- [ ] Add emoji to section headers if desired

### Create Team Member Pages

- [ ] Duplicate main dashboard for each team member
- [ ] Customize with their name: "Dr. Smith's Dashboard"
- [ ] Filter all linked databases by: Doctor = Dr. Smith
- [ ] Share appropriate pages with team members

---

## 🔄 PHASE 7: CHIROHD INTEGRATION SETUP (15 minutes)

### Prepare Import Templates

- [ ] Create "ChiroHD Import" page
- [ ] Document CSV format for Visits
- [ ] Document CSV format for Collections
- [ ] Document CSV format for Patients

### Test Import Process

- [ ] Export sample data from ChiroHD (or create sample CSV)
- [ ] Import to VISITS database
- [ ] Verify data mapping correctly
- [ ] Check that formulas still work after import
- [ ] Document any issues or adjustments needed

### Set Up Import Button (if using Notion automation)

- [ ] Add button to dashboard: "📥 Import ChiroHD Data"
- [ ] Configure to show import instructions
- [ ] Link to import template page

---

## ✅ FINAL CHECKLIST

### Quality Check

- [ ] All databases have correct properties
- [ ] All relations working correctly
- [ ] All formulas calculating properly
- [ ] All views showing correct filtered data
- [ ] Dashboard displaying all 6 metrics
- [ ] Sample data shows realistic metrics
- [ ] Team members can access their dashboards

### Documentation

- [ ] Create "How to Use" page with instructions
- [ ] Document CSV import process
- [ ] Create troubleshooting guide
- [ ] Train team on how to use the system

### Optimization

- [ ] Archive sample/test data (or clearly label it)
- [ ] Set up regular data import schedule
- [ ] Configure any available automations
- [ ] Create backup of template

### Go Live

- [ ] Import real data from ChiroHD
- [ ] Verify all metrics calculating correctly with real data
- [ ] Share with team
- [ ] Schedule weekly check-ins to review metrics
- [ ] Iterate and improve based on feedback

---

## 🆘 TROUBLESHOOTING GUIDE

### Formulas Not Calculating

**Issue:** Formula shows "Invalid" or blank
**Solution:**
- Check property names match exactly (case-sensitive)
- Verify relations exist before creating rollups
- Test formula in isolation (create test property)

### Relations Not Showing Data

**Issue:** Relation property is empty even though data exists
**Solution:**
- Verify "Show on [other database]" is enabled
- Check that IDs or unique identifiers match
- Manually link a few entries to test

### Metrics Showing Zero

**Issue:** Dashboard metrics show 0 even with data
**Solution:**
- Check date formulas (Is Today, Is This Week, etc.)
- Verify time zones are correct
- Check that relations in DASHBOARD_METRICS connect to ALL entries
- Manually add some relations to test

### Rollups Not Summing Correctly

**Issue:** Rollup showing wrong total
**Solution:**
- Check "Calculate" setting (Count vs Sum vs Show original)
- Verify property being rolled up is correct type (Number for sums)
- Check for filter conditions in rollup

### Import Fails

**Issue:** CSV import creates duplicate or fails to map
**Solution:**
- Check CSV headers match property names
- Verify data types match (dates formatted correctly, numbers not text)
- Import in small batches to identify problematic rows
- Clear any existing duplicate data

---

## 📞 SUPPORT RESOURCES

- Notion Formula Documentation: notion.so/help/formulas
- Notion Relations Guide: notion.so/help/relations-and-rollups
- Template Design Doc: ULTIMATE_TEMPLATE_DESIGN.md (in this folder)

---

**Congratulations! You've built a world-class practice management system in Notion! 🎉**

Now start using it daily, track your metrics, and watch your practice grow with data-driven decisions.
