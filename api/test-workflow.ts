import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processLeadToTask } from '../workflows/lead-to-task';
import type { Lead } from '../core/types/lead';

/**
 * Test Endpoint - Test lead-to-task workflow
 *
 * Usage:
 * GET /api/test-workflow
 *
 * This endpoint creates test leads and processes them through the workflow.
 * Useful for testing deployment and verifying integrations are working.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Running test workflow...');

    // Create test lead (Tier 4 - most complete data)
    const testLead: Lead = {
      id: 'test-vercel-' + Date.now(),
      tier: 4,
      firstName: 'Vercel',
      lastName: 'TestPatient',
      email: 'vercel.test@example.com',
      phone: '+15551234567',
      source: 'website-form',
      temperature: 'hot',
      stage: 'action-ready',
      condition: 'Test deployment - Severe back pain',
      emailsOpened: 5,
      emailsClicked: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(`📋 Processing test lead: ${testLead.firstName} ${testLead.lastName}`);

    // Process through workflow
    const result = await processLeadToTask(testLead);

    if (result.success) {
      console.log('✅ Test workflow completed successfully');

      return res.status(200).json({
        success: true,
        message: 'Test workflow completed successfully!',
        result: {
          taskCreated: result.taskCreated,
          taskId: result.taskId,
          taskUrl: result.taskUrl,
          slackNotified: result.slackNotified,
        },
        testLead: {
          name: `${testLead.firstName} ${testLead.lastName}`,
          tier: testLead.tier,
          condition: testLead.condition,
        },
        instructions: {
          clickup: result.taskUrl
            ? `View task in ClickUp: ${result.taskUrl}`
            : 'Task not created (check logs)',
          slack: result.slackNotified
            ? 'Check #front-desk channel for notification'
            : 'Slack notification not sent (check logs)',
        },
      });
    } else {
      console.error('❌ Test workflow failed:', result.error);

      return res.status(500).json({
        success: false,
        error: result.error || 'Unknown error',
        details: result,
      });
    }
  } catch (error: any) {
    console.error('❌ Test workflow error:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
