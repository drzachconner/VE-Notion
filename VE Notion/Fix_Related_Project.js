/**
 * FIX: Allow typing new project names in Related Project column
 *
 * Run this function once to fix the validation
 */

function fixRelatedProjectValidation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tasksSheet = ss.getSheetByName('Tasks');
  const projectsSheet = ss.getSheetByName('Projects');

  // Find Related Project column
  const headers = tasksSheet.getRange(1, 1, 1, tasksSheet.getLastColumn()).getValues()[0];
  const relatedProjectCol = headers.findIndex(h =>
    String(h).toLowerCase().includes('related project') ||
    String(h).toLowerCase().includes('project')
  ) + 1;

  if (relatedProjectCol > 0) {
    // Remove strict validation - allow any text
    tasksSheet.getRange(2, relatedProjectCol, 1000, 1).clearDataValidations();

    Logger.log('Related Project validation cleared - you can now type any project name');
    SpreadsheetApp.getUi().alert('✅ Fixed!\n\nYou can now type any project name in the Related Project column.\n\nNew projects will be auto-created in the Projects sheet.');
  } else {
    SpreadsheetApp.getUi().alert('Could not find Related Project column');
  }
}
