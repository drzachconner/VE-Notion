/**
 * VE Command Center - Automated Data Validation Setup
 *
 * This script automatically creates all dropdown data validation rules
 * across Tasks, Projects, and Events and Meetings tabs.
 *
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Click Save (disk icon)
 * 6. Click Run (play button)
 * 7. Authorize when prompted
 * 8. Wait 10-30 seconds for completion
 * 9. Check your sheets - all dropdowns will be set up!
 */

function setupAllDataValidation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Get sheet references
  const tasksSheet = ss.getSheetByName('Tasks');
  const projectsSheet = ss.getSheetByName('Projects');
  const eventsSheet = ss.getSheetByName('Events and Meetings');
  const teamMembersSheet = ss.getSheetByName('Team Members');

  if (!tasksSheet || !projectsSheet || !eventsSheet || !teamMembersSheet) {
    SpreadsheetApp.getUi().alert('Error: Make sure you have sheets named: Tasks, Projects, Events and Meetings, and Team Members');
    return;
  }

  Logger.log('Setting up Tasks sheet validation...');
  setupTasksValidation(tasksSheet, teamMembersSheet);

  Logger.log('Setting up Projects sheet validation...');
  setupProjectsValidation(projectsSheet, teamMembersSheet);

  Logger.log('Setting up Events and Meetings validation...');
  setupEventsValidation(eventsSheet);

  SpreadsheetApp.getUi().alert('✅ Success!\\n\\nAll data validation rules have been set up across:\\n• Tasks\\n• Projects\\n• Events and Meetings\\n\\nCheck your dropdowns!');
}

function setupTasksValidation(sheet, teamMembersSheet) {
  // Column C - Team Member (from Team Members sheet)
  const teamMemberRange = teamMembersSheet.getRange('A2:A8');
  const teamMemberRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(teamMemberRange, true)
    .setAllowInvalid(false)
    .setHelpText('Select team member')
    .build();
  sheet.getRange('C2:C1000').setDataValidation(teamMemberRule);

  // Column F - Priority
  const priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['High', 'Medium', 'Low'], true)
    .setAllowInvalid(false)
    .setHelpText('Select priority level')
    .build();
  sheet.getRange('F2:F1000').setDataValidation(priorityRule);

  // Column G - Status
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Not Started', 'In Progress', 'Done', 'Blocked', 'On Hold'], true)
    .setAllowInvalid(false)
    .setHelpText('Select task status')
    .build();
  sheet.getRange('G2:G1000').setDataValidation(statusRule);

  // Column J - Type
  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Task', 'Project', 'Meeting'], true)
    .setAllowInvalid(false)
    .setHelpText('Select item type')
    .build();
  sheet.getRange('J2:J1000').setDataValidation(typeRule);

  // Column L - Recurring
  const recurringRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Yes', 'No'], true)
    .setAllowInvalid(false)
    .setHelpText('Is this recurring?')
    .build();
  sheet.getRange('L2:L1000').setDataValidation(recurringRule);

  Logger.log('Tasks validation complete');
}

function setupProjectsValidation(sheet, teamMembersSheet) {
  // Column C - Owner (from Team Members sheet)
  const teamMemberRange = teamMembersSheet.getRange('A2:A8');
  const ownerRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(teamMemberRange, true)
    .setAllowInvalid(false)
    .setHelpText('Select project owner')
    .build();
  sheet.getRange('C2:C100').setDataValidation(ownerRule);

  // Column D - Status
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Backlog', 'In Progress', 'Completed', 'On Hold', 'Cancelled'], true)
    .setAllowInvalid(false)
    .setHelpText('Select project status')
    .build();
  sheet.getRange('D2:D100').setDataValidation(statusRule);

  // Column E - Priority
  const priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['High', 'Medium', 'Low'], true)
    .setAllowInvalid(false)
    .setHelpText('Select priority level')
    .build();
  sheet.getRange('E2:E100').setDataValidation(priorityRule);

  // Column F - Department
  const deptRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Clinical', 'Admin', 'Marketing', 'Operations', 'Finance', 'HR'], true)
    .setAllowInvalid(false)
    .setHelpText('Select department')
    .build();
  sheet.getRange('F2:F100').setDataValidation(deptRule);

  Logger.log('Projects validation complete');
}

function setupEventsValidation(sheet) {
  // Column H - Type
  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Meeting', 'Event', 'All Hands', 'Team', '1:1', 'Clinical', 'Client', 'Training', 'Conference', 'Workshop'], true)
    .setAllowInvalid(false)
    .setHelpText('Select event/meeting type')
    .build();
  sheet.getRange('H2:H100').setDataValidation(typeRule);

  // Column I - Status
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'], true)
    .setAllowInvalid(false)
    .setHelpText('Select event status')
    .build();
  sheet.getRange('I2:I100').setDataValidation(statusRule);

  Logger.log('Events and Meetings validation complete');
}

/**
 * Optional: Add this function to also set up conditional formatting
 * Uncomment and run separately if you want color-coded cells
 */
/*
function setupConditionalFormatting() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tasksSheet = ss.getSheetByName('Tasks');

  // Priority color coding (Column F)
  const priorityRules = [
    // High = Light Red
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('High')
      .setBackground('#f28b82')
      .setRanges([tasksSheet.getRange('F2:F1000')])
      .build(),
    // Medium = Light Yellow
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Medium')
      .setBackground('#fdd663')
      .setRanges([tasksSheet.getRange('F2:F1000')])
      .build(),
    // Low = Light Green
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Low')
      .setBackground('#81c995')
      .setRanges([tasksSheet.getRange('F2:F1000')])
      .build()
  ];

  tasksSheet.setConditionalFormatRules(priorityRules);

  SpreadsheetApp.getUi().alert('✅ Conditional formatting applied!');
}
*/
