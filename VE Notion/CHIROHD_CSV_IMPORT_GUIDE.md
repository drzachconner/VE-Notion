# 📥 ChiroHD to Notion CSV Import Guide

## Quick Reference for Data Import

This guide shows you exactly how to format your ChiroHD data for import into Notion.

---

## 🗂️ CSV FILE TEMPLATES

### 1. VISITS CSV Template

**Filename:** `chirohd_visits_export.csv`

**Required Columns:**
```csv
visit_id,patient_id,visit_date,doctor_name,visit_type,treatment_notes,duration_minutes,amount_collected
```

**Example Data:**
```csv
visit_id,patient_id,visit_date,doctor_name,visit_type,treatment_notes,duration_minutes,amount_collected
V001,P001,2025-01-15 09:00,Dr. John Smith,New Patient,Initial consultation and adjustment,45,120
V002,P002,2025-01-15 10:30,Dr. John Smith,Follow-Up,Regular adjustment - upper cervical,30,75
V003,P001,2025-01-18 14:00,Dr. John Smith,Follow-Up,Second visit - progressing well,30,75
V004,P003,2025-01-20 09:00,Dr. Sarah Jones,New Patient,Initial exam and x-rays,60,150
V005,P002,2025-01-22 10:00,Dr. John Smith,Therapy,Muscle therapy session,45,90
```

**Field Specifications:**

| Column Name | Data Type | Format | Example | Notes |
|-------------|-----------|--------|---------|-------|
| visit_id | Text | Any unique ID | V001, 12345 | Must be unique per visit |
| patient_id | Text | Match Patient CSV | P001, PAT12345 | Links to patient record |
| visit_date | Date/Time | YYYY-MM-DD HH:MM | 2025-01-15 09:00 | Required for time-based calculations |
| doctor_name | Text | Full name | Dr. John Smith | Must match Notion Person exactly |
| visit_type | Text | Category | New Patient, Follow-Up, Therapy, Re-exam, Adjustment | Must match Notion select options |
| treatment_notes | Text | Any text | "Patient showing improvement" | Optional but recommended |
| duration_minutes | Number | Integer | 30, 45, 60 | Minutes only |
| amount_collected | Number | Decimal | 75.00, 120.50 | Dollar amount (no $ symbol) |

---

### 2. PATIENTS CSV Template

**Filename:** `chirohd_patients_export.csv`

**Required Columns:**
```csv
patient_id,patient_name,first_visit_date,last_visit_date,phone,email,insurance_provider,status
```

**Example Data:**
```csv
patient_id,patient_name,first_visit_date,last_visit_date,phone,email,insurance_provider,status
P001,John Doe,2025-01-15,2025-01-18,(555) 123-4567,john.doe@email.com,Blue Cross,Active
P002,Jane Smith,2025-01-15,2025-01-22,(555) 234-5678,jane.smith@email.com,Aetna,Active
P003,Bob Johnson,2025-01-20,2025-01-20,(555) 345-6789,bob.j@email.com,Self-Pay,New
P004,Mary Williams,2024-10-05,2024-11-12,(555) 456-7890,mary.w@email.com,Cigna,Inactive
```

**Field Specifications:**

| Column Name | Data Type | Format | Example | Notes |
|-------------|-----------|--------|---------|-------|
| patient_id | Text | Any unique ID | P001, PAT123 | Must match Visits CSV |
| patient_name | Text | Full name | John Doe | First and last name |
| first_visit_date | Date | YYYY-MM-DD | 2025-01-15 | First ever visit |
| last_visit_date | Date | YYYY-MM-DD | 2025-01-22 | Most recent visit |
| phone | Phone | (XXX) XXX-XXXX | (555) 123-4567 | Any format works |
| email | Email | standard email | john@email.com | Valid email format |
| insurance_provider | Text | Provider name | Blue Cross, Aetna, Self-Pay | Add to Notion select options first |
| status | Text | Status category | New, Active, Inactive, At Risk | Must match Notion options |

---

### 3. COLLECTIONS CSV Template

**Filename:** `chirohd_collections_export.csv`

**Required Columns:**
```csv
transaction_id,patient_id,transaction_date,amount,payment_method,service_type,doctor_name,status
```

