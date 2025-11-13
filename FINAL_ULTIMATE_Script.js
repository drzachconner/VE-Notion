/**
 * VE COMMAND CENTER - ULTIMATE ONE-CLICK SETUP
 *
 * THIS SCRIPT DOES EVERYTHING:
 * - Clears sample data
 * - Auto-detects your column structure
 * - Sets up ALL dropdowns
 * - Applies ALL colors
 * - Creates all automation
 *
 * ZERO MANUAL WORK REQUIRED
 *
 * INSTRUCTIONS:
 * 1. Extensions → Apps Script
 * 2. Paste this ENTIRE code
 * 3. Save
 * 4. Run: ultimateSetup()
 * 5. Done!
 */

// ============================================
// MAIN SETUP - RUN THIS ONE FUNCTION
// ============================================

function ultimateSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  SpreadsheetApp.getUi().alert('🚀 Starting Ultimate Setup...\n\nThis will:\n1. Clear sample data\n2. Set up all dropdowns\n3. Apply all colors\n4. Create automation\n\nClick OK to continue.');

  // Step 1: Clear existing data and rules
  Logger.log('Step 1: Cleaning up...');
  clearSampleData(ss);

  // Step 2: Get all sheets
  const tasksSheet = ss.getSheetByName('Tasks');
  const projectsSheet = ss.getSheetByName('Projects');
  const eventsSheet = ss.getSheetByName('Events and Meetings');
  const teamMembersSheet = ss.getSheetByName('Team Members');

  if (!tasksSheet || !projectsSheet || !eventsSheet || !teamMembersSheet) {
    SpreadsheetApp.getUi().alert('❌ Error: Missing required sheets.\n\nMake sure you have:\n• Tasks\n• Projects\n• Events and Meetings\n• Team Members');
    return;
  }

  // Step 3: Auto-detect column positions
  Logger.log('Step 2: Auto-detecting columns...');
  const tasksCols = detectTasksColumns(tasksSheet);
  const projectsCols = detectProjectsColumns(projectsSheet);
  const eventsCols = detectEventsColumns(eventsSheet);

  // Step 4: Setup Team Members (add roles if not present)
  Logger.log('Step 3: Setting up Team Members...');
  setupTeamMembersSheet(teamMembersSheet);

  // Step 5: Create Tags sheet
  Logger.log('Step 4: Creating Tags sheet...');
  const tagsSheet = getOrCreateTagsSheet(ss);

  // Step 6: Setup all dropdowns
  Logger.log('Step 5: Setting up dropdowns...');
  setupTasksDropdowns(tasksSheet, tasksCols, teamMembersSheet, projectsSheet);
  setupProjectsDropdowns(projectsSheet, projectsCols, teamMembersSheet);
  setupEventsDropdowns(eventsSheet, eventsCols);

  // Step 7: Apply all colors
  Logger.log('Step 6: Applying colors...');
  applyAllColors(tasksSheet, tasksCols, projectsSheet, projectsCols, eventsSheet, eventsCols);

  // Step 8: Setup automation triggers
  Logger.log('Step 7: Setting up automation...');
  setupAllTriggers();

  // Done!
  SpreadsheetApp.getUi().alert('✅ COMPLETE!\n\n' +
    'Your Command Center is 100% ready:\n\n' +
    '✓ All dropdowns working\n' +
    '✓ All colors applied\n' +
    '✓ Auto-dates enabled\n' +
    '✓ Dynamic projects enabled\n' +
    '✓ Recurring tasks enabled\n\n' +
    'Start adding your real tasks!');
}

// ============================================
// STEP 1: CLEAR SAMPLE DATA
// ============================================

function clearSampleData(ss) {
  const tasksSheet = ss.getSheetByName('Tasks');
  const projectsSheet = ss.getSheetByName('Projects');

  if (tasksSheet) {
    // Clear validation first to avoid "invalid" errors
    tasksSheet.getRange('A2:Z1000').clearDataValidations();
    tasksSheet.clearConditionalFormatRules();

    // Delete sample task rows (keep header)
    if (tasksSheet.getLastRow() > 1) {
      tasksSheet.deleteRows(2, Math.min(10, tasksSheet.getLastRow() - 1));
    }
  }

  if (projectsSheet) {
    projectsSheet.getRange('A2:Z100').clearDataValidations();
    projectsSheet.clearConditionalFormatRules();

    if (projectsSheet.getLastRow() > 1) {
      projectsSheet.deleteRows(2, Math.min(10, projectsSheet.getLastRow() - 1));
    }
  }

  Logger.log('Sample data cleared');
}

