# Notion API Version Assessment & Upgrade Plan

**Date:** November 12, 2025
**Current API Version:** 2022-06-28
**Latest API Version:** 2025-09-03
**Status:** ⚠️ ACTION RECOMMENDED (Not Urgent)

---

## Current State

### Your Code Uses:
- **API Version:** `2022-06-28` (in all JavaScript files)
- **Python SDK:** `notion-client==2.2.1`
- **Endpoints:** `/v1/databases/` (old style)
- **Database Access:** Using `database_id` parameter

### Files Affected:
1. `READY_TO_USE_SYNC_CODE.js` (Google Sheets sync)
2. `FINAL_SYNC_CODE_VAN_EVERY.js` (archive)
3. `SIMPLE_SYNC_CODE_NO_PHI.js` (archive)
4. All Python scripts (`ve_notion_client.py`, etc.)

---

## What Changed in 2025-09-03

### Major Breaking Change:
**Multi-Source Databases** - Notion now allows databases to have multiple data sources.

**Impact:**
- `database_id` → `data_source_id` for some operations
- Endpoints moved: `/v1/databases/` → `/v1/data_sources/`
- Search API filter changes
- Webhook event renaming

### ⚠️ Important Note:
**This only affects multi-source databases** - if you're using traditional single-source databases (which you are), the old API version still works!

---

## Do You Need to Upgrade?

### Short Answer: Not Immediately, But Plan For It

**Why you can wait:**
- ✅ You're using single-source databases (traditional setup)
- ✅ Your current code works fine
- ✅ No sunset date announced yet
- ✅ Notion typically supports old API versions for 6-12 months

**Why you should upgrade eventually:**
- ⚠️ You're on a 3+ year old API version (2022-06-28)
- ⚠️ Eventually will be deprecated
- ⚠️ Missing new features
- ⚠️ Better to upgrade proactively than reactively

### Recommendation:
**Upgrade within the next 2-3 months** when you have time to test thoroughly.

---

## Are You Using Multi-Source Databases?

**Check this to be sure:**

1. Open any of your databases in Notion (Tasks, Projects, etc.)
2. Look at the database menu (three dots)
3. If you see "Data sources" or "Add data source" → You're using multi-source
4. If you don't see this → You're using single-source (traditional)

**Most likely:** You're using single-source databases, so the breaking changes don't affect you yet.

---

## Upgrade Plan (When You're Ready)

### Phase 1: Update API Version (Low Risk)

For now, you can safely upgrade to a newer version that's **before** 2025-09-03 to get security updates without breaking changes.

**Recommended intermediate version:** `2022-06-28` → `2024-10-15` (hypothetical, check Notion docs for actual stable versions)

### Phase 2: Prepare for 2025-09-03 (Future)

When you're ready for the full upgrade:

#### JavaScript Files (Google Apps Script)

**Current:**
```javascript
const CONFIG = {
  NOTION_VERSION: '2022-06-28',
  // ...
};
```

**Upgrade to:**
```javascript
const CONFIG = {
  NOTION_VERSION: '2025-09-03',
  // ...
};
```

**Changes needed IF using multi-source:**
```javascript
// OLD way:
const payload = {
  parent: { database_id: CONFIG.DAILY_STATS_DATABASE_ID },
  properties: { /* ... */ }
};

// NEW way (if multi-source):
const payload = {
  parent: { data_source_id: CONFIG.DAILY_STATS_DATA_SOURCE_ID },
  properties: { /* ... */ }
};

// Query endpoint OLD:
const url = `https://api.notion.com/v1/databases/${database_id}/query`;

// Query endpoint NEW (if multi-source):
const url = `https://api.notion.com/v1/data_sources/${data_source_id}/query`;
```

#### Python Files

**Current:**
```python
# requirements.txt
notion-client==2.2.1
```

**Check for updates:**
```bash
pip install --upgrade notion-client
```

**Python SDK changes** (if upgrading):
```python
# OLD:
db = client.databases.retrieve(database_id=db_id)

# NEW (if multi-source):
ds = client.data_sources.retrieve(data_source_id=ds_id)
```

---

## Testing Plan (When You Upgrade)

### 1. Test Google Sheets Sync
```javascript
// In Apps Script:
function testSyncWithNewVersion() {
  // Run testSync() and verify:
  // 1. Data still syncs to DAILY_STATS
  // 2. No errors in logs
  // 3. Formulas still calculate
}
```

### 2. Test Python Scripts
```bash
# Test database access
python check_database_structure.py

