# Setup Guide - Van Every Task & Project Management

> **Step-by-step instructions to get your team management system running**

---

## ⚡ Quick Setup (5 minutes)

### 1. Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Name it: `VE Task Management Builder`
4. Select your workspace
5. Click **"Submit"**
6. Copy the **"Internal Integration Token"** (starts with `secret_`)

### 2. Configure Project

```bash
# Navigate to project directory
cd "/Users/zacharyrilesconnerdc/Library/Mobile Documents/com~apple~CloudDocs/Documents/Cursor/VE Notion"

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

For EACH of these pages in Notion, you need to give your integration access:

- **Main Template** (workspace page)
- **All 7 Individual Team Dashboards** (see config.json for IDs)
- **Tasks Database**
- **Projects Database**
- **Meetings Database**

For each page:
1. Open the page in Notion
2. Click **"..."** (three dots) in top-right
3. Click **"Add connections"**
4. Select your integration (e.g., "VE Task Management Builder")
5. Click **"Confirm"**

### 4. Install Python Dependencies

```bash
# Install required packages
pip3 install -r requirements.txt
```

### 5. Test Connection

```bash
# Test that everything works
python3 ve_notion_client.py
```

You should see:

```
✓ Notion client initialized successfully
Testing connection by retrieving project tracker...
✓ Successfully retrieved page: [URL]
```

---

## 🚀 Build Team Dashboards

### Build Individual Dashboards for All Team Members

```bash
# Build 6 dashboards (skips Dr. Zach's prototype)
python3 build_dashboards.py
```

**What this does:**
- Builds dashboards for: Dr. Saylor, Dr. John, Lou Ann, Christina, Tricia, Wendy
- Adds structure, sections, and placeholder instructions
- Sets page titles and icons

**What you need to do manually:**
- Add linked database views (see MANUAL_STEPS.md)
- This takes ~15-20 minutes per dashboard

### Include Dr. Zach's Dashboard

```bash
# Build all 7 dashboards including Dr. Zach
python3 build_dashboards.py --include-dr-zach
```

### Clear and Rebuild (CAUTION!)

```bash
# WARNING: This deletes all existing content!
python3 build_dashboards.py --clear
```

⚠️ Only use this if you want to start completely fresh. This will delete all existing content from the dashboards.

---

## 📝 Post-Build Steps

After running `build_dashboards.py` successfully:

### 1. Complete Manual Database Views (Required)

**The Notion API cannot create linked database views**, so you must add them manually.

See `MANUAL_STEPS.md` for detailed step-by-step instructions.

For each team member's dashboard, add:

- [ ] "My Tasks" linked database view (filtered to that team member)
- [ ] "My Meetings" linked database view (filtered to that team member)
- [ ] "My Projects" linked database view (filtered to that team member)
- [ ] Customize "Today's Focus" priorities
- [ ] Update Quick Links with actual page links

**Time estimate:** 15-20 minutes per dashboard × 6-7 dashboards = ~2 hours

### 2. Test Everything

For each dashboard:

1. Open the dashboard in Notion
2. Verify the linked database views show correct data
3. Test filters (each person should only see their tasks/meetings/projects)
4. Click through Quick Links to ensure they work
5. Have the team member customize their "Today's Focus" section

### 3. Team Onboarding

1. Share dashboard links with each team member
2. Give a brief 5-minute tour:
   - How to add tasks
   - How to update task status
   - How to set priorities
   - Where to find their meetings and projects
3. Encourage them to use it for 1 week and provide feedback

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
3. Check integration permissions at https://www.notion.so/my-integrations

### Error: "Error appending blocks"

**Possible causes:**
1. Rate limiting (too many requests too fast)
2. Invalid block structure
3. Network issues

**Solution:**
1. Wait 1-2 minutes and try again
2. Check Notion API status: https://status.notion.so/
3. Review error message for specific block type that failed

### Error: "ModuleNotFoundError: No module named 'notion_client'"

**Solution:**

```bash
# Reinstall dependencies
pip3 install -r requirements.txt

