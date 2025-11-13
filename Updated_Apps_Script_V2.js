/**
 * VE Command Center - V2 Apps Script
 *
 * NEW FEATURES:
 * - Role-based assignment (not individual people)
 * - Dynamic Projects dropdown
 * - Dynamic Tags management
 * - Recurring task automation
 * - Updated column structure
 *
 * SETUP:
 * 1. Extensions → Apps Script
 * 2. Paste this code
 * 3. Save
 * 4. Run: setupAllDataValidation()
 * 5. Set up time-based trigger for: processRecurringTasks()
 */

// ============================================
// MAIN SETUP FUNCTION
// ============================================

function setupAllDataValidation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Get or create necessary sheets
  const tasksSheet = ss.getSheetByName('Tasks');
  const projectsSheet = ss.getSheetByName('Projects');
  const eventsSheet = ss.getSheetByName('Events and Meetings');
  const tagsSheet = getOrCreateTagsSheet(ss);

  if (!tasksSheet || !projectsSheet || !eventsSheet) {
    SpreadsheetApp.getUi().alert('Error: Make sure you have sheets named: Tasks, Projects, Events and Meetings');
    return;
  }

  Logger.log('Setting up Tasks sheet validation...');
  setupTasksValidationV2(tasksSheet, projectsSheet, tagsSheet);

  Logger.log('Setting up Projects sheet validation...');
  setupProjectsValidationV2(projectsSheet);

  Logger.log('Setting up Events and Meetings validation...');
  setupEventsValidation(eventsSheet);

  // Set up auto-sync for dynamic dropdowns
  setupDynamicDropdownTriggers();

  // Apply color formatting
  Logger.log('Applying conditional formatting colors...');
  setupConditionalFormatting(tasksSheet, projectsSheet, eventsSheet);

  SpreadsheetApp.getUi().alert('✅ Success!\\n\\nAll data validation rules have been set up with V2 structure:\\n\\n' +
    '• Role-based assignment (Billing, Front Desk, Doctors, etc.)\\n' +
    '• Dynamic Projects dropdown\\n' +
    '• Dynamic Tags management\\n' +
    '• Recurring task support\\n' +
    '• Color-coded dropdowns\\n\\n' +
    'Next: Set up recurring task automation trigger');
}

// ============================================
// TASKS SHEET VALIDATION (V2)
// ============================================

function setupTasksValidationV2(sheet, projectsSheet, tagsSheet) {
  // Get reference to Team Members sheet for dynamic dropdown
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const teamMembersSheet = ss.getSheetByName('Team Members');

  // Column C - Assigned To (INDIVIDUALS + ROLES)
  const assignedToRange = teamMembersSheet.getRange('A2:A13'); // All people + roles
  const assignedToRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(assignedToRange, true)
    .setAllowInvalid(false)
    .setHelpText('Assign to person or role/department')
    .build();
  sheet.getRange('C2:C1000').setDataValidation(assignedToRule);

  // Column G - Priority
  const priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['High', 'Medium', 'Low'], true)
    .setAllowInvalid(false)
    .setHelpText('Select priority level')
    .build();
  sheet.getRange('G2:G1000').setDataValidation(priorityRule);

  // Column H - Status
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Not Started', 'In Progress', 'Done', 'Blocked', 'On Hold'], true)
    .setAllowInvalid(false)
    .setHelpText('Select task status')
    .build();
  sheet.getRange('H2:H1000').setDataValidation(statusRule);

  // Column I - Related Project (DYNAMIC from Projects sheet)
  const projectsRange = projectsSheet.getRange('B2:B100'); // Project Name column
  const projectRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(projectsRange, true)
    .setAllowInvalid(true) // Allow new projects to be typed
    .setHelpText('Select existing project or type new one')
    .build();
  sheet.getRange('I2:I1000').setDataValidation(projectRule);

  // Column J - Tags (Free text with suggestions)
  // Note: Google Sheets doesn't support true multi-select, so using comma-separated text
  const tagsRule = SpreadsheetApp.newDataValidation()
    .requireTextContains('')
    .setAllowInvalid(true)
    .setHelpText('Enter tags separated by commas (e.g., Clinical, Urgent)')
    .build();
  sheet.getRange('J2:J1000').setDataValidation(tagsRule);

  // Column K - Type (REMOVED "Meeting")
  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Task', 'Project'], true)
    .setAllowInvalid(false)
    .setHelpText('Select item type')
    .build();
  sheet.getRange('K2:K1000').setDataValidation(typeRule);

  // Column L - Recurring
  const recurringRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Yes', 'No'], true)
    .setAllowInvalid(false)
    .setHelpText('Is this a recurring task?')
    .build();
  sheet.getRange('L2:L1000').setDataValidation(recurringRule);

  // Column M - Recurrence Frequency (NEW)
  const frequencyRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Yearly'], true)
    .setAllowInvalid(false)
    .setHelpText('How often does this recur?')
    .build();
  sheet.getRange('M2:M1000').setDataValidation(frequencyRule);

  Logger.log('Tasks V2 validation complete');
}