# Test dashboard building
python build_dashboards.py --test

# Verify all databases accessible
python ve_notion_client.py
```

### 3. Verify in Notion
- [ ] All databases still accessible
- [ ] Data syncing correctly
- [ ] Dashboards render properly
- [ ] No broken relations

---

## Migration Checklist (Future)

When you decide to upgrade to 2025-09-03:

### Pre-Migration
- [ ] Read full upgrade guide: https://developers.notion.com/docs/upgrade-guide-2025-09-03
- [ ] Confirm you're using single-source databases (not multi-source)
- [ ] Backup your Notion workspace
- [ ] Test in a duplicate workspace first

### Migration Steps
- [ ] Update Python SDK: `pip install --upgrade notion-client`
- [ ] Update API version in all JavaScript files
- [ ] IF using multi-source: Update `database_id` → `data_source_id`
- [ ] IF using multi-source: Update endpoints
- [ ] Update any webhook subscriptions
- [ ] Run all test scripts

### Post-Migration
- [ ] Test Google Sheets sync (run manually)
- [ ] Test Python dashboard builders
- [ ] Monitor for 1 week for issues
- [ ] Document any new features you can use

---

## Immediate Actions (Optional)

If you want to be proactive right now:

### 1. Add API Version to Python Scripts

Currently your Python scripts don't explicitly set the API version. Add it:

```python
# ve_notion_client.py
from notion_client import Client

class VENotionClient:
    def __init__(self, api_key: str, api_version: str = "2022-06-28"):
        self.client = Client(
            auth=api_key,
            notion_version=api_version  # Add this
        )
```

### 2. Create Version Config

```python
# config.py (new file)
NOTION_API_VERSION = "2022-06-28"  # Easy to update later
```

### 3. Update JavaScript Config

Make API version more prominent:

```javascript
const CONFIG = {
  // API Configuration
  NOTION_VERSION: '2022-06-28',  // TODO: Upgrade to 2025-09-03 by Q1 2026
  NOTION_API_KEY: 'YOUR_KEY_HERE',
  // ...
};
```

---

## Questions & Answers

### Q: Will my code break if I don't upgrade?
A: Not immediately. Notion typically supports old API versions for 6-12 months after a new version is released. But you should plan to upgrade.

### Q: Can I upgrade just the Python scripts or just the JavaScript?
A: Yes! They're independent. But keeping them on the same version is cleaner.

### Q: What if I have multi-source databases?
A: You'll need to update all `database_id` references to `data_source_id` and change endpoints. This is a bigger migration.

### Q: How do I check what API version I'm using in Notion?
A: It's set in your code (the `Notion-Version` header). Notion's dashboard doesn't show this.

### Q: Should I upgrade to 2025-09-03 right now?
A: Only if you need multi-source database features. Otherwise, wait 1-2 months and upgrade when you have time to test.

---

## Recommended Timeline

**Now:**
- ✅ Understand the changes
- ✅ Confirm you're using single-source databases
- ✅ Add API version to Python scripts for clarity

**Next 1-2 months:**
- 📅 Schedule time for upgrade (2-3 hours)
- 📅 Test in duplicate workspace
- 📅 Upgrade production when ready

**Before Q2 2026:**
- 🎯 Must be on 2025-09-03 or newer
- 🎯 Monitor Notion's deprecation announcements

---

## Resources

- [Notion API Version 2025-09-03 Upgrade Guide](https://developers.notion.com/docs/upgrade-guide-2025-09-03)
- [Notion API Versioning Policy](https://developers.notion.com/reference/versioning)
- [Python SDK Changelog](https://github.com/ramnes/notion-sdk-py/releases)

---

## Summary

**Current Status:** ✅ Your code works fine on `2022-06-28`

**Risk Level:** 🟡 Low-Medium (old version, but not broken)

**Action Required:** Plan upgrade within 2-3 months

**Urgency:** Not immediate, but don't delay indefinitely

**Estimated Effort:** 2-3 hours for testing and updates

---

**Last Updated:** November 12, 2025
**Next Review:** January 2026
