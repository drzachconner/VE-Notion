# Quick Start Guide

> **Get up and running in 10 minutes**

---

## 🎯 Goal

Build 6 individual team member dashboards for Van Every Family Chiropractic Center.

---

## ⚡ 3-Step Setup

### Step 1: Get Notion API Key (2 minutes)

1. Visit https://www.notion.so/my-integrations
2. Create new integration: `VE Chiro Dashboard Builder`
3. Copy the token (starts with `secret_`)

### Step 2: Configure Project (2 minutes)

```bash
# Create .env file
cp .env.example .env

# Edit .env and paste your token
nano .env
```

Add your token:
```
NOTION_API_KEY=secret_your_token_here
```

### Step 3: Share Pages (3 minutes)

In Notion, share these pages with your integration:

1. **All individual dashboards** (7 pages)
2. **Main Template** page
3. **Project Tracker** page
4. **Databases Backend** page

To share: Open page → "..." → "Add connections" → Select integration

---

## 🚀 Build Dashboards

### Install Dependencies

```bash
pip3 install -r requirements.txt
```

### Test Connection

```bash
python3 notion_client.py
```

Should see: `✓ Notion client initialized successfully`

### Build All Dashboards

```bash
python3 build_dashboards.py
```

**This creates:**
- Dr. Saylor's Dashboard
- Dr. John's Dashboard
- Lou Ann's Dashboard
- Christina's Dashboard
- Tricia's Dashboard
- Windy's Dashboard

**Time:** ~2-3 minutes

---

## 📋 Manual Steps (Required)

After the script finishes, you need to add linked database views manually for each dashboard.

### For EACH Dashboard (~15 minutes per dashboard):

#### 1. Add Task Count Card
Under "This Week at a Glance":
1. Create 3-column layout
2. Add callout: "MY TASKS" + count
3. Repeat for "MY MEETINGS" and "MY PROJECTS"

#### 2. Add Performance Metrics
Under "My Performance Metrics":
1. Create 3-column layout
2. Add tracking cards for goals, tasks, milestones

#### 3. Add Tasks Database View
Under "My Tasks":
1. Type `/linked database`
2. Select "Tasks" database
3. Filter: `Assigned To → Contains → [Name]`

#### 4. Add Meetings Database View
Under "My Meetings":
1. Type `/linked database`
2. Select "Meetings" database
3. Filter: `Attendees → Contains → [Name]`

#### 5. Add Projects Database View
Under "My Projects":
1. Type `/linked database`
2. Select "Projects" database
3. Filter: `Team Members → Contains → [Name]`

#### 6. Update Quick Links
Replace placeholder text with actual links to databases

---

## ✅ Completion Checklist

Phase 3:
- [ ] All 6 dashboards built via script
- [ ] Manual database views added to all dashboards
- [ ] Quick links updated
- [ ] Team members can access dashboards
- [ ] Filters work correctly
- [ ] Project Tracker updated

---

## 📚 Full Documentation

- **SETUP.md** - Detailed setup instructions
- **MANUAL_STEPS.md** - Complete manual step instructions
- **PROJECT_TRACKER.md** - Phase tracking and progress
- **README.md** - Full project documentation

---

## 🆘 Common Issues

### "API key not found"
- Check `.env` file exists
- Verify token is correct format: `NOTION_API_KEY=secret_...`

### "Error retrieving page"
- Share the page with your integration
- Verify page ID in config.json

### "Can't find database to link"
- Share database page with integration
- Refresh Notion page

---

## 🎯 Next Steps

1. Complete manual steps for all 6 dashboards (~2 hours)
2. Test with team members
3. Update Project Tracker
4. Move to Phase 4: Chiropractic-Specific Features

---

**Ready to build?**

```bash
python3 build_dashboards.py
```

Then open `MANUAL_STEPS.md` for the rest! 🚀
