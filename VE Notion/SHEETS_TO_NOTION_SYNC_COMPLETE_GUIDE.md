# 🔄 Google Sheets ↔ Notion Bidirectional Sync - Complete Guide

## Executive Summary

Your Google Sheets tracker is a **daily-entry aggregation system** with 5 doctors.
Your Notion system is a **transactional database** with individual records.

**Key Challenge:** These are two different data models that need intelligent sync.

---

## 📊 CURRENT GOOGLE SHEETS ANALYSIS

### Sheet Structure (12 sheets total):

1. **Clinic Totals** - Master rollup (aggregates all 5 doctors)
2. **Steph** - Individual doctor tracking (REAL DATA)
3. **DOCTOR 2** - Placeholder (needs real name)
4. **DOCTOR 3** - Placeholder (needs real name)
5. **DOCTOR 4** - Placeholder with sample data
6. **DOCTOR 5** - Placeholder
7. **DASHBOARD** - Visual reporting with filters
8. **DROPDOWNS** - Data validation lists
9. **WEEKLY** - Weekly aggregations
10. **2025 Targets & Actual** - Goals tracking
11. **Leads** - Lead management
12. **New Patients** - New patient tracking

### Current Doctor Names:
- ✅ **Steph** (real doctor with data)
- ❌ **DOCTOR 2** → Need to replace
- ❌ **DOCTOR 3** → Need to replace
- ❌ **DOCTOR 4** → Need to replace
- ❌ **DOCTOR 5** → Need to replace

### Daily Entry Columns (Each Doctor Sheet):

| Column | Description | Type |
|--------|-------------|------|
| Date | Day of entry | Date |
| # of New Leads | Leads generated | Number |
| # of New Patient | New patients seen | Number |
| Lead Conversion | % (New Patients / Leads) | Formula |
| Active Care Presented | Care plans presented | Number |
| Active Care Accepted | Care plans accepted | Number |
| Active Care Conversion | % (Accepted / Presented) | Formula |
| Wellness Presented | Wellness plans presented | Number |
| Wellness Accepted | Wellness plans accepted | Number |
| Wellness Conversion | % (Accepted / Presented) | Formula |
| Regular Patient Visits | Returning patient visits | Number |
| Total Patient Visits | New + Regular | Formula |
| Collections | $ collected that day | Currency |

### Calculated Metrics (WEEKLY sheet):
- **OVA** (Office Visit Average) = Collections ÷ Total Visits
- **PVA** (Patient Visit Average) = Total Visits ÷ New Patients
- **CVA** (Case Visit Average) = OVA × PVA

---

## 🎯 VALUABLE FEATURES IN SHEETS (Not in Notion Yet)

### 1. **Lead Tracking** ⭐⭐⭐ HIGH VALUE
- Number of leads generated daily
- Lead source tracking
- Lead conversion rate
- **Action:** Add LEADS database to Notion

### 2. **Care Plan Tracking** ⭐⭐⭐ HIGH VALUE
- Active Care vs Wellness Care separation
- Presented vs Accepted tracking
- Conversion rates
- **Action:** Add care plan properties to Notion

### 3. **Regular vs New Patient Separation** ⭐⭐ MEDIUM VALUE
- Distinguishes new patient visits from return visits
- **Action:** Already have this (Visit Type property)

### 4. **Weekly/Monthly/Quarterly Aggregations** ⭐⭐⭐ HIGH VALUE
- Pre-calculated summaries
- Dynamic filtering by time period
- **Action:** Already handled in Notion with time-period formulas

### 5. **Goals/Targets Tracking** ⭐⭐ MEDIUM VALUE
- Target vs Actual comparison
- **Action:** Have Business Goals database, needs enhancement

---

## 🏗️ SYNC ARCHITECTURE DESIGN

### Data Model Comparison:

**Google Sheets Model:**
```
Daily Entry per Doctor:
- Date: 2025-01-01
- New Patients: 5
- Regular Visits: 50
- Collections: $5,500
```

