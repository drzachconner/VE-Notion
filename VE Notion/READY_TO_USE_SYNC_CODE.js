/**
 * ===============================================
 * Van Every Chiropractic - Simple Daily Sync
 * Google Sheets "Clinic Totals" → Notion DAILY_STATS
 * NO PHI - Office Totals Only
 * ===============================================
 *
 * ✅ READY TO USE - All credentials configured!
 *
 * This syncs one row per day from your "Clinic Totals" sheet
 * to Notion DAILY_STATS database. No patient data, just numbers.
 *
 * Setup Time: 5 minutes
 * Runs: Automatically every evening at 8pm
 */

// ===============================================
// CONFIGURATION - ✅ ALREADY CONFIGURED FOR YOU
// ===============================================

const CONFIG = {
  // ✅ Your Notion API Key (configured)
  NOTION_API_KEY: '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',

  // ✅ Your DAILY_STATS Database ID (configured)
  DAILY_STATS_DATABASE_ID: '693c4a0a9a534b07a19be8981c7d6027',

  // Notion API version
  NOTION_VERSION: '2022-06-28',

  // Which sheet has the clinic totals
  CLINIC_TOTALS_SHEET_NAME: 'Clinic Totals',

  // Debug mode (set to false after testing)
  DEBUG_MODE: true
};

// ===============================================
// MAIN SYNC FUNCTION
// Runs once per day (evening)
// ===============================================

/**
 * Main sync function - call this from trigger
 * Syncs today's row from Clinic Totals to Notion
 */
function dailySync() {
  try {
    log('=== Starting Daily Sync ===');

    const today = new Date();
    const dateStr = formatDate(today);

    log(`Syncing data for ${dateStr}`);

    // Get today's data from Clinic Totals sheet
    const dailyData = getClinicTotalsForDate(today);

    if (!dailyData) {
      log('No data found for today in Clinic Totals');
      return;
    }

    log(`Data found: ${JSON.stringify(dailyData)}`);

    // Push to Notion
    const success = syncToNotion(dateStr, dailyData);

    if (success) {
      log('✅ Daily sync completed successfully!');
    } else {
      log('❌ Daily sync failed - check errors above');
    }

  } catch (error) {
    logError('dailySync', error);
  }
}

// ===============================================
// GOOGLE SHEETS FUNCTIONS
// ===============================================

/**
 * Gets today's row from Clinic Totals sheet
 */
function getClinicTotalsForDate(date) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.CLINIC_TOTALS_SHEET_NAME);

    if (!sheet) {
      logError('getClinicTotalsForDate', `Sheet "${CONFIG.CLINIC_TOTALS_SHEET_NAME}" not found`);
      return null;
    }

    // Get all dates from column B
    const dates = sheet.getRange('B2:B1000').getValues();
    const targetDate = formatDate(date);

    // Find row with today's date
    for (let i = 0; i < dates.length; i++) {
      const rowDate = dates[i][0];
      if (!rowDate) continue;

      if (formatDate(new Date(rowDate)) === targetDate) {
        const row = i + 2; // +2 for header and 0-indexing

        // Get the full row data
        const rowData = sheet.getRange(row, 1, 1, 15).getValues()[0];

        // Column mapping from Clinic Totals:
        // B: Date
        // C: # of New Leads
        // D: # of New Patient
        // F: Active Care Presented
        // G: Active Care Accepted
        // I: Wellness Presented
        // J: Wellness Accepted
        // L: Regular Patient Visits (not needed, we use M)
        // M: Total Patient Visits
        // N: Collections

        const data = {
          newLeads: rowData[2] || 0,              // Column C
          newPatients: rowData[3] || 0,           // Column D
          activeCarePresented: rowData[5] || 0,   // Column F
          activeCareAccepted: rowData[6] || 0,    // Column G
          wellnessPresented: rowData[8] || 0,     // Column I
          wellnessAccepted: rowData[9] || 0,      // Column J
          patientVisits: rowData[12] || 0,        // Column M (Total)
          collections: rowData[13] || 0           // Column N
        };

        log(`Found row ${row}: ${JSON.stringify(data)}`);
        return data;
      }
    }

    log(`No row found for date ${targetDate} in Clinic Totals`);
    return null;

  } catch (error) {
    logError('getClinicTotalsForDate', error);
    return null;
  }
}

// ===============================================
// NOTION FUNCTIONS
// ===============================================

/**
 * Syncs data to Notion DAILY_STATS
 */
