import axios, { AxiosInstance } from 'axios';

/**
 * Blotato API Client
 * Documentation: https://help.blotato.com/api
 */

export interface BlotatoPostOptions {
  platform: 'linkedin' | 'pinterest' | 'instagram' | 'twitter' | 'youtube' | 'threads' | 'bluesky' | 'tiktok' | 'facebook';
  accountId: string;
  caption: string;
  mediaUrl?: string;
  linkedinPageId?: string;
  pinterestBoardId?: string;
}

export interface BlotatoPostResponse {
  success: boolean;
  postId?: string;
  error?: string;
  platform: string;
}

export class BlotatoClient {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: 'https://backend.blotato.com/v2',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create a post on a social media platform
   */
  async createPost(options: BlotatoPostOptions): Promise<BlotatoPostResponse> {
    try {
      const payload = this.buildPayload(options);

      const response = await this.client.post('/posts', payload);

      return {
        success: true,
        postId: response.data.id,
        platform: options.platform,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        platform: options.platform,
      };
    }
  }

  /**
   * Build API payload for specific platform
   */
  private buildPayload(options: BlotatoPostOptions): any {
    const basePayload = {
      platform: options.platform,
      accountId: options.accountId,
      content: {
        text: options.caption,
      },
    };

    // Add media URL if provided
    if (options.mediaUrl) {
      basePayload.content['mediaUrls'] = [options.mediaUrl];
    }

    // Platform-specific options
    const platformOptions: any = {};

    if (options.platform === 'linkedin' && options.linkedinPageId) {
      platformOptions.linkedinPageId = options.linkedinPageId;
    }

    if (options.platform === 'pinterest' && options.pinterestBoardId) {
      platformOptions.pinterestBoardId = options.pinterestBoardId;
    }

    return {
      ...basePayload,
      ...platformOptions,
    };
  }

  /**
   * Get list of connected accounts
   */
  async getAccounts(): Promise<any> {
    try {
      const response = await this.client.get('/accounts');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching Blotato accounts:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Upload media to Blotato
   * (Alternative to using Google Drive direct links)
   */
  async uploadMedia(mediaUrl: string): Promise<string> {
    try {
      const response = await this.client.post('/media/upload', {
        url: mediaUrl,
      });

      return response.data.uploadedUrl;
    } catch (error: any) {
      console.error('Error uploading media to Blotato:', error.response?.data || error.message);
      throw error;
    }
  }
}

/**
 * Get Blotato client instance
 */
export function getBlotatoClient(): BlotatoClient {
  const apiKey = process.env.BLOTATO_API_KEY;

  if (!apiKey) {
    throw new Error('BLOTATO_API_KEY must be set in environment variables');
  }

  return new BlotatoClient(apiKey);
}

/**
 * Convert Google Drive URL to direct download link
 */
export function getGoogleDriveDirectLink(driveUrl: string): string {
  // Extract file ID from Google Drive URL
  const match = driveUrl.match(/https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/i);

  if (!match || !match[1]) {
    throw new Error(`Invalid Google Drive URL: ${driveUrl}`);
  }

  const fileId = match[1];

  // Return direct download link
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
