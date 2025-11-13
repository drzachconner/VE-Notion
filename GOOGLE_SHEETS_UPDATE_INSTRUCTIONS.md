# 📝 Google Sheets Update Instructions - Van Every Chiropractic Doctors

## Update Doctor Names: Dr. Saylor, Dr. Zach, Dr. John

---

## OVERVIEW

**Current Setup:**
- Steph (has data)
- DOCTOR 2 (placeholder)
- DOCTOR 3 (placeholder)
- DOCTOR 4 (has sample data)
- DOCTOR 5 (placeholder)

**New Setup for Van Every Chiropractic (3 doctors):**
- Dr. Saylor
- Dr. Zach
- Dr. John

**Decision needed:** Do you want to:
- **Option A:** Use 3 doctors only (recommended - hide/remove Steph and DOCTOR 4 sheets)
- **Option B:** Use 5 doctors (keep Steph + DOCTOR 4, add 3 new)
- **Option C:** Replace Steph with one of the 3 new doctors

**I'll provide instructions for Option A (3 doctors only). Let me know if you need a different option.**

---

## STEP-BY-STEP UPDATE PROCESS

### PART 1: Backup First! (5 minutes)

1. Open your Google Sheets file
2. File → Make a copy
3. Name it "BACKUP - Master TWP Stat Tracker 2025"
4. Keep this backup safe
5. Work in the original file

### PART 2: Rename Doctor Sheets (5 minutes)

#### Rename DOCTOR 2 → Dr. Saylor

1. Right-click on "DOCTOR 2" tab at bottom
2. Select "Rename"
3. Type: `Dr. Saylor`
4. Press Enter

#### Rename DOCTOR 3 → Dr. Zach

1. Right-click on "DOCTOR 3" tab
2. Select "Rename"
3. Type: `Dr. Zach`
4. Press Enter

#### Rename DOCTOR 5 → Dr. John

1. Right-click on "DOCTOR 5" tab
2. Select "Rename"
3. Type: `Dr. John`
4. Press Enter

#### Hide Unused Sheets (Optional but Recommended)

1. Right-click on "Steph" tab
2. Select "Hide sheet"
3. Repeat for "DOCTOR 4" tab
4. These sheets are hidden but data preserved if needed later

### PART 3: Update "Clinic Totals" Formulas (15 minutes)

The "Clinic Totals" sheet aggregates all 5 doctor sheets. We need to update formulas to use 3 doctors only.

#### Find-and-Replace Method (Fastest):

1. Open "Clinic Totals" sheet
2. Press `Ctrl+H` (Windows) or `Cmd+Shift+H` (Mac) to open Find & Replace
3. Do these replacements IN ORDER:

**Replace #1:**
- Find: `DOCTOR 2`
- Replace with: `Dr. Saylor`
- Click "Replace all"
- Should update ~1000+ cells

**Replace #2:**
- Find: `DOCTOR 3`
- Replace with: `Dr. Zach`
- Click "Replace all"

**Replace #3:**
- Find: `DOCTOR 5`
- Replace with: `Dr. John`
- Click "Replace all"

**Remove Steph and DOCTOR 4 from formulas:**

Now we need to remove references to Steph and DOCTOR 4.

Example formula in Cell C2 currently looks like:
```
=sumif(Steph!$B$2:$B$1000,$B2,Steph!C$2:C$1000)+sumif('DOCTOR 2'!$B$2:$B$1000,$B2,'DOCTOR 2'!C$2:C$1000)+sumif('DOCTOR 3'!$B$2:$B$1000,$B2,'DOCTOR 3'!C$2:C$1000)+sumif('DOCTOR 4'!$B$2:$B$1000,$B2,'DOCTOR 4'!C$2:C$1000)+sumif('DOCTOR 5'!$B$2:$B$1000,$B2,'DOCTOR 5'!C$2:C$1000)
```

