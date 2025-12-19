# Quick Vercel Deployment via GitHub

Your code is now on GitHub! Deploy to Vercel in 3 minutes:

## Step 1: Import Project to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in (you're already authenticated)

2. **Import Git Repository**
   - Click **"Import Git Repository"**
   - Select **"Import from GitHub"**
   - Find: `drzachconner/VE-Notion`
   - Click **"Import"**

3. **Configure Project**
   - Project Name: `van-every-orchestration` (or your choice)
   - Framework Preset: **Other** (it will auto-detect)
   - Root Directory: `./` (leave as is)
   - Click **"Deploy"**

**Wait 1-2 minutes** for the initial deployment...

---

## Step 2: Add Environment Variables

After deployment completes, go to:
**Project Settings → Environment Variables**

Add ALL of these (copy from your `.env` file):

```bash
# ClickUp
CLICKUP_API_TOKEN=pk_174283108_YHA7AFDEP9IZ8KEL09JAQMRAUGQY5KNE
CLICKUP_WORKSPACE_ID=9017435888
CLICKUP_FRONT_DESK_SPACE_ID=90172901127
CLICKUP_NEW_LEADS_FOLDER_ID=90174878438
CLICKUP_TIER4_LIST_ID=901708714009
CLICKUP_TIER3_LIST_ID=901708714010
CLICKUP_TIER2_LIST_ID=901708714011
CLICKUP_TIER1_LIST_ID=901708714012

# Slack
SLACK_BOT_TOKEN=<YOUR_ACTUAL_TOKEN_FROM_.ENV>
SLACK_FRONT_DESK_CHANNEL_ID=C020A92H334

# GoHighLevel
GHL_API_KEY=pit-988ab2fb-ec7a-4dc9-abce-bde647cc8eb3
GHL_LOCATION_ID=WoS90qnGGmY3rjd0mkjC
```

For each variable:
1. Click **"Add Variable"**
2. Name: (e.g., `CLICKUP_API_TOKEN`)
3. Value: (paste the value)
4. Environment: **Production** (check this box)
5. Click **"Save"**

---

## Step 3: Redeploy

After adding ALL environment variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (...)** → **"Redeploy"**
4. Check **"Use existing Build Cache"**
5. Click **"Redeploy"**

This ensures the environment variables are available.

---

## Step 4: Test Your Deployment

Once redeployed, you'll get a URL like:
```
https://van-every-orchestration.vercel.app
```

**Test the workflow:**
```bash
curl https://van-every-orchestration.vercel.app/api/test-workflow
```

Or just visit that URL in your browser!

You should see:
- ✅ Task created in ClickUp
- ✅ Notification posted to Slack #front-desk

---

## Step 5: Get Webhook URLs

Your production webhook endpoints are now live:

```
GHL Lead Webhook:
https://van-every-orchestration.vercel.app/api/webhooks/ghl-lead-action

ChiroHD Stats Webhook:
https://van-every-orchestration.vercel.app/api/webhooks/chirohd

Test Endpoint:
https://van-every-orchestration.vercel.app/api/test-workflow
```

Configure these in:
- **GHL**: Workflow → Webhook → Add your URL
- **ChiroHD**: Settings → Zapier Integration → Add your URL

---

## Automatic Deployments

From now on:
- **Every git push to `main`** = Automatic Vercel deployment
- **No manual steps needed**
- **Vercel will build and deploy automatically**

---

## Monitoring

View logs in real-time:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Logs"** tab
4. See all API requests, errors, and workflow executions

---

## Next Steps

1. ✅ Deploy to Vercel (you're doing this now!)
2. ⏳ Get GHL API key and add to Vercel environment variables
3. ⏳ Configure GHL webhook with your Vercel URL
4. ⏳ Test end-to-end: GHL → Vercel → ClickUp → Slack
5. ⏳ Build ChiroHD stats endpoint

---

**You're almost done!** 🚀