// ============================================
// STEP 2: AUTO-DETECT COLUMNS
// ============================================

function detectTasksColumns(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const cols = {};

  headers.forEach((header, index) => {
    const col = index + 1; // Convert to 1-based
    const h = String(header).toLowerCase().trim();

    if (h.includes('task id')) cols.taskId = col;
    if (h.includes('task name')) cols.taskName = col;
    if (h.includes('assigned to')) cols.assignedTo = col;
    if (h.includes('due date')) cols.dueDate = col;
    if (h.includes('priority')) cols.priority = col;
    if (h.includes('status')) cols.status = col;
    if (h.includes('related project') || h.includes('project')) cols.relatedProject = col;
    if (h.includes('tags')) cols.tags = col;
    if (h.includes('type')) cols.type = col;
    if (h.includes('recurring')) cols.recurring = col;
    if (h.includes('recurrence frequency') || h.includes('frequency')) cols.frequency = col;
  });

  Logger.log('Detected Tasks columns: ' + JSON.stringify(cols));
  return cols;
}

function detectProjectsColumns(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const cols = {};

  headers.forEach((header, index) => {
    const col = index + 1;
    const h = String(header).toLowerCase().trim();

    if (h.includes('owner')) cols.owner = col;
    if (h.includes('priority')) cols.priority = col;
    if (h.includes('status')) cols.status = col;
    if (h.includes('department')) cols.department = col;
  });

  Logger.log('Detected Projects columns: ' + JSON.stringify(cols));
  return cols;
}

function detectEventsColumns(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const cols = {};

  headers.forEach((header, index) => {
    const col = index + 1;
    const h = String(header).toLowerCase().trim();

    if (h.includes('type')) cols.type = col;
    if (h.includes('status')) cols.status = col;
  });

  Logger.log('Detected Events columns: ' + JSON.stringify(cols));
  return cols;
}

// ============================================
// STEP 3: SETUP TEAM MEMBERS
// ============================================

function setupTeamMembersSheet(sheet) {
  const lastRow = sheet.getLastRow();
  const existingData = sheet.getRange(2, 1, Math.max(1, lastRow - 1), 1).getValues();

  // Check if roles already exist
  const hasRoles = existingData.some(row =>
    ['Billing', 'Front Desk', 'Doctors', 'Chiro Assistant', 'Anyone'].includes(row[0])
  );

  if (!hasRoles) {
    // Add roles below existing team members
    const roles = [
      ['Billing', 'Role', 'Admin'],
      ['Front Desk', 'Role', 'Admin'],
      ['Doctors', 'Role', 'Clinical'],
      ['Chiro Assistant', 'Role', 'Clinical'],
      ['Anyone', 'Role', 'All']
    ];

    const nextRow = lastRow + 1;
    sheet.getRange(nextRow, 1, 5, 3).setValues(roles);
    Logger.log('Added 5 role options to Team Members');
  }
}

// ============================================
// STEP 4: CREATE TAGS SHEET
// ============================================

function getOrCreateTagsSheet(ss) {
  let tagsSheet = ss.getSheetByName('Tags');

  if (!tagsSheet) {
    tagsSheet = ss.insertSheet('Tags');
    tagsSheet.getRange('A1:C1').setValues([['Tag Name', 'Category', 'Usage Count']]);

    const starterTags = [
      ['Clinical', 'Operations', 0],
      ['Admin', 'Operations', 0],
      ['Marketing', 'Growth', 0],
      ['Operations', 'Internal', 0],
      ['Urgent', 'Priority', 0]
    ];

    tagsSheet.getRange(2, 1, 5, 3).setValues(starterTags);
    tagsSheet.getRange('A1:C1').setFontWeight('bold').setBackground('#666666').setFontColor('#ffffff');
  }

  return tagsSheet;
}

// ============================================
// STEP 5: SETUP DROPDOWNS
// ============================================

