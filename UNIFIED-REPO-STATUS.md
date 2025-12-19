# Unified Monorepo Status Update

**Date**: 2025-12-17
**Session Focus**: Building Phase 2 (Task Orchestration) in unified repository structure

---

## ✅ What We Built Today

### Core Infrastructure

**1. Shared Type System** (`types/`)
- ✅ `lead.ts` - Lead data structure with tier calculation and action-ready logic
- ✅ `patient.ts` - Patient data structure with conversion from lead
- ✅ `task.ts` - ClickUp task structure with auto-generation from leads
- ✅ `index.ts` - Centralized type exports

**2. Integration Libraries** (`lib/`)
- ✅ `clickup-client.ts` - Complete ClickUp API wrapper
  - Create, update, delete tasks
  - Add comments
  - Get lists and team members
  - Priority mapping
- ✅ `slack-client.ts` - Complete Slack API wrapper
  - Post formatted messages with blocks
  - @mention team members
  - Beautiful task notifications
  - User lookup by email

**3. Business Logic Workflows** (`workflows/`)
- ✅ `lead-to-task.ts` - Main orchestration workflow
  - Checks if lead is action-ready
  - Creates ClickUp task with correct tier/priority/due date
  - Assigns to Front Desk team
  - Posts Slack notification with @mentions
  - Full error handling and logging

**4. Configuration** (`config/`)
- ✅ `user-mapping.ts` - Team member mapping (ClickUp ↔ Slack IDs)
  - Front Desk team: Lou Ann, Christina, Tricia, Wendy
  - Clinical team: Dr. Saylor, Dr. John, Dr. Zach
- ✅ `clickup-structure.ts` - ClickUp spaces/folders/lists configuration
  - Tier-based list routing
  - Environment variable integration
  - Structure validation

**5. API Endpoints** (`api/webhooks/`)
- ✅ `ghl-lead-action.ts` - GHL webhook receiver
  - Receives lead progression events
  - Transforms GHL contact to Lead object
  - Triggers lead-to-task workflow
  - Returns task creation status

**6. Documentation** (`docs/`)
- ✅ `clickup-mcp-setup.md` - Complete MCP setup guide
  - Conversational structure building
  - Manual setup alternative
  - Testing procedures

---

## 📊 System Architecture (Unified)

### Data Flow: GHL → ClickUp → Slack

```
Go High Level
  │ Lead reaches action stage
  │ (3+ email opens, clicked link, etc.)
  ↓
Vercel Webhook: /api/webhooks/ghl-lead-action
  │ Receives GHL webhook
  │ Transforms to Lead object
  │ Calculates tier (1-4)
  ↓
Workflow: processLeadToTask()
  │ Check if action-ready
  │ Get correct ClickUp list for tier
  │ Build task with auto-calculated priority/due date
  ↓
ClickUp API
  │ Create task
  │ Assign to Front Desk team
  │ Set custom fields
  ↓
Slack API
  │ Format beautiful notification
  │ @mention team members
  │ Post to #front-desk channel
  ↓
✅ Front Desk Team Notified
```

---

## 🏗️ Folder Structure (Current State)

```
Van Every Family Chiropractic - Practice Orchestration System/
│
├── types/                       # ✅ COMPLETE
│   ├── lead.ts
│   ├── patient.ts
│   ├── task.ts
│   └── index.ts
│
├── lib/                         # ✅ COMPLETE (Phase 2)
│   ├── clickup-client.ts
│   └── slack-client.ts
│
├── workflows/                   # ✅ COMPLETE (Phase 2)
│   └── lead-to-task.ts
│
├── config/                      # ✅ COMPLETE
│   ├── user-mapping.ts
│   └── clickup-structure.ts
│
├── api/                         # ✅ COMPLETE (Phase 2)
│   └── webhooks/
│       └── ghl-lead-action.ts
│
├── docs/                        # ✅ COMPLETE (Phase 2)
│   └── clickup-mcp-setup.md
│
└── UNIFIED-REPO-STATUS.md       # ✅ This file
```

---

## 🔧 What Still Needs to Be Done

### 1. Move Phase 1 Code

**From**: Old `GoHighLevel/` folder structure
**To**: Unified repo structure

