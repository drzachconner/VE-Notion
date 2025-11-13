/**
 * ===============================================
 * Van Every Chiropractic - Bidirectional Sync
 * Google Sheets ↔ Notion Integration
 * ===============================================
 *
 * Doctors: Dr. Saylor, Dr. Zach, Dr. John
 *
 * Setup Instructions:
 * 1. Open Google Sheets
 * 2. Extensions → Apps Script
 * 3. Delete default code
 * 4. Paste this entire file
 * 5. Update CONFIGURATION section below
 * 6. Save (Ctrl+S / Cmd+S)
 * 7. Set up triggers (see TRIGGER SETUP section)
 */

// ===============================================
// CONFIGURATION - UPDATE THESE VALUES
// ===============================================

const CONFIG = {
  // Get from notion.so/my-integrations
  NOTION_API_KEY: 'secret_PASTE_YOUR_NOTION_KEY_HERE',

  // Get from Notion database URLs
  DAILY_STATS_DATABASE_ID: 'PASTE_DAILY_STATS_DATABASE_ID_HERE',
  PATIENTS_DATABASE_ID: 'PASTE_PATIENTS_DATABASE_ID_HERE',
  VISITS_DATABASE_ID: 'PASTE_VISITS_DATABASE_ID_HERE',
  COLLECTIONS_DATABASE_ID: 'PASTE_COLLECTIONS_DATABASE_ID_HERE',
  LEADS_DATABASE_ID: 'PASTE_LEADS_DATABASE_ID_HERE',

  // Doctor names - must match Google Sheets tab names exactly
  DOCTORS: ['Dr. Saylor', 'Dr. Zach', 'Dr. John'],

  // Notion API version
  NOTION_VERSION: '2022-06-28',

  // Sync settings
  SYNC_INTERVAL_MINUTES: 15,
  DEBUG_MODE: true // Set to false after testing
};

// ===============================================
// PART 1: SHEETS → NOTION SYNC
// Triggered when doctors edit their sheets
// ===============================================

/**
 * Trigger: onEdit
 * Automatically syncs when a doctor enters data in their sheet
 */
function onEditTrigger(e) {
  try {
    const sheet = e.source.getActiveSheet();
    const sheetName = sheet.getName();

    // Only process doctor sheets
    if (!CONFIG.DOCTORS.includes(sheetName)) {
      log(`Skipping sheet: ${sheetName} (not a doctor sheet)`);
      return;
    }

    const row = e.range.getRow();
    if (row < 2) {
      log('Skipping header row');
      return; // Skip header
    }

    log(`Processing edit in ${sheetName}, row ${row}`);

    // Get row data
    const rowData = sheet.getRange(row, 1, 1, 14).getValues()[0];
    const date = rowData[1]; // Column B

    if (!date) {
      log('No date found, skipping');
      return;
    }

    const data = {
      newLeads: rowData[2] || 0,           // Column C
      newPatients: rowData[3] || 0,        // Column D (will be overwritten by rollup)
      activeCarePresented: rowData[5] || 0, // Column F
      activeCareAccepted: rowData[6] || 0,  // Column G
      wellnessPresented: rowData[8] || 0,   // Column I
      wellnessAccepted: rowData[9] || 0,    // Column J
      regularVisits: rowData[11] || 0,      // Column L (will be overwritten by rollup)
      collections: rowData[13] || 0         // Column N (will be overwritten by rollup)
    };

    log(`Data to sync: ${JSON.stringify(data)}`);

    // Sync to Notion
    syncToNotion(sheetName, date, data);

  } catch (error) {
    logError('onEditTrigger', error);
  }
}

/**
 * Syncs data to Notion DAILY_STATS database
 */
