# 🚀 Notion AI Prompts - Add Missing Features from Google Sheets

## These prompts add the features from your Google Sheets that aren't in Notion yet

---

## PROMPT 1: Create LEADS Database

```
Create a database called "LEADS" to track lead generation and conversion with these properties:

Title property: Lead Name

Add these basic properties:
1. Lead Source - Select property with options: Referral, Social Media, Website, Walk-in, Event, Other
2. Lead Date - Date property
3. Assigned Doctor - Person property
4. Status - Select property with options: New, Contacted, Scheduled, Converted, Lost
5. Phone - Phone number property
6. Email - Email property
7. Notes - Text property (long text)
8. Conversion Date - Date property
9. Lead Value - Number property (currency format USD)

Add these formula properties:

10. Days Since Lead - Formula:
if(prop("Lead Date"), dateBetween(now(), prop("Lead Date"), "days"), 0)

11. Is This Week - Formula:
and(dateBetween(now(), prop("Lead Date"), "days") <= 7, dateBetween(now(), prop("Lead Date"), "days") >= 0, toNumber(formatDate(prop("Lead Date"), "w")) == toNumber(formatDate(now(), "w")))

12. Is This Month - Formula:
formatDate(prop("Lead Date"), "YYYY-MM") == formatDate(now(), "YYYY-MM")

13. Is This Quarter - Formula:
and(formatDate(prop("Lead Date"), "YYYY") == formatDate(now(), "YYYY"), ceil(toNumber(formatDate(prop("Lead Date"), "M")) / 3) == ceil(toNumber(formatDate(now(), "M")) / 3))

14. Is This Year - Formula:
formatDate(prop("Lead Date"), "YYYY") == formatDate(now(), "YYYY")

15. Is Converted - Formula:
if(prop("Status") == "Converted", true, false)

16. Conversion Time (Days) - Formula:
if(and(prop("Conversion Date"), prop("Lead Date")), dateBetween(prop("Conversion Date"), prop("Lead Date"), "days"), 0)

Create these views:
- All Leads (table view)
- New Leads (filtered by Status = New)
- This Week (filtered by Is This Week = true)
- This Month (filtered by Is This Month = true)
- By Doctor (grouped by Assigned Doctor)
- By Source (grouped by Lead Source)
- Converted Leads (filtered by Status = Converted)
- Lost Leads (filtered by Status = Lost)
```

---

## MANUAL STEP: Add Relation to PATIENTS

After creating LEADS database:

1. In LEADS database, add property "Converted to Patient"
2. Type: Relation
3. Select database: PATIENTS
4. Enable "Show on PATIENTS"
5. This creates bidirectional link

---

## PROMPT 2: Add Care Plan Properties to PATIENTS

```
In the PATIENTS database, add these new properties for care plan tracking:

1. Active Care Presented - Checkbox
2. Active Care Presented Date - Date property
3. Active Care Accepted - Checkbox
4. Active Care Accepted Date - Date property
5. Wellness Care Presented - Checkbox
6. Wellness Care Presented Date - Date property
7. Wellness Care Accepted - Checkbox
8. Wellness Care Accepted Date - Date property
9. Care Plan Type - Select property with options: None, Active Care Only, Wellness Care Only, Both
10. Care Plan Value - Number property (currency format USD)

Add these formula properties:

11. Active Care Status - Formula:
if(prop("Active Care Accepted"), "✅ Accepted",
  if(prop("Active Care Presented"), "📋 Presented",
    "—"))

12. Wellness Care Status - Formula:
if(prop("Wellness Care Accepted"), "✅ Accepted",
  if(prop("Wellness Care Presented"), "📋 Presented",
    "—"))

13. Days Since Care Plan Presented - Formula:
if(prop("Active Care Presented Date"),
  dateBetween(now(), prop("Active Care Presented Date"), "days"),
  if(prop("Wellness Care Presented Date"),
    dateBetween(now(), prop("Wellness Care Presented Date"), "days"),
    0))

Add these views to PATIENTS:
- Active Care Presented (filtered by Active Care Presented = checked, Active Care Accepted = unchecked)
- Wellness Care Presented (filtered by Wellness Care Presented = checked, Wellness Care Accepted = unchecked)
- Care Plans Accepted (filtered by Active Care Accepted = checked OR Wellness Care Accepted = checked)
```

---

## PROMPT 3: Create DAILY_STATS Database (Bridge for Sync)

