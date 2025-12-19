import { VercelRequest, VercelResponse } from '@vercel/node';
import { getGoogleSheetsClient, SheetRow } from '../../integrations/sheets/client';
import { getBlotatoClient, getGoogleDriveDirectLink, BlotatoPostResponse } from '../../integrations/blotato/client';
import { logger } from '../../core/utils/logger';

/**
 * Post Everywhere - Automated Social Media Posting
 *
 * Converted from n8n "1 Post Everywhere" workflow
 *
 * This endpoint:
 * 1. Checks Google Sheet for items with status "Ready to Post"
 * 2. Gets the first item ready to post
 * 3. Extracts Google Drive media URL
 * 4. Posts to enabled social media platforms via Blotato
 * 5. Updates status to "Posted" in Google Sheet
 * 6. Returns error report
 *
 * Triggered by:
 * - Vercel Cron (every 3 hours)
 * - Manual API call: POST /api/cron/post-everywhere
 */

// Platform configurations
// Set enabled: true for platforms you want to post to
const PLATFORM_CONFIG = [
  {
    platform: 'linkedin' as const,
    enabled: true,
    accountId: process.env.BLOTATO_LINKEDIN_ACCOUNT_ID || '9918',
    linkedinPageId: process.env.BLOTATO_LINKEDIN_PAGE_ID || '110230688', // Van Every Family Chiropractic Center
  },
  {
    platform: 'pinterest' as const,
    enabled: true,
    accountId: process.env.BLOTATO_PINTEREST_ACCOUNT_ID || '3537',
    pinterestBoardId: process.env.BLOTATO_PINTEREST_BOARD_ID || '110230688',
  },
  {
    platform: 'instagram' as const,
    enabled: false, // Set to true when ready
    accountId: process.env.BLOTATO_INSTAGRAM_ACCOUNT_ID || '',
  },
  {
    platform: 'facebook' as const,
    enabled: false, // Set to true when ready
    accountId: process.env.BLOTATO_FACEBOOK_ACCOUNT_ID || '',
  },
  {
    platform: 'twitter' as const,
    enabled: false, // Set to true when ready
    accountId: process.env.BLOTATO_TWITTER_ACCOUNT_ID || '',
  },
  {
    platform: 'tiktok' as const,
    enabled: false, // Set to true when ready
    accountId: process.env.BLOTATO_TIKTOK_ACCOUNT_ID || '',
  },
  {
    platform: 'youtube' as const,
    enabled: false, // Set to true when ready
    accountId: process.env.BLOTATO_YOUTUBE_ACCOUNT_ID || '',
  },
  {
    platform: 'threads' as const,
    enabled: false, // Set to true when ready
    accountId: process.env.BLOTATO_THREADS_ACCOUNT_ID || '',
  },
  {
    platform: 'bluesky' as const,
    enabled: false, // Set to true when ready
    accountId: process.env.BLOTATO_BLUESKY_ACCOUNT_ID || '',
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    logger.info('Post Everywhere cron job started');

    // Verify cron secret (optional security measure)
    const cronSecret = req.headers['x-vercel-cron-secret'] || req.query.secret;
    if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
      logger.warn('Invalid cron secret');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get Google Sheets client
    const sheetsClient = getGoogleSheetsClient();

    // Get first item with status "Ready to Post"
    logger.info('Checking Google Sheet for items ready to post');
    const readyItem = await sheetsClient.getFirstRow('Sheet1', {
      column: 'Status',
      value: 'Ready to Post',
    });

    if (!readyItem) {
      logger.info('No items ready to post');
      return res.status(200).json({
        success: true,
        message: 'No items ready to post',
        posted: false,
      });
    }

    logger.info('Found item ready to post', {
      title: readyItem.Title,
      hasCaption: !!readyItem.Caption,
      hasMedia: !!readyItem['Media URL (google drive)'],
    });

    // Extract data from sheet row
    const caption = readyItem.Caption || '';
    const mediaUrl = readyItem['Media URL (google drive)'];

    // Convert Google Drive URL to direct download link
    let directMediaUrl: string | undefined;
    if (mediaUrl) {
      try {
        directMediaUrl = getGoogleDriveDirectLink(mediaUrl);
        logger.info('Converted Google Drive URL to direct link');
      } catch (error: any) {
        logger.error('Failed to convert Google Drive URL', error);
        return res.status(400).json({
          success: false,
          error: 'Invalid Google Drive URL format',
        });
      }
    }

    // Get Blotato client
    const blotatoClient = getBlotatoClient();

    // Post to all enabled platforms
    const results: BlotatoPostResponse[] = [];
    const enabledPlatforms = PLATFORM_CONFIG.filter((p) => p.enabled);

    logger.info(`Posting to ${enabledPlatforms.length} platforms`);

    for (const platformConfig of enabledPlatforms) {
      if (!platformConfig.accountId) {
        logger.warn(`${platformConfig.platform}: Account ID not configured, skipping`);
        results.push({
          success: false,
          error: 'Account ID not configured',
          platform: platformConfig.platform,
        });
        continue;
      }

      logger.info(`Posting to ${platformConfig.platform}`);

      const result = await blotatoClient.createPost({
        platform: platformConfig.platform,
        accountId: platformConfig.accountId,
        caption: caption,
        mediaUrl: directMediaUrl,
        linkedinPageId: platformConfig.platform === 'linkedin' ? platformConfig.linkedinPageId : undefined,
        pinterestBoardId: platformConfig.platform === 'pinterest' ? platformConfig.pinterestBoardId : undefined,
      });

      results.push(result);

      if (result.success) {
        logger.info(`${platformConfig.platform}: Posted successfully`);
      } else {
        logger.error(`${platformConfig.platform}: Failed to post`, { error: result.error });
      }

      // Add delay between posts to avoid rate limiting
      await delay(2000); // 2 seconds
    }

    // Update status to "Posted" in Google Sheet
    logger.info('Updating Google Sheet status to "Posted"');
    await sheetsClient.updateRow('Sheet1', 'Caption', caption, {
      Status: 'Posted',
    });

    // Generate error report
    const errors = results.filter((r) => !r.success);
    const successes = results.filter((r) => r.success);

    logger.info('Post Everywhere cron job completed', {
      total: results.length,
      successes: successes.length,
      errors: errors.length,
    });

    return res.status(200).json({
      success: true,
      posted: true,
      item: {
        title: readyItem.Title,
        caption: caption.substring(0, 100) + '...', // Preview only
      },
      results: {
        total: results.length,
        successes: successes.length,
        errors: errors.length,
      },
      successfulPlatforms: successes.map((r) => r.platform),
      failedPlatforms: errors.map((r) => ({
        platform: r.platform,
        error: r.error,
      })),
    });
  } catch (error: any) {
    logger.error('Post Everywhere cron job failed', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Delay helper function
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