// ============================================
// PROJECTS SHEET VALIDATION (V2)
// ============================================

function setupProjectsValidationV2(sheet) {
  // Get reference to Team Members sheet for dynamic dropdown
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const teamMembersSheet = ss.getSheetByName('Team Members');

  // Column C - Owner (INDIVIDUALS + ROLES)
  const ownerRange = teamMembersSheet.getRange('A2:A13'); // All people + roles
  const ownerRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(ownerRange, true)
    .setAllowInvalid(false)
    .setHelpText('Assign project to person or role/department')
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

  Logger.log('Projects V2 validation complete');
}

// ============================================
// EVENTS AND MEETINGS VALIDATION (UNCHANGED)
// ============================================

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

// ============================================
// TAGS HELPER SHEET
// ============================================

function getOrCreateTagsSheet(ss) {
  let tagsSheet = ss.getSheetByName('Tags');

  if (!tagsSheet) {
    tagsSheet = ss.insertSheet('Tags');

    // Set up headers
    tagsSheet.getRange('A1').setValue('Tag Name');
    tagsSheet.getRange('B1').setValue('Category');
    tagsSheet.getRange('C1').setValue('Usage Count');

    // Add starter tags
    const starterTags = [
      ['Clinical', 'Operations', 0],
      ['Admin', 'Operations', 0],
      ['Marketing', 'Growth', 0],
      ['Operations', 'Internal', 0],
      ['Patient Care', 'Clinical', 0],
      ['Training', 'Development', 0],
      ['Finance', 'Admin', 0],
      ['HR', 'Admin', 0],
      ['Urgent', 'Priority', 0],
      ['Follow-up', 'Action', 0]
    ];

    tagsSheet.getRange(2, 1, starterTags.length, 3).setValues(starterTags);

    // Format header
    tagsSheet.getRange('A1:C1')
      .setFontWeight('bold')
      .setBackground('#666666')
      .setFontColor('#ffffff');

    Logger.log('Created Tags helper sheet');
  }

  return tagsSheet;
}

// ============================================
// DYNAMIC PROJECT CREATION
// ============================================

function onEdit(e) {
  if (!e) return;

  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const value = e.value;

  // Check if edit is in Tasks sheet, Related Project column (I)
  if (sheet.getName() === 'Tasks' && range.getColumn() === 9 && value) {
    autoCreateProject(e.source, value);
  }

  // Auto-populate Assigned Date when task is first assigned
  if (sheet.getName() === 'Tasks' && range.getColumn() === 3 && value) { // Column C
    const row = range.getRow();
    const assignedDateCell = sheet.getRange(row, 4); // Column D
    if (!assignedDateCell.getValue()) {
      assignedDateCell.setValue(new Date());
    }
  }

  // Auto-populate Completed Date when status changes to Done
  if (sheet.getName() === 'Tasks' && range.getColumn() === 8 && value === 'Done') { // Column H
    const row = range.getRow();
    const completedDateCell = sheet.getRange(row, 6); // Column F
    if (!completedDateCell.getValue()) {
      completedDateCell.setValue(new Date());
    }
  }
}