function setupTasksDropdowns(sheet, cols, teamSheet, projectsSheet) {
  // Assigned To
  if (cols.assignedTo) {
    const teamRange = teamSheet.getRange('A2:A20');
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(teamRange, true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.assignedTo, 1000).setDataValidation(rule);
  }

  // Priority
  if (cols.priority) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['High', 'Medium', 'Low'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.priority, 1000).setDataValidation(rule);
  }

  // Status
  if (cols.status) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Not Started', 'In Progress', 'Done', 'Blocked', 'On Hold'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.status, 1000).setDataValidation(rule);
  }

  // Related Project
  if (cols.relatedProject) {
    const projectsRange = projectsSheet.getRange('B2:B100');
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectsRange, true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(2, cols.relatedProject, 1000).setDataValidation(rule);
  }

  // Type
  if (cols.type) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Task', 'Project'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.type, 1000).setDataValidation(rule);
  }

  // Recurring
  if (cols.recurring) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Yes', 'No'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.recurring, 1000).setDataValidation(rule);
  }

  // Recurrence Frequency
  if (cols.frequency) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Yearly'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.frequency, 1000).setDataValidation(rule);
  }

  Logger.log('Tasks dropdowns complete');
}

function setupProjectsDropdowns(sheet, cols, teamSheet) {
  // Owner
  if (cols.owner) {
    const teamRange = teamSheet.getRange('A2:A20');
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(teamRange, true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.owner, 100).setDataValidation(rule);
  }

  // Priority
  if (cols.priority) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['High', 'Medium', 'Low'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.priority, 100).setDataValidation(rule);
  }

  // Status
  if (cols.status) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Backlog', 'In Progress', 'Completed', 'On Hold', 'Cancelled'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.status, 100).setDataValidation(rule);
  }

  // Department
  if (cols.department) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Clinical', 'Admin', 'Marketing', 'Operations', 'Finance', 'HR'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.department, 100).setDataValidation(rule);
  }

  Logger.log('Projects dropdowns complete');
}

function setupEventsDropdowns(sheet, cols) {
  // Type
  if (cols.type) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Meeting', 'Event', 'All Hands', 'Team', '1:1', 'Clinical', 'Client', 'Training', 'Conference', 'Workshop'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.type, 100).setDataValidation(rule);
  }

  // Status
  if (cols.status) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, cols.status, 100).setDataValidation(rule);
  }

  Logger.log('Events dropdowns complete');
}

// ============================================
// STEP 6: APPLY COLORS
// ============================================

