# Van Every Integration Keys Update Checklist

**Date:** November 12, 2025
**Integrations:**
- Claude VE MCP (Python scripts)
- Van Every Daily Sync (Google Sheets sync)

---

## ✅ What You Need To Do

### 1. Get/Refresh Both Integration Keys

Go to https://www.notion.so/my-integrations

**Integration 1: Claude VE MCP**
- Used by: Python scripts (dashboard builders)
- Click "Show" (or "Refresh secret" for security)
- Copy the key

**Integration 2: Van Every Daily Sync**
- Used by: Google Sheets → Notion sync
- Click "Show" (or "Refresh secret" for security)
- Copy the key

---

### 2. Update `.env` File (Python Scripts)

Open: `P:\Dr. Zach\VE Notion\VE Notion\.env`

Replace line 2 with **Claude VE MCP** key:
```
NOTION_API_KEY=paste_claude_ve_mcp_key_here
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

**Replace with Van Every Daily Sync key:**
```javascript
NOTION_API_KEY: 'paste_van_every_daily_sync_key_here',
```

**This is used by:**
- Daily sync from Google Sheets "Clinic Totals" → Notion DAILY_STATS
- Runs automatically at 8pm every day

---

### 4. Verify Integrations Have Access to Required Databases

In Notion, make sure integrations are connected correctly:

**Van Every Daily Sync needs access to:**
- ✅ DAILY_STATS database (ID: 693c4a0a9a534b07a19be8981c7d6027)

**Claude VE MCP needs access to:**
- ✅ Tasks (ID: 2a380ff9d4f58138942bf525def45ba0)
- ✅ Projects (ID: 2a380ff9d4f581aab5e7ff996f31a40b)
- ✅ Business Goals (ID: 2a380ff9d4f58181897cee4255a9385b)
- ✅ Resources & Documents (ID: 2a380ff9d4f581e695a9cc090918e073)
- ✅ Meetings (ID: 2a380ff9d4f581468537e6e63fc6d0b6)
- ✅ Main Template page (2a380ff9-d4f5-817b-8a11-eca658f9a815)
- ✅ All 7 team member dashboards

**How to check:**
1. Open each database/page in Notion
2. Click "..." menu → "Connections"
3. Make sure the correct integration is listed
4. If not, click "Add connection" → Select the integration

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

- [ ] Get Claude VE MCP key from https://www.notion.so/my-integrations
- [ ] Get Van Every Daily Sync key from https://www.notion.so/my-integrations
- [ ] Update `.env` file with Claude VE MCP key (line 2)
- [ ] Update Google Apps Script with Van Every Daily Sync key (line 25)
- [ ] Verify Van Every Daily Sync connected to DAILY_STATS database
- [ ] Verify Claude VE MCP connected to all 5 databases + dashboards
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

## What Each Integration Does

**You have TWO integrations with different purposes:**

### Van Every Daily Sync:
- Reads from Google Sheets "Clinic Totals"
- Writes to DAILY_STATS database
- Runs automatically daily at 8pm
- Used by: Google Apps Script

### Claude VE MCP:
- Creates/updates team dashboards
- Manages 5 core databases (Tasks, Projects, etc.)
- Builds project structure
- Used by: Python scripts

### Future:
- Slack integration (will use one of these)
- Google Drive connections
- Notion Calendar sync

**Why two integrations?** Separation of concerns - if one breaks, the other still works!

---

## Questions?

**Q: Why two integrations instead of one?**
A: Best practice - separate concerns. Google Sheets sync only needs access to DAILY_STATS, while Python scripts need broader access. If one breaks, the other keeps working.

**Q: Can I use just one integration for everything?**
A: Yes, technically. But having two is cleaner and more secure (principle of least privilege).

**Q: What if I see "unauthorized" errors?**
A: Make sure:
1. You updated the key in both places
2. VHSD is connected to the database/page you're accessing
3. The key was copied correctly (no extra spaces)

**Q: Should I rotate/refresh the keys?**
A: Yes! Since the old key was exposed in git history (before we removed it), refresh both keys for security.

---

**Last Updated:** November 12, 2025
**Status:** Waiting for you to paste the new key in both locations