# Or install directly
pip3 install notion-client python-dotenv
```

### "I can't find the database to link in Notion"

**Solution:**

Make sure the database page is shared with your integration:

1. Find the database in Notion (Tasks, Projects, or Meetings)
2. Open the database page
3. Click "..." → "Add connections"
4. Select your integration
5. Click "Confirm"

Now try creating the linked view again.

### "The script completed but I don't see changes in Notion"

**Solution:**

1. Refresh the Notion page (Cmd/Ctrl + R)
2. Check that you're looking at the correct page
3. Verify script output shows success messages (✓)
4. Try both Notion desktop app and web browser

### "I want to undo changes"

**Solution:**

1. Use Notion's page history:
   - Open the page
   - Click "..." → "Page history"
   - Select a previous version
   - Click "Restore"
2. Or use the `--clear` flag to rebuild from scratch

---

## 🎓 Best Practices

### 1. Test First

Always test on one dashboard before running for all team members:

```python
# Option: Edit config.json temporarily and comment out other team members
# Test with one dashboard first
```

### 2. Backup Important Pages

Before making major changes:

1. Duplicate important pages in Notion
2. Name them with a date: "Main Dashboard BACKUP 2025-11-13"

### 3. Start Simple

Build the basic structure first:

1. ✅ Build dashboards with Python script
2. ✅ Add manual database views
3. ✅ Get team using it for 1-2 weeks
4. ⏳ Collect feedback
5. ⏳ Add improvements based on actual usage

### 4. Version Control (Optional)

Track your changes with git:

```bash
# Initialize git repository
git init

# Add files (will exclude .env automatically via .gitignore)
git add .

# Commit
git commit -m "Initial setup complete"
```

### 5. Keep Documentation Updated

When you customize the system:

- Update `config.json` with any new team members
- Note what manual customizations you made
- Document any issues you encountered

---

## 📚 File Guide

| File | Purpose |
|------|---------|
| `README.md` | Project overview and quick reference |
| `SETUP.md` | **This file** - Detailed setup instructions |
| `MANUAL_STEPS.md` | Manual steps for database views (Notion API limitation) |
| `config.json` | Team members, page IDs, database IDs |
| `.env` | Your Notion API key (DO NOT COMMIT TO GIT) |
| `ve_notion_client.py` | Notion API client wrapper |
| `dashboard_blocks.py` | Dashboard block templates |
| `build_dashboards.py` | Main dashboard builder script |
| `requirements.txt` | Python dependencies |
| `Google_Sheets_Automation_Script.js` | (Future) Google Sheets sync |

---

## 🔒 Security Notes

### DO NOT:

- ❌ Commit `.env` file to git
- ❌ Share your API token publicly
- ❌ Screenshot/copy token to insecure locations
- ❌ Give integration access to unrelated Notion pages

### DO:

- ✅ Keep `.env` file local only
- ✅ Regenerate token if accidentally exposed
- ✅ Use `.gitignore` to exclude `.env` (already configured)
- ✅ Only give integration access to pages it needs

---

## 🎯 Next Steps After Setup

1. **Complete the manual database views** (see MANUAL_STEPS.md)
2. **Test with your team for 1-2 weeks**
3. **Collect feedback** - What's working? What's not?
4. **Iterate and improve** based on actual usage
5. **(Future) Add Google Sheets sync** for practice metrics

---

## 🆘 Need More Help?

1. Check `MANUAL_STEPS.md` for detailed manual instructions
2. Review Notion API docs: https://developers.notion.com/
3. Check Notion API status: https://status.notion.so/
4. Review error messages carefully - they usually tell you what's wrong
5. Test your integration permissions in Notion settings

---

**Setup Complete?** Ready to build dashboards! 🚀

```bash
python3 build_dashboards.py
```

Then follow `MANUAL_STEPS.md` to complete the setup.
