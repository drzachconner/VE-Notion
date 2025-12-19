# Vercel Deployment Guide
## Van Every Family Chiropractic - Practice Orchestration System

### Prerequisites
- [x] Vercel CLI installed (`npm install -g vercel`)
- [ ] Vercel account authenticated
- [ ] Environment variables ready to configure

---

## Step 1: Authenticate with Vercel

Run the login command and authenticate in your browser:
```bash
vercel login
```

## Step 2: Link Project

Link this local project to a new Vercel project:
```bash
cd "/Users/zachconnermba/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude Code/Van Every Family Chiropractic - Practice Orchestration System"
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your personal account
- **Link to existing project?** No
- **Project name?** `van-every-orchestration` (or your choice)
- **Directory?** `./` (current directory)
- **Override settings?** No

## Step 3: Configure Environment Variables

You need to add ALL of these environment variables to your Vercel project.

### Option A: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project: `van-every-orchestration`
3. Go to **Settings** → **Environment Variables**
4. Add each variable below:

### Option B: Using Vercel CLI
```bash
vercel env add CLICKUP_API_TOKEN production
vercel env add CLICKUP_WORKSPACE_ID production
vercel env add CLICKUP_FRONT_DESK_SPACE_ID production
vercel env add CLICKUP_NEW_LEADS_FOLDER_ID production
vercel env add CLICKUP_TIER4_LIST_ID production
vercel env add CLICKUP_TIER3_LIST_ID production
vercel env add CLICKUP_TIER2_LIST_ID production
vercel env add CLICKUP_TIER1_LIST_ID production
vercel env add SLACK_BOT_TOKEN production
vercel env add SLACK_FRONT_DESK_CHANNEL_ID production
```

### Environment Variables to Configure

| Variable Name | Value (from your .env) | Purpose |
|--------------|------------------------|---------|
| `CLICKUP_API_TOKEN` | `pk_174283108_YHA7AFDEP9IZ8KEL09JAQMRAUGQY5KNE` | ClickUp API authentication |
| `CLICKUP_WORKSPACE_ID` | `9017435888` | Your ClickUp workspace |
| `CLICKUP_FRONT_DESK_SPACE_ID` | `90172901127` | Front Desk space |
| `CLICKUP_NEW_LEADS_FOLDER_ID` | `90174878438` | New Leads folder |
| `CLICKUP_TIER4_LIST_ID` | `901708714009` | Tier 4 - Urgent Leads list |
| `CLICKUP_TIER3_LIST_ID` | `901708714010` | Tier 3 - High Priority Leads list |
| `CLICKUP_TIER2_LIST_ID` | `901708714011` | Tier 2 - Normal Priority Leads list |
| `CLICKUP_TIER1_LIST_ID` | `901708714012` | Tier 1 - Low Priority Leads list |
| `SLACK_BOT_TOKEN` | `xoxb-YOUR-SLACK-BOT-TOKEN` | Slack bot authentication |
| `SLACK_FRONT_DESK_CHANNEL_ID` | `C020A92H334` | #front-desk channel |
| `GHL_API_KEY` | `pit-YOUR-GHL-PRIVATE-INTEGRATION-TOKEN` | GoHighLevel API authentication |
| `GHL_LOCATION_ID` | `WoS90qnGGmY3rjd0mkjC` | Your GHL location ID |

**Note:** For ChiroHD integration (coming next), you'll also need:
- `CHIROHD_WEBHOOK_SECRET` - ChiroHD webhook secret

## Step 4: Deploy

Once environment variables are configured, deploy:
```bash
vercel --prod
```

## Step 5: Test Webhooks

After deployment, you'll get a URL like: `https://van-every-orchestration.vercel.app`

Your webhook endpoints will be:
- **GHL Lead Webhook:** `https://your-project.vercel.app/api/webhooks/ghl-lead`
- **ChiroHD Stats Webhook:** `https://your-project.vercel.app/api/webhooks/chirohd-stats`
- **Manual Test:** `https://your-project.vercel.app/api/test-workflow`

### Test the deployment:
```bash
curl https://your-project.vercel.app/api/test-workflow
```

Or visit it in your browser to see the workflow run with test data.

---

## Troubleshooting

### Environment Variables Not Working
- Make sure you added them to **Production** environment in Vercel
- Redeploy after adding environment variables: `vercel --prod`

### ClickUp API Errors
- Verify your API token is valid at https://app.clickup.com/settings/apps
- Check that list IDs match your ClickUp workspace

### Slack Notifications Not Sending
- Verify bot token is valid
- Ensure bot is invited to #front-desk channel
- Check channel ID is correct: `C020A92H334`

### Webhook Not Receiving Requests
- Check Vercel function logs in dashboard
- Verify webhook URL is configured correctly in GHL/ChiroHD
- Test with curl first to isolate the issue

---

## Monitoring

### View Logs
```bash
vercel logs --follow
```

Or visit: https://vercel.com/dashboard → Select Project → Logs

### Check Deployments
```bash
vercel ls
```

---

## Next Steps

1. ✅ Deploy to Vercel
2. ⏳ Get GHL API key and configure webhook in GHL
3. ⏳ Configure ChiroHD webhook endpoint
4. ⏳ Test end-to-end workflow with real data
