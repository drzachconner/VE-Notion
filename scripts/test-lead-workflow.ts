#!/usr/bin/env ts-node
/**
 * Test Lead-to-Task Workflow
 *
 * Simulates a GHL lead webhook and tests the full workflow:
 * - Parse lead data
 * - Create ClickUp task in correct tier list
 * - Post Slack notification
 */

// IMPORTANT: Load .env BEFORE any other imports
import * as dotenv from 'dotenv';
dotenv.config();

// Now import other modules (they will have env vars available)
import { processLeadToTask } from '../workflows/lead-to-task';
import type { Lead } from '../core/types/lead';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testWorkflow() {
  log('╔════════════════════════════════════════════════════════════╗', 'bright');
  log('║  Van Every Practice - Test Lead Workflow                  ║', 'bright');
  log('╚════════════════════════════════════════════════════════════╝', 'bright');
  log('');

  // Create test leads for each tier
  const testLeads: Lead[] = [
    {
      id: 'test-tier4-001',
      tier: 4,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+15551234567',
      source: 'website-form',
      temperature: 'hot',
      stage: 'action-ready',
      condition: 'Severe back pain - can barely walk',
      emailsOpened: 5,
      emailsClicked: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'test-tier3-002',
      tier: 3,
      firstName: 'Michael',
      lastName: 'Rodriguez',
      email: 'michael.r@example.com',
      phone: '+15559876543',
      source: 'referral',
      temperature: 'warm',
      stage: 'engaged',
      condition: 'Neck pain and headaches',
      emailsOpened: 2,
      emailsClicked: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'test-tier2-003',
      tier: 2,
      firstName: 'Jessica',
      lastName: 'Chen',
      email: 'jchen@example.com',
      phone: '+15554567890',
      source: 'referral',
      temperature: 'warm',
      stage: 'engaged',
      condition: 'General wellness check',
      emailsOpened: 1,
      emailsClicked: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  log('🧪 Testing workflow with 3 sample leads:', 'cyan');
  log('');

  for (const lead of testLeads) {
    log(`\n${'─'.repeat(60)}`, 'reset');
    log(`📋 Processing: ${lead.firstName} ${lead.lastName} (Tier ${lead.tier})`, 'blue');
    log(`   Condition: ${lead.condition}`, 'reset');
    log(`   Temperature: ${lead.temperature}`, 'reset');
    log(`   Source: ${lead.source}`, 'reset');
    log('');

    try {
      const result = await processLeadToTask(lead);

      if (result.success) {
        log('✅ Workflow completed successfully!', 'green');
        if (result.taskCreated && result.taskId) {
          log(`   ✓ ClickUp task created: ${result.taskId}`, 'green');
          if (result.taskUrl) {
            log(`   ✓ URL: ${result.taskUrl}`, 'green');
          }
        }
        if (result.slackNotified) {
          log(`   ✓ Slack notification sent`, 'green');
        } else if (!result.taskCreated) {
          log(`   ⚠️ ${result.error || 'Lead not ready for task creation'}`, 'yellow');
        }
      } else {
        log('❌ Workflow failed', 'red');
        log(`   Error: ${result.error}`, 'red');
      }
    } catch (error: any) {
      log('❌ Workflow error', 'red');
      log(`   ${error.message}`, 'red');
    }
  }

  log('');
  log('─'.repeat(60), 'reset');
  log('');
  log('🎉 Test complete!', 'bright');
  log('');
  log('📱 Check your Slack #front-desk channel for notifications', 'cyan');
  log('📋 Check ClickUp for new tasks in:', 'cyan');
  log('   - Tier 4 - Urgent Leads', 'cyan');
  log('   - Tier 3 - High Priority Leads', 'cyan');
  log('   - Tier 2 - Normal Priority Leads', 'cyan');
  log('');
}

testWorkflow().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
