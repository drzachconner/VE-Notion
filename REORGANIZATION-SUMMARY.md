# Reorganization Summary: Modular Monorepo Structure

**Date**: 2025-12-18
**Migration**: From flat structure → Modular domain-separated architecture

---

## 🎯 Why We Reorganized

### The Problem

You asked: **"Is it okay to just have one main big folder, or should we have separate folders for each aspect (ClickUp, GHL, etc.) so that we can just open Claude Code in that folder to build out just that?"**

### The Answer

**YES - Separate folders by domain!** Here's why:

1. **Context Management** - When you open Claude Code in `integrations/clickup/`, I only see ClickUp files, not Blotato/GHL/Sheets noise
2. **Smaller Token Usage** - Less context = better responses, faster performance
3. **Less Confusion** - I won't accidentally reference Blotato code when working on ClickUp
4. **Clear Boundaries** - Each integration is self-contained with its own client and config
5. **Shared Foundation** - `core/` gives you common types everywhere

---

## 📊 Before vs After

### Before (Flat Monorepo)

```
Van Every/
├── types/           # Mixed: all types together
├── lib/             # Mixed: ALL clients in one folder
├── config/          # Mixed: all configs together
├── api/             # Mixed: all endpoints together
└── workflows/       # Workflows buried with everything else
```

**Problem**: When you open Claude Code at root, I see **EVERYTHING** - ClickUp, Slack, GHL, Blotato, ChiroHD, Sheets. Context overload!

### After (Modular Domain-Separated)

```
Van Every/
├── core/                    # ← Shared ALWAYS
│   ├── types/              # Lead, Patient, Task (shared)
│   ├── utils/              # Logger (shared)
│   └── config/             # Team mapping (shared)
│
├── integrations/            # ← Open ONE folder at a time
│   ├── ghl/                # 👈 Work on GHL? Open THIS
│   ├── clickup/            # 👈 Work on ClickUp? Open THIS
│   ├── slack/              # 👈 Work on Slack? Open THIS
│   ├── blotato/            # 👈 Work on Blotato? Open THIS
│   └── sheets/             # 👈 Work on Sheets? Open THIS
│
├── workflows/              # ← Cross-system orchestration
└── api/                    # ← Vercel endpoints
```

**Solution**: Open `integrations/clickup/` → Claude Code only sees ClickUp. Clean, focused context!

---

## 🔄 How to Use This Structure

### Scenario 1: Building ClickUp MCP Integration

```bash
cd "Van Every Family Chiropractic - Practice Orchestration System/integrations/clickup"
```

**Open Claude Code here**. Now I only see:
- `client.ts` (ClickUp API wrapper)
- `config.ts` (ClickUp structure)

I can import from `../../core/types/lead` but I won't see Blotato/Sheets/GHL noise.

### Scenario 2: Building GHL Webhook

```bash
cd "Van Every Family Chiropractic - Practice Orchestration System/integrations/ghl"
```

**Open Claude Code here**. Now I only see:
- `client.ts` (GHL API wrapper)

### Scenario 3: Building Cross-System Workflow

```bash
cd "Van Every Family Chiropractic - Practice Orchestration System"
```

**Open Claude Code at root**. Now I see everything - needed for workflows that touch multiple systems.

---

## 📦 What Moved Where

### Core (Shared Foundation)

| Old Location | New Location | Why Shared |
|--------------|--------------|------------|
| `types/lead.ts` | `core/types/lead.ts` | Used by GHL, ClickUp, ChiroHD |
| `types/patient.ts` | `core/types/patient.ts` | Used by GHL, ChiroHD |
| `types/task.ts` | `core/types/task.ts` | Used by ClickUp, workflows |
| `lib/logger.ts` | `core/utils/logger.ts` | Used by ALL integrations |
| `config/user-mapping.ts` | `core/config/team-mapping.ts` | Used by ClickUp + Slack |

### Integrations (Domain-Specific)

| Old Location | New Location | Domain |
|--------------|--------------|--------|
| `lib/ghl-client.ts` | `integrations/ghl/client.ts` | GHL only |
| `lib/clickup-client.ts` | `integrations/clickup/client.ts` | ClickUp only |
| `config/clickup-structure.ts` | `integrations/clickup/config.ts` | ClickUp only |
| `lib/slack-client.ts` | `integrations/slack/client.ts` | Slack only |
| `config/slack-config.ts` | `integrations/slack/config.ts` | Slack only |
| `lib/blotato-client.ts` | `integrations/blotato/client.ts` | Blotato only |
| `lib/google-sheets-client.ts` | `integrations/sheets/client.ts` | Sheets only |