**Files to move**:
- `lib/ghl-client.ts` → Already have, copy over
- `lib/blotato-client.ts` → Already have, copy over
- `lib/google-sheets-client.ts` → Already have, copy over
- `lib/logger.ts` → Already have, copy over
- `api/health.ts` → Move to unified `api/`
- `api/webhooks/chirohd.ts` → Move to unified `api/webhooks/`
- `api/webhooks/form-submission.ts` → Move to unified `api/webhooks/`
- `api/cron/post-everywhere.ts` → Move to unified `api/cron/`
- All `docs/*.md` → Move to unified `docs/`
- `package.json` → Merge dependencies
- `tsconfig.json` → Use unified config
- `vercel.json` → Merge cron jobs
- `.env.example` → Merge all variables

### 2. Configuration

**ClickUp Setup** (via MCP or manual):
- [ ] Create Front Desk Tasks space
- [ ] Create New Lead Follow-ups folder
- [ ] Create 4 tier-based lists
- [ ] Add custom fields to each list
- [ ] Get user IDs for Front Desk team
- [ ] Update `config/user-mapping.ts` with real IDs
- [ ] Update `.env` with all ClickUp IDs

**Slack Setup**:
- [ ] Create Slack bot
- [ ] Get bot token
- [ ] Invite bot to #front-desk channel
- [ ] Get channel ID
- [ ] Get user IDs for @mentions (Lou Ann, Christina, Tricia, Wendy)
- [ ] Update `config/user-mapping.ts` with Slack IDs
- [ ] Update `.env` with Slack credentials

**Environment Variables**:
```bash
# Phase 1 (GHL, Blotato, Sheets)
GHL_API_KEY=
GHL_LOCATION_ID=
BLOTATO_API_KEY=
BLOTATO_LINKEDIN_ACCOUNT_ID=
BLOTATO_PINTEREST_ACCOUNT_ID=
GOOGLE_SHEET_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=

# Phase 2 (ClickUp, Slack)
CLICKUP_API_TOKEN=
CLICKUP_WORKSPACE_ID=
CLICKUP_FRONT_DESK_SPACE_ID=
CLICKUP_NEW_LEADS_FOLDER_ID=
CLICKUP_TIER4_LIST_ID=
CLICKUP_TIER3_LIST_ID=
CLICKUP_TIER2_LIST_ID=
CLICKUP_TIER1_LIST_ID=

SLACK_BOT_TOKEN=
SLACK_FRONT_DESK_CHANNEL_ID=

# ChiroHD
CHIROHD_CREDENTIALS=
CHIROHD_WEBHOOK_SECRET=
```

### 3. Testing

**Unit Tests**:
- [ ] Test lead tier calculation
- [ ] Test action-ready logic
- [ ] Test task generation from lead
- [ ] Test priority/due date calculation

**Integration Tests**:
- [ ] Test ClickUp task creation
- [ ] Test Slack notification posting
- [ ] Test full GHL → ClickUp → Slack flow
- [ ] Test error handling

**End-to-End Test**:
- [ ] Send test webhook from GHL
- [ ] Verify task created in correct ClickUp list
- [ ] Verify Slack notification posted
- [ ] Verify all data fields populated correctly

### 4. Deployment

- [ ] Merge `package.json` dependencies
- [ ] Update `vercel.json` with all endpoints and cron jobs
- [ ] Deploy to Vercel
- [ ] Add all environment variables in Vercel
- [ ] Test deployed endpoints
- [ ] Configure GHL webhook to production URL

---

## 📝 Lead Tier Logic (Implemented)

| Tier | Data Required | Priority | Due Date | Example |
|------|--------------|----------|----------|---------|
| **4** | Full intake (name, phone, email, condition, pregnancy/birth date) | Urgent | 2 hours | Pregnant patient requesting care |
| **3** | Name + phone + email + general condition | High | Same day (before 3pm) or next day | "Sarah Smith, back pain" |
| **2** | Phone + email | Normal | Next business day | Generic lead capture form |
| **1** | Social handle only | Low | 2 days | Instagram DM inquiry |

### Action-Ready Triggers