**Notion Model:**
```
Individual Transactions:
- Visit 1: Patient A, Dr. Smith, $100
- Visit 2: Patient B, Dr. Smith, $80
- Visit 3: Patient C, Dr. Smith, $90
... (55 total visits)
```

### Sync Strategy: HYBRID APPROACH

**Direction 1: Sheets → Notion (Daily Summary Import)**
- At end of each day, import the daily summary from Sheets
- Create aggregated records in Notion
- Preserve individual transaction capability

**Direction 2: Notion → Sheets (Real-time Aggregation)**
- As transactions are added in Notion, aggregate to daily totals
- Update corresponding day in Google Sheets
- Maintain Sheets as the "summary view"

---

## 🔧 RECOMMENDED SYNC METHOD: GOOGLE APPS SCRIPT + NOTION API

### Why This Method:

✅ **FREE** - No monthly subscription
✅ **Bidirectional** - Updates both ways
✅ **Real-time** - Triggers on data changes
✅ **Customizable** - Full control over logic
✅ **Cloud-based** - Runs in Google's infrastructure
✅ **No hosting needed** - Built into Google Sheets

❌ Zapier/Make: $20-50/month, task limits
❌ Manual CSV: No automation
❌ Custom server: Requires hosting, complex

---

## 📋 IMPLEMENTATION PLAN

### Phase 1: Add Missing Features to Notion (1-2 hours)

#### 1.1 Create LEADS Database

**Purpose:** Track lead generation and conversion

**Properties:**
- Lead Name (Title)
- Lead Source (Select: Referral | Social Media | Website | Walk-in | Other)
- Lead Date (Date)
- Assigned Doctor (Person)
- Status (Select: New | Contacted | Scheduled | Converted | Lost)
- Converted to Patient (Relation → PATIENTS)
- Conversion Date (Date)
- Notes (Text)
- Phone (Phone)
- Email (Email)

**Formulas:**
- Days Since Lead: `dateBetween(now(), prop("Lead Date"), "days")`
- Is This Week: (same time-period formula as other databases)
- Is This Month: (same)
- Is Converted: `if(prop("Status") == "Converted", true, false)`

**Views:**
- All Leads
- New Leads (Status = New)
- This Week
- This Month
- By Doctor
- By Source
- Converted Leads
- Lost Leads

#### 1.2 Add Care Plan Properties to PATIENTS

**New Properties:**
- Active Care Presented (Checkbox)
- Active Care Presented Date (Date)
- Active Care Accepted (Checkbox)
- Active Care Accepted Date (Date)
- Wellness Care Presented (Checkbox)
- Wellness Care Presented Date (Date)
- Wellness Care Accepted (Checkbox)
- Wellness Care Accepted Date (Date)
- Care Plan Type (Select: None | Active Care | Wellness Care | Both)
- Care Plan Value (Number - $)

#### 1.3 Create DAILY_STATS Database (Bridge to Sheets)

**Purpose:** Daily aggregated stats that mirror Google Sheets structure

**Properties:**
- Date (Title - formatted as YYYY-MM-DD)
- Doctor (Person)
- New Leads (Number)
- New Patients (Rollup from PATIENTS where First Visit Date = this date)
- Lead Conversion (Formula)
- Active Care Presented (Number)
- Active Care Accepted (Number)
- Active Care Conversion (Formula)
- Wellness Presented (Number)
- Wellness Accepted (Number)
- Wellness Conversion (Formula)
- Regular Patient Visits (Rollup from VISITS where Visit Type ≠ New Patient)
- Total Patient Visits (Rollup from VISITS)
- Collections (Rollup from COLLECTIONS)
- OVA (Formula: Collections ÷ Total Visits)
- PVA (Formula: Total Visits ÷ New Patients)
- CVA (Formula: OVA × PVA)
- Synced to Sheets (Checkbox)
- Last Sync Time (Date with time)

**This database is the KEY to bidirectional sync!**

