# 🔬 ChiroTouch → Google Sheets Integration Research

**Complete Research Report**
**Date:** 2025-11-08
**Status:** Research Complete - Ready for Implementation Planning

---

## 📋 EXECUTIVE SUMMARY

**CRITICAL FINDING:** ChiroTouch **does NOT have a public API**. Integration must rely on:
1. **Report Manager** - Scheduled automated exports (Excel/CSV)
2. **Manual CSV exports** - Daily data extraction
3. **SQL database access** - Only if you have server-based ChiroTouch (not cloud)

**Recommended Approach:** Use ChiroTouch's Report Manager to schedule daily exports → Import to Google Sheets via automated workflow

---

## 🎯 YOUR GOOGLE SHEETS STRUCTURE ANALYSIS

### **Sheet Overview (12 Total Sheets)**

1. **Clinic Totals** - Master aggregation of all doctor data
2. **Steph** - Individual doctor sheet
3. **DOCTOR 2** - Individual doctor sheet (rename to Dr. Saylor)
4. **DOCTOR 3** - Individual doctor sheet (rename to Dr. Zach)
5. **DOCTOR 4** - Individual doctor sheet (sample data)
6. **DOCTOR 5** - Individual doctor sheet (rename to Dr. John)
7. **DASHBOARD** - Visual dashboard with filters
8. **DROPDOWNS** - Dropdown lists for filters
9. **WEEKLY** - Weekly aggregated metrics
10. **2025 Targets & Actual** - Target vs actual tracking
11. **Leads** - Lead tracking and follow-up
12. **New Patients** - New patient details and tracking

---

## 📊 REQUIRED DATA FIELDS FROM CHIROTOUCH

### **Priority 1: Daily Metrics (Critical)**

These fields are needed DAILY for each doctor:

| Google Sheets Field | ChiroTouch Data Source | Report Type |
|---------------------|------------------------|-------------|
| **Date** | Appointment/Visit date | EOD Report, Appointment Report |
| **# of New Leads** | New inquiry/referral count | Referral Report, New Patient Report |
| **# of New Patient** | First-time patient count | New Patient Report |
| **Active Care Presented** | Treatment plans presented (active) | Treatment Plan Report |
| **Active Care Accepted** | Treatment plans accepted (active) | Treatment Plan Report |
| **Wellness Presented** | Treatment plans presented (wellness) | Treatment Plan Report |
| **Wellness Accepted** | Treatment plans accepted (wellness) | Treatment Plan Report |
| **Regular Patient Visits** | Return visit count | Daily Visit Report, EOD Report |
| **Total Patient Visits** | All visits (new + return) | Daily Visit Report, EOD Report |
| **Collections** | Total payments received | EOD Report, Collections Report |

### **Priority 2: Lead Tracking (Important)**

Fields needed for "Leads" sheet:

| Google Sheets Field | ChiroTouch Data Source | Notes |
|---------------------|------------------------|-------|
| **Date** | Inquiry date | May need manual entry |
| **Name** | Lead name | **PHI - May need to exclude or use ID only** |
| **Phone #** | Lead phone | **PHI - May need to exclude** |
| **Appt (Y/N)** | Appointment scheduled status | Appointment Report |
| **Contact Method** | How contacted | May need manual entry |
| **How Did They Hear About Us?** | Referral source | Referral Source Report |
| **Follow Up** | Follow-up notes | May need manual entry |

### **Priority 3: New Patient Details (Important)**

Fields needed for "New Patients" sheet:

| Google Sheets Field | ChiroTouch Data Source | Notes |
|---------------------|------------------------|-------|
| **Name** | Patient name | **PHI - Consider using Patient ID instead** |
| **NP Date** | First visit date | New Patient Report |
| **# of Visits Seen** | Visit count | Patient Visit History Report |
| **Source** | Referral source | Referral Source Report |
| **Exam Fee** | Initial exam charge | Transaction Report |
| **CP Recommendation** | Care plan type recommended | Treatment Plan Report |
| **Date Accepted** | Care plan acceptance date | Treatment Plan Report |
| **Email Added** | Email capture status | Manual or patient data export |
| **Other Products/Services** | Additional purchases | Transaction Report |
| **Referrals** | Referrals given by this patient | Referral Report |

### **Priority 4: Weekly/Monthly Aggregations (Auto-Calculated)**