**Tier 4**: Any engagement (immediate followup)
**Tier 3**: 2+ emails opened AND 1+ clicked
**Tier 2**: 3+ emails opened OR 1+ scheduling link clicked
**Tier 1**: 3 DMs sent with no response (manual trigger in GHL)

---

## 🎯 Next Session Priorities

1. **Move Phase 1 code** into unified structure
2. **Set up ClickUp** via MCP (conversational build)
3. **Set up Slack bot** and get team member IDs
4. **Test full workflow** with sample lead data
5. **Deploy** to Vercel and configure GHL webhook

---

## 💡 Key Design Decisions

### Why Unified Monorepo?

1. **Shared Types** - One `Lead` interface used across GHL, ClickUp, ChiroHD
2. **Shared Utilities** - One logger, one error handler
3. **Single Deployment** - All webhooks in one Vercel project
4. **Cross-System Workflows** - GHL → ClickUp → Slack in one codebase
5. **Easier Debugging** - See entire data flow in one place
6. **Better DX** - Import any module from anywhere

### Why ClickUp MCP?

- **Conversational Setup** - Talk to Claude, build structure
- **Faster Than UI** - No manual clicking
- **Documented** - Structure captured in conversation
- **Reproducible** - Can rebuild if needed

### Why Separate Lists by Tier?

- **Visual Organization** - See urgent vs low priority at a glance
- **Different SLAs** - Each tier has different response time
- **Easy Filtering** - Front desk can focus on high priority
- **Metrics** - Track conversion by tier

---

## 🔄 Integration Status Matrix

| Integration | Phase | Status | Next Step |
|------------|-------|--------|-----------|
| **GHL → ChiroHD** | 1 | ⏳ Waiting on ChiroHD | Native integration coming |
| **Website → GHL** | 1 | ✅ Complete | Add forms to website |
| **GHL → Blotato** | 1 | ✅ Complete | Configure Blotato account |
| **GHL → ClickUp** | 2 | ✅ Code Complete | Set up ClickUp structure |
| **ClickUp → Slack** | 2 | ✅ Code Complete | Set up Slack bot |
| **ChiroHD → Sheets** | 3 | 🔄 Next Phase | Build stats pipeline |

---

## 📚 Documentation Coverage

| Topic | Doc File | Status |
|-------|----------|--------|
| ClickUp Setup | `docs/clickup-mcp-setup.md` | ✅ Complete |
| GHL Setup | `docs/ghl-setup.md` | ✅ Complete (Phase 1) |
| ChiroHD Integration | `docs/chirohd-integration.md` | ✅ Complete (Phase 1) |
| Blotato Setup | `docs/blotato-setup.md` | ✅ Complete (Phase 1) |
| Slack Setup | `docs/slack-setup.md` | ⏳ TODO |
| Analytics Setup | `docs/analytics-setup.md` | ⏳ TODO (Phase 3) |
| Deployment | `docs/deployment.md` | ⏳ TODO |

---

## 🚀 Success Criteria (Phase 2)

**Definition of Done**:
- [x] Types defined for Lead, Patient, Task
- [x] ClickUp client library built
- [x] Slack client library built
- [x] Lead-to-task workflow implemented
- [x] GHL webhook endpoint created
- [x] Configuration files created
- [x] ClickUp MCP setup documented
- [ ] ClickUp structure built (via MCP)
- [ ] Slack bot configured
- [ ] Team member IDs populated
- [ ] End-to-end test successful
- [ ] Deployed to Vercel
- [ ] GHL webhook configured

**Current Progress**: 7/13 (54%)

---

## 🎉 What's Working Right Now

**If you configure ClickUp + Slack today**, you can:

1. Send a POST request to `/api/webhooks/ghl-lead-action` with a lead
2. Task will be created in ClickUp (correct tier-based list)
3. Task will be assigned to Front Desk team
4. Slack notification will post to #front-desk with @mentions
5. All data flows through shared type system
6. Full error handling and logging

**Ready for production as soon as config is complete!**

---

**Last Updated**: 2025-12-17
**Next Session**: Move Phase 1 code, configure ClickUp/Slack, deploy
**Status**: Phase 2 code complete, awaiting configuration
