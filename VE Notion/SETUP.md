# Setup Guide - Van Every Chiropractic Dashboard

> **Step-by-step instructions to get started**

---

## ⚡ Quick Setup (5 minutes)

### 1. Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Name it: `VE Chiro Dashboard Builder`
4. Select your workspace
5. Click **"Submit"**
6. Copy the **"Internal Integration Token"** (starts with `secret_`)

### 2. Configure Project

```bash
# Navigate to project directory
cd "/Users/zachconnermba/Library/Mobile Documents/com~apple~CloudDocs/Documents/Cursor/VE Notion"

# Create .env file from template
cp .env.example .env

# Edit .env file and paste your token
nano .env  # or use any text editor
```

In `.env`, replace `your_notion_integration_token_here` with your actual token:
```
NOTION_API_KEY=secret_your_actual_token_here
```

### 3. Share Notion Pages with Integration

For EACH of these pages in Notion:

- **Project Tracker**: https://www.notion.so/2a380ff9d4f58134a8dbdaf4051913c8
- **Main Template**: https://www.notion.so/2a380ff9d4f5817b8a11eca658f9a815
- **Dr. Zach's Prototype**: https://www.notion.so/2a380ff9d4f5816b891bcd522e7fff7d
- **Databases Backend**: https://www.notion.so/2a380ff9d4f5811bbeecd32ec64c52c3
- **All 7 Individual Dashboards** (see config.json)

Do this:
1. Open the page in Notion
2. Click **"..."** (three dots) in top-right
3. Click **"Add connections"**
4. Select **"VE Chiro Dashboard Builder"**
5. Click **"Confirm"**

### 4. Install Python Dependencies

```bash
# Install required packages
pip3 install -r requirements.txt
```

### 5. Test Connection

```bash
# Test that everything works
python3 notion_client.py
```

You should see:
```
✓ Notion client initialized successfully
Testing connection by retrieving project tracker...
✓ Successfully retrieved page: [URL]
```

---

## 🚀 Usage

### Build All Individual Dashboards (Phase 3)

```bash
# Build 6 remaining dashboards (skips Dr. Zach's prototype)
python3 build_dashboards.py
```

**What this does:**
- Builds dashboards for: Dr. Saylor, Dr. John, Lou Ann, Christina, Tricia, Windy
- Adds structure, sections, and placeholder instructions
- Sets page titles and icons

**What you need to do manually:**
- Add linked database views (see MANUAL_STEPS.md)
- This takes ~15-20 minutes per dashboard

### Preview Phase 4 Features

```bash
# Generate Phase 4 block structures
python3 phase4_builder.py
```

**What this does:**
- Creates block structures for 6 chiropractic-specific pages
- Provides instructions for creating pages in Notion

### Clear and Rebuild (CAUTION!)

```bash
# WARNING: This deletes all existing content!
python3 build_dashboards.py --clear
```

Only use this if you want to start fresh.

---

## 📝 Post-Build Steps

After running `build_dashboards.py`:

### 1. Complete Manual Database Views (Required)

See `MANUAL_STEPS.md` for detailed instructions.

For each dashboard, add:
- [ ] "This Week at a Glance" metric cards
- [ ] "My Performance Metrics" tracking cards
- [ ] "My Tasks" linked database view
- [ ] "My Meetings" linked database view
- [ ] "My Projects" linked database view
- [ ] Quick Links updates

**Time estimate:** 15-20 minutes per dashboard × 6 dashboards = ~2 hours

### 2. Update Main Dashboard

1. Open Main Template: https://www.notion.so/2a380ff9d4f5817b8a11eca658f9a815
2. Find the team member cards section
3. Update each card to link to the corresponding dashboard
4. Test that all links work

### 3. Update Project Tracker

1. Open Project Tracker: https://www.notion.so/2a380ff9d4f58134a8dbdaf4051913c8
2. Mark Phase 3 as ✅ Complete
3. Add completion date
4. Add any notes about customizations made

### 4. Team Onboarding

1. Share dashboards with team members
2. Give brief tour of features
3. Help customize "Today's Focus" sections
4. Answer questions

---

## 🔧 Troubleshooting

### Error: "Notion API key not found"

**Solution:**
```bash
# Check that .env file exists
ls -la .env

# Check that it contains your key
cat .env

# Make sure it's in the format:
# NOTION_API_KEY=secret_your_token_here
```

