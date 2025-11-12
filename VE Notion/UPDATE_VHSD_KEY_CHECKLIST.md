# VHSD Integration Key Update Checklist

**Date:** November 12, 2025
**Integration:** VHSD (your only Notion integration)

---

## ✅ What You Need To Do

### 1. Copy Your New VHSD Key
You already rotated the key at https://www.notion.so/my-integrations

**Copy the new key from the VHSD integration page**

---

### 2. Update `.env` File (Python Scripts)

Open: `P:\Dr. Zach\VE Notion\VE Notion\.env`

Replace line 2:
```
NOTION_API_KEY=PASTE_YOUR_NEW_VHSD_KEY_HERE
```

With:
```
NOTION_API_KEY=your_actual_new_key_here
```

**This is used by:**
- `build_dashboards.py`
- `notion_client.py`
- All Python scripts that access Notion

---

### 3. Update Google Apps Script (Google Sheets Sync)

**Location:** Your Google Sheet → Extensions → Apps Script

**File:** `READY_TO_USE_SYNC_CODE.js`

**Find line 25** (inside the CONFIG object):
```javascript
NOTION_API_KEY: 'YOUR_NOTION_API_KEY_HERE',
```

**Replace with:**
```javascript
NOTION_API_KEY: 'your_actual_new_key_here',
```

**This is used by:**
- Daily sync from Google Sheets "Clinic Totals" → Notion DAILY_STATS
- Runs automatically at 8pm every day

---

### 4. Verify VHSD Has Access to All Pages/Databases

In Notion, make sure VHSD integration is connected to:

**Databases:**
- ✅ DAILY_STATS (ID: 693c4a0a9a534b07a19be8981c7d6027)
- ✅ Tasks (ID: 2a380ff9d4f58138942bf525def45ba0)
- ✅ Projects (ID: 2a380ff9d4f581aab5e7ff996f31a40b)
- ✅ Business Goals (ID: 2a380ff9d4f58181897cee4255a9385b)
- ✅ Resources & Documents (ID: 2a380ff9d4f581e695a9cc090918e073)
- ✅ Meetings (ID: 2a380ff9d4f581468537e6e63fc6d0b6)

**Pages:**
- ✅ Main Template (2a380ff9-d4f5-817b-8a11-eca658f9a815)
- ✅ All 7 team member dashboards

**How to check:**
1. Open each database/page in Notion
2. Click "..." menu → "Connections"
3. Make sure "VHSD" is listed
4. If not, click "Add connection" → Select "VHSD"

---

### 5. Test Everything Works

**Test Python Scripts:**
```bash
cd "P:\Dr. Zach\VE Notion\VE Notion"
python notion_client.py
```
Should connect successfully without errors.

**Test Google Sheets Sync:**
1. Open Google Sheet
2. Extensions → Apps Script
3. Select `testSync` from dropdown
4. Click Run ▶️
5. Check logs - should see "✅ Daily sync completed successfully!"
6. Check Notion DAILY_STATS - should have today's data

---

## 📋 Checklist Summary

- [ ] Copy new VHSD key from https://www.notion.so/my-integrations
- [ ] Update `.env` file (line 2)
- [ ] Update Google Apps Script (line 25)
- [ ] Verify VHSD connected to all 6 databases
- [ ] Verify VHSD connected to all pages
- [ ] Test Python scripts work
- [ ] Test Google Sheets sync works
- [ ] Commit and push to GitHub

---

## After Everything Works

### Commit and Push to GitHub

```bash
cd "P:\Dr. Zach\VE Notion\VE Notion"

# Check what's changed
git status

# Commit .env changes (if you want to track the comment changes)
# NOTE: .env is in .gitignore so your actual key won't be committed
git add .env
git commit -m "Update .env comments for VHSD integration"

# Now push all previous commits to GitHub
# First, allow the secret on GitHub:
# Go to: https://github.com/drzachconner/VE-Notion/security/secret-scanning/unblock-secret/35LwB0ZgyUc9q9BqcFI1xDS07M2
# Click "Allow secret"

# Then push:
git push origin main
```

---

## What VHSD Does

**VHSD is your ONE integration that handles:**

1. **Google Sheets → Notion Sync**
   - Reads from "Clinic Totals" sheet
   - Writes to DAILY_STATS database
   - Runs daily at 8pm

2. **Python Dashboard Builders**
   - Creates/updates team dashboards
   - Manages 5 core databases
   - Builds project structure

3. **Future Integrations**
   - Slack → Notion (when implemented)
   - Google Drive connections
   - Notion Calendar sync

**You DO NOT need multiple integrations.** VHSD handles everything.

---

## Questions?

**Q: Why did the .env say "Claude VE MCP"?**
A: That was an old/incorrect comment. It's always been VHSD.

**Q: Do I need to create separate integrations for different features?**
A: No! One integration (VHSD) can access multiple databases and pages. Just make sure it's connected to all the pages/databases you need.

**Q: What if I see "unauthorized" errors?**
A: Make sure:
1. You updated the key in both places
2. VHSD is connected to the database/page you're accessing
3. The key was copied correctly (no extra spaces)

**Q: Can I rename VHSD to something clearer?**
A: Yes! In Notion integrations settings, you can rename it to "Van Every Integration" or whatever makes sense. The key stays the same.

---

**Last Updated:** November 12, 2025
**Status:** Waiting for you to paste the new key in both locations