function autoCreateProject(ss, projectName) {
  const projectsSheet = ss.getSheetByName('Projects');
  if (!projectsSheet) return;

  // Check if project already exists
  const projectNames = projectsSheet.getRange('B2:B100').getValues();
  const exists = projectNames.some(row => row[0] === projectName);

  if (!exists) {
    // Find first empty row
    const lastRow = projectsSheet.getLastRow();
    const newRow = lastRow + 1;

    // Generate Project ID
    const projectId = 'PROJ-' + String(newRow - 1).padStart(3, '0');

    // Add new project
    projectsSheet.getRange(newRow, 1).setValue(projectId); // Column A
    projectsSheet.getRange(newRow, 2).setValue(projectName); // Column B
    projectsSheet.getRange(newRow, 4).setValue('Backlog'); // Column D - Default status
    projectsSheet.getRange(newRow, 5).setValue('Medium'); // Column E - Default priority

    Logger.log('Auto-created project: ' + projectName);
  }
}

// ============================================
// RECURRING TASKS AUTOMATION
// ============================================

/**
 * Run this function daily via time-based trigger
 * Apps Script → Triggers → Add Trigger
 * Function: processRecurringTasks
 * Event: Time-driven, Day timer, Midnight to 1am
 */
function processRecurringTasks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tasksSheet = ss.getSheetByName('Tasks');

  if (!tasksSheet) return;

  const data = tasksSheet.getDataRange().getValues();
  const headers = data[0];

  // Find column indices
  const recurringCol = headers.indexOf('Recurring');
  const frequencyCol = headers.indexOf('Recurrence Frequency');
  const dueDateCol = headers.indexOf('Due Date');
  const taskNameCol = headers.indexOf('Task Name');
  const statusCol = headers.indexOf('Status');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let newTasksCreated = 0;

  // Loop through tasks (skip header)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // Check if recurring and has frequency
    if (row[recurringCol] === 'Yes' && row[frequencyCol] && row[dueDateCol]) {
      const dueDate = new Date(row[dueDateCol]);
      dueDate.setHours(0, 0, 0, 0);

      // Check if due date is today or past
      if (dueDate <= today && row[statusCol] === 'Done') {
        // Create next instance
        const nextDueDate = calculateNextDueDate(dueDate, row[frequencyCol]);

        // Copy row to create new task
        const newRow = [...row];
        newRow[dueDateCol] = nextDueDate;
        newRow[statusCol] = 'Not Started';
        newRow[headers.indexOf('Assigned Date')] = new Date();
        newRow[headers.indexOf('Completed Date')] = '';
        newRow[headers.indexOf('Notes')] = (row[headers.indexOf('Notes')] || '') + ' (Recurring instance)';

        // Append new task
        tasksSheet.appendRow(newRow);
        newTasksCreated++;

        Logger.log('Created recurring task: ' + row[taskNameCol] + ' due ' + nextDueDate);
      }
    }
  }

  if (newTasksCreated > 0) {
    Logger.log('Total recurring tasks created: ' + newTasksCreated);
  }
}

function calculateNextDueDate(currentDate, frequency) {
  const nextDate = new Date(currentDate);

  switch(frequency) {
    case 'Daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'Weekly':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'Biweekly':
      nextDate.setDate(nextDate.getDate() + 14);
      break;
    case 'Monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'Quarterly':
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;
    case 'Yearly':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      nextDate.setDate(nextDate.getDate() + 7); // Default to weekly
  }

  return nextDate;
}

// ============================================
// DYNAMIC DROPDOWN TRIGGERS
// ============================================