### Error: "Error retrieving page [page_id]"

**Possible causes:**
1. Page ID in `config.json` is incorrect
2. Page not shared with integration
3. Integration doesn't have permissions

**Solution:**
1. Verify page ID matches the URL (last part after last `/`)
2. Share page with integration (see Step 3 above)
3. Recreate integration with proper permissions

### Error: "Error appending blocks"

**Possible causes:**
1. Rate limiting (too many requests too fast)
2. Invalid block structure
3. Malformed data

**Solution:**
1. Wait 1-2 minutes and try again
2. Check Notion API status: https://status.notion.so/
3. Review error message for specific block type

### Error: "ModuleNotFoundError: No module named 'notion_client'"

**Solution:**
```bash
# Reinstall dependencies
pip3 install -r requirements.txt

# Or install directly
pip3 install notion-client python-dotenv requests
```

### "I can't find the database to link"

**Solution:**
Make sure the database page is shared with your integration:
1. Open the database page (e.g., Tasks database)
2. Click "..." → "Add connections"
3. Select your integration

### "The script completed but I don't see changes in Notion"

**Solution:**
1. Refresh the Notion page (Cmd/Ctrl + R)
2. Check that you're looking at the correct page
3. Verify script output shows success messages
4. Check Notion app vs. web (try both)

### "I want to undo changes"

**Solution:**
1. Use Notion's page history:
   - Click "..." → "Page history"
   - Restore to previous version
2. Or use the `--clear` flag to rebuild from scratch

---

## 🎓 Best Practices

### 1. Test First

Always test on one dashboard before running for all:

```python
# Edit build_dashboards.py temporarily
# Comment out other team members, test with one
```

### 2. Backup Pages

Before major changes:
1. Duplicate important pages in Notion
2. Name them with date: "Main Dashboard BACKUP 2025-11-06"

### 3. Incremental Changes

Build in phases:
1. Phase 3: Individual dashboards
2. Manual database views
3. Team testing
4. Phase 4: Chiropractic features

### 4. Version Control

Track your changes:
```bash
# Create a git repository (optional)
git init
git add .
git commit -m "Initial setup"
```

### 5. Documentation

Keep notes:
- What customizations you made
- Which team members have which permissions
- Any issues encountered

---

## 📚 File Guide

| File | Purpose |
|------|---------|
| `README.md` | Project overview and reference |
| `SETUP.md` | **This file** - Setup instructions |
| `MANUAL_STEPS.md` | Manual steps after automation |
| `PROJECT_TRACKER.md` | Phase tracking and progress |
| `config.json` | Page IDs and configuration |
| `.env` | Your API key (DO NOT COMMIT) |
| `notion_client.py` | Notion API wrapper |
| `dashboard_blocks.py` | Block templates |
| `build_dashboards.py` | Main dashboard builder |
| `phase4_builder.py` | Phase 4 features |

---

## 🎯 What's Next?

After setup is complete:

1. ✅ **Complete Phase 3**
   - Run `build_dashboards.py`
   - Complete manual steps
   - Test all dashboards

2. 🎯 **Begin Phase 4**
   - Review Phase 4 plan
   - Create chiropractic-specific pages
   - Run `phase4_builder.py`

3. 🤖 **Future Phases**
   - Phase 5: Automation & Intelligence
   - Phase 6: Collaboration
   - Phase 7: Visual Polish
   - Phase 8: Mobile Optimization

---

## 🆘 Need Help?

1. Check `MANUAL_STEPS.md` for manual instructions
2. Review `PROJECT_TRACKER.md` for phase details
3. Check Notion API docs: https://developers.notion.com/
4. Review error messages carefully
5. Check Notion integration settings

---

## 🔒 Security Notes

### DO NOT:
- ❌ Commit `.env` file to git
- ❌ Share your API token publicly
- ❌ Screenshot/copy token to insecure locations

### DO:
- ✅ Keep `.env` file local only
- ✅ Regenerate token if exposed
- ✅ Use `.gitignore` to exclude sensitive files
- ✅ Limit integration permissions to necessary pages only

---

**Setup Complete?** Move on to building dashboards! 🚀

```bash
python3 build_dashboards.py
```

Then follow `MANUAL_STEPS.md` to finish Phase 3.
