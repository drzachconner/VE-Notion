# Van Every Family Chiropractic - Practice Orchestration System

**Version**: 2.0.0 (Unified Monorepo)
**Architecture**: Modular Domain-Separated

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Integrations](#integrations)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Documentation](#documentation)

---

## 🎯 Overview

This is a **unified monorepo** containing all practice management automation for Van Every Family Chiropractic Center. It integrates:

- **Go High Level (GHL)** - CRM & Marketing Automation
- **ClickUp** - Task Management for Front Desk team
- **Slack** - Team notifications
- **ChiroHD** - Practice Management Software
- **Blotato** - Social Media Automation
- **Google Sheets** - Content Calendar

### Why Unified Monorepo?

✅ **Shared Types** - One `Lead` interface across all systems
✅ **Cross-System Workflows** - GHL → ClickUp → Slack in one codebase
✅ **Single Deployment** - All webhooks/cron jobs in one Vercel project
✅ **Easier Debugging** - See entire data flow in one place
✅ **Modular Organization** - Focus on one integration at a time

---

## 🏗️ Architecture

### Modular Domain Separation

Each integration lives in its own folder with **focused context** for Claude Code:

```
core/          # Shared across ALL integrations
integrations/  # Domain-specific clients (open ONE at a time in Claude Code)
workflows/     # Cross-system orchestration
api/           # Vercel endpoints (webhooks, cron jobs)
```

### Data Flow Examples

**Phase 1**: Website Form → GHL → ChiroHD
**Phase 2**: GHL Lead → ClickUp Task → Slack Notification
**Phase 3 (Future)**: ChiroHD Stats → Google Sheets → Analytics Dashboard

---

## 📁 Folder Structure

```
Van Every Family Chiropractic - Practice Orchestration System/
│
├── core/                              # ✅ Shared Foundation
│   ├── types/                         # Lead, Patient, Task interfaces
│   │   ├── lead.ts                    # Lead data structure + tier calculation
│   │   ├── patient.ts                 # Patient data structure
│   │   ├── task.ts                    # ClickUp task auto-generation
│   │   └── index.ts                   # Centralized exports
│   ├── utils/                         # Shared utilities
│   │   └── logger.ts                  # HIPAA-safe logging
│   └── config/                        # Shared configuration
│       └── team-mapping.ts            # Team member IDs (ClickUp ↔ Slack)
│
├── integrations/                      # ✅ Domain-Specific Clients
│   ├── ghl/                          # 👈 Open HERE for GHL work
│   │   └── client.ts                  # GHL API wrapper
│   ├── clickup/                       # 👈 Open HERE for ClickUp work
│   │   ├── client.ts                  # ClickUp API wrapper
│   │   └── config.ts                  # Space/Folder/List structure
│   ├── slack/                         # 👈 Open HERE for Slack work
│   │   ├── client.ts                  # Slack API wrapper + notifications
│   │   └── config.ts                  # Channel IDs
│   ├── blotato/                       # 👈 Open HERE for social media work
│   │   └── client.ts                  # Blotato API wrapper
│   └── sheets/                        # 👈 Open HERE for Sheets work
│       └── client.ts                  # Google Sheets API wrapper
│
├── workflows/                         # ✅ Cross-System Orchestration
│   └── lead-to-task.ts                # GHL → ClickUp → Slack workflow
│
├── api/                               # ✅ Vercel Serverless Functions
│   ├── webhooks/
│   │   ├── ghl-lead-action.ts         # GHL lead progression webhook
│   │   ├── chirohd.ts                 # ChiroHD patient events webhook
│   │   └── form-submission.ts         # Website form submissions
│   ├── cron/
│   │   └── post-everywhere.ts         # Social media posting (every 3 hours)
│   └── health.ts                      # Health check endpoint
│
├── docs/                              # ✅ Documentation
│   └── clickup-mcp-setup.md           # ClickUp setup guide (via MCP)
│
├── package.json                       # Dependencies
├── vercel.json                        # Vercel deployment config
├── tsconfig.json                      # TypeScript configuration
├── .env.example                       # Environment variable template
├── README.md                          # This file
└── REORGANIZATION-SUMMARY.md          # Details on modular restructure

```

---

## 🔌 Integrations

### Phase 1: GHL + ChiroHD + Blotato + Sheets

| Integration | Status | Purpose |
|------------|--------|---------|
| **GHL → ChiroHD** | ⏳ Waiting on ChiroHD | Patient data sync |
| **Website → GHL** | ✅ Complete | Lead capture |
| **GHL → Blotato** | ✅ Complete | Social media automation |
| **Sheets → Blotato** | ✅ Complete | Content calendar posting |

### Phase 2: ClickUp + Slack Task Orchestration

| Integration | Status | Purpose |
|------------|--------|---------|
| **GHL → ClickUp** | ✅ Code Complete | Auto-create follow-up tasks |
| **ClickUp → Slack** | ✅ Code Complete | Notify Front Desk team |

### Phase 3 (Future): Analytics

| Integration | Status | Purpose |
|------------|--------|---------|
| **ChiroHD → Sheets** | 🔄 Planned | Practice stats dashboard |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your API keys and credentials.

### 3. Set Up ClickUp (via MCP)

See `docs/clickup-mcp-setup.md` for conversational ClickUp structure building.

### 4. Run Locally

```bash
npm run dev
```

### 5. Test Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Test form submission
curl -X POST http://localhost:3000/api/webhooks/form-submission \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"Lead","email":"test@example.com","consent":true}'
```

---

## 💻 Development Workflow

### Working on a Specific Integration

**ClickUp work:**
```bash
cd integrations/clickup
# Open Claude Code HERE - only sees ClickUp files
```

**GHL work:**
```bash
cd integrations/ghl
# Open Claude Code HERE - only sees GHL files
```

**Cross-system workflow:**
```bash
cd workflows
# Open Claude Code at root - sees everything
```

### Adding a New Integration

1. Create `integrations/new-system/client.ts`
2. Create `integrations/new-system/config.ts`
3. Add types to `core/types/` if needed
4. Create workflow in `workflows/` if cross-system
5. Add API endpoint in `api/` if webhook/cron needed

---

## 🚢 Deployment

### Deploy to Vercel

```bash
npm run deploy
```

### Environment Variables in Vercel

Add all variables from `.env.example` in Vercel dashboard:

1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Add each variable from `.env.example`
4. Redeploy

### Configure GHL Webhooks

In GHL, set up webhooks pointing to:

- Lead progression: `https://your-domain.vercel.app/api/webhooks/ghl-lead-action`
- Forms: `https://your-domain.vercel.app/api/webhooks/form-submission`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| `README.md` | This file - overview and getting started |
| `REORGANIZATION-SUMMARY.md` | Detailed explanation of modular structure |
| `docs/clickup-mcp-setup.md` | ClickUp MCP setup guide |
| `.env.example` | All environment variables |

---

## 🎯 Success Criteria

### Phase 1 (GHL Integration) ✅ Complete
- [x] Website forms → GHL
- [x] ChiroHD webhook receiver
- [x] Blotato social media posting
- [x] Google Sheets content calendar

### Phase 2 (Task Orchestration) 🔄 In Progress
- [x] Types defined (Lead, Patient, Task)
- [x] ClickUp client library
- [x] Slack client library
- [x] Lead-to-task workflow
- [x] GHL webhook endpoint
- [ ] ClickUp structure built
- [ ] Slack bot configured
- [ ] End-to-end tested
- [ ] Deployed to production

### Phase 3 (Analytics) 🔮 Future
- [ ] ChiroHD → Sheets stats pipeline
- [ ] Analytics dashboard

---

## 📞 Support

For questions or issues:
- Check `docs/` folder for guides
- Review `REORGANIZATION-SUMMARY.md` for architecture details
- See `.env.example` for required configuration

---

**Built with ❤️ for Van Every Family Chiropractic Center**