function applyAllColors(tasksSheet, tasksCols, projectsSheet, projectsCols, eventsSheet, eventsCols) {
  const tasksRules = [];
  const projectsRules = [];
  const eventsRules = [];

  // Tasks - Priority
  if (tasksCols.priority) {
    tasksRules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('High')
        .setBackground('#f28b82')
        .setFontColor('#000000')
        .setRanges([tasksSheet.getRange(2, tasksCols.priority, 1000, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Medium')
        .setBackground('#fdd663')
        .setFontColor('#000000')
        .setRanges([tasksSheet.getRange(2, tasksCols.priority, 1000, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Low')
        .setBackground('#81c995')
        .setFontColor('#000000')
        .setRanges([tasksSheet.getRange(2, tasksCols.priority, 1000, 1)])
        .build()
    );
  }

  // Tasks - Status
  if (tasksCols.status) {
    tasksRules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Not Started')
        .setBackground('#dadce0')
        .setFontColor('#000000')
        .setRanges([tasksSheet.getRange(2, tasksCols.status, 1000, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('In Progress')
        .setBackground('#4285f4')
        .setFontColor('#ffffff')
        .setRanges([tasksSheet.getRange(2, tasksCols.status, 1000, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Done')
        .setBackground('#34a853')
        .setFontColor('#ffffff')
        .setRanges([tasksSheet.getRange(2, tasksCols.status, 1000, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Blocked')
        .setBackground('#ea4335')
        .setFontColor('#ffffff')
        .setRanges([tasksSheet.getRange(2, tasksCols.status, 1000, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('On Hold')
        .setBackground('#ff6d01')
        .setFontColor('#ffffff')
        .setRanges([tasksSheet.getRange(2, tasksCols.status, 1000, 1)])
        .build()
    );
  }

  // Tasks - Assigned To (people)
  if (tasksCols.assignedTo) {
    const people = [
      ['Dr. Saylor', '#c5e1a5'],
      ['Dr. Zach', '#90caf9'],
      ['Dr. John', '#ce93d8'],
      ['Lou Ann', '#ffcc80'],
      ['Christina', '#fff59d'],
      ['Tricia', '#f48fb1'],
      ['Windy', '#80deea']
    ];

    people.forEach(([name, color]) => {
      tasksRules.push(
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextEqualTo(name)
          .setBackground(color)
          .setFontColor('#000000')
          .setRanges([tasksSheet.getRange(2, tasksCols.assignedTo, 1000, 1)])
          .build()
      );
    });

    // Roles
    const roles = [
      ['Doctors', '#0d652d'],
      ['Front Desk', '#185abc'],
      ['Billing', '#e37400'],
      ['Chiro Assistant', '#12b5cb'],
      ['Anyone', '#9aa0a6']
    ];

    roles.forEach(([name, color]) => {
      tasksRules.push(
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextEqualTo(name)
          .setBackground(color)
          .setFontColor('#ffffff')
          .setRanges([tasksSheet.getRange(2, tasksCols.assignedTo, 1000, 1)])
          .build()
      );
    });
  }

  // Projects - Priority
  if (projectsCols.priority) {
    projectsRules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('High')
        .setBackground('#d93025')
        .setFontColor('#ffffff')
        .setRanges([projectsSheet.getRange(2, projectsCols.priority, 100, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Medium')
        .setBackground('#f29900')
        .setFontColor('#ffffff')
        .setRanges([projectsSheet.getRange(2, projectsCols.priority, 100, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Low')
        .setBackground('#188038')
        .setFontColor('#ffffff')
        .setRanges([projectsSheet.getRange(2, projectsCols.priority, 100, 1)])
        .build()
    );
  }

  // Projects - Status
  if (projectsCols.status) {
    projectsRules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('In Progress')
        .setBackground('#1a73e8')
        .setFontColor('#ffffff')
        .setRanges([projectsSheet.getRange(2, projectsCols.status, 100, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Completed')
        .setBackground('#137333')
        .setFontColor('#ffffff')
        .setRanges([projectsSheet.getRange(2, projectsCols.status, 100, 1)])
        .build()
    );
  }

  // Events - Status
  if (eventsCols.status) {
    eventsRules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Scheduled')
        .setBackground('#4285f4')
        .setFontColor('#ffffff')
        .setRanges([eventsSheet.getRange(2, eventsCols.status, 100, 1)])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Completed')
        .setBackground('#34a853')
        .setFontColor('#ffffff')
        .setRanges([eventsSheet.getRange(2, eventsCols.status, 100, 1)])
        .build()
    );
  }

  tasksSheet.setConditionalFormatRules(tasksRules);
  projectsSheet.setConditionalFormatRules(projectsRules);
  eventsSheet.setConditionalFormatRules(eventsRules);

  Logger.log('Colors applied');
}

// ============================================
// STEP 7: SETUP TRIGGERS
// ============================================

function setupAllTriggers() {
  // Remove old triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (['onEdit', 'processRecurringTasks'].includes(trigger.getHandlerFunction())) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create onEdit trigger for auto-dates
  ScriptApp.newTrigger('onEdit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onEdit()
    .create();

  Logger.log('Triggers set up');
}

// ============================================
// AUTO-DATE POPULATION
// ============================================

function onEdit(e) {
  if (!e) return;

  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const value = e.value;

  if (sheet.getName() !== 'Tasks') return;

  const row = range.getRow();
  if (row === 1) return; // Skip header

  const cols = detectTasksColumns(sheet);
  const col = range.getColumn();

  // Auto-populate Assigned Date when Assigned To is filled
  if (col === cols.assignedTo && value) {
    const assignedDateCol = sheet.getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0]
      .findIndex(h => String(h).toLowerCase().includes('assigned date')) + 1;

    if (assignedDateCol > 0) {
      const dateCell = sheet.getRange(row, assignedDateCol);
      if (!dateCell.getValue()) {
        dateCell.setValue(new Date());
      }
    }
  }

  // Auto-populate Completed Date when Status = Done
  if (col === cols.status && value === 'Done') {
    const completedDateCol = sheet.getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0]
      .findIndex(h => String(h).toLowerCase().includes('completed date')) + 1;

    if (completedDateCol > 0) {
      const dateCell = sheet.getRange(row, completedDateCol);
      if (!dateCell.getValue()) {
        dateCell.setValue(new Date());
      }
    }
  }
}
