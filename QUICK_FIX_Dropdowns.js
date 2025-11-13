/**
 * QUICK FIX: Enable typing new projects and tags
 *
 * Add this to your existing Apps Script file and run it once
 */

function quickFixDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tasksSheet = ss.getSheetByName('Tasks');
  const projectsSheet = ss.getSheetByName('Projects');

  // Find columns by header name
  const headers = tasksSheet.getRange(1, 1, 1, tasksSheet.getLastColumn()).getValues()[0];
  let relatedProjectCol = null;
  let tagsCol = null;

  headers.forEach((header, index) => {
    const h = String(header).toLowerCase();
    if (h.includes('related project') || h === 'project') {
      relatedProjectCol = index + 1;
    }
    if (h.includes('tag')) {
      tagsCol = index + 1;
    }
  });

  // Fix Related Project - show dropdown AND allow typing
  if (relatedProjectCol && projectsSheet) {
    const projectsRange = projectsSheet.getRange('B2:B100');
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectsRange, true)
      .setAllowInvalid(true) // This is the key - allows typing new values
      .build();

    tasksSheet.getRange(2, relatedProjectCol, 1000, 1).setDataValidation(rule);
  }

  // Fix Tags - show dropdown AND allow typing
  if (tagsCol) {
    // Create Tags sheet if it doesn't exist
    let tagsSheet = ss.getSheetByName('Tags');
    if (!tagsSheet) {
      tagsSheet = ss.insertSheet('Tags');
      tagsSheet.getRange('A1').setValue('Tag Name');
      const tags = ['Clinical', 'Admin', 'Marketing', 'Operations', 'Patient Care', 'Training', 'Finance', 'HR'];
      tags.forEach((tag, i) => tagsSheet.getRange(i + 2, 1).setValue(tag));
    }

    const tagsRange = tagsSheet.getRange('A2:A100');
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(tagsRange, true)
      .setAllowInvalid(true) // Allows typing new tags
      .build();

    tasksSheet.getRange(2, tagsCol, 1000, 1).setDataValidation(rule);
  }

  SpreadsheetApp.getUi().alert('✅ Fixed!\n\nNow you can:\n• Click the dropdown arrow to see existing options\n• Type new project/tag names directly\n\nNote: New items won\'t auto-create yet - we\'ll add that next.');
}