Should become:
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!C$2:C$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!C$2:C$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!C$2:C$1000)
```

**Manual Edit Required:**

For each column in "Clinic Totals" (Columns C through N), you need to:

1. Click on cell C2
2. Look at the formula bar
3. Delete the Steph portion:
   - Remove: `+sumif(Steph!$B$2:$B$1000,$B2,Steph!C$2:C$1000)`
4. Delete the DOCTOR 4 portion:
   - Remove: `+sumif('DOCTOR 4'!$B$2:$B$1000,$B2,'DOCTOR 4'!C$2:C$1000)`
5. Press Enter
6. Copy cell C2
7. Select C3:C1000 (drag down to row 1000)
8. Paste (Ctrl+V or Cmd+V)

Repeat this for columns D, E, F, G, H, I, J, K, L, M, N (12 columns total).

**Columns to update:**
- Column C: # of New Leads
- Column D: # of New Patient
- Column F: Active Care Presented
- Column G: Active Care Accepted
- Column I: Wellness Presented
- Column J: Wellness Accepted
- Column L: Regular Patient Visits
- Column N: Collections

(Columns E, H, K, M are formulas that reference other columns, they'll auto-update)

### PART 4: Update "WEEKLY" Sheet (10 minutes)

Same process as Clinic Totals:

1. Open "WEEKLY" sheet
2. Use Find & Replace:
   - `DOCTOR 2` → `Dr. Saylor`
   - `DOCTOR 3` → `Dr. Zach`
   - `DOCTOR 5` → `Dr. John`

3. Manually edit formulas in row 2 to remove Steph and DOCTOR 4 references
4. Copy row 2
5. Paste to rows 3-73

**Columns to update in WEEKLY:**
- Column C: # of New Leads
- Column D: # of New Patient
- Column F: Active Care Presented
- Column G: Active Care Accepted
- Column I: Wellness Presented
- Column J: Wellness Accepted
- Column L: Regular Patient Visits
- Column N: Collections

### PART 5: Update "DASHBOARD" Sheet (5 minutes)

1. Open "DASHBOARD" sheet
2. Check for any doctor name references
3. Use Find & Replace if needed
4. Update any dropdown filters that reference doctor names

### PART 6: Clear Old Data from Doctor Sheets (5 minutes)

Since DOCTOR 2, 3, 5 are now Dr. Saylor, Dr. Zach, Dr. John, they still have old placeholder data.

**Option 1: Keep sample data temporarily** (for testing sync)
- Leave the data as-is
- It will be replaced as real data comes in

**Option 2: Clear data now** (start fresh)
For each of Dr. Saylor, Dr. Zach, Dr. John sheets:
1. Open the sheet
2. Select rows 2-1000 (all data rows, not header)
3. Delete content (not rows themselves, just content)
4. Leave formulas in columns E, H, K, M (conversion %)

### PART 7: Test the Updates (10 minutes)

1. **Add test data:**
   - Go to Dr. Saylor sheet
   - In row 2, add:
     - Date: Today's date
     - New Leads: 10
     - New Patients: 5
     - Active Care Presented: 5
     - Active Care Accepted: 3
     - Regular Patient Visits: 50
     - Collections: 5000

2. **Check Clinic Totals:**
   - Go to Clinic Totals sheet
   - Find today's date row
   - Verify numbers match Dr. Saylor's entry

3. **Check WEEKLY:**
   - Go to WEEKLY sheet
   - Find current week number
   - Verify it includes Dr. Saylor's data

4. **If numbers don't appear:**
   - Check for formula errors (#REF!, #NAME?)
   - Verify sheet names have NO extra spaces
   - Verify formulas were updated correctly

### PART 8: Update Notion Person Properties (5 minutes)

In your Notion workspace:

1. Add workspace members (if they have Notion accounts):
   - Settings & Members → Invite Members
   - Add Dr. Saylor's email
   - Add Dr. Zach's email
   - Add Dr. John's email

2. **If they don't have Notion accounts** (simpler):
   - When using Person properties, just type their names
   - Notion will create "pseudo-members" you can assign to

---

## COMPLETE FORMULA TEMPLATES

For easy copy-paste when editing Clinic Totals:

### Column C Formula (# of New Leads):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!C$2:C$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!C$2:C$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!C$2:C$1000)
```