### Phase 2: Update Google Sheets Doctor Names (15 minutes)

#### Replace Placeholders with Real Names

You mentioned 3 doctors for Van Every Chiropractic. Please provide their names and I'll create the exact steps.

**Process:**
1. Rename sheet tabs: DOCTOR 2 → [Doctor Name]
2. Update all formulas in Clinic Totals to reference new names
3. Update WEEKLY sheet formulas
4. Update DASHBOARD filters
5. Test that aggregations still work

### Phase 3: Build Sync Automation (2-3 hours setup, then automatic forever)

#### Option A: Google Apps Script (RECOMMENDED - FREE)

**Setup Steps:**

1. **In Google Sheets:**
   - Extensions → Apps Script
   - Paste sync code (I'll provide)
   - Set up triggers (onChange, onEdit, time-based)

2. **In Notion:**
   - Get API integration key
   - Get database IDs
   - Configure permissions

3. **Configure Sync:**
   - Map Sheets columns to Notion properties
   - Set sync frequency
   - Enable bidirectional mode

**Sync Triggers:**

**Sheets → Notion:**
- Trigger: onEdit (when doctor enters data in Sheets)
- Action: Create/update DAILY_STATS entry in Notion
- Frequency: Immediate (real-time)

**Notion → Sheets:**
- Trigger: Time-based (every 15 minutes)
- Action: Aggregate Notion transactions to daily totals
- Update: Corresponding date/doctor row in Sheets

#### Option B: Zapier (EASIER BUT COSTS MONEY - $20-50/month)

**Two Zaps Needed:**

**Zap 1: Sheets → Notion**
- Trigger: New or Updated Row in Google Sheets
- Filter: Only process doctor sheets (not Clinic Totals)
- Action: Create or Update DAILY_STATS in Notion

**Zap 2: Notion → Sheets**
- Trigger: New Database Item in Notion (VISITS, COLLECTIONS, PATIENTS)
- Action: Update Google Sheets with aggregated totals
- Frequency: Every 15 minutes

---

## 🗺️ COLUMN MAPPING: GOOGLE SHEETS ↔ NOTION

### Sheets "Steph" → Notion "DAILY_STATS"

| Google Sheets Column | Notion Property | Sync Direction |
|---------------------|-----------------|----------------|
| Date | Date | Both |
| (Sheet name = Steph) | Doctor = Steph | Sheets → Notion |
| # of New Leads | New Leads | Both |
| # of New Patient | New Patients (rollup) | Notion → Sheets |
| Lead Conversion | Lead Conversion (formula) | Auto-calculated |
| Active Care Presented | Active Care Presented | Sheets → Notion |
| Active Care Accepted | Active Care Accepted | Sheets → Notion |
| Active Care Conversion | Active Care Conversion (formula) | Auto-calculated |
| Wellness Presented | Wellness Presented | Sheets → Notion |
| Wellness Accepted | Wellness Accepted | Sheets → Notion |
| Wellness Conversion | Wellness Conversion (formula) | Auto-calculated |
| Regular Patient Visits | Regular Patient Visits (rollup) | Notion → Sheets |
| Total Patient Visits | Total Patient Visits (rollup) | Notion → Sheets |
| Collections | Collections (rollup) | Notion → Sheets |

### Notion Individual Transactions → Sheets Aggregation

**VISITS table entries:**
- Aggregate by Date + Doctor
- Count where Visit Type = "New Patient" → # of New Patient
- Count where Visit Type ≠ "New Patient" → Regular Patient Visits
- Total count → Total Patient Visits

**COLLECTIONS table entries:**
- Aggregate by Date + Doctor
- Sum of Amount → Collections

**PATIENTS table entries:**
- Count where First Visit Date = Date and Assigned Doctor = Doctor → # of New Patient
- Count where Active Care Presented Date = Date → Active Care Presented
- Count where Active Care Accepted Date = Date → Active Care Accepted
- Count where Wellness Presented Date = Date → Wellness Presented
- Count where Wellness Accepted Date = Date → Wellness Accepted

**LEADS table entries:**
- Count where Lead Date = Date and Assigned Doctor = Doctor → # of New Leads

---

## 💻 GOOGLE APPS SCRIPT CODE

### Part 1: Sheets → Notion Sync

```javascript
// Configuration
const NOTION_API_KEY = 'YOUR_NOTION_INTEGRATION_SECRET';
const DAILY_STATS_DATABASE_ID = 'YOUR_DAILY_STATS_DATABASE_ID';

// Trigger: onEdit
function onEditTrigger(e) {
  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();

  // Only process doctor sheets
  const doctorSheets = ['Steph', 'DOCTOR 2', 'DOCTOR 3', 'DOCTOR 4', 'DOCTOR 5'];
  if (!doctorSheets.includes(sheetName)) return;

  const row = e.range.getRow();
  if (row < 2) return; // Skip header

  // Get row data
  const rowData = sheet.getRange(row, 1, 1, 14).getValues()[0];
  const date = rowData[1]; // Column B
  const newLeads = rowData[2] || 0;
  const newPatients = rowData[3] || 0;
  const activePresented = rowData[5] || 0;
  const activeAccepted = rowData[6] || 0;
  const wellnessPresented = rowData[8] || 0;
  const wellnessAccepted = rowData[9] || 0;
  const regularVisits = rowData[11] || 0;
  const collections = rowData[13] || 0;

  // Sync to Notion
  syncToNotion(sheetName, date, {
    newLeads,
    newPatients,
    activePresented,
    activeAccepted,
    wellnessPresented,
    wellnessAccepted,
    regularVisits,
    collections
  });
}

function syncToNotion(doctor, date, data) {
  const dateStr = Utilities.formatDate(new Date(date), 'GMT', 'yyyy-MM-dd');

  // Check if entry exists
  const existingId = findDailyStatEntry(doctor, dateStr);

  const payload = {
    parent: { database_id: DAILY_STATS_DATABASE_ID },
    properties: {
      'Date': {
        title: [{ text: { content: dateStr } }]
      },
      'Doctor': {
        people: [{ name: doctor }] // Must match Notion workspace member
      },
      'New Leads': {
        number: data.newLeads
      },
      'Active Care Presented': {
        number: data.activePresented
      },
      'Active Care Accepted': {
        number: data.activeAccepted
      },
      'Wellness Presented': {
        number: data.wellnessPresented
      },
      'Wellness Accepted': {
        number: data.wellnessAccepted
      },
      'Synced to Sheets': {
        checkbox: true
      },
      'Last Sync Time': {
        date: { start: new Date().toISOString() }
      }
    }
  };

  const options = {
    method: existingId ? 'patch' : 'post',
    headers: {
      'Authorization': 'Bearer ' + NOTION_API_KEY,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    payload: JSON.stringify(payload)
  };

  const url = existingId
    ? `https://api.notion.com/v1/pages/${existingId}`
    : 'https://api.notion.com/v1/pages';

  try {
    UrlFetchApp.fetch(url, options);
    Logger.log(`Synced ${doctor} for ${dateStr} to Notion`);
  } catch (error) {
    Logger.log(`Error syncing to Notion: ${error}`);
  }
}