These are calculated from daily data in Google Sheets - no direct ChiroTouch import needed:
- Lead Conversion %
- Active Care Conversion %
- Wellness Conversion %
- Office Visit Average (OVA)
- Patient Visit Average (PVA)
- Case Visit Average (CVA)

---

## 📋 CHIROTOUCH REPORTS YOU NEED TO RUN

### **Daily Reports (Run Every Evening)**

#### **1. End of Day (EOD) Summary Report**
**Purpose:** Daily financial and visit summary

**Data Captured:**
- Total patient visits
- Total collections
- Payment breakdown (cash, card, insurance)
- Charges vs payments
- Provider breakdown

**Export Format:** Excel or CSV

**Schedule:** Every evening at close (5pm-7pm)

**Maps to Google Sheets:**
- Collections (Column N)
- Total Patient Visits (Column M)

---

#### **2. Daily Appointment Report**
**Purpose:** All appointments for the day

**Data Captured:**
- Patient name (or ID)
- Appointment date/time
- Provider
- Visit type (new vs return)
- Appointment status (completed, cancelled, no-show)

**Export Format:** Excel or CSV

**Schedule:** Every evening at close

**Maps to Google Sheets:**
- # of New Patient (Column D)
- Regular Patient Visits (Column L)
- Total Patient Visits (Column M)

---

#### **3. New Patient Report**
**Purpose:** List of all new patients

**Data Captured:**
- Patient name (or ID)
- First visit date
- Provider assigned
- Referral source
- Initial charges

**Export Format:** Excel or CSV

**Schedule:** Daily

**Maps to Google Sheets:**
- # of New Patient (Column D)
- New Patients sheet (all fields)

---

### **Weekly Reports (Run Every Monday)**

#### **4. Referral Source Report**
**Purpose:** Track where patients/leads are coming from

**Data Captured:**
- Referral source categories
- New patient count per source
- Lead count per source

**Export Format:** Excel or CSV

**Schedule:** Weekly

**Maps to Google Sheets:**
- # of New Leads (Column C)
- Leads sheet → How Did They Hear About Us?
- New Patients sheet → Source

---

#### **5. Treatment Plan Report**
**Purpose:** Care plans presented and accepted

**Data Captured:**
- Patient name (or ID)
- Plan presented date
- Plan accepted date
- Plan type (may need to categorize as active vs wellness manually)
- Plan value
- Provider

**Export Format:** Excel or CSV

**Schedule:** Weekly

**Maps to Google Sheets:**
- Active Care Presented (Column F)
- Active Care Accepted (Column G)
- Wellness Presented (Column I)
- Wellness Accepted (Column J)

---

### **Monthly Reports (Run First of Month)**

#### **6. Collections Summary Report**
**Purpose:** Comprehensive financial overview

**Data Captured:**
- Collections by provider
- Collections by payment type
- Outstanding AR
- Collection rate

**Export Format:** Excel or CSV

**Schedule:** Monthly (1st of month)

**Maps to Google Sheets:**
- Collections verification
- 2025 Targets & Actual sheet

---

## ⚙️ CHIROTOUCH REPORT MANAGER SETUP

### **Step-by-Step Configuration**

#### **Setup Report #1: EOD Summary**

