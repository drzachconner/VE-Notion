# 🤖 Notion AI Build Prompts

## How to Use These Prompts

1. Create a new page in Notion
2. Type `/AI` and select "Ask AI to write"
3. Copy and paste each prompt below, one at a time
4. Let Notion AI build each section
5. Follow up with the verification steps

**Important:** You'll need to paste these prompts in sequence. Notion AI works best with one section at a time.

---

## PROMPT 1: Create VISITS Database

```
Create a database called "VISITS" with the following properties:

Title property: Visit ID

Add these properties:
1. Visit Date - Date property with time enabled
2. Doctor - Person property
3. Visit Type - Select property with options: New Patient, Follow-Up, Therapy, Re-exam, Adjustment
4. ChiroHD Visit ID - Text property
5. Treatment Notes - Text property (long text)
6. Duration - Number property (for minutes)
7. Amount Collected - Number property formatted as currency (USD)

Add these formula properties:

8. Is Today - Formula:
formatDate(prop("Visit Date"), "YYYY-MM-DD") == formatDate(now(), "YYYY-MM-DD")

9. Is This Week - Formula:
and(dateBetween(now(), prop("Visit Date"), "days") <= 7, dateBetween(now(), prop("Visit Date"), "days") >= 0, toNumber(formatDate(prop("Visit Date"), "w")) == toNumber(formatDate(now(), "w")))

10. Is This Month - Formula:
formatDate(prop("Visit Date"), "YYYY-MM") == formatDate(now(), "YYYY-MM")

11. Is This Quarter - Formula:
and(formatDate(prop("Visit Date"), "YYYY") == formatDate(now(), "YYYY"), ceil(toNumber(formatDate(prop("Visit Date"), "M")) / 3) == ceil(toNumber(formatDate(now(), "M")) / 3))

12. Is This Year - Formula:
formatDate(prop("Visit Date"), "YYYY") == formatDate(now(), "YYYY")

13. Week Number - Formula:
formatDate(prop("Visit Date"), "w")

14. Month Number - Formula:
formatDate(prop("Visit Date"), "M")

15. Quarter Number - Formula:
formatDate(prop("Visit Date"), "Q")

16. Year - Formula:
formatDate(prop("Visit Date"), "YYYY")

Create these views:
- All Visits (table view)
- Today's Visits (table filtered by Is Today = true)
- This Week (table filtered by Is This Week = true)
- This Month (table filtered by Is This Month = true)
- Calendar View (calendar view by Visit Date)
```

---

## PROMPT 2: Create PATIENTS Database

```
Create a database called "PATIENTS" with the following properties:

Title property: Patient Name

Add these basic properties:
1. Patient ID - Text property
2. Status - Select property with options: New, Active, Inactive, Discharged, At Risk
3. Assigned Doctor - Person property
4. First Visit Date - Date property
5. Last Visit Date - Date property
6. Phone - Phone number property
7. Email - Email property
8. Insurance Provider - Select property with options: Blue Cross, Aetna, Cigna, United, Self-Pay, Other
9. Notes - Text property (long text)
10. Visit Count Goal - Number property
11. Outstanding Balance - Number property formatted as currency (USD)

Note: We will add relations to VISITS and COLLECTIONS databases in the next steps, then add rollup and formula properties.

Create these initial views:
- All Patients (table view)
- Active Patients (table filtered by Status = Active)
- New This Month (table view)
```

---

## PROMPT 3: Create COLLECTIONS Database

```
Create a database called "COLLECTIONS" with the following properties:

Title property: Transaction ID

Add these properties:
1. Transaction Date - Date property
2. Amount - Number property formatted as currency (USD)
3. Payment Method - Select property with options: Cash, Card, Insurance, Check, Other
4. Service Type - Select property with options: Adjustment, Therapy, Consultation, X-Ray, Other
5. Doctor - Person property
6. ChiroHD Transaction ID - Text property
7. Status - Select property with options: Paid, Pending, Refunded

Add these formula properties (same as VISITS):

8. Is Today - Formula:
formatDate(prop("Transaction Date"), "YYYY-MM-DD") == formatDate(now(), "YYYY-MM-DD")

9. Is This Week - Formula:
and(dateBetween(now(), prop("Transaction Date"), "days") <= 7, dateBetween(now(), prop("Transaction Date"), "days") >= 0, toNumber(formatDate(prop("Transaction Date"), "w")) == toNumber(formatDate(now(), "w")))

10. Is This Month - Formula:
formatDate(prop("Transaction Date"), "YYYY-MM") == formatDate(now(), "YYYY-MM")

11. Is This Quarter - Formula:
and(formatDate(prop("Transaction Date"), "YYYY") == formatDate(now(), "YYYY"), ceil(toNumber(formatDate(prop("Transaction Date"), "M")) / 3) == ceil(toNumber(formatDate(now(), "M")) / 3))

12. Is This Year - Formula:
formatDate(prop("Transaction Date"), "YYYY") == formatDate(now(), "YYYY")

Create these views:
- All Collections (table view)
- Today (filtered by Is Today = true)
- This Week (filtered by Is This Week = true)
- This Month (filtered by Is This Month = true)
```

