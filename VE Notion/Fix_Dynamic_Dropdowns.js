/**
 * FIX: Add dynamic dropdowns for Related Project and Tags
 *
 * This script:
 * 1. Creates dropdowns that show existing options
 * 2. Allows typing new values
 * 3. Auto-creates new projects/tags when typed
 */

function fixDynamicDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tasksSheet = ss.getSheetByName('Tasks');
  const projectsSheet = ss.getSheetByName('Projects');

  // Auto-detect column positions
  const headers = tasksSheet.getRange(1, 1, 1, tasksSheet.getLastColumn()).getValues()[0];
  const cols = {};

  headers.forEach((header, index) => {
    const col = index + 1;
    const h = String(header).toLowerCase().trim();

    if (h.includes('related project') || (h === 'project' && !h.includes('id'))) {
      cols.relatedProject = col;
    }
    if (h.includes('tag')) {
      cols.tags = col;
    }
  });

  Logger.log('Detected columns: ' + JSON.stringify(cols));

  // Fix Related Project dropdown
  if (cols.relatedProject && projectsSheet) {
    const projectsRange = projectsSheet.getRange('B2:B100');
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectsRange, true)
      .setAllowInvalid(true) // KEY: Show dropdown but allow typing new values
      .setHelpText('Select existing project or type new one')
      .build();

    tasksSheet.getRange(2, cols.relatedProject, 1000, 1).setDataValidation(rule);
    Logger.log('✅ Related Project dropdown fixed');
  }

  // Fix Tags dropdown - create Tags sheet if needed
  let tagsSheet = ss.getSheetByName('Tags');
  if (!tagsSheet) {
    tagsSheet = ss.insertSheet('Tags');
    tagsSheet.getRange('A1').setValue('Tag Name');

    // Add starter tags
    const starterTags = [
      'Clinical',
      'Admin',
      'Marketing',
      'Operations',
      'Patient Care',
      'Training',
      'Finance',
      'HR',
      'Urgent',
      'Follow-up'
    ];

    starterTags.forEach((tag, index) => {
      tagsSheet.getRange(index + 2, 1).setValue(tag);
    });

    Logger.log('✅ Tags sheet created with starter tags');
  }

  if (cols.tags && tagsSheet) {
    const tagsRange = tagsSheet.getRange('A2:A100');
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(tagsRange, true)
      .setAllowInvalid(true) // Allow typing new tags
      .setHelpText('Select existing tags or type new ones (comma-separated for multiple)')
      .build();

    tasksSheet.getRange(2, cols.tags, 1000, 1).setDataValidation(rule);
    Logger.log('✅ Tags dropdown fixed');
  }

  // Set up onEdit trigger for auto-creation
  setupDynamicDropdownTrigger();

  SpreadsheetApp.getUi().alert(
    '✅ Dynamic Dropdowns Fixed!\n\n' +
    'Related Project:\n' +
    '• Click dropdown to see existing projects\n' +
    '• Type new project name to create it automatically\n\n' +
    'Tags:\n' +
    '• Click dropdown to see existing tags\n' +
    '• Type new tags (comma-separated for multiple)\n' +
    '• New tags auto-added to Tags sheet'
  );
}

/**
 * Set up trigger to auto-create new projects/tags when typed
 */
function setupDynamicDropdownTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Remove existing onEdit triggers for this function
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onEditAutoCreate') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new onEdit trigger
  ScriptApp.newTrigger('onEditAutoCreate')
    .forSpreadsheet(ss)
    .onEdit()
    .create();

  Logger.log('✅ Dynamic dropdown trigger created');
}

/**
 * onEdit trigger: Auto-create new projects/tags when typed
 */
function onEditAutoCreate(e) {
  if (!e || !e.range) return;

  const ss = e.source;
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const col = e.range.getColumn();
  const value = e.value;

  // Only process Tasks sheet, skip header row
  if (sheet.getName() !== 'Tasks' || row === 1 || !value) return;

  // Get column headers
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const header = String(headers[col - 1]).toLowerCase().trim();

  // Handle Related Project
  if (header.includes('related project') || (header === 'project' && !header.includes('id'))) {
    const projectsSheet = ss.getSheetByName('Projects');
    if (!projectsSheet) return;

    // Get existing projects
    const existingProjects = projectsSheet.getRange('B2:B100').getValues().flat().filter(p => p !== '');

    // If project doesn't exist, add it
    if (!existingProjects.includes(value)) {
      const nextRow = existingProjects.length + 2;

      // Generate Project ID
      const projectId = 'PROJ-' + String(nextRow - 1).padStart(3, '0');

      // Add to Projects sheet
      projectsSheet.getRange(nextRow, 1).setValue(projectId);
      projectsSheet.getRange(nextRow, 2).setValue(value);
      projectsSheet.getRange(nextRow, 5).setValue('Not Started'); // Status
      projectsSheet.getRange(nextRow, 6).setValue('Medium'); // Priority

      Logger.log('✅ Auto-created project: ' + value);
    }
  }

  // Handle Tags
  if (header.includes('tag')) {
    let tagsSheet = ss.getSheetByName('Tags');

    // Create Tags sheet if doesn't exist
    if (!tagsSheet) {
      tagsSheet = ss.insertSheet('Tags');
      tagsSheet.getRange('A1').setValue('Tag Name');
    }

    // Get existing tags
    const existingTags = tagsSheet.getRange('A2:A100').getValues().flat().filter(t => t !== '');

    // Split comma-separated tags
    const newTags = value.split(',').map(t => t.trim()).filter(t => t !== '');

    // Add any new tags
    let addedCount = 0;
    newTags.forEach(tag => {
      if (!existingTags.includes(tag)) {
        const nextRow = existingTags.length + addedCount + 2;
        tagsSheet.getRange(nextRow, 1).setValue(tag);
        existingTags.push(tag);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      Logger.log('✅ Auto-created ' + addedCount + ' new tag(s)');
    }
  }
}

/**
 * Helper: Detect column positions
 */
function detectTasksColumns(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const cols = {};

  headers.forEach((header, index) => {
    const col = index + 1;
    const h = String(header).toLowerCase().trim();

    if (h.includes('related project') || (h === 'project' && !h.includes('id'))) {
      cols.relatedProject = col;
    }
    if (h.includes('tag')) {
      cols.tags = col;
    }
  });

  return cols;
}
