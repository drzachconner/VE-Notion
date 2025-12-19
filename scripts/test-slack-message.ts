#!/usr/bin/env ts-node
/**
 * Test Slack Message
 * Quick script to verify bot can post to channel
 */

import * as dotenv from 'dotenv';

dotenv.config();

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_FRONT_DESK_CHANNEL_ID;

async function sendTestMessage() {
  console.log('🧪 Testing Slack message...');
  console.log(`Channel: ${SLACK_CHANNEL_ID}`);
  console.log('');

  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SLACK_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: SLACK_CHANNEL_ID,
      text: '🤖 Van Every Practice Orchestration System is connected and ready!',
    }),
  });

  const data = await response.json() as any;

  if (data.ok) {
    console.log('✅ Message sent successfully!');
    console.log('   Check your #front-desk channel in Slack');
  } else {
    console.log('❌ Failed to send message');
    console.log(`   Error: ${data.error}`);

    if (data.error === 'not_in_channel') {
      console.log('   💡 Make sure you invited the bot to the channel:');
      console.log('      /invite @Van Every Front Desk Bot');
    }
  }
}

sendTestMessage().catch(console.error);