---

## MANUAL STEP 1: Set Up Relations

**Notion AI cannot create relations automatically. You must do these manually:**

### In VISITS Database:
1. Click "+ New Property" (or click on any column header and add property)
2. Property name: "Patient"
3. Property type: Select "Relation"
4. Choose database: PATIENTS
5. Check "Show on PATIENTS"
6. In PATIENTS, the relation will auto-create as "All Visits"
7. Click "Create relation"

### In COLLECTIONS Database:
1. Click "+ New Property"
2. Property name: "Patient"
3. Property type: "Relation"
4. Choose database: PATIENTS
5. Check "Show on PATIENTS"
6. In PATIENTS, this will auto-create as "All Collections"
7. Click "Create relation"

---

## PROMPT 4: Add Rollups to PATIENTS Database

```
In the PATIENTS database, add these rollup properties:

1. Total Visits - Rollup property
   - Relation: All Visits
   - Property: Visit ID
   - Calculate: Count all

2. Visits This Week - Rollup property
   - Relation: All Visits
   - Property: Is This Week
   - Calculate: Count values → Checked

3. Visits This Month - Rollup property
   - Relation: All Visits
   - Property: Is This Month
   - Calculate: Count values → Checked

4. Visits This Quarter - Rollup property
   - Relation: All Visits
   - Property: Is This Quarter
   - Calculate: Count values → Checked

5. Visits This Year - Rollup property
   - Relation: All Visits
   - Property: Is This Year
   - Calculate: Count values → Checked

6. Lifetime Value - Rollup property
   - Relation: All Collections
   - Property: Amount
   - Calculate: Sum

7. Collections This Month - Rollup property
   - Relation: All Collections
   - Property: Amount
   - Calculate: Sum (with filter: Is This Month = Checked)

8. Collections This Year - Rollup property
   - Relation: All Collections
   - Property: Amount
   - Calculate: Sum (with filter: Is This Year = Checked)
```

---

## PROMPT 5: Add Formula Properties to PATIENTS

```
In the PATIENTS database, add these formula properties:

1. Months Since First Visit - Formula:
if(prop("First Visit Date"), dateBetween(now(), prop("First Visit Date"), "months"), 0)

2. Days Since Last Visit - Formula:
if(prop("Last Visit Date"), dateBetween(now(), prop("Last Visit Date"), "days"), 0)

3. PVA (Overall) - Formula:
if(prop("Months Since First Visit") > 0, round(prop("Total Visits") / prop("Months Since First Visit") * 10) / 10, prop("Total Visits"))

4. Weekly PVA - Formula:
if(dateBetween(now(), prop("First Visit Date"), "weeks") > 0, round(prop("Total Visits") / dateBetween(now(), prop("First Visit Date"), "weeks") * 10) / 10, prop("Total Visits"))

5. At Risk Flag - Formula:
if(and(prop("Days Since Last Visit") > 30, prop("Status") == "Active"), "⚠️ AT RISK", "")

6. Auto Status - Formula:
if(prop("Days Since Last Visit") == 0, "New", if(prop("Days Since Last Visit") > 90, "Inactive", if(prop("Days Since Last Visit") > 30, "At Risk", "Active")))

7. Average Collection Per Visit - Formula:
if(prop("Total Visits") > 0, round(prop("Lifetime Value") / prop("Total Visits") * 100) / 100, 0)
```

---

## PROMPT 6: Add More Views to PATIENTS

```
In the PATIENTS database, create these additional views:

1. At Risk - Table view filtered by: At Risk Flag is not empty
2. Inactive - Table view filtered by: Status = Inactive
3. By Doctor - Table view grouped by: Assigned Doctor
4. High Value - Table view sorted by: Lifetime Value (descending)
5. Drop Off Analysis - Table view grouped by: Total Visits, then sort by count
```

---

## PROMPT 7: Create DASHBOARD_METRICS Database