### Workflows & API (Unchanged)

| Location | Purpose |
|----------|---------|
| `workflows/lead-to-task.ts` | Cross-system: GHL → ClickUp → Slack |
| `api/webhooks/*` | Vercel webhook endpoints |
| `api/cron/*` | Vercel cron jobs |
| `api/health.ts` | Health check |

---

## 🔀 Import Path Changes

### Before

```typescript
// Old flat structure
import { Lead } from '../types/lead';
import { getClickUpClient } from '../lib/clickup-client';
import { getSlackClient } from '../lib/slack-client';
import { logger } from '../lib/logger';
```

### After

```typescript
// New modular structure
import { Lead } from '../../core/types/lead';
import { getClickUpClient } from '../../integrations/clickup/client';
import { getSlackClient } from '../../integrations/slack/client';
import { logger } from '../../core/utils/logger';
```

**Benefit**: Import paths **show the architecture** - you can see what's shared (`core/`) vs domain-specific (`integrations/`).

---

## 🎨 Design Principles

### 1. Shared Core

**Rule**: If it's used by **2+ integrations**, it goes in `core/`.

Examples:
- `Lead` type → used by GHL, ClickUp, ChiroHD → `core/types/`
- Logger → used by ALL → `core/utils/`
- Team mapping → used by ClickUp + Slack → `core/config/`

### 2. Domain Isolation

**Rule**: Integration-specific code stays in `integrations/{domain}/`.

Examples:
- ClickUp API wrapper → only ClickUp uses it → `integrations/clickup/client.ts`
- Blotato social posting → only Blotato uses it → `integrations/blotato/client.ts`

### 3. Cross-System Workflows

**Rule**: Code that touches **multiple systems** goes in `workflows/`.

Example:
- Lead-to-task workflow touches GHL, ClickUp, AND Slack → `workflows/lead-to-task.ts`

---

## 🚦 Migration Checklist

- [x] Create `core/types/` with Lead, Patient, Task
- [x] Create `core/utils/` with Logger
- [x] Create `core/config/` with team mapping
- [x] Move ClickUp to `integrations/clickup/`
- [x] Move Slack to `integrations/slack/`
- [x] Move GHL to `integrations/ghl/`
- [x] Move Blotato to `integrations/blotato/`
- [x] Move Sheets to `integrations/sheets/`
- [x] Update all import paths
- [x] Move API endpoints with updated imports
- [x] Merge `package.json`
- [x] Merge `vercel.json`
- [x] Update `tsconfig.json`
- [x] Create `.env.example`
- [x] Update documentation

---

## 📝 Next Steps

### After This Reorganization

1. **Delete `/Practice_Orchestrator` folder** - All code has been moved to unified structure
2. **Set up ClickUp via MCP** - See `docs/clickup-mcp-setup.md`
3. **Configure Slack bot** - Get channel IDs and user IDs
4. **Test workflows** - End-to-end GHL → ClickUp → Slack
5. **Deploy to Vercel** - Push unified repo

---

## 💡 Key Benefits Recap

### For You (The Developer)

✅ **Focused Context** - Work on ClickUp without seeing Blotato noise
✅ **Better Claude Code Performance** - Smaller context = faster, more accurate responses
✅ **Clearer Mental Model** - Know exactly where each integration lives
✅ **Easier Onboarding** - New devs can focus on one integration at a time

### For the Codebase

✅ **Single Source of Truth** - One `Lead` type used everywhere
✅ **Easier Debugging** - See cross-system data flow in one repo
✅ **Shared Utilities** - One logger, one team mapping
✅ **Single Deployment** - All webhooks/crons in one Vercel project

---

## ⚠️ Important Notes

### When to Open Claude Code at Root

**Open at repo root** when:
- Building cross-system workflows
- Working on `api/` endpoints that touch multiple integrations
- Need to see full system architecture

### When to Open Claude Code in Subdirectory

**Open in `integrations/{domain}/`** when:
- Building/fixing domain-specific client
- Working on domain-specific config
- Want focused context without noise

---

**Result**: You now have a **modular, scalable, context-aware** monorepo that's easy to work with and understand! 🎉