**Example Data:**
```csv
transaction_id,patient_id,transaction_date,amount,payment_method,service_type,doctor_name,status
T001,P001,2025-01-15,120.00,Card,Consultation,Dr. John Smith,Paid
T002,P002,2025-01-15,75.00,Cash,Adjustment,Dr. John Smith,Paid
T003,P001,2025-01-18,75.00,Insurance,Adjustment,Dr. John Smith,Paid
T004,P003,2025-01-20,150.00,Card,Consultation,Dr. Sarah Jones,Paid
T005,P002,2025-01-22,90.00,Card,Therapy,Dr. John Smith,Paid
T006,P004,2024-11-12,50.00,Check,Adjustment,Dr. John Smith,Pending
```

**Field Specifications:**

| Column Name | Data Type | Format | Example | Notes |
|-------------|-----------|--------|---------|-------|
| transaction_id | Text | Any unique ID | T001, TXN12345 | Must be unique per transaction |
| patient_id | Text | Match Patient CSV | P001 | Links to patient record |
| transaction_date | Date | YYYY-MM-DD | 2025-01-15 | Payment date |
| amount | Number | Decimal | 75.00, 120.50 | Dollar amount (no $ symbol) |
| payment_method | Text | Method type | Cash, Card, Insurance, Check, Other | Must match Notion options |
| service_type | Text | Service category | Adjustment, Therapy, Consultation, X-Ray, Other | Must match Notion options |
| doctor_name | Text | Full name | Dr. John Smith | Must match Notion Person |
| status | Text | Payment status | Paid, Pending, Refunded | Must match Notion options |

---

## 📋 IMPORT PROCESS

### Step 1: Prepare Your CSV Files

1. **Export from ChiroHD**
   - Navigate to ChiroHD reports section
   - Export Visits, Patients, and Collections data
   - Choose CSV format
   - Save to your computer

2. **Clean the Data**
   - Open in Excel or Google Sheets
   - Remove any extra columns not needed
   - Verify dates are formatted as YYYY-MM-DD
   - Check for blank required fields
   - Verify patient_id matches across all files
   - Save as CSV (not Excel format)

### Step 2: Import to Notion

**Import Order (IMPORTANT):**
1. **PATIENTS first** (so relations can link)
2. **VISITS second** (can now link to patients)
3. **COLLECTIONS third** (can link to patients)

**For Each Database:**

1. Open the Notion database (PATIENTS, VISITS, or COLLECTIONS)

2. Click the "•••" menu in top right

3. Select "Merge with CSV"

4. Upload your CSV file

5. **Map the columns:**
   - CSV Column → Notion Property
   - visit_id → Visit ID
   - patient_id → Patient (for relations, select "Create relations")
   - visit_date → Visit Date
   - doctor_name → Doctor (match to Person)
   - etc.

6. **Important Settings:**
   - "Update existing": Check if updating existing records
   - "Create relations": Check for patient_id fields
   - "Match by": Use patient_id or visit_id for matching

7. Click "Import"

8. **Verify the import:**
   - Check row count matches CSV
   - Spot check several entries
   - Verify relations connected
   - Check formulas calculated

### Step 3: Post-Import Verification

**Check PATIENTS database:**
- [ ] All patients imported
- [ ] Relations to Visits working (Total Visits showing)
- [ ] Relations to Collections working (Lifetime Value showing)
- [ ] Formulas calculating (PVA, Days Since Last Visit)
- [ ] Status values correct

**Check VISITS database:**
- [ ] All visits imported
- [ ] Patient relations linked
- [ ] Date formulas working (Is Today, Is This Week, etc.)
- [ ] Doctor names matched to Person fields

**Check COLLECTIONS database:**
- [ ] All transactions imported
- [ ] Patient relations linked
- [ ] Amount values correct (with $ symbol)
- [ ] Date formulas working
- [ ] Status values correct

**Check DASHBOARD_METRICS:**
- [ ] PV metrics showing correct counts
- [ ] NP metrics showing correct counts
- [ ] Collections showing correct totals
- [ ] All time periods calculating (Daily, Weekly, Monthly, etc.)

---

## 🔧 TROUBLESHOOTING IMPORTS

### Issue: Relations Not Linking

**Problem:** Patient field stays empty after import

**Solution:**
1. Make sure PATIENTS database imported first
2. Verify patient_id values match exactly (case-sensitive)
3. Check "Create relations" was enabled during import
4. Try manual linking for a few to test
5. Re-import with "Update existing" checked