```
Create a database called "DASHBOARD_METRICS" with the following properties:

Title property: Metric Display Name

Add these properties:
1. Metric Code - Select property with options: PV, NP, PVA, Collections, OVA, DOV
2. Time Period - Select property with options: Daily, Weekly, Monthly, Quarterly, Yearly
3. Display Order - Number property
4. Card Color - Select property with options: Blue, Green, Yellow, Orange, Red, Purple
5. Current Value - Number property (we'll add formulas later)
6. Previous Period Value - Number property
7. Trend % - Formula:
if(prop("Previous Period Value") > 0, round((prop("Current Value") - prop("Previous Period Value")) / prop("Previous Period Value") * 1000) / 10, 0)

8. Trend Icon - Formula:
if(prop("Trend %") > 5, "↑", if(prop("Trend %") < -5, "↓", "→"))

Create a table view showing all properties.
```

---

## MANUAL STEP 2: Add Relations to DASHBOARD_METRICS

**You must add these manually:**

### In DASHBOARD_METRICS Database:
1. Add property "Related Visits" - Relation to VISITS database
2. Add property "Related Patients" - Relation to PATIENTS database
3. Add property "Related Collections" - Relation to COLLECTIONS database

---

## PROMPT 8: Create Metric Entries in DASHBOARD_METRICS

```
In the DASHBOARD_METRICS database, create the following 28 entries:

PV (Patient Visits) - 5 entries:
1. "PV - Daily" | Metric Code: PV | Time Period: Daily | Display Order: 1 | Card Color: Blue
2. "PV - Weekly" | Metric Code: PV | Time Period: Weekly | Display Order: 2 | Card Color: Blue
3. "PV - Monthly" | Metric Code: PV | Time Period: Monthly | Display Order: 3 | Card Color: Blue
4. "PV - Quarterly" | Metric Code: PV | Time Period: Quarterly | Display Order: 4 | Card Color: Blue
5. "PV - Yearly" | Metric Code: PV | Time Period: Yearly | Display Order: 5 | Card Color: Blue

NP (New Patients) - 5 entries:
6. "NP - Daily" | Metric Code: NP | Time Period: Daily | Display Order: 6 | Card Color: Green
7. "NP - Weekly" | Metric Code: NP | Time Period: Weekly | Display Order: 7 | Card Color: Green
8. "NP - Monthly" | Metric Code: NP | Time Period: Monthly | Display Order: 8 | Card Color: Green
9. "NP - Quarterly" | Metric Code: NP | Time Period: Quarterly | Display Order: 9 | Card Color: Green
10. "NP - Yearly" | Metric Code: NP | Time Period: Yearly | Display Order: 10 | Card Color: Green

PVA (Patient Visit Average) - 5 entries:
11. "PVA - Daily" | Metric Code: PVA | Time Period: Daily | Display Order: 11 | Card Color: Yellow
12. "PVA - Weekly" | Metric Code: PVA | Time Period: Weekly | Display Order: 12 | Card Color: Yellow
13. "PVA - Monthly" | Metric Code: PVA | Time Period: Monthly | Display Order: 13 | Card Color: Yellow
14. "PVA - Quarterly" | Metric Code: PVA | Time Period: Quarterly | Display Order: 14 | Card Color: Yellow
15. "PVA - Yearly" | Metric Code: PVA | Time Period: Yearly | Display Order: 15 | Card Color: Yellow

Collections - 5 entries:
16. "Collections - Daily" | Metric Code: Collections | Time Period: Daily | Display Order: 16 | Card Color: Green
17. "Collections - Weekly" | Metric Code: Collections | Time Period: Weekly | Display Order: 17 | Card Color: Green
18. "Collections - Monthly" | Metric Code: Collections | Time Period: Monthly | Display Order: 18 | Card Color: Green
19. "Collections - Quarterly" | Metric Code: Collections | Time Period: Quarterly | Display Order: 19 | Card Color: Green
20. "Collections - Yearly" | Metric Code: Collections | Time Period: Yearly | Display Order: 20 | Card Color: Green

OVA (Office Visit Average) - 5 entries:
21. "OVA - Daily" | Metric Code: OVA | Time Period: Daily | Display Order: 21 | Card Color: Purple
22. "OVA - Weekly" | Metric Code: OVA | Time Period: Weekly | Display Order: 22 | Card Color: Purple
23. "OVA - Monthly" | Metric Code: OVA | Time Period: Monthly | Display Order: 23 | Card Color: Purple
24. "OVA - Quarterly" | Metric Code: OVA | Time Period: Quarterly | Display Order: 24 | Card Color: Purple
25. "OVA - Yearly" | Metric Code: OVA | Time Period: Yearly | Display Order: 25 | Card Color: Purple

DOV (Drop Off Visit) - 3 entries:
26. "DOV - Monthly" | Metric Code: DOV | Time Period: Monthly | Display Order: 26 | Card Color: Orange
27. "DOV - Quarterly" | Metric Code: DOV | Time Period: Quarterly | Display Order: 27 | Card Color: Orange
28. "DOV - Yearly" | Metric Code: DOV | Time Period: Yearly | Display Order: 28 | Card Color: Orange
```