function syncToNotion(dateStr, data) {
  try {
    log(`Syncing to Notion for ${dateStr}`);

    // Check if entry already exists
    const existingId = findDailyStatsEntry(dateStr);

    const properties = {
      'Date': {
        title: [{ text: { content: dateStr } }]
      },
      'New Leads Count': {
        number: data.newLeads
      },
      'New Patients Count': {
        number: data.newPatients
      },
      'Patient Visits Count': {
        number: data.patientVisits
      },
      'Collections Total': {
        number: data.collections
      },
      'Active Care Presented Count': {
        number: data.activeCarePresented
      },
      'Active Care Accepted Count': {
        number: data.activeCareAccepted
      },
      'Wellness Presented Count': {
        number: data.wellnessPresented
      },
      'Wellness Accepted Count': {
        number: data.wellnessAccepted
      },
      'Data Source': {
        select: { name: 'Google Sheets' }
      }
    };

    const method = existingId ? 'patch' : 'post';
    const url = existingId
      ? `https://api.notion.com/v1/pages/${existingId}`
      : 'https://api.notion.com/v1/pages';

    const payload = existingId
      ? { properties }
      : { parent: { database_id: CONFIG.DAILY_STATS_DATABASE_ID }, properties };

    const response = notionRequest(method, url, payload);

    if (response) {
      log(`✅ Successfully synced ${dateStr} to Notion`);
      return true;
    } else {
      logError('syncToNotion', 'No response from Notion API');
      return false;
    }

  } catch (error) {
    logError('syncToNotion', error);
    return false;
  }
}

/**
 * Finds existing entry in DAILY_STATS for given date
 */
function findDailyStatsEntry(dateStr) {
  try {
    const url = `https://api.notion.com/v1/databases/${CONFIG.DAILY_STATS_DATABASE_ID}/query`;

    const payload = {
      filter: {
        property: 'Date',
        title: {
          equals: dateStr
        }
      }
    };

    const response = notionRequest('post', url, payload);

    if (response && response.results && response.results.length > 0) {
      log(`Found existing entry for ${dateStr}`);
      return response.results[0].id;
    }

    log(`No existing entry found for ${dateStr}`);
    return null;

  } catch (error) {
    logError('findDailyStatsEntry', error);
    return null;
  }
}

/**
 * Makes authenticated request to Notion API
 */