### Column D Formula (# of New Patient):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!D$2:D$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!D$2:D$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!D$2:D$1000)
```

### Column F Formula (Active Care Presented):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!F$2:F$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!F$2:F$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!F$2:F$1000)
```

### Column G Formula (Active Care Accepted):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!G$2:G$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!G$2:G$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!G$2:G$1000)
```

### Column I Formula (Wellness Presented):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!I$2:I$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!I$2:I$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!I$2:I$1000)
```

### Column J Formula (Wellness Accepted):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!J$2:J$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!J$2:J$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!J$2:J$1000)
```

### Column L Formula (Regular Patient Visits):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!L$2:L$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!L$2:L$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!L$2:L$1000)
```

### Column N Formula (Collections):
```
=sumif('Dr. Saylor'!$B$2:$B$1000,$B2,'Dr. Saylor'!N$2:N$1000)+sumif('Dr. Zach'!$B$2:$B$1000,$B2,'Dr. Zach'!N$2:N$1000)+sumif('Dr. John'!$B$2:$B$1000,$B2,'Dr. John'!N$2:N$1000)
```

---

## UPDATED SYNC CODE

Update the Google Apps Script doctor names array:

**Old:**
```javascript
const doctorSheets = ['Steph', 'DOCTOR 2', 'DOCTOR 3', 'DOCTOR 4', 'DOCTOR 5'];
```

**New:**
```javascript
const doctorSheets = ['Dr. Saylor', 'Dr. Zach', 'Dr. John'];
```

And in the sync functions:

**Old:**
```javascript
const doctors = ['Steph', 'DOCTOR 2', 'DOCTOR 3', 'DOCTOR 4', 'DOCTOR 5'];
```

**New:**
```javascript
const doctors = ['Dr. Saylor', 'Dr. Zach', 'Dr. John'];
```

---

## TROUBLESHOOTING

### Formula shows #REF! error
**Problem:** Sheet name not found
**Solution:** Check spelling of sheet names, ensure no extra spaces

### Formula shows #NAME? error
**Problem:** Syntax error in formula
**Solution:** Check that sheet names with spaces are in single quotes: `'Dr. Saylor'!`

### Numbers don't aggregate in Clinic Totals
**Problem:** Formula not updated or wrong cell references
**Solution:** Double-check column letters match (C→C, D→D, etc.)

### WEEKLY sheet shows zeros
**Problem:** WEEKLY formulas still reference old doctor names
**Solution:** Redo find-and-replace in WEEKLY sheet

---

## VERIFICATION CHECKLIST

- [ ] Backup created
- [ ] DOCTOR 2 renamed to Dr. Saylor
- [ ] DOCTOR 3 renamed to Dr. Zach
- [ ] DOCTOR 5 renamed to Dr. John
- [ ] Steph and DOCTOR 4 hidden (or removed if preferred)
- [ ] Clinic Totals formulas updated (8 columns)
- [ ] Clinic Totals tested with sample data
- [ ] WEEKLY formulas updated
- [ ] DASHBOARD checked and updated
- [ ] Notion Person properties updated
- [ ] Sync code doctor names array updated

---

## ESTIMATED TIME

- Backup: 2 minutes
- Rename sheets: 2 minutes
- Update Clinic Totals: 15 minutes
- Update WEEKLY: 10 minutes
- Test: 5 minutes
- **Total: ~35 minutes**

---

**After completing these updates, your Google Sheets will be ready for the Van Every Chiropractic team with Dr. Saylor, Dr. Zach, and Dr. John!** ✅