function findDailyStatEntry(doctor, date) {
  const url = `https://api.notion.com/v1/databases/${DAILY_STATS_DATABASE_ID}/query`;

  const payload = {
    filter: {
      and: [
        {
          property: 'Date',
          title: { equals: date }
        },
        {
          property: 'Doctor',
          people: { contains: doctor }
        }
      ]
    }
  };

  const options = {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + NOTION_API_KEY,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());
    return data.results.length > 0 ? data.results[0].id : null;
  } catch (error) {
    Logger.log(`Error finding entry: ${error}`);
    return null;
  }
}
```

### Part 2: Notion → Sheets Sync (Scheduled Trigger)

```javascript
// Trigger: Time-based (every 15 minutes)
function notionToSheetsSync() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const doctors = ['Steph', 'DOCTOR 2', 'DOCTOR 3', 'DOCTOR 4', 'DOCTOR 5'];

  // Get today's date
  const today = new Date();
  const todayStr = Utilities.formatDate(today, 'GMT', 'yyyy-MM-dd');

  doctors.forEach(doctor => {
    const stats = getDailyStatsFromNotion(doctor, todayStr);
    if (stats) {
      updateSheetRow(ss, doctor, todayStr, stats);
    }
  });
}

function getDailyStatsFromNotion(doctor, date) {
  const url = `https://api.notion.com/v1/databases/${DAILY_STATS_DATABASE_ID}/query`;

  const payload = {
    filter: {
      and: [
        {
          property: 'Date',
          title: { equals: date }
        },
        {
          property: 'Doctor',
          people: { contains: doctor }
        }
      ]
    }
  };

  const options = {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + NOTION_API_KEY,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    if (data.results.length === 0) return null;

    const page = data.results[0];
    const props = page.properties;

    return {
      newPatients: props['New Patients']?.rollup?.number || 0,
      regularVisits: props['Regular Patient Visits']?.rollup?.number || 0,
      totalVisits: props['Total Patient Visits']?.rollup?.number || 0,
      collections: props['Collections']?.rollup?.number || 0
    };
  } catch (error) {
    Logger.log(`Error getting Notion stats: ${error}`);
    return null;
  }
}

