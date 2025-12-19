# Slack Bot Setup Guide

## Overview

This guide walks you through creating a Slack bot for Van Every Chiropractic that will post new lead notifications to your Front Desk channel.

---

## Step 1: Create a Slack App

1. **Go to Slack API Dashboard**
   - Visit: https://api.slack.com/apps
   - Click **"Create New App"**

2. **Choose "From scratch"**
   - App Name: `Van Every Front Desk Bot`
   - Pick your workspace
   - Click **"Create App"**

---

## Step 2: Add Bot Permissions

1. **Go to "OAuth & Permissions"** (in left sidebar)

2. **Scroll to "Scopes" → "Bot Token Scopes"**

3. **Click "Add an OAuth Scope"** and add these:
   - `chat:write` - Send messages to channels
   - `channels:read` - View public channels
   - `users:read` - View users in workspace

   *(Optional but recommended)*:
   - `chat:write.customize` - Customize bot name/icon
   - `channels:join` - Auto-join channels when invited

---

## Step 3: Install Bot to Workspace

1. **Scroll to top** of "OAuth & Permissions" page

2. **Click "Install to Workspace"**

3. **Review permissions** and click **"Allow"**

4. **Copy the "Bot User OAuth Token"**
   - It starts with `xoxb-`
   - Example: `xoxb-NUMBERS-NUMBERS-LETTERS`

5. **Add to your `.env` file:**
   ```bash
   SLACK_BOT_TOKEN=xoxb-your-token-here
   ```

---

## Step 4: Create/Find Front Desk Channel

### Option A: Use Existing Channel

If you already have a channel for front desk tasks:
1. Open that channel in Slack
2. Invite the bot: `/invite @Van Every Front Desk Bot`
3. Note the channel name

### Option B: Create New Channel

1. In Slack, click the **+** next to "Channels"
2. Name: `front-desk-leads` (or whatever you prefer)
3. Make it **Public** (easier for bot access)
4. Create the channel
5. Invite the bot: `/invite @Van Every Front Desk Bot`

---

## Step 5: Get Channel ID

Run our setup script to automatically find the channel ID:

```bash
npm run setup:slack
```

This script will:
- ✅ Test your bot token
- ✅ List all channels in your workspace
- ✅ Try to auto-detect your Front Desk channel
- ✅ Show you the channel ID to add to `.env`

**Manual Method** (if script doesn't work):
1. Right-click the channel name in Slack
2. Select "View channel details"
3. Scroll to bottom → Channel ID will be shown
4. Copy it (looks like: `C0123456789`)

---

## Step 6: Update `.env` File

After running `npm run setup:slack`, add the channel ID:

```bash
SLACK_FRONT_DESK_CHANNEL_ID=C0123456789
```

---

## Step 7: Test the Integration

### Test Message (Manual)

Send a test message to verify the bot works:

```bash
curl -X POST https://slack.com/api/chat.postMessage \
  -H "Authorization: Bearer YOUR_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "channel":"YOUR_CHANNEL_ID",
    "text":"🤖 Van Every Practice Orchestration System is connected!"
  }'
```

### Test Full Workflow

Once both ClickUp and Slack are configured, test the full workflow:

```bash
npm run dev
```

Then trigger a test webhook from GHL or manually hit your local endpoint.

---

## Customizing Bot Appearance (Optional)

1. **Go to "Basic Information"** in your Slack app settings

2. **Display Information**:
   - Short Description: "Front Desk automation bot"
   - App Icon: Upload a logo (optional)
   - Background Color: Use your brand color

3. **Save Changes**

Now when the bot posts, it will have your custom icon and color!

---

## Slack Message Format

When a new lead comes in, the bot will post a message like this:

```
🚨 New Tier 4 Lead: John Doe

📞 Phone: +1 555-123-4567
📧 Email: john.doe@example.com
🏥 Condition: Back pain
🌡️ Temperature: Hot
📍 Source: Website Form

🔗 View in ClickUp: [link]
📅 Follow up by: 2024-12-20
```

You can customize this format in `integrations/slack/client.ts`

---

## Troubleshooting

### "Bot not found" error
- Make sure you invited the bot to the channel: `/invite @Van Every Front Desk Bot`
- Check that bot token starts with `xoxb-` (not `xoxp-`)

### "Missing scopes" error
- Go back to OAuth & Permissions
- Add the missing scopes listed in Step 2
- Reinstall the app to workspace

### "Channel not found" error
- Verify channel ID is correct (run `npm run setup:slack` again)
- Make sure bot is a member of the channel

### "Invalid auth" error
- Your token might have expired
- Go to OAuth & Permissions → Reinstall to Workspace
- Copy the new token

---

## Security Best Practices

1. **Never commit `.env` to git** ✅ (already in .gitignore)
2. **Use environment variables in Vercel** for production
3. **Rotate tokens periodically** (every 90 days recommended)
4. **Limit bot permissions** to only what's needed

---

## Next Steps

After Slack is configured:

1. ✅ Test locally: `npm run dev`
2. ✅ Test webhook flow: GHL → ClickUp → Slack
3. ✅ Deploy to Vercel: `npm run deploy`
4. ✅ Configure GHL webhook to hit your production URL

---

**Last Updated**: 2025-12-18
**Status**: Ready to use