function notionRequest(method, url, payload) {
  try {
    const options = {
      method: method,
      headers: {
        'Authorization': `Bearer ${CONFIG.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': CONFIG.NOTION_VERSION
      },
      muteHttpExceptions: true
    };

    if (payload) {
      options.payload = JSON.stringify(payload);
    }

    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();

    if (code >= 200 && code < 300) {
      return JSON.parse(response.getContentText());
    } else {
      logError('notionRequest', `HTTP ${code}: ${response.getContentText()}`);
      return null;
    }

  } catch (error) {
    logError('notionRequest', error);
    return null;
  }
}

// ===============================================
// HELPER FUNCTIONS
// ===============================================

/**
 * Formats date as YYYY-MM-DD
 */
function formatDate(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

/**
 * Logging function
 */
function log(message) {
  if (CONFIG.DEBUG_MODE) {
    Logger.log(`[${new Date().toISOString()}] ${message}`);
  }
}

/**
 * Error logging function
 */
function logError(functionName, error) {
  const errorMsg = typeof error === 'string' ? error : error.toString();
  Logger.log(`[ERROR] ${functionName}: ${errorMsg}`);

  // Optional: Send email notification for errors
  // Uncomment and add your email:
  // MailApp.sendEmail('your-email@example.com', 'Van Every Sync Error', errorMsg);
}

// ===============================================
// TESTING FUNCTIONS
// ===============================================

/**
 * Test function - run this manually to test
 */
function testSync() {
  log('=== Testing Sync ===');
  dailySync();
  log('Check logs above for results');
}

/**
 * Test reading from Clinic Totals only
 */
function testReadClinicTotals() {
  log('=== Testing Clinic Totals Read ===');
  const data = getClinicTotalsForDate(new Date());
  if (data) {
    log(`Successfully read data: ${JSON.stringify(data)}`);
  } else {
    log('Failed to read data - check sheet name and date');
  }
}

/**
 * Test Notion connection only
 */
function testNotionConnection() {
  log('=== Testing Notion Connection ===');

  const testData = {
    newLeads: 10,
    newPatients: 5,
    activeCarePresented: 5,
    activeCareAccepted: 3,
    wellnessPresented: 2,
    wellnessAccepted: 1,
    patientVisits: 55,
    collections: 5500
  };

  const success = syncToNotion(formatDate(new Date()), testData);

  if (success) {
    log('✅ Notion connection working!');
  } else {
    log('❌ Notion connection failed - check API key and database ID');
  }
}

// ===============================================
// TRIGGER SETUP
// ===============================================

/**
 * Run this ONCE to set up the automatic trigger
 */
function setupDailyTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'dailySync') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger - runs every day at 8pm
  ScriptApp.newTrigger('dailySync')
    .timeBased()
    .atHour(20) // 8pm (24-hour format: 20 = 8pm)
    .everyDays(1)
    .create();

  log('✅ Daily trigger set up! Will run every evening at 8pm');
}

/**
 * Remove the daily trigger
 */
function removeDailyTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'dailySync') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  log('✅ Daily trigger removed');
}

// ===============================================
// READY-TO-USE SETUP INSTRUCTIONS
// ===============================================

/**
 * ✅ YOUR CODE IS READY! FOLLOW THESE 3 SIMPLE STEPS:
 *
 * STEP 1: INSTALL CODE (2 minutes)
 *    1. Open your Google Sheets:
 *       https://docs.google.com/spreadsheets/d/1oFCME8tR1RrejEPkI8zwmjPOl933rTJ1U-3kpmFAJjs/edit
 *    2. Click: Extensions → Apps Script
 *    3. Delete any default code in the editor
 *    4. Copy this ENTIRE file
 *    5. Paste into Apps Script editor
 *    6. Click Save (💾 icon or Ctrl+S / Cmd+S)
 *    7. Name project: "Van Every Daily Sync"
 *
 * STEP 2: TEST IT (2 minutes)
 *    1. In Apps Script, select "testSync" from function dropdown
 *    2. Click Run (▶️ play button)
 *    3. When prompted "Authorization required", click "Review permissions"
 *    4. Select your Google account
 *    5. Click "Advanced" → "Go to Van Every Daily Sync (unsafe)"
 *       (It's safe - it's YOUR script, Google just warns about unverified apps)
 *    6. Click "Allow"
 *    7. Wait for execution to finish
 *    8. Click: View → Logs
 *    9. Look for: "✅ Daily sync completed successfully!"
 *    10. Open Notion DAILY_STATS - you should see today's data!
 *
 * STEP 3: ENABLE AUTOMATIC SYNC (1 minute)
 *    1. In Apps Script, select "setupDailyTrigger" from dropdown
 *    2. Click Run (▶️)
 *    3. Click: View → Logs
 *    4. Look for: "✅ Daily trigger set up!"
 *    5. Verify: Click Edit → Current project's triggers
 *    6. You should see:
 *       - Function: dailySync
 *       - Event source: Time-driven
 *       - Type: Day timer
 *       - Time of day: 8pm to 9pm
 *
 * 🎉 DONE! Your sync is now running automatically every evening at 8pm!
 *
 * ===============================================
 * WHAT HAPPENS NOW:
 * ===============================================
 *
 * Every evening at 8pm:
 * ✅ Code reads today's row from "Clinic Totals" sheet
 * ✅ Extracts 8 metrics (New Leads, New Patients, Visits, Collections, etc.)
 * ✅ Pushes data to Notion DAILY_STATS
 * ✅ OVA, PVA, CVA formulas calculate automatically in Notion
 * ✅ Command Center dashboard updates with live metrics
 * ✅ No PHI, 100% HIPAA compliant
 * ✅ No manual work needed!
 *
 * ===============================================
 * TROUBLESHOOTING:
 * ===============================================
 *
 * "Sheet not found" error:
 * - Check that your sheet is named exactly "Clinic Totals" (case-sensitive)
 * - If different, change CONFIG.CLINIC_TOTALS_SHEET_NAME above
 *
 * "No data found for today":
 * - Make sure Clinic Totals has a row with today's date in column B
 * - Date format should be recognizable (e.g., 2025-01-15, 1/15/2025, etc.)
 *
 * Notion error / No response:
 * - Verify you completed Step 3 from earlier (shared DAILY_STATS with integration)
 * - In Notion, open DAILY_STATS → Click "..." → "Connect to" → Select "Van Every Daily Sync"
 *
 * Sync doesn't run at 8pm:
 * - Check triggers: Edit → Current project's triggers
 * - If no trigger, re-run setupDailyTrigger()
 *
 * Want to change sync time:
 * - Edit setupDailyTrigger() function above
 * - Change .atHour(20) to different hour (0-23, 24-hour format)
 * - Examples: .atHour(9) = 9am, .atHour(17) = 5pm, .atHour(23) = 11pm
 * - Re-run setupDailyTrigger() to apply
 *
 * ===============================================
 * SUPPORT RESOURCES:
 * ===============================================
 *
 * - Notion API Docs: developers.notion.com
 * - Google Apps Script Docs: developers.google.com/apps-script
 * - Your setup page in Notion: https://www.notion.so/Sync-Setup-Info-DAILY_STATS-5eecb5684aff4f6bb65ad5530320ebde
 */