---

## PROMPT 9: Create Dashboard Page

```
Create a new full-page titled "🏰 Van Every Chiropractic Command Center"

Add the following content:

# 🏰 Van Every Chiropractic Command Center

[Add today's date here]

---

## 📈 PV - Patient Visits

[Create a toggle block]
Inside the toggle, add: "Linked view of DASHBOARD_METRICS database, filtered by Metric Code = PV, displayed as a board grouped by Time Period"

## 👤 NP - New Patients

[Create a toggle block]
Inside the toggle, add: "Linked view of DASHBOARD_METRICS database, filtered by Metric Code = NP, displayed as a board grouped by Time Period"

## 📊 PVA - Patient Visit Average

[Create a toggle block]
Inside the toggle, add: "Linked view of DASHBOARD_METRICS database, filtered by Metric Code = PVA, displayed as a board grouped by Time Period"

## 💰 Collections

[Create a toggle block]
Inside the toggle, add: "Linked view of DASHBOARD_METRICS database, filtered by Metric Code = Collections, displayed as a board grouped by Time Period"

## 🏥 OVA - Office Visit Average

[Create a toggle block]
Inside the toggle, add: "Linked view of DASHBOARD_METRICS database, filtered by Metric Code = OVA, displayed as a board grouped by Time Period"

## ⚠️ DOV - Drop Off Visit

[Create a toggle block]
Inside the toggle, add: "Linked view of DASHBOARD_METRICS database, filtered by Metric Code = DOV, displayed as a board grouped by Time Period"

---

## 🔄 ChiroHD Data Sync

[Add instructions here for importing CSV data]
Last Sync: [Manual entry]
```

---

## MANUAL STEP 3: Link Databases to Dashboard

**After Notion AI creates the page structure, you need to manually add the linked databases:**

For each toggle section (PV, NP, PVA, Collections, OVA, DOV):

1. Click inside the toggle block
2. Type `/linked` and select "Create linked database"
3. Choose "DASHBOARD_METRICS"
4. Click on the filter icon
5. Add filter: "Metric Code" = [PV/NP/PVA/Collections/OVA/DOV]
6. Change view to "Board"
7. Group by: "Time Period"
8. Show only these properties: Metric Display Name, Current Value, Trend %, Trend Icon
9. Repeat for each metric section

---

## MANUAL STEP 4: Populate Current Value (Simplified Approach)

**Because Notion AI and formulas have limitations, use this simplified approach:**

### For PV Metrics:
In each PV metric entry in DASHBOARD_METRICS:
1. Open the entry (click on it)
2. In "Related Visits" relation, link to ALL visits in your database
3. Add a rollup property just for this entry:
   - For "PV - Daily": Rollup of Related Visits → Is Today → Count checked
   - For "PV - Weekly": Rollup of Related Visits → Is This Week → Count checked
   - For "PV - Monthly": Rollup of Related Visits → Is This Month → Count checked
   - etc.

### For Collections Metrics:
Same approach but sum the Amount field instead of counting.

### For NP Metrics:
Link to all patients and rollup based on First Visit Date.

---

## VERIFICATION CHECKLIST

After running all prompts and manual steps:

- [ ] VISITS database has 16 properties
- [ ] PATIENTS database has 18+ properties (with rollups)
- [ ] COLLECTIONS database has 12 properties
- [ ] DASHBOARD_METRICS database has 28 entries
- [ ] Dashboard page has 6 toggle sections with linked databases
- [ ] Relations work between VISITS ↔ PATIENTS
- [ ] Relations work between COLLECTIONS ↔ PATIENTS
- [ ] Formulas calculate (test with sample data)
- [ ] Dashboard shows metrics (may need sample data first)

---

## NOTES

1. **Notion AI Limitations:**
   - Cannot create relations automatically (you must do manually)
   - Cannot create complex rollups (you must configure)
   - May not format everything perfectly (you'll need to adjust)

2. **Time Estimate:**
   - AI prompts: ~30 minutes (if AI cooperates)
   - Manual steps: ~30-45 minutes
   - Total: ~1-1.5 hours (vs 2.5-3 hours fully manual)

3. **If AI Doesn't Understand:**
   - Try breaking the prompt into smaller pieces
   - Create properties one at a time
   - Refer to NOTION_BUILD_CHECKLIST.md for manual steps

4. **Testing:**
   - Use sample data from CHIROHD_CSV_IMPORT_GUIDE.md
   - Import small test dataset to verify everything works
   - Check that all formulas calculate correctly

---

**Good luck! This should save you significant time while still getting a fully functional template.**
