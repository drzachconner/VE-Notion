# Van Every Family Chiropractic - Task & Project Management System

> **Simple team task and project tracking for small practice teams**

## 🎯 What This Is

A basic task and project management system built on Notion for Van Every Family Chiropractic Center in Royal Oak, MI. Helps a team of 7 stay organized with:

- **Task tracking** - Who's doing what, by when, and what's the status
- **Project management** - Group related tasks together by project
- **Team visibility** - Individual dashboards so everyone sees their work + team overview
- **Google Sheets sync** - (Future) Import practice metrics from Google Sheets into dashboards

## 🏥 Team

- Dr. Zach (Owner)
- Dr. Saylor
- Dr. John
- Lou Ann (Staff)
- Christina (Staff)
- Tricia (Staff)
- Wendy (Staff)

## 📦 What's Included

### Core Components

```
VE Notion/
├── ve_notion_client.py           # Notion API client
├── build_dashboards.py           # Creates individual team dashboards
├── dashboard_blocks.py           # Dashboard block templates
├── config.json                   # Team members & database IDs
├── requirements.txt              # Python dependencies
├── Google_Sheets_Automation_Script.js  # (Future) Sheets sync
├── Google_Sheets_Import/         # Example CSV templates
├── README.md                     # This file
├── SETUP.md                      # Setup instructions
└── MANUAL_STEPS.md              # Post-build manual steps
```

### Notion Databases

1. **Tasks** - Task assignments, due dates, status, priority
2. **Projects** - Projects with related tasks and team assignments
3. **Meetings** - Team meetings and events

### Individual Dashboards

Each team member gets their own dashboard with:

- **Today's Focus** - Top 3 daily priorities
- **My Tasks** - Filtered view of assigned tasks
- **My Meetings** - Calendar of their meetings
- **My Projects** - Projects they're working on
- **Quick Links** - Shortcuts to important resources

## 🚀 Quick Start

### 1. Prerequisites

- Python 3.8 or higher
- Notion account with API access
- Notion integration created at https://www.notion.so/my-integrations

### 2. Installation

```bash
# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Add your Notion API key to .env
# NOTION_API_KEY=secret_your_key_here
```

### 3. Build Team Dashboards

```bash
# Build dashboards for all 6 team members (skips Dr. Zach's prototype)
python build_dashboards.py

# Include Dr. Zach's dashboard
python build_dashboards.py --include-dr-zach
```

### 4. Complete Manual Steps

The Notion API **cannot** create linked database views. After running the build script, follow the instructions in `MANUAL_STEPS.md` to:

- Add linked database views to each dashboard
- Set up filters (e.g., "My Tasks" filtered to each team member)
- Customize priorities

**Time estimate:** 15-20 minutes per dashboard (~2 hours total)

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions with troubleshooting
- **[MANUAL_STEPS.md](MANUAL_STEPS.md)** - Step-by-step manual configuration
- **[config.json](config.json)** - Team member info and database IDs

## 🔧 Usage Examples

### Build all dashboards (skip Dr. Zach)
```bash
python build_dashboards.py
```

### Build all dashboards including Dr. Zach
```bash
python build_dashboards.py --include-dr-zach
```

### Clear existing content and rebuild (CAUTION!)
```bash
python build_dashboards.py --clear
```

### Test API connection
```bash
python ve_notion_client.py
```

## ⚠️ Notion API Limitations

The Notion API **CANNOT** create:

- ❌ Linked database views
- ❌ Inline database views
- ❌ Some advanced block types

These must be added manually in Notion after running the build script. See `MANUAL_STEPS.md` for detailed instructions.

## 🔮 Future Plans

### Next Phase: Google Sheets Sync

Once task and project management is working well, we'll add sync capabilities to pull practice statistics from Google Sheets (ChiroTouch metrics like new patients, collections, visit data) into Notion dashboards.

## 🛠️ Troubleshooting

### "Notion API key not found"
- Make sure you created `.env` file from `.env.example`
- Check that `NOTION_API_KEY` is set correctly in `.env`

### "Error retrieving page"
- Verify the page ID in `config.json` is correct
- Make sure you shared the page with your integration in Notion
- Check that the integration has proper permissions

### "Error appending blocks"
- Some blocks may have invalid structure
- Check Notion API documentation for block requirements
- You may be hitting rate limits - wait a moment and try again

## 📚 Resources

- [Notion API Documentation](https://developers.notion.com/)
- [notion-sdk-py GitHub](https://github.com/ramnes/notion-sdk-py)

## 🔒 Security

- Never commit your `.env` file to git
- Keep your Notion API key private
- The `.gitignore` file is configured to exclude `.env` automatically

## 📄 License

Private project for Van Every Family Chiropractic Center.

---

**Last Updated:** November 13, 2025  
**Current Focus:** Basic task & project management for 7-person team  
**Next Step:** Validate system works, then add Google Sheets sync for practice metrics

---

## 💡 Philosophy

**Keep it simple.** This is deliberately focused on just task and project tracking. No fancy automation, no complex integrations (yet), no feature creep.

Once this works and the team is using it, we can add more. But not before.
