# Van Every Family Chiropractic - Notion Mastermind Dashboard

> **Comprehensive team management system with 8 implementation phases**

## 🎯 Project Overview

This project builds a complete Notion mastermind dashboard template for Van Every Family Chiropractic Center, featuring:

- 7 individual team member dashboards
- 5 core databases (Tasks, Projects, Meetings, Resources, Business Goals)
- Chiropractic-specific features
- Automated workflows and intelligence
- Mobile optimization

## 📊 Project Status

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | ✅ Complete | Visual Dashboard Redesign |
| **Phase 2** | ✅ Complete | Database Architecture |
| **Phase 3** | 🟡 In Progress | Individual Dashboard Upgrades |
| **Phase 4** | ⏳ Planned | Chiropractic-Specific Features |
| **Phase 5** | ⏳ Planned | Automation & Intelligence |
| **Phase 6** | ⏳ Planned | Collaboration & Communication |
| **Phase 7** | ⏳ Planned | Visual Design Polish |
| **Phase 8** | ⏳ Planned | Mobile Optimization |

## 🚀 Quick Start

### 1. Prerequisites

- Python 3.8 or higher
- Notion account with API access
- Notion integration created at https://www.notion.so/my-integrations

### 2. Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Edit .env and add your Notion API key
nano .env  # or your preferred editor
```

### 3. Setup Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Create a new integration (or use existing)
3. Copy the "Internal Integration Token"
4. Paste it in your `.env` file as `NOTION_API_KEY`
5. In Notion, share ALL project pages with your integration:
   - Open each page
   - Click "..." → "Add connections"
   - Select your integration

### 4. Build Dashboards

```bash
# Build all dashboards (skips Dr. Zach's prototype)
python build_dashboards.py

# Include Dr. Zach's dashboard
python build_dashboards.py --include-dr-zach

# Clear existing content and rebuild (CAUTION!)
python build_dashboards.py --clear
```

### 5. Test Connection

```bash
# Test Notion API connection
python notion_client.py
```

## 📁 Project Structure

```
VE Notion/
├── README.md                    # This file
├── PROJECT_TRACKER.md           # Detailed phase tracking
├── MANUAL_STEPS.md             # Steps that require manual Notion work
├── config.json                  # Project configuration
├── .env.example                 # Environment template
├── .env                         # Your API key (gitignored)
├── requirements.txt             # Python dependencies
├── notion_client.py            # Notion API client
├── dashboard_blocks.py         # Block templates
├── build_dashboards.py         # Main dashboard builder
├── phase4_builder.py           # Phase 4: Chiropractic features
└── update_tracker.py           # Update project tracker
```

## 👥 Team Members

1. **Dr. Saylor** - Doctor
2. **Dr. Zach** - Doctor (Prototype complete)
3. **Dr. John** - Doctor
4. **Lou Ann** - Staff
5. **Christina** - Staff
6. **Tricia** - Staff
7. **Windy** - Staff

## 🗄️ Core Databases

1. **Tasks** - Enhanced with Priority, Time Estimate, Labels, Department, Progress
2. **Projects** - Project management with team assignments
3. **Business Goals** - Strategic goal tracking
4. **Resources & Documents** - Knowledge management with access control
5. **Meetings** - Meeting management with categories and attendees

## 🔗 Important Links

- **Project Tracker**: https://www.notion.so/2a380ff9d4f58134a8dbdaf4051913c8
- **Main Template**: https://www.notion.so/2a380ff9d4f5817b8a11eca658f9a815
- **Dr. Zach's Prototype**: https://www.notion.so/2a380ff9d4f5816b891bcd522e7fff7d
- **Databases Backend**: https://www.notion.so/2a380ff9d4f5811bbeecd32ec64c52c3

## ⚠️ API Limitations

The Notion API **CANNOT** create:
- Linked database views
- Database inline views
- Some advanced block types

These must be added **manually** in Notion. See `MANUAL_STEPS.md` for instructions.

## 📝 Dashboard Structure

Each individual dashboard follows Dr. Zach's prototype:

1. **Hero Section** - Name and icon
2. **Today's Focus** - Top 3 daily priorities
3. **This Week at a Glance** - Task/Meeting/Project counts
4. **My Performance Metrics** - Goal tracking
5. **My Tasks** - Filtered task view
6. **My Meetings** - Filtered meeting view
7. **My Projects** - Filtered project view
8. **Quick Links** - Important resources

## 🔄 Phase 3 Progress

✅ **Completed:**
- Dr. Zach's prototype dashboard created

⏳ **In Progress:**
- Building 6 remaining dashboards:
  - [ ] Dr. Saylor
  - [ ] Dr. John
  - [ ] Lou Ann
  - [ ] Christina
  - [ ] Tricia
  - [ ] Windy

## 🎯 Next Steps After Phase 3

1. **Manual Database Views** - Add linked database views to each dashboard
2. **Phase 4** - Implement chiropractic-specific features:
   - Practice Performance Dashboard
   - Clinical Resources Hub
   - TTC Technique Database
   - Continuing Education Tracker
   - License Renewal Reminders
   - Equipment Maintenance Log

## 🆘 Troubleshooting

### "Notion API key not found"
- Make sure you created `.env` file from `.env.example`
- Check that `NOTION_API_KEY` is set correctly

### "Error retrieving page"
- Verify the page ID in `config.json` is correct
- Make sure you shared the page with your integration
- Check that the integration has proper permissions

### "Error appending blocks"
- Some blocks may have invalid structure
- Check Notion API documentation for block requirements
- Verify you're not exceeding rate limits

## 📚 Resources

- [Notion API Documentation](https://developers.notion.com/)
- [notion-sdk-py](https://github.com/ramnes/notion-sdk-py)
- [Project Tracker in Notion](https://www.notion.so/2a380ff9d4f58134a8dbdaf4051913c8)

## 🤝 Contributing

This is a custom project for Van Every Family Chiropractic. For questions or issues:

1. Check `MANUAL_STEPS.md` for manual instructions
2. Review `PROJECT_TRACKER.md` for phase details
3. Contact project administrator

## 📄 License

Private project for Van Every Family Chiropractic Center.

---

**Last Updated:** November 6, 2025
**Current Phase:** Phase 3 - Individual Dashboard Upgrades
**Next Milestone:** Complete all 6 remaining dashboards
