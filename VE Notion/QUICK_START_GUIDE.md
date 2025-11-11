# 🚀 Van Every Chiropractic - Quick Start Guide

## ✅ Your Automated Sync is Ready!

**What's Done:**
- ✅ Notion API integration created
- ✅ DAILY_STATS database shared with integration
- ✅ Sync code fully configured with your credentials
- ✅ Ready to install and run

**Time to Complete:** 5 minutes

---

## 📋 3-Step Installation

### Step 1: Install Code (2 minutes)

1. **Open your Google Sheets:**
   - Click here: [Your Van Every Google Sheet](https://docs.google.com/spreadsheets/d/1oFCME8tR1RrejEPkI8zwmjPOl933rTJ1U-3kpmFAJjs/edit)

2. **Open Apps Script:**
   - In Google Sheets, click: **Extensions → Apps Script**

3. **Install the code:**
   - Delete any default code in the editor
   - Open file: **READY_TO_USE_SYNC_CODE.js** (in your VE Notion folder)
   - Select all (Cmd+A / Ctrl+A)
   - Copy (Cmd+C / Ctrl+C)
   - Paste into Apps Script editor (Cmd+V / Ctrl+V)

4. **Save:**
   - Click the 💾 Save icon (or Cmd+S / Ctrl+S)
   - Name the project: **"Van Every Daily Sync"**

---

### Step 2: Test It (2 minutes)

1. **Select test function:**
   - In Apps Script, find the dropdown at the top (says "Select function")
   - Click it and select: **testSync**

2. **Run the test:**
   - Click the ▶️ **Run** button
   - A popup will say **"Authorization required"** - click **"Review permissions"**
   - Select your Google account
   - Click **"Advanced"** (bottom left)
   - Click **"Go to Van Every Daily Sync (unsafe)"**
     - _(Don't worry - it's YOUR script. Google just warns about unverified apps)_
   - Click **"Allow"**

3. **Check the results:**
   - Wait for the script to finish running (spinner stops)
   - Click: **View → Logs**
   - Look for: **"✅ Daily sync completed successfully!"**

4. **Verify in Notion:**
   - Open your Notion **DAILY_STATS** database
   - You should see today's data (date = today, with numbers from Clinic Totals)

---

### Step 3: Enable Automatic Sync (1 minute)

1. **Select trigger setup function:**
   - In Apps Script dropdown, select: **setupDailyTrigger**

2. **Run it:**
   - Click the ▶️ **Run** button
   - Check logs: **View → Logs**
   - Look for: **"✅ Daily trigger set up!"**

3. **Verify trigger is active:**
   - In Apps Script, click: **Edit → Current project's triggers**
   - You should see a trigger that says:
     ```
     Function: dailySync
     Event source: Time-driven
     Type: Day timer
     Time of day: 8pm to 9pm
     ```

---

## 🎉 Done! What Happens Now?

**Every evening at 8pm, automatically:**
- ✅ Code reads today's row from "Clinic Totals"
- ✅ Extracts 8 key metrics
- ✅ Creates/updates entry in Notion DAILY_STATS
- ✅ OVA, PVA, CVA calculate automatically
- ✅ Command Center dashboard updates with live data

**No manual work needed! Set it and forget it!**

---

## 🧪 Testing It's Working

### Immediate Test:
1. Go to Google Sheets "Clinic Totals"
2. Find today's date row
3. Change a number (e.g., add 1 to New Leads)
4. In Apps Script, run **testSync** again
5. Check Notion DAILY_STATS - your change should appear!

### Daily Test (Tomorrow):
1. Enter data in Clinic Totals throughout the day
2. Wait until after 8pm
3. Check Notion DAILY_STATS - today's row should update automatically

---

## 🔧 Troubleshooting

### "Sheet not found" error
**Problem:** Code can't find "Clinic Totals" sheet

**Solution:**
1. Check your sheet is named exactly **"Clinic Totals"** (case-sensitive, watch for extra spaces)
2. If your sheet has a different name, update line 33 in the code:
   ```javascript
   CLINIC_TOTALS_SHEET_NAME: 'Your Actual Sheet Name',
   ```

---

### "No data found for today"
**Problem:** No row with today's date in Clinic Totals

**Solution:**
1. Open "Clinic Totals" sheet
2. Check column B has today's date
3. Make sure date is in a recognizable format (e.g., 2025-01-15, 1/15/2025)
4. Run **testReadClinicTotals** function to test reading the sheet

---

### Notion error / No response
**Problem:** Code can't connect to Notion

**Solution:**
1. Verify you shared DAILY_STATS with the integration:
   - Open DAILY_STATS in Notion
   - Click **"..."** menu (top right)
   - Click **"Connect to"**
   - Select **"Van Every Daily Sync"**
   - Click **"Confirm"**

2. If still not working, check your [Sync Setup Info page](https://www.notion.so/Sync-Setup-Info-DAILY_STATS-5eecb5684aff4f6bb65ad5530320ebde)

---

### Sync doesn't run at 8pm
**Problem:** Automatic trigger not set up

**Solution:**
1. In Apps Script: **Edit → Current project's triggers**
2. Check if trigger exists
3. If not, re-run **setupDailyTrigger** function

---

### Want to change sync time?
1. Open **READY_TO_USE_SYNC_CODE.js**
2. Find line 395: `.atHour(20)`
3. Change to different hour (24-hour format):
   - 9am = `.atHour(9)`
   - 5pm = `.atHour(17)`
   - 11pm = `.atHour(23)`
4. Save the file
5. Re-run **setupDailyTrigger**

---

## 📊 What Data Gets Synced?

From Google Sheets "Clinic Totals" → Notion DAILY_STATS:

| Google Sheets Column | Notion Property | Description |
|---------------------|-----------------|-------------|
| Column C | New Leads Count | Daily lead generation |
| Column D | New Patients Count | New patients today |
| Column F | Active Care Presented Count | Active care plans presented |
| Column G | Active Care Accepted Count | Active care plans accepted |
| Column I | Wellness Presented Count | Wellness plans presented |
| Column J | Wellness Accepted Count | Wellness plans accepted |
| Column M | Patient Visits Count | Total patient visits |
| Column N | Collections Total | Total collections ($) |

**Then Notion automatically calculates:**
- OVA (Office Visit Average) = Collections ÷ Patient Visits
- PVA (Patient Visit Average) = Patient Visits ÷ New Patients
- CVA (Case Visit Average) = OVA × PVA
- Active Care Conversion % = Accepted ÷ Presented × 100
- Wellness Conversion % = Accepted ÷ Presented × 100

---

## 🔒 HIPAA Compliance

✅ **No PHI anywhere:**
- No patient names
- No phone numbers
- No email addresses
- No patient IDs
- Only aggregate office statistics

✅ **Secure:**
- API key stored in Google Apps Script (not accessible to users)
- Data transmitted via encrypted HTTPS
- Notion workspace access controlled by you

---

## 📞 Support Resources

- **Your Notion Setup Page:** [Sync Setup Info](https://www.notion.so/Sync-Setup-Info-DAILY_STATS-5eecb5684aff4f6bb65ad5530320ebde)
- **Notion API Docs:** [developers.notion.com](https://developers.notion.com)
- **Google Apps Script Docs:** [developers.google.com/apps-script](https://developers.google.com/apps-script)
- **Your Code File:** `READY_TO_USE_SYNC_CODE.js` (in VE Notion folder)

---

## 🎯 Next Steps

After the sync is working:

1. **Test for a few days** - Make sure data flows correctly
2. **Set DEBUG_MODE to false** (line 34 in code) - Reduces log clutter
3. **Optional:** Add email notifications for errors (line 318 in code)
4. **Future project:** Set up ChiroHD → Google Sheets sync

---

## ✅ Success Checklist

- [ ] Code installed in Google Sheets Apps Script
- [ ] Test run completed successfully
- [ ] Today's data appears in Notion DAILY_STATS
- [ ] Automatic trigger set up (runs at 8pm)
- [ ] Trigger verified in Apps Script triggers list
- [ ] Manual test passed (changed data, re-synced, saw update)

---

**You're all set! Your Van Every Chiropractic sync is now running on autopilot!** 🚀

No more manual data entry. No more switching between systems. Just enter your daily stats in Clinic Totals, and watch your Notion dashboard update automatically every evening at 8pm.

**Welcome to automated practice management!** 💪