function setupDynamicDropdownTriggers() {
  // Remove existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onEdit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new onEdit trigger
  ScriptApp.newTrigger('onEdit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onEdit()
    .create();

  Logger.log('Dynamic dropdown triggers set up');
}

// ============================================
// SETUP RECURRING TASKS TRIGGER
// ============================================

function setupRecurringTasksTrigger() {
  // Remove existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'processRecurringTasks') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new daily trigger at midnight
  ScriptApp.newTrigger('processRecurringTasks')
    .timeBased()
    .atHour(0) // Midnight
    .everyDays(1)
    .create();

  SpreadsheetApp.getUi().alert('✅ Recurring tasks trigger set up!\\n\\nWill run daily at midnight to create new task instances.');
}

// ============================================
// CONDITIONAL FORMATTING - COLOR CODING
// ============================================

function setupConditionalFormatting(tasksSheet, projectsSheet, eventsSheet) {
  // Clear existing conditional format rules
  tasksSheet.clearConditionalFormatRules();
  projectsSheet.clearConditionalFormatRules();
  eventsSheet.clearConditionalFormatRules();

  // ========== TASKS SHEET ==========
  const tasksRules = [];

  // PRIORITY (Column G) - Uses lighter backgrounds for readability
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('High')
      .setBackground('#f28b82') // Light red
      .setFontColor('#000000') // Black text
      .setRanges([tasksSheet.getRange('G2:G1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Medium')
      .setBackground('#fdd663') // Light yellow
      .setFontColor('#000000') // Black text
      .setRanges([tasksSheet.getRange('G2:G1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Low')
      .setBackground('#81c995') // Light green
      .setFontColor('#000000') // Black text
      .setRanges([tasksSheet.getRange('G2:G1000')])
      .build()
  );

  // STATUS (Column H)
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Not Started')
      .setBackground('#dadce0') // Light gray
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('H2:H1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('In Progress')
      .setBackground('#4285f4') // Blue
      .setFontColor('#ffffff') // White text
      .setRanges([tasksSheet.getRange('H2:H1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Done')
      .setBackground('#34a853') // Green
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('H2:H1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Blocked')
      .setBackground('#ea4335') // Red
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('H2:H1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('On Hold')
      .setBackground('#ff6d01') // Orange
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('H2:H1000')])
      .build()
  );

  // TYPE (Column K)
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Task')
      .setBackground('#a142f4') // Purple
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('K2:K1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Project')
      .setBackground('#1a73e8') // Dark blue
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('K2:K1000')])
      .build()
  );

  // RECURRING (Column L)
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Yes')
      .setBackground('#4285f4') // Blue
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('L2:L1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('No')
      .setBackground('#f1f3f4') // Very light gray
      .setFontColor('#5f6368') // Dark gray text
      .setRanges([tasksSheet.getRange('L2:L1000')])
      .build()
  );

  // RECURRENCE FREQUENCY (Column M)
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('Daily')
      .setBackground('#e8f0fe') // Very light blue
      .setFontColor('#1967d2')
      .setRanges([tasksSheet.getRange('M2:M1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('Weekly')
      .setBackground('#e8f0fe')
      .setFontColor('#1967d2')
      .setRanges([tasksSheet.getRange('M2:M1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('Biweekly')
      .setBackground('#e8f0fe')
      .setFontColor('#1967d2')
      .setRanges([tasksSheet.getRange('M2:M1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('Monthly')
      .setBackground('#e8f0fe')
      .setFontColor('#1967d2')
      .setRanges([tasksSheet.getRange('M2:M1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('Quarterly')
      .setBackground('#e8f0fe')
      .setFontColor('#1967d2')
      .setRanges([tasksSheet.getRange('M2:M1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains('Yearly')
      .setBackground('#e8f0fe')
      .setFontColor('#1967d2')
      .setRanges([tasksSheet.getRange('M2:M1000')])
      .build()
  );

  // ASSIGNED TO (Column C) - Individual people (light backgrounds)
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Dr. Saylor')
      .setBackground('#c5e1a5') // Light green
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Dr. Zach')
      .setBackground('#90caf9') // Light blue
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Dr. John')
      .setBackground('#ce93d8') // Light purple
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Lou Ann')
      .setBackground('#ffcc80') // Light orange
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Christina')
      .setBackground('#fff59d') // Light yellow
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Tricia')
      .setBackground('#f48fb1') // Light pink
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Windy')
      .setBackground('#80deea') // Light cyan
      .setFontColor('#000000')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );

  // ASSIGNED TO - Role colors (darker backgrounds with white text)
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Doctors')
      .setBackground('#0d652d') // Medical green
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Front Desk')
      .setBackground('#185abc') // Business blue
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Billing')
      .setBackground('#e37400') // Gold/orange
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Chiro Assistant')
      .setBackground('#12b5cb') // Teal
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );
  tasksRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Anyone')
      .setBackground('#9aa0a6') // Gray
      .setFontColor('#ffffff')
      .setRanges([tasksSheet.getRange('C2:C1000')])
      .build()
  );

  tasksSheet.setConditionalFormatRules(tasksRules);

  // ========== PROJECTS SHEET ==========
  const projectsRules = [];

  // PRIORITY (Column E)
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('High')
      .setBackground('#d93025') // Darker red
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('E2:E100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Medium')
      .setBackground('#f29900') // Orange
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('E2:E100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Low')
      .setBackground('#188038') // Darker green
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('E2:E100')])
      .build()
  );

  // STATUS (Column D)
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Backlog')
      .setBackground('#dadce0')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('D2:D100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('In Progress')
      .setBackground('#1a73e8')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('D2:D100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Completed')
      .setBackground('#137333')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('D2:D100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('On Hold')
      .setBackground('#f9ab00')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('D2:D100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Cancelled')
      .setBackground('#5f6368')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('D2:D100')])
      .build()
  );

  // DEPARTMENT (Column F)
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Clinical')
      .setBackground('#0d652d')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('F2:F100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Admin')
      .setBackground('#185abc')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('F2:F100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Marketing')
      .setBackground('#c5221f')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('F2:F100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Operations')
      .setBackground('#8430ce')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('F2:F100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Finance')
      .setBackground('#e37400')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('F2:F100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('HR')
      .setBackground('#12b5cb')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('F2:F100')])
      .build()
  );

  // OWNER (Column C) - Individual people (light backgrounds)
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Dr. Saylor')
      .setBackground('#c5e1a5')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Dr. Zach')
      .setBackground('#90caf9')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Dr. John')
      .setBackground('#ce93d8')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Lou Ann')
      .setBackground('#ffcc80')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Christina')
      .setBackground('#fff59d')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Tricia')
      .setBackground('#f48fb1')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Windy')
      .setBackground('#80deea')
      .setFontColor('#000000')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );

  // OWNER - Role colors (darker backgrounds with white text)
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Doctors')
      .setBackground('#0d652d')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Front Desk')
      .setBackground('#185abc')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Billing')
      .setBackground('#e37400')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Chiro Assistant')
      .setBackground('#12b5cb')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );
  projectsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Anyone')
      .setBackground('#9aa0a6')
      .setFontColor('#ffffff')
      .setRanges([projectsSheet.getRange('C2:C100')])
      .build()
  );

  projectsSheet.setConditionalFormatRules(projectsRules);

  // ========== EVENTS AND MEETINGS SHEET ==========
  const eventsRules = [];

  // TYPE (Column H)
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Meeting')
      .setBackground('#039be5')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Event')
      .setBackground('#7986cb')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('All Hands')
      .setBackground('#e67c73')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Team')
      .setBackground('#33b679')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('1:1')
      .setBackground('#f6bf26')
      .setFontColor('#000000')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Clinical')
      .setBackground('#0b8043')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Client')
      .setBackground('#f4511e')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Training')
      .setBackground('#9e69af')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Conference')
      .setBackground('#039be5')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Workshop')
      .setBackground('#8e24aa')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('H2:H100')])
      .build()
  );

  // STATUS (Column I)
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Scheduled')
      .setBackground('#4285f4')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('I2:I100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Completed')
      .setBackground('#34a853')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('I2:I100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Cancelled')
      .setBackground('#ea4335')
      .setFontColor('#ffffff')
      .setRanges([eventsSheet.getRange('I2:I100')])
      .build()
  );
  eventsRules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Rescheduled')
      .setBackground('#fbbc04')
      .setFontColor('#000000')
      .setRanges([eventsSheet.getRange('I2:I100')])
      .build()
  );

  eventsSheet.setConditionalFormatRules(eventsRules);

  Logger.log('Conditional formatting applied successfully');
}