function syncToNotion(doctor, date, data) {
  try {
    const dateStr = formatDate(date);
    log(`Syncing ${doctor} for ${dateStr} to Notion`);

    // Check if entry exists
    const existingId = findDailyStatEntry(doctor, dateStr);

    const properties = {
      'Date': {
        title: [{ text: { content: dateStr } }]
      },
      'Doctor': {
        people: [{ name: doctor }]
      },
      'New Leads': {
        number: data.newLeads
      },
      'Active Care Presented': {
        number: data.activeCarePresented
      },
      'Active Care Accepted': {
        number: data.activeCareAccepted
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
      log(`✅ Successfully synced ${doctor} for ${dateStr}`);
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
 * Finds existing DAILY_STATS entry for doctor/date
 */
function findDailyStatEntry(doctor, date) {
  try {
    const url = `https://api.notion.com/v1/databases/${CONFIG.DAILY_STATS_DATABASE_ID}/query`;

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

    const response = notionRequest('post', url, payload);

    if (response && response.results && response.results.length > 0) {
      log(`Found existing entry for ${doctor} on ${date}`);
      return response.results[0].id;
    }

    log(`No existing entry found for ${doctor} on ${date}`);
    return null;

  } catch (error) {
    logError('findDailyStatEntry', error);
    return null;
  }
}

// ===============================================
// PART 2: NOTION → SHEETS SYNC
// Scheduled trigger (every 15 minutes)
// ===============================================

/**
 * Trigger: Time-based (every 15 minutes)
 * Aggregates Notion transactions back to Google Sheets
 */
function notionToSheetsSync() {
  try {
    log('=== Starting Notion → Sheets Sync ===');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const today = new Date();
    const todayStr = formatDate(today);

    // Process each doctor
    CONFIG.DOCTORS.forEach(doctor => {
      log(`Processing ${doctor}...`);

      // Get aggregated stats from Notion for today
      const stats = getDailyStatsFromNotion(doctor, todayStr);

      if (stats) {
        log(`Got stats for ${doctor}: ${JSON.stringify(stats)}`);
        updateSheetRow(ss, doctor, todayStr, stats);
      } else {
        log(`No stats found for ${doctor} on ${todayStr}`);
      }
    });

    log('=== Notion → Sheets Sync Complete ===');

  } catch (error) {
    logError('notionToSheetsSync', error);
  }
}

/**
 * Gets daily stats from Notion DAILY_STATS database
 */
function getDailyStatsFromNotion(doctor, date) {
  try {
    const url = `https://api.notion.com/v1/databases/${CONFIG.DAILY_STATS_DATABASE_ID}/query`;

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

    const response = notionRequest('post', url, payload);

    if (!response || !response.results || response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    const props = page.properties;

    // Extract rollup values (these come from aggregating VISITS, COLLECTIONS, PATIENTS)
    const stats = {
      newPatients: getNumberValue(props['New Patients']),
      regularVisits: getNumberValue(props['Regular Patient Visits']),
      totalVisits: getNumberValue(props['Total Patient Visits']),
      collections: getNumberValue(props['Collections'])
    };

    log(`Extracted stats: ${JSON.stringify(stats)}`);
    return stats;

  } catch (error) {
    logError('getDailyStatsFromNotion', error);
    return null;
  }
}

/**
 * Updates Google Sheets with Notion data
 */
function updateSheetRow(ss, doctorName, date, stats) {
  try {
    const sheet = ss.getSheetByName(doctorName);

    if (!sheet) {
      log(`Sheet not found: ${doctorName}`);
      return;
    }

    // Find row with this date
    const dates = sheet.getRange('B2:B1000').getValues();
    const targetDate = new Date(date);

    for (let i = 0; i < dates.length; i++) {
      const rowDate = new Date(dates[i][0]);

      if (formatDate(rowDate) === formatDate(targetDate)) {
        const row = i + 2; // +2 for header and 0-indexing

        // Update only aggregated columns (not manually entered data)
        // Column D: # of New Patients (from Notion rollup)
        sheet.getRange(row, 4).setValue(stats.newPatients);

        // Column L: Regular Patient Visits (from Notion rollup)
        sheet.getRange(row, 12).setValue(stats.regularVisits);

        // Column N: Collections (from Notion rollup)
        sheet.getRange(row, 14).setValue(stats.collections);

        log(`✅ Updated ${doctorName} row ${row} with Notion data`);
        return;
      }
    }

    log(`Date ${date} not found in ${doctorName} sheet`);

  } catch (error) {
    logError('updateSheetRow', error);
  }
}

// ===============================================
// PART 3: HELPER FUNCTIONS
// ===============================================

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
 * Extracts number value from Notion property
 */
function getNumberValue(property) {
  if (!property) return 0;

  // Handle rollup properties
  if (property.rollup && property.rollup.number !== undefined) {
    return property.rollup.number || 0;
  }

  // Handle regular number properties
  if (property.number !== undefined) {
    return property.number || 0;
  }

  return 0;
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
  // MailApp.sendEmail('your-email@example.com', 'Sync Error', errorMsg);
}

// ===============================================
// PART 4: MANUAL TESTING FUNCTIONS
// ===============================================

/**
 * Test function: Sync a specific doctor/date to Notion
 * Run this from Apps Script editor to test
 */
function testSheetsToNotion() {
  const testDate = new Date();
  const testData = {
    newLeads: 10,
    newPatients: 5,
    activeCarePresented: 5,
    activeCareAccepted: 3,
    wellnessPresented: 2,
    wellnessAccepted: 1,
    regularVisits: 50,
    collections: 5000
  };

  log('=== Testing Sheets → Notion ===');
  syncToNotion('Dr. Saylor', testDate, testData);
}

/**
 * Test function: Get stats from Notion
 * Run this from Apps Script editor to test
 */
function testNotionToSheets() {
  const testDate = formatDate(new Date());

  log('=== Testing Notion → Sheets ===');
  const stats = getDailyStatsFromNotion('Dr. Saylor', testDate);
  log(`Stats: ${JSON.stringify(stats)}`);
}

/**
 * Test function: Full sync cycle
 */
function testFullSync() {
  log('=== Testing Full Sync ===');
  testSheetsToNotion();
  Utilities.sleep(2000); // Wait 2 seconds
  testNotionToSheets();
}

// ===============================================
// TRIGGER SETUP INSTRUCTIONS
// ===============================================

/**
 * Run this function ONCE to set up triggers automatically
 */
function setupTriggers() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));

  // Create onEdit trigger
  ScriptApp.newTrigger('onEditTrigger')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();

  // Create time-based trigger (every 15 minutes)
  ScriptApp.newTrigger('notionToSheetsSync')
    .timeBased()
    .everyMinutes(CONFIG.SYNC_INTERVAL_MINUTES)
    .create();

  log('✅ Triggers set up successfully!');
  log('- onEdit trigger: Will sync when doctors edit their sheets');
  log(`- Time trigger: Will sync Notion → Sheets every ${CONFIG.SYNC_INTERVAL_MINUTES} minutes`);
}

/**
 * Run this to remove all triggers
 */
function removeTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  log('✅ All triggers removed');
}

// ===============================================
// SETUP CHECKLIST (COPY THIS TO YOUR DOCS)
// ===============================================

/**
 * IMPLEMENTATION STEPS:
 *
 * 1. Get Notion API Key:
 *    - Go to notion.so/my-integrations
 *    - Click "+ New integration"
 *    - Name: "Van Every Sheets Sync"
 *    - Select workspace
 *    - Copy "Internal Integration Token"
 *    - Paste into CONFIG.NOTION_API_KEY above
 *
 * 2. Get Notion Database IDs:
 *    - Open DAILY_STATS database in Notion
 *    - Copy URL: notion.so/workspace/DATABASE_ID?v=...
 *    - DATABASE_ID is the 32-character code
 *    - Paste into CONFIG.DAILY_STATS_DATABASE_ID
 *    - Repeat for PATIENTS, VISITS, COLLECTIONS, LEADS
 *
 * 3. Share Notion Databases with Integration:
 *    - Open each database (DAILY_STATS, PATIENTS, VISITS, COLLECTIONS, LEADS)
 *    - Click "..." menu → "Connect to"
 *    - Select "Van Every Sheets Sync" integration
 *    - Click "Confirm"
 *
 * 4. Update Configuration:
 *    - Verify CONFIG.DOCTORS array matches sheet names exactly
 *    - Save file (Ctrl+S / Cmd+S)
 *
 * 5. Test Manually:
 *    - Run → testFullSync
 *    - Check execution log for errors
 *    - Verify data appears in Notion
 *
 * 6. Set Up Triggers:
 *    - Run → setupTriggers
 *    - Authorize permissions when prompted
 *    - Verify triggers created: Edit → Current project's triggers
 *
 * 7. Test Live:
 *    - Edit a cell in Dr. Saylor sheet
 *    - Check Notion DAILY_STATS (should update within seconds)
 *    - Add a visit in Notion
 *    - Wait 15 minutes
 *    - Check Google Sheets (should update automatically)
 *
 * 8. Monitor:
 *    - Check logs regularly for errors
 *    - Set DEBUG_MODE = false after testing
 *    - Optional: Enable email notifications in logError function
 *
 * TROUBLESHOOTING:
 * - If sync not working: Check CONFIG values are correct
 * - If authorization fails: Re-run setupTriggers and approve permissions
 * - If data doesn't appear: Check Notion database is shared with integration
 * - If errors persist: Set DEBUG_MODE = true and check detailed logs
 */
