import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health Check Endpoint
 *
 * Simple endpoint to verify the API is running
 * Endpoint: GET /api/health
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0-unified',
    architecture: 'modular-monorepo',
    endpoints: {
      // Phase 1 endpoints
      'POST /api/webhooks/chirohd': 'ChiroHD webhook receiver',
      'POST /api/webhooks/form-submission': 'Website form submission receiver',
      'POST /api/cron/post-everywhere': 'Automated social media posting',

      // Phase 2 endpoints
      'POST /api/webhooks/ghl-lead-action': 'GHL lead action webhook → ClickUp + Slack',

      'GET /api/health': 'Health check',
    },
    integrations: {
      ghl: !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID),
      chirohd: !!process.env.CHIROHD_CREDENTIALS,
      clickup: !!process.env.CLICKUP_API_TOKEN,
      slack: !!process.env.SLACK_BOT_TOKEN,
      blotato: !!process.env.BLOTATO_API_KEY,
      sheets: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
    },
  };

  return res.status(200).json(healthStatus);
}