function updateSheetRow(ss, doctorName, date, stats) {
  const sheet = ss.getSheetByName(doctorName);
  if (!sheet) return;

  // Find row with this date
  const dates = sheet.getRange('B2:B1000').getValues();
  const targetDate = new Date(date);

  for (let i = 0; i < dates.length; i++) {
    const rowDate = new Date(dates[i][0]);
    if (rowDate.getTime() === targetDate.getTime()) {
      const row = i + 2; // +2 for header and 0-indexing

      // Update only the aggregated columns (not manually entered data)
      sheet.getRange(row, 4).setValue(stats.newPatients); // # of New Patient
      sheet.getRange(row, 12).setValue(stats.regularVisits); // Regular Visits
      sheet.getRange(row, 14).setValue(stats.collections); // Collections

      Logger.log(`Updated ${doctorName} row ${row} with Notion data`);
      return;
    }
  }
}
```

### Setup Instructions for Apps Script:

1. Open Google Sheets
2. Extensions → Apps Script
3. Delete default code
4. Paste Part 1 and Part 2 code
5. Update configuration:
   - Get Notion API key from notion.so/my-integrations
   - Get DAILY_STATS database ID from Notion
6. Save project (name it "Sheets-Notion Sync")
7. Set up triggers:
   - Add trigger: `onEditTrigger` → On edit
   - Add trigger: `notionToSheetsSync` → Time-driven → Every 15 minutes
8. Authorize permissions when prompted
9. Test by editing a cell in Steph sheet

---

## 🎯 STEP-BY-STEP IMPLEMENTATION CHECKLIST

### Part 1: Notion Setup (1 hour)

- [ ] Create LEADS database with all properties
- [ ] Create DAILY_STATS database with all properties
- [ ] Add Care Plan properties to PATIENTS database
- [ ] Set up relations:
  - DAILY_STATS → PATIENTS (for New Patients rollup)
  - DAILY_STATS → VISITS (for visits rollups)
  - DAILY_STATS → COLLECTIONS (for collections rollup)
  - DAILY_STATS → LEADS (for leads rollup)
- [ ] Configure rollup formulas in DAILY_STATS
- [ ] Create views in each database
- [ ] Add LEADS and DAILY_STATS sections to Command Center dashboard

### Part 2: Google Sheets Update (15 minutes)

- [ ] Provide 3 doctor names to replace DOCTOR 2, 3, 5
- [ ] Rename sheet tabs
- [ ] Update formulas in Clinic Totals
- [ ] Update formulas in WEEKLY
- [ ] Update DASHBOARD filters
- [ ] Test that aggregations work

### Part 3: Sync Setup (1-2 hours)

**Choose ONE:**

**Option A: Google Apps Script (FREE)**
- [ ] Get Notion API integration key
- [ ] Share Notion databases with integration
- [ ] Get DAILY_STATS database ID
- [ ] Open Apps Script in Google Sheets
- [ ] Paste sync code
- [ ] Update configuration variables
- [ ] Set up triggers (onEdit + time-based)
- [ ] Test Sheets → Notion sync
- [ ] Test Notion → Sheets sync
- [ ] Monitor sync logs

**Option B: Zapier ($20-50/month)**
- [ ] Create Zapier account
- [ ] Connect Google Sheets
- [ ] Connect Notion
- [ ] Create Zap 1: Sheets → Notion
- [ ] Create Zap 2: Notion → Sheets
- [ ] Test both zaps
- [ ] Turn on zaps

### Part 4: Testing & Validation (30 minutes)

- [ ] Enter test data in Google Sheets
- [ ] Verify it appears in Notion DAILY_STATS
- [ ] Add test visit in Notion
- [ ] Verify it aggregates to Google Sheets
- [ ] Check all formulas calculating correctly
- [ ] Verify bidirectional sync working
- [ ] Test with each doctor
- [ ] Clear test data

### Part 5: Training & Rollout (1 hour)

- [ ] Document workflow for team
- [ ] Train doctors on where to enter data
- [ ] Explain sync delays (if any)
- [ ] Set up monitoring/alerts
- [ ] Create troubleshooting guide

---

## 🚦 WORKFLOW AFTER SETUP

### Daily Workflow:

**Doctors can choose:**

**Option 1: Enter in Google Sheets** (What they're used to)
1. Open Google Sheets
2. Go to their sheet tab
3. Enter daily stats
4. Sync automatically happens → appears in Notion

**Option 2: Enter in Notion** (More detailed)
1. Add individual visits to VISITS database
2. Add individual collections to COLLECTIONS database
3. Add leads to LEADS database
4. Every 15 minutes, aggregates to Google Sheets automatically

**Option 3: Mix** (Best of both)
- Use Sheets for quick daily entry
- Use Notion for detailed patient tracking
- Both stay in sync!

### Admin/Owner Workflow:

1. View Google Sheets DASHBOARD for quick overview
2. View Notion Command Center for detailed analytics
3. Review DAILY_STATS in Notion to see sync status
4. Run reports from either system

---

## 🆘 TROUBLESHOOTING

### Sync Not Working

**Check:**
1. Notion API key is correct
2. Notion databases are shared with integration
3. Google Apps Script triggers are enabled
4. No errors in Apps Script execution log
5. Date formats match (YYYY-MM-DD)
6. Doctor names match exactly (case-sensitive)

### Data Mismatch

**Check:**
1. Time zones are consistent
2. Formulas are calculating correctly
3. Rollups are configured properly
4. Relations are linked
5. No duplicate entries

### Performance Issues

**Solutions:**
1. Reduce sync frequency (15 min → 30 min)
2. Add filtering to only sync recent data
3. Archive old data
4. Optimize queries

---

## 📊 NEXT STEPS

Please provide:
1. **3 Doctor Names** for Van Every Chiropractic (to replace DOCTOR 2, 3, 5)
2. **Sync Method Preference:** Google Apps Script (free) or Zapier (paid)?
3. **Notion API Access:** Can you create a Notion integration?

Then I'll:
1. Create exact rename instructions for Google Sheets
2. Provide complete Notion AI prompts to build missing databases
3. Deliver ready-to-use sync code
4. Give you step-by-step setup instructions

This will give you the best of both worlds - the familiar Google Sheets interface AND the powerful Notion analytics system, always in perfect sync! 🚀
