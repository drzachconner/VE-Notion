# 🔧 CORRECTED METRICS FORMULAS

## Important: Formula Corrections Based on Your Definitions

### Correct Definitions:

**OVA (Office Visit Average)** = Revenue per visit
- Formula: **Total Collections ÷ Total Patient Visits**
- Example: $50,000 / 1,000 visits = $50 OVA
- Meaning: Average revenue collected per visit

**PVA (Patient Visit Average)** = Visits per new patient
- Formula: **Total Visits ÷ Number of New Patients in that period**
- Example Monthly: 1,000 visits / 20 new patients = 50 PVA
- Example YTD: 5,000 visits / 125 new patients = 64 PVA
- Meaning: How many times a new patient visits on average

**CVA (Case Visit Average)** = Revenue per new patient (lifetime value)
- Formula: **OVA × PVA** OR **Total Collections ÷ New Patients**
- Example: $50 OVA × 50 PVA = $2,500 CVA
- Meaning: Average revenue generated per new patient acquired

---

## PROMPT FOR NOTION AI - FIX FORMULAS AND ADD CVA

Copy and paste this to Notion AI:

```
I need to correct the OVA and PVA formulas and add a new metric CVA. Here are the correct definitions:

**OVA (Office Visit Average)** = Collections ÷ Patient Visits (revenue per visit)
**PVA (Patient Visit Average)** = Total Visits ÷ New Patients in that period
**CVA (Case Visit Average)** = OVA × PVA = Collections ÷ New Patients (revenue per new patient)

Please make these changes:

1. **Fix OVA Current Value formulas** in DASHBOARD_METRICS:
   - OVA - Daily: (Sum of Related Collections where Is Today = checked) ÷ (Count of Related Visits where Is Today = checked)
   - OVA - Weekly: (Sum of Related Collections where Is This Week = checked) ÷ (Count of Related Visits where Is This Week = checked)
   - OVA - Monthly: (Sum of Related Collections where Is This Month = checked) ÷ (Count of Related Visits where Is This Month = checked)
   - OVA - Quarterly: (Sum of Related Collections where Is This Quarter = checked) ÷ (Count of Related Visits where Is This Quarter = checked)
   - OVA - Yearly: (Sum of Related Collections where Is This Year = checked) ÷ (Count of Related Visits where Is This Year = checked)

2. **Fix PVA Current Value formulas** in DASHBOARD_METRICS:
   First, we need to identify New Patients for each time period. In PATIENTS database, add these formula properties:

   - Is New Today (Formula): formatDate(prop("First Visit Date"), "YYYY-MM-DD") == formatDate(now(), "YYYY-MM-DD")
   - Is New This Week (Formula): and(dateBetween(now(), prop("First Visit Date"), "days") <= 7, dateBetween(now(), prop("First Visit Date"), "days") >= 0, toNumber(formatDate(prop("First Visit Date"), "w")) == toNumber(formatDate(now(), "w")))
   - Is New This Month (Formula): formatDate(prop("First Visit Date"), "YYYY-MM") == formatDate(now(), "YYYY-MM")
   - Is New This Quarter (Formula): and(formatDate(prop("First Visit Date"), "YYYY") == formatDate(now(), "YYYY"), ceil(toNumber(formatDate(prop("First Visit Date"), "M")) / 3) == ceil(toNumber(formatDate(now(), "M")) / 3))
   - Is New This Year (Formula): formatDate(prop("First Visit Date"), "YYYY") == formatDate(now(), "YYYY")

   Then in DASHBOARD_METRICS, update PVA formulas:
   - PVA - Daily: (Count of Related Visits where Is Today = checked) ÷ (Count of Related Patients where Is New Today = checked)
   - PVA - Weekly: (Count of Related Visits where Is This Week = checked) ÷ (Count of Related Patients where Is New This Week = checked)
   - PVA - Monthly: (Count of Related Visits where Is This Month = checked) ÷ (Count of Related Patients where Is New This Month = checked)
   - PVA - Quarterly: (Count of Related Visits where Is This Quarter = checked) ÷ (Count of Related Patients where Is New This Quarter = checked)
   - PVA - Yearly: (Count of Related Visits where Is This Year = checked) ÷ (Count of Related Patients where Is New This Year = checked)

3. **Add CVA metric** - Create 5 new entries in DASHBOARD_METRICS:
   - "CVA - Daily" | Metric Code: CVA | Time Period: Daily | Display Order: 29 | Card Color: Purple
   - "CVA - Weekly" | Metric Code: CVA | Time Period: Weekly | Display Order: 30 | Card Color: Purple
   - "CVA - Monthly" | Metric Code: CVA | Time Period: Monthly | Display Order: 31 | Card Color: Purple
   - "CVA - Quarterly" | Metric Code: CVA | Time Period: Quarterly | Display Order: 32 | Card Color: Purple
   - "CVA - Yearly" | Metric Code: CVA | Time Period: Yearly | Display Order: 33 | Card Color: Purple

   Current Value formulas for CVA:
   - CVA - Daily: (Sum of Related Collections where Is Today = checked) ÷ (Count of Related Patients where Is New Today = checked)
   - CVA - Weekly: (Sum of Related Collections where Is This Week = checked) ÷ (Count of Related Patients where Is New This Week = checked)
   - CVA - Monthly: (Sum of Related Collections where Is This Month = checked) ÷ (Count of Related Patients where Is New This Month = checked)
   - CVA - Quarterly: (Sum of Related Collections where Is This Quarter = checked) ÷ (Count of Related Patients where Is New This Quarter = checked)
   - CVA - Yearly: (Sum of Related Collections where Is This Year = checked) ÷ (Count of Related Patients where Is New This Year = checked)

4. **Add CVA section to Command Center dashboard**:
   Add a new toggle section titled "💎 CVA - Case Visit Average" with a linked board to DASHBOARD_METRICS filtered by Metric Code = CVA, grouped by Time Period.

Please implement all these changes.
```

---

## Summary of Changes:

### What Was Wrong:
- **OVA** was calculating visits per doctor (wrong)
- **PVA** was calculating visits per patient over their lifetime (wrong)
- **CVA** didn't exist

### What's Correct Now:
- **OVA** = Collections ÷ Visits ($ per visit)
- **PVA** = Visits ÷ New Patients in period (visits per new patient)
- **CVA** = Collections ÷ New Patients in period ($ per new patient) = OVA × PVA

### Why CVA Matters:
CVA is your **most important metric** - it tells you the lifetime value of each new patient you acquire. If CVA = $2,500, every new patient is worth $2,500 in revenue on average. This helps you determine how much you can spend on marketing to acquire new patients.

---

## Verification After Changes:

Once Notion AI implements these changes, test with sample data:

**Example Test:**
- 100 visits this month
- $5,000 collected this month
- 10 new patients this month

**Expected Results:**
- **PV** (Patient Visits) = 100
- **NP** (New Patients) = 10
- **Collections** = $5,000
- **OVA** = $5,000 / 100 = $50 per visit
- **PVA** = 100 / 10 = 10 visits per new patient
- **CVA** = $5,000 / 10 = $500 per new patient (or $50 × 10 = $500)

---

This correction is critical for accurate practice analytics!