1. Log into ChiroTouch with admin account
2. Navigate to: **Reports → Report Manager**
3. Click **"New Scheduled Report"**
4. Configure:
   - **Report Type:** End of Day Summary
   - **Frequency:** Daily
   - **Time:** 7:00 PM (or your close time)
   - **Format:** Excel (.xlsx)
   - **File Name:** `EOD_Summary_[DATE]`
   - **Output Folder:** `C:\ChiroTouch\Reports\Daily\` (or similar)
   - **Filters:**
     - Date: Today
     - Include all providers
     - Include all locations
5. Click **Save**

#### **Setup Report #2: Daily Appointments**

1. In Report Manager, click **"New Scheduled Report"**
2. Configure:
   - **Report Type:** Appointment List
   - **Frequency:** Daily
   - **Time:** 7:00 PM
   - **Format:** Excel (.xlsx)
   - **File Name:** `Daily_Appointments_[DATE]`
   - **Output Folder:** `C:\ChiroTouch\Reports\Daily\`
   - **Filters:**
     - Date: Today
     - Status: All (scheduled, completed, cancelled)
     - Include all providers
3. Click **Save**

#### **Setup Report #3: New Patients**

1. In Report Manager, click **"New Scheduled Report"**
2. Configure:
   - **Report Type:** New Patient Report
   - **Frequency:** Daily
   - **Time:** 7:00 PM
   - **Format:** Excel (.xlsx)
   - **File Name:** `New_Patients_[DATE]`
   - **Output Folder:** `C:\ChiroTouch\Reports\Daily\`
   - **Filters:**
     - Date: Today
     - Include all providers
3. Click **Save**

#### **Setup Report #4: Referral Sources**

1. In Report Manager, click **"New Scheduled Report"**
2. Configure:
   - **Report Type:** Referral Source Report
   - **Frequency:** Weekly
   - **Day:** Monday
   - **Time:** 8:00 AM
   - **Format:** Excel (.xlsx)
   - **File Name:** `Referral_Sources_[DATE]`
   - **Output Folder:** `C:\ChiroTouch\Reports\Weekly\`
   - **Filters:**
     - Date Range: Previous 7 days
     - Include all sources
3. Click **Save**

#### **Setup Report #5: Treatment Plans**

1. In Report Manager, click **"New Scheduled Report"**
2. Configure:
   - **Report Type:** Treatment Plan Report
   - **Frequency:** Weekly
   - **Day:** Monday
   - **Time:** 8:00 AM
   - **Format:** Excel (.xlsx)
   - **File Name:** `Treatment_Plans_[DATE]`
   - **Output Folder:** `C:\ChiroTouch\Reports\Weekly\`
   - **Filters:**
     - Date Range: Previous 7 days
     - Status: All (presented, accepted, declined)
     - Include all providers
3. Click **Save**

---

## 🤖 AUTOMATION OPTIONS (Ranked by Feasibility)

### **Option 1: Manual Daily Process (Easiest - START HERE)**

**Workflow:**
```
1. ChiroTouch generates reports at 7pm → Saves to folder
2. Next morning: Open Google Sheets
3. Upload CSV/Excel files to Google Drive
4. Import → File → Import → Upload → Select file
5. Choose "Replace data at selected cell"
6. Paste into appropriate doctor sheet
7. Clinic Totals auto-aggregates via formulas
```

**Time Required:** 10-15 minutes daily

**Cost:** $0

**HIPAA Considerations:**
- ✅ Delete exported files after import
- ✅ Use encrypted folder if storing files
- ✅ Consider using patient IDs instead of names

---

### **Option 2: Google Drive Sync + Manual Import (Recommended)**

**Workflow:**
```
1. ChiroTouch saves reports to: C:\ChiroTouch\Reports\
2. Google Drive Desktop app syncs folder to cloud
3. Reports automatically appear in Google Drive
4. Daily: Open Google Sheets → File → Import
5. Select synced file from Google Drive
6. Import to appropriate sheet
```

**Setup:**
1. Install Google Drive for Desktop
2. Sync ChiroTouch Reports folder
3. Ensure BAA with Google Workspace
4. Set folder permissions (limited access)

**Time Required:** 5-10 minutes daily

**Cost:** $6-12/user/month (Google Workspace with BAA)

**HIPAA Considerations:**
- ✅ Requires Google Workspace BAA
- ✅ Encrypt Drive folder
- ✅ Limit folder access to authorized users

---

### **Option 3: Google Sheets IMPORTDATA Function (Semi-Automated)**

**Workflow:**
```
1. ChiroTouch saves reports to web-accessible location
   (Google Drive, Dropbox, OneDrive, etc.)
2. Get shareable link to CSV file
3. In Google Sheets, use formula:
   =IMPORTDATA("https://drive.google.com/uc?export=download&id=FILE_ID")