### Issue: Dates Not Formatting

**Problem:** Dates show as text or "Invalid"

**Solution:**
1. Check CSV date format is YYYY-MM-DD or YYYY-MM-DD HH:MM
2. Remove any non-date text in date columns
3. Use Excel to convert dates to proper format:
   - Select column
   - Format Cells → Date → YYYY-MM-DD
   - Save as CSV again

### Issue: Duplicate Entries

**Problem:** Import created duplicates of existing records

**Solution:**
1. Before importing, select "Update existing" option
2. Choose which field to match on (visit_id, patient_id, transaction_id)
3. If duplicates already created:
   - Sort by Created Date
   - Filter to show only recently created
   - Select and delete duplicates
   - Re-import with correct settings

### Issue: Formulas Not Calculating

**Problem:** After import, formulas show blank or 0

**Solution:**
1. Relations must be set up first (patient_id linking)
2. Wait a few minutes - Notion can be slow with large imports
3. Click into a formula cell - this forces recalculation
4. If still not working, check the formula references correct property names
5. Create test entry manually to verify formula works

### Issue: Person Field Not Matching

**Problem:** Doctor names import as text instead of Person

**Solution:**
1. Before import, add all doctors as Workspace members
2. Or, set up Person field with exact names
3. During import, map doctor_name → Doctor
4. Notion should auto-match names
5. If not matching:
   - Check exact spelling (Dr. John Smith vs John Smith)
   - Check for extra spaces
   - Manually assign for first few to test
   - Consider using email addresses instead if doctors have Notion accounts

---

## 📊 SAMPLE DATA FOR TESTING

If you want to test the system before importing real data, use this sample dataset:

**Sample Visits (10 entries):**
```csv
visit_id,patient_id,visit_date,doctor_name,visit_type,treatment_notes,duration_minutes,amount_collected
V001,P001,2025-01-15 09:00,Dr. John Smith,New Patient,Initial consultation,45,120
V002,P002,2025-01-15 10:30,Dr. John Smith,Follow-Up,Adjustment,30,75
V003,P003,2025-01-16 14:00,Dr. Sarah Jones,New Patient,Initial exam,60,150
V004,P001,2025-01-18 09:00,Dr. John Smith,Follow-Up,Follow-up adjustment,30,75
V005,P002,2025-01-19 11:00,Dr. John Smith,Therapy,Therapy session,45,90
V006,P004,2025-01-20 10:00,Dr. Sarah Jones,New Patient,New patient exam,60,150
V007,P003,2025-01-21 15:00,Dr. Sarah Jones,Follow-Up,Second visit,30,75
V008,P001,2025-01-22 09:00,Dr. John Smith,Follow-Up,Third visit,30,75
V009,P005,2025-01-22 14:00,Dr. John Smith,New Patient,Initial consultation,45,120
V010,P002,2025-01-23 10:00,Dr. John Smith,Follow-Up,Regular adjustment,30,75
```

**Sample Patients (5 entries):**
```csv
patient_id,patient_name,first_visit_date,last_visit_date,phone,email,insurance_provider,status
P001,John Doe,2025-01-15,2025-01-22,(555) 123-4567,john.doe@email.com,Blue Cross,Active
P002,Jane Smith,2025-01-15,2025-01-23,(555) 234-5678,jane.smith@email.com,Aetna,Active
P003,Bob Johnson,2025-01-16,2025-01-21,(555) 345-6789,bob.j@email.com,Self-Pay,Active
P004,Mary Williams,2025-01-20,2025-01-20,(555) 456-7890,mary.w@email.com,Cigna,New
P005,Tom Brown,2025-01-22,2025-01-22,(555) 567-8901,tom.b@email.com,United,New
```

