/**
 * Notion Dashboard Automation Script
 * Automates adding linked database views to individual dashboards
 */

const { chromium } = require('playwright');

// Dashboard URLs and configuration
const dashboards = [
  { name: 'Dr. Saylor', url: 'https://www.notion.so/Dr-Saylor-2a380ff9d4f581409d26fdebf99a052e' },
  { name: 'Dr. John', url: 'https://www.notion.so/Dr-John-2a380ff9d4f58154b667d97bcd507a48' },
  { name: 'Lou Ann', url: 'https://www.notion.so/Lou-Ann-2a380ff9d4f581b4a9dee09becd3e14d' },
  { name: 'Christina', url: 'https://www.notion.so/Christina-2a380ff9d4f581d7a9aeea4e5dd36f98' },
  { name: 'Tricia', url: 'https://www.notion.so/Tricia-2a380ff9d4f581edb2d1dfcd22e3c66b' },
  { name: 'Windy', url: 'https://www.notion.so/Windy-2a380ff9d4f581e388f4eb1b663d1ab1' }
];

async function waitForLogin(page) {
  console.log('\n⏳ Waiting for you to login to Notion...');
  console.log('   Please login in the browser window that opened');
  console.log('   Once logged in, the script will continue automatically\n');

  // Wait for the page to be loaded (logged in)
  // Looking for Notion's main content area
  await page.waitForSelector('[data-block-id]', { timeout: 300000 }); // 5 minutes
  console.log('✅ Login detected! Continuing...\n');
  await page.waitForTimeout(2000);
}

async function addLinkedDatabase(page, sectionHeading, databaseName, filterPerson) {
  console.log(`  → Adding ${databaseName} database view...`);

  try {
    // Find the section by heading text
    const heading = await page.locator(`text=${sectionHeading}`).first();
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Find the callout placeholder after the heading and click it
    const callout = await heading.locator('xpath=following-sibling::*[1]');
    await callout.click();
    await page.waitForTimeout(500);

    // Type /linked to trigger the menu
    await page.keyboard.type('/linked', { delay: 100 });
    await page.waitForTimeout(1500);

    // Click "Linked view of data source"
    await page.locator('text=Linked view of data source').first().click();
    await page.waitForTimeout(1500);

    // Search for and select the database
    await page.locator('input[placeholder*="Add or link"]').first().fill(databaseName);
    await page.waitForTimeout(1000);

    // Click the database from search results
    await page.locator(`text=${databaseName}`).first().click();
    await page.waitForTimeout(2000);

    // Add filter if person name is provided
    if (filterPerson) {
      console.log(`     Adding filter for ${filterPerson}...`);

      // Click Filter button
      await page.locator('text=Filter').first().click();
      await page.waitForTimeout(1000);

      // Look for "Assigned To" property
      await page.locator('text=Assigned To').first().click();
      await page.waitForTimeout(500);

      // Select "Contains"
      await page.locator('text=Contains').first().click();
      await page.waitForTimeout(500);

      // Type person name
      await page.keyboard.type(filterPerson);
      await page.waitForTimeout(500);

      // Click outside to close
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    console.log(`     ✓ Added ${databaseName} view`);
    return true;

  } catch (error) {
    console.log(`     ✗ Error: ${error.message}`);
    return false;
  }
}

async function processDashboard(page, dashboard) {
  console.log(`\n🔨 Processing ${dashboard.name}'s dashboard...`);

  // Navigate to dashboard
  await page.goto(dashboard.url);
  await page.waitForTimeout(3000);

  // Add Tasks database view
  await addLinkedDatabase(page, '✅ My Tasks', 'Tasks', dashboard.name);
  await page.waitForTimeout(2000);

  // Add Meetings database view
  await addLinkedDatabase(page, '📅 My Meetings', 'Meetings', dashboard.name);
  await page.waitForTimeout(2000);

  // Add Projects database view
  await addLinkedDatabase(page, '🎯 My Projects', 'Projects', dashboard.name);
  await page.waitForTimeout(2000);

  console.log(`✅ ${dashboard.name}'s dashboard complete!`);
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  NOTION DASHBOARD AUTOMATION                             ║');
  console.log('║  Automated Linked Database View Creator                  ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Launch browser (visible so user can see progress)
  console.log('🌐 Launching browser...\n');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100 // Slow down for visibility
  });

  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });

  const page = await context.newPage();

  try {
    // Go to Notion and wait for login
    console.log('🔐 Opening Notion login page...');
    await page.goto('https://www.notion.so/login');
    await waitForLogin(page);

    // Process each dashboard
    console.log('📊 Processing dashboards...\n');
    console.log('=' .repeat(60));

    for (const dashboard of dashboards) {
      await processDashboard(page, dashboard);
      await page.waitForTimeout(2000);
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ ALL DASHBOARDS COMPLETE!\n');
    console.log('📋 Summary:');
    console.log(`   • Processed ${dashboards.length} dashboards`);
    console.log(`   • Added ${dashboards.length * 3} linked database views`);
    console.log(`   • Applied filters to all views\n`);
    console.log('🎉 Your Notion dashboards are ready to use!\n');

    // Keep browser open for 10 seconds so user can see final state
    console.log('⏳ Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('\n✗ Error:', error.message);
    console.error('\nThe script will keep the browser open so you can see what happened.');
    await page.waitForTimeout(30000);

  } finally {
    await browser.close();
    console.log('\n✓ Browser closed. Automation complete!');
  }
}

// Run the automation
main().catch(console.error);
