# Van Every Notion Integrations - Quick Reference

**Last Updated:** November 12, 2025

---

## Your Two Integrations

| Integration Name | Used By | Database Access | Purpose |
|------------------|---------|-----------------|---------|
| **Van Every Daily Sync** | Google Apps Script | DAILY_STATS | Sync Google Sheets → Notion daily at 8pm |
| **Claude VE MCP** | Python scripts | Tasks, Projects, Meetings, Business Goals, Resources + Dashboards | Build/manage team dashboards & databases |

---

## Where Each Key Goes

### 1. Claude VE MCP Key
**File:** `.env` (line 2)
```bash
NOTION_API_KEY=your_claude_ve_mcp_key_here
```

**Used by:**
- `build_dashboards.py`
- `notion_client.py`
- All Python dashboard builders

---

### 2. Van Every Daily Sync Key
**File:** Google Apps Script → `READY_TO_USE_SYNC_CODE.js` (line 25)
```javascript
NOTION_API_KEY: 'your_van_every_daily_sync_key_here',
```

**Used by:**
- Google Sheets "Clinic Totals" → Notion DAILY_STATS sync
- Runs automatically every day at 8pm

---

## Quick Setup Steps

1. Go to https://www.notion.so/my-integrations
2. Get **Claude VE MCP** key → Paste in `.env` file
3. Get **Van Every Daily Sync** key → Paste in Google Apps Script
4. Test Python: `python notion_client.py`
5. Test Sheets: Run `testSync()` in Apps Script
6. Done! ✅

---

## Database Access Requirements

### Van Every Daily Sync Needs:
- DAILY_STATS database

### Claude VE MCP Needs:
- Tasks database
- Projects database
- Meetings database
- Business Goals database
- Resources & Documents database
- Main Template page
- All 7 team member dashboard pages

**To verify:** Open each in Notion → "..." menu → "Connections" → Make sure integration is listed

---

## Security Note

**NEVER commit API keys to git!**
- ✅ `.env` is in `.gitignore` (protected)
- ✅ Keys removed from documentation files
- ✅ Use placeholders in code examples
- ⚠️ If keys are exposed, rotate them immediately

---

## Troubleshooting

**"Unauthorized" error:**
- Check key is correct (no extra spaces)
- Verify integration has access to that database/page
- Refresh the integration's permissions in Notion

**Python script fails:**
- Make sure Claude VE MCP key is in `.env`
- Test: `python notion_client.py`

**Google Sheets sync fails:**
- Make sure Van Every Daily Sync key is in Apps Script line 25
- Test: Run `testSync()` function
- Check DAILY_STATS database has Van Every Daily Sync connection

---

**Get keys from:** https://www.notion.so/my-integrations