```
Create a database called "DAILY_STATS" for daily aggregated statistics with these properties:

Title property: Date (format as YYYY-MM-DD, like "2025-01-15")

Add these basic properties:
1. Doctor - Person property
2. New Leads - Number property
3. Active Care Presented - Number property
4. Active Care Accepted - Number property
5. Wellness Presented - Number property
6. Wellness Accepted - Number property
7. Synced to Sheets - Checkbox
8. Last Sync Time - Date property (with time)

Add these formula properties:

9. Lead Conversion - Formula:
if(and(prop("New Leads") > 0, prop("New Patients") > 0), round(prop("New Patients") / prop("New Leads") * 1000) / 10, 0)

10. Active Care Conversion - Formula:
if(and(prop("Active Care Presented") > 0, prop("Active Care Accepted") > 0), round(prop("Active Care Accepted") / prop("Active Care Presented") * 1000) / 10, 0)

11. Wellness Conversion - Formula:
if(and(prop("Wellness Presented") > 0, prop("Wellness Accepted") > 0), round(prop("Wellness Accepted") / prop("Wellness Presented") * 1000) / 10, 0)

12. OVA - Formula:
if(prop("Total Patient Visits") > 0, round(prop("Collections") / prop("Total Patient Visits") * 100) / 100, 0)

13. PVA - Formula:
if(prop("New Patients") > 0, round(prop("Total Patient Visits") / prop("New Patients") * 10) / 10, 0)

14. CVA - Formula:
prop("OVA") * prop("PVA")

15. Day of Week - Formula:
formatDate(dateSubtract(now(), dateBetween(now(), prop("Date"), "days"), "days"), "dddd")

Create views:
- All Stats (table view)
- This Week (filter for dates in current week)
- This Month (filter for dates in current month)
- By Doctor (grouped by Doctor)
- Not Synced (filtered by Synced to Sheets = unchecked)
```

---

## MANUAL STEP: Add Relations to DAILY_STATS

After creating DAILY_STATS, add these relation properties:

1. **Related Visits**
   - Type: Relation
   - Database: VISITS
   - Enable bidirectional

2. **Related Patients**
   - Type: Relation
   - Database: PATIENTS
   - Enable bidirectional

3. **Related Collections**
   - Type: Relation
   - Database: COLLECTIONS
   - Enable bidirectional

4. **Related Leads**
   - Type: Relation
   - Database: LEADS
   - Enable bidirectional

---

## PROMPT 4: Add Rollups to DAILY_STATS

```
In the DAILY_STATS database, add these rollup properties:

1. New Patients - Rollup
   - Relation: Related Patients
   - Property: Is New Today
   - Calculate: Count values → Checked
   - (This counts patients where First Visit Date = this date)

2. Regular Patient Visits - Rollup
   - Relation: Related Visits
   - Property: Visit Type
   - Calculate: Count values
   - Filter: Where Visit Type ≠ "New Patient"

3. Total Patient Visits - Rollup
   - Relation: Related Visits
   - Property: Visit ID
   - Calculate: Count all

4. Collections - Rollup
   - Relation: Related Collections
   - Property: Amount
   - Calculate: Sum
   - Filter: Where Status = "Paid"

5. Leads Count - Rollup
   - Relation: Related Leads
   - Property: Lead Name
   - Calculate: Count all
```

---

## PROMPT 5: Update Command Center Dashboard

```
In the Command Center dashboard page, add these new sections:

After the DOV section, add:

## 📞 Lead Tracking

[Create a toggle block]
Inside the toggle, add a linked view of the LEADS database with these settings:
- View type: Table
- Filter: This Month (Is This Month = true)
- Sort by: Lead Date (descending)
- Show columns: Lead Name, Lead Source, Assigned Doctor, Status, Days Since Lead

## 📋 Care Plan Status

[Create a toggle block]
Inside the toggle, add a linked view of the PATIENTS database with these settings:
- View type: Table
- Filter: Active Care Presented = checked OR Wellness Care Presented = checked
- Show columns: Patient Name, Active Care Status, Wellness Care Status, Assigned Doctor

## 📊 Daily Stats Sync Status

[Create a toggle block]
Inside the toggle, add a linked view of the DAILY_STATS database with these settings:
- View type: Table
- Filter: This Week
- Sort by: Date (descending)
- Show columns: Date, Doctor, Total Patient Visits, Collections, OVA, PVA, CVA, Synced to Sheets

[Add button] "🔄 Refresh Sync Status"
```

---

## PROMPT 6: Add Lead Source to Notion Person Properties

```
In the PATIENTS database, add a property:

Lead Source - Select property with options: Referral, Social Media, Website, Walk-in, Event, Direct, Other

This tracks where each patient originally came from.
```

---

## VERIFICATION CHECKLIST

After running all prompts:

- [ ] LEADS database created with 16 properties
- [ ] LEADS has 8 views
- [ ] LEADS connected to PATIENTS via relation
- [ ] PATIENTS has 13 new care plan properties
- [ ] PATIENTS has 3 new care plan views
- [ ] DAILY_STATS database created
- [ ] DAILY_STATS has 15 properties (formulas + rollups)
- [ ] DAILY_STATS connected to VISITS, PATIENTS, COLLECTIONS, LEADS
- [ ] Command Center dashboard has 3 new sections
- [ ] All formulas calculating correctly

---

## NEXT STEPS AFTER NOTION SETUP

1. Test with sample data
2. Verify all formulas work
3. Move to Google Sheets update
4. Set up sync automation

---

**Now you have feature parity with Google Sheets + enhanced Notion capabilities!** 🚀