4. Sheet auto-updates when file changes
```

**Setup:**
1. Save ChiroTouch reports to Google Drive
2. Make files shareable (anyone with link)
3. Add IMPORTDATA formula to Google Sheets
4. Set up auto-refresh (sheets refreshes hourly by default)

**Time Required:** 0 minutes daily (after setup)

**Cost:** $6-12/user/month (Google Workspace with BAA)

**Limitations:**
- Only works with CSV files
- File must be publicly accessible (security concern for PHI)
- Sheet refreshes only when opened or hourly
- May break if file ID changes

**HIPAA Considerations:**
- ⚠️ **NOT RECOMMENDED for PHI** - requires public file link
- ✅ OK for aggregate data only (no patient names)

---

### **Option 4: Third-Party Automation Tool (Best Balance)**

**Recommended Tool: Coupler.io**

**Workflow:**
```
1. ChiroTouch saves reports to Google Drive
2. Coupler.io detects new file
3. Auto-imports to Google Sheets
4. Updates designated sheet/range
5. Archives processed file
```

**Setup:**
1. Sign up for Coupler.io ($24-99/month)
2. Connect Google Drive account
3. Connect Google Sheets account
4. Create import automation:
   - Source: Google Drive folder
   - Destination: Google Sheets (specific sheet)
   - Trigger: New file or file updated
   - Frequency: Every 15 minutes, hourly, daily
5. Map columns from ChiroTouch CSV to Sheets

**Time Required:** 0 minutes daily (fully automated)

**Cost:** $24-99/month (depending on update frequency)

**Pros:**
- ✅ Fully automated
- ✅ Reliable scheduling
- ✅ Column mapping
- ✅ Error notifications

**Cons:**
- ❌ Monthly cost
- ❌ Requires BAA with Coupler.io for PHI
- ❌ Another system to manage

**HIPAA Considerations:**
- ⚠️ Requires Business Associate Agreement with Coupler.io
- ✅ Supports encrypted connections
- ✅ Access controls available

---

### **Option 5: Google Apps Script Automation (Advanced)**

**Workflow:**
```
1. ChiroTouch saves reports to Google Drive
2. Google Apps Script runs on schedule (daily, hourly)
3. Script detects new files in Drive folder
4. Parses CSV data
5. Updates Google Sheets
6. Moves processed files to archive folder
```

**Setup:**
1. Write custom Apps Script
2. Set up time-driven triggers
3. Grant necessary permissions
4. Test thoroughly

**Time Required:** 0 minutes daily (after development)

**Cost:** $500-2,000 one-time (development) + $0 ongoing

**Pros:**
- ✅ Fully automated
- ✅ No monthly fees
- ✅ Highly customizable
- ✅ Can handle complex logic

**Cons:**
- ❌ Requires development expertise
- ❌ Maintenance needed for updates
- ❌ More complex troubleshooting

**HIPAA Considerations:**
- ✅ Stays within Google Workspace ecosystem
- ✅ No third-party data sharing
- ✅ Covered by Google Workspace BAA

---

### **Option 6: SQL Database Access (Server Version Only)**

**Only available if you have server-based ChiroTouch (not cloud)**

**Workflow:**
```
1. Connect directly to ChiroTouch SQL database
2. Run custom SQL queries
3. Export query results to CSV
4. Use Apps Script or third-party tool to import to Sheets
```

**Setup:**
1. Get SQL database credentials from ChiroTouch
2. Install SQL Server Management Studio
3. Write custom queries for each metric
4. Schedule queries with SQL Server Agent
5. Export to web-accessible location
6. Import to Google Sheets

**Time Required:** 0 minutes daily (after setup)

**Cost:** $1,000-5,000 one-time (development/setup)

**Pros:**
- ✅ Most powerful and flexible
- ✅ Real-time or near-real-time data
- ✅ Can query anything in database
- ✅ Highly customizable

**Cons:**
- ❌ Only works for server-based ChiroTouch
- ❌ Requires SQL expertise
- ❌ Complex setup
- ❌ May void ChiroTouch support if database modified

**HIPAA Considerations:**
- ✅ Direct database access (no third parties)
- ⚠️ Must maintain database security
- ⚠️ Audit logging required

---

## 🎯 RECOMMENDED IMPLEMENTATION PLAN

### **Phase 1: Manual Process (Week 1-2)**

**Goal:** Establish workflow and validate data

1. Set up ChiroTouch Report Manager (5 scheduled reports)
2. Run reports manually for 2 weeks
3. Export daily to CSV
4. Manually import to Google Sheets
5. Verify data accuracy
6. Document any issues or missing fields

**Expected Outcome:** Clear understanding of data flow and quality

---

### **Phase 2: Semi-Automation (Week 3-4)**

**Goal:** Reduce manual work

**Choose one:**

**Option A: Google Drive Sync** (Recommended for most)
- Install Google Drive Desktop
- Sync ChiroTouch Reports folder
- Reduce import time to 5 minutes daily

**Option B: Coupler.io** (If budget allows)
- Sign up for Coupler.io
- Set up automated imports
- Fully automate daily updates

---

### **Phase 3: Full Automation (Month 2-3)**

**Goal:** Zero manual work

**Choose one:**

**Option A: Google Apps Script** (Best long-term)
- Hire developer or build in-house
- Fully automated import workflow
- No ongoing costs

**Option B: SQL Integration** (Server version only)
- Work with SQL expert
- Direct database queries
- Most powerful but most complex

---

## 📋 SPECIFIC CHIROTOUCH FIELD MAPPING

### **Daily Doctor Sheet Mapping**

| Google Sheets Column | ChiroTouch Report | ChiroTouch Field Name | Notes |
|---------------------|-------------------|----------------------|-------|
| B - Date | All Reports | Appointment Date / Visit Date | Format: YYYY-MM-DD |
| C - # of New Leads | Referral Source Report | New Inquiry Count | May need manual tracking |
| D - # of New Patient | New Patient Report | Count of New Patients | Filter by date and provider |
| E - Lead Conversion % | *Calculated* | N/A | Formula: D/C |
| F - Active Care Presented | Treatment Plan Report | Plans Presented Count | Filter by plan type |
| G - Active Care Accepted | Treatment Plan Report | Plans Accepted Count | Filter by plan type |
| H - Active Care Conversion % | *Calculated* | N/A | Formula: G/F |
| I - Wellness Presented | Treatment Plan Report | Plans Presented Count | Filter by plan type |
| J - Wellness Accepted | Treatment Plan Report | Plans Accepted Count | Filter by plan type |
| K - Wellness Conversion % | *Calculated* | N/A | Formula: J/I |
| L - Regular Patient Visits | Daily Appointment Report | Return Visit Count | Exclude new patients |
| M - Total Patient Visits | Daily Appointment Report OR EOD | Total Visit Count | All visits |
| N - Collections | EOD Report | Total Payments Received | Sum all payment methods |

---

## 🚨 CRITICAL HIPAA CONSIDERATIONS

### **Data Classification**

**PHI (Protected Health Information) - MUST PROTECT:**
- Patient names
- Phone numbers
- Email addresses
- Specific appointment times
- Detailed treatment notes

**Aggregate Data - Lower Risk:**
- Daily patient counts
- Total collections
- Average metrics
- Percentages

### **Recommended Approach for Google Sheets:**

**Option 1: Aggregate Data Only (Safest)**
- Import ONLY counts and totals
- No patient names or contact info
- Use this for Clinic Totals, DASHBOARD, WEEKLY sheets
- ✅ Lower HIPAA risk
- ✅ Easier to manage
- ✅ Sufficient for management reporting

**Option 2: Patient IDs Instead of Names**
- Replace patient names with ChiroTouch patient IDs
- Use for Leads and New Patients sheets
- ⚠️ Still considered PHI but less sensitive
- Requires BAA with Google Workspace

**Option 3: Separate HIPAA-Compliant Sheet**
- Keep PHI in separate Google Sheet
- Share only with authorized users
- Stronger access controls
- More complex to manage

### **Required Safeguards:**

1. **Business Associate Agreement (BAA)**
   - ✅ Required with Google Workspace
   - ✅ Required with any third-party tools (Coupler.io, etc.)
   - ✅ Required with any cloud storage (Drive, Dropbox, etc.)

2. **Access Controls**
   - ✅ Limit Google Sheets access to authorized users only
   - ✅ Use Google Workspace (not free Gmail) for BAA coverage
   - ✅ Enable 2-factor authentication for all users
   - ✅ Regular access audits

3. **Encryption**
   - ✅ Use HTTPS for all transfers (automatic with Google)
   - ✅ Encrypt exported files if stored locally
   - ✅ Use encrypted folders on local machines

4. **Audit Logging**
   - ✅ Enable Google Workspace audit logs
   - ✅ Review access logs monthly
   - ✅ Monitor for unauthorized access

5. **Data Retention**
   - ✅ Delete old exported CSV files
   - ✅ Archive old data per retention policy
   - ✅ Securely destroy when no longer needed

---

## ✅ IMMEDIATE NEXT STEPS

### **Action Items (Priority Order):**

1. **Verify Your ChiroTouch Version**
   - [ ] Determine if server-based or cloud-based
   - [ ] Check if you have access to Report Manager
   - [ ] Contact ChiroTouch support to confirm available reports

2. **Review Available Reports**
   - [ ] Log into ChiroTouch
   - [ ] Navigate to Reports section
   - [ ] List all available report types
   - [ ] Identify which reports contain needed fields

3. **Set Up Report Manager (If Available)**
   - [ ] Follow setup instructions above
   - [ ] Schedule 3-5 key reports
   - [ ] Run test exports
   - [ ] Verify data quality

4. **Test Manual Import**
   - [ ] Export one day of data
   - [ ] Import to Google Sheets manually
   - [ ] Verify all fields map correctly
   - [ ] Document any data transformation needed

5. **HIPAA Compliance Setup**
   - [ ] Ensure Google Workspace BAA is in place
   - [ ] Set up access controls on Google Sheets
   - [ ] Enable 2FA for all users
   - [ ] Document data handling procedures

6. **Choose Automation Approach**
   - [ ] Review budget and resources
   - [ ] Select automation option (1-6 above)
   - [ ] Create implementation timeline
   - [ ] Assign responsibilities

---

## 📞 SUPPORT RESOURCES

### **ChiroTouch Support:**
- Main: https://www.chirotouch.com/support
- Help Docs: https://help.mychirotouch.com/
- Phone: Contact via website (support hours vary)
- Community: https://chirotouch.my.site.com/cloud/

### **Google Workspace Support:**
- Admin Help: https://support.google.com/a
- Sheets Help: https://support.google.com/docs
- Apps Script Docs: https://developers.google.com/apps-script
- HIPAA Compliance: https://cloud.google.com/security/compliance/hipaa

### **Third-Party Tools:**
- Coupler.io: https://www.coupler.io/support
- Zapier: https://help.zapier.com/
- Make.com: https://www.make.com/en/help

---

## 💰 ESTIMATED COSTS BY APPROACH

| Approach | One-Time Cost | Monthly Cost | Annual Total | Best For |
|----------|--------------|--------------|--------------|----------|
| Manual Process | $0 | $0 | $0 | Small practices, testing |
| Google Drive Sync | $0 | $72-144 | $72-144 | Most practices |
| Coupler.io | $0 | $24-99 | $288-1,188 | Practices wanting automation |
| Apps Script Dev | $500-2,000 | $0 | $500-2,000 | Long-term automation |
| SQL Integration | $1,000-5,000 | $0 | $1,000-5,000 | Server version only |

**Recommended for Van Every:** Start with Manual Process (Week 1-2), then move to Google Drive Sync or Coupler.io based on results.

---

## 🎯 SUCCESS CRITERIA

You'll know the integration is working when:

✅ ChiroTouch reports run automatically every evening
✅ Data appears in Google Sheets within 24 hours
✅ All required fields are populated accurately
✅ Formulas calculate correctly (OVA, PVA, CVA, etc.)
✅ Notion dashboard updates automatically (via existing sync)
✅ No manual data entry required
✅ HIPAA compliance maintained
✅ Process takes <10 minutes daily (or fully automated)

---

## 📝 NOTES FROM RESEARCH

### **Key Limitations Found:**

1. **No Public API** - ChiroTouch does not offer a REST API for third-party integrations
2. **Cloud vs Server** - Cloud version has fewer export options than server version
3. **Report Scheduling** - Available but requires admin privileges
4. **Bulk Exports** - Chart notes and some data types can only be exported individually
5. **Referral Tracking** - May not have built-in lead tracking; might need manual process

### **Potential Workarounds:**

1. **For Lead Tracking:** Create simple Google Form for front desk to log leads → Auto-populates Sheets
2. **For Care Plan Types:** Manually categorize treatment plans as "Active Care" vs "Wellness" based on plan name/value
3. **For Real-Time Data:** If critical, explore SQL access (server version only)

### **Questions to Ask ChiroTouch Support:**

1. Do you offer API access for custom integrations?
2. What reports can be automated in Report Manager?
3. Can reports be emailed automatically?
4. Is there an FTP/SFTP export option?
5. What fields are available in the Treatment Plan Report?
6. Can we categorize treatment plans by type (active vs wellness)?
7. Is there a built-in lead/referral tracking system?

---

**END OF RESEARCH REPORT**

**Next Action:** Contact ChiroTouch support to verify available reports and set up Report Manager for testing.