**Sample Collections (10 entries):**
```csv
transaction_id,patient_id,transaction_date,amount,payment_method,service_type,doctor_name,status
T001,P001,2025-01-15,120.00,Card,Consultation,Dr. John Smith,Paid
T002,P002,2025-01-15,75.00,Cash,Adjustment,Dr. John Smith,Paid
T003,P003,2025-01-16,150.00,Insurance,Consultation,Dr. Sarah Jones,Paid
T004,P001,2025-01-18,75.00,Card,Adjustment,Dr. John Smith,Paid
T005,P002,2025-01-19,90.00,Card,Therapy,Dr. John Smith,Paid
T006,P004,2025-01-20,150.00,Insurance,Consultation,Dr. Sarah Jones,Paid
T007,P003,2025-01-21,75.00,Cash,Adjustment,Dr. Sarah Jones,Paid
T008,P001,2025-01-22,75.00,Card,Adjustment,Dr. John Smith,Paid
T009,P005,2025-01-22,120.00,Check,Consultation,Dr. John Smith,Pending
T010,P002,2025-01-23,75.00,Card,Adjustment,Dr. John Smith,Paid
```

**Copy these into separate CSV files to test your import process.**

---

## 🔄 ONGOING IMPORTS (After Initial Setup)

### Weekly Import Process

1. **Export from ChiroHD:**
   - Export last week's visits, new patients, collections
   - Use date range filter in ChiroHD

2. **Import to Notion:**
   - Import new visits → VISITS database
   - Import new patients → PATIENTS database
   - Import new collections → COLLECTIONS database
   - Select "Update existing" to avoid duplicates

3. **Verify Metrics:**
   - Check dashboard shows updated numbers
   - Verify weekly totals match ChiroHD
   - Spot check a few recent entries

### Automated Import (Future Enhancement)

**Options for automation:**
1. **Zapier Integration:**
   - ChiroHD → Zapier → Notion
   - Trigger on new visit/patient/collection
   - Auto-creates Notion entry

2. **Make (formerly Integromat):**
   - Similar to Zapier
   - More complex workflows

3. **Custom API Script:**
   - Use ChiroHD API (if available)
   - Python/Node.js script
   - Scheduled to run daily
   - Pushes to Notion API

4. **Manual Schedule:**
   - Set reminder every Monday morning
   - Export and import week's data
   - 10-15 minutes weekly

---

## 📋 IMPORT CHECKLIST

Use this checklist each time you import:

### Pre-Import
- [ ] Export data from ChiroHD
- [ ] Save CSV files to computer
- [ ] Open CSVs in Excel/Sheets to verify formatting
- [ ] Check dates formatted as YYYY-MM-DD
- [ ] Verify required columns present
- [ ] Check for duplicate IDs
- [ ] Save as CSV (not Excel)

### Import Patients
- [ ] Open PATIENTS database in Notion
- [ ] Merge with CSV
- [ ] Map all columns correctly
- [ ] Enable "Create relations" if needed
- [ ] Import
- [ ] Verify row count
- [ ] Spot check 5-10 entries

### Import Visits
- [ ] Open VISITS database
- [ ] Merge with CSV
- [ ] Map columns
- [ ] Ensure Patient relation maps to patient_id
- [ ] Import
- [ ] Verify row count
- [ ] Check patient relations linked
- [ ] Verify date formulas working

### Import Collections
- [ ] Open COLLECTIONS database
- [ ] Merge with CSV
- [ ] Map columns
- [ ] Patient relation to patient_id
- [ ] Import
- [ ] Verify amounts showing with $ symbol
- [ ] Check relations working

### Post-Import Verification
- [ ] Check DASHBOARD_METRICS updated
- [ ] Verify all time period totals (Daily, Weekly, Monthly)
- [ ] Check PVA calculations
- [ ] Verify Collections totals match ChiroHD
- [ ] Test a few patient records show all visits and collections
- [ ] Review dashboard for any anomalies

### Cleanup
- [ ] Archive CSV files (save for records)
- [ ] Document any issues encountered
- [ ] Update "Last Sync" timestamp on dashboard
- [ ] Notify team data is updated

---

## 💡 BEST PRACTICES

1. **Always backup before import:**
   - Duplicate your Notion databases first
   - Keep original CSVs

2. **Test with small batch first:**
   - Import 10-20 records
   - Verify everything works
   - Then import full dataset

3. **Consistent naming:**
   - Use same doctor names every time
   - Standardize insurance provider names
   - Keep patient_id format consistent

4. **Regular schedule:**
   - Weekly imports better than monthly
   - Less data to process each time
   - Keeps metrics current

5. **Data validation:**
   - Check for outliers (unusually high amounts, etc.)
   - Verify date ranges make sense
   - Spot check calculations

---

**Questions or issues? Refer to ULTIMATE_TEMPLATE_DESIGN.md for detailed database specifications.**
