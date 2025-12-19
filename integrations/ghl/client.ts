import axios, { AxiosInstance } from 'axios';

/**
 * Go High Level API Client
 * Documentation: https://highlevel.stoplight.io/docs/integrations/
 */

export interface GHLContact {
  id?: string;
  locationId: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  source?: string;
  [key: string]: any;
}

export interface GHLTag {
  id?: string;
  name: string;
  locationId: string;
}

export class GHLClient {
  private client: AxiosInstance;
  private locationId: string;

  constructor(apiKey: string, locationId: string) {
    this.locationId = locationId;

    this.client = axios.create({
      baseURL: 'https://rest.gohighlevel.com/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create or update a contact in GHL
   */
  async upsertContact(contact: GHLContact): Promise<any> {
    try {
      // Add location ID if not present
      contact.locationId = contact.locationId || this.locationId;

      // Search for existing contact by email or phone
      let existingContact = null;

      if (contact.email) {
        existingContact = await this.findContactByEmail(contact.email);
      } else if (contact.phone) {
        existingContact = await this.findContactByPhone(contact.phone);
      }

      if (existingContact) {
        // Update existing contact
        return await this.updateContact(existingContact.id, contact);
      } else {
        // Create new contact
        return await this.createContact(contact);
      }
    } catch (error: any) {
      console.error('Error upserting contact:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Create a new contact
   */
  async createContact(contact: GHLContact): Promise<any> {
    try {
      const response = await this.client.post('/contacts/', contact);
      return response.data;
    } catch (error: any) {
      console.error('Error creating contact:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Update an existing contact
   */
  async updateContact(contactId: string, updates: Partial<GHLContact>): Promise<any> {
    try {
      const response = await this.client.put(`/contacts/${contactId}`, updates);
      return response.data;
    } catch (error: any) {
      console.error('Error updating contact:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get contact by ID
   */
  async getContact(contactId: string): Promise<any> {
    try {
      const response = await this.client.get(`/contacts/${contactId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting contact:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Find contact by email
   */
  async findContactByEmail(email: string): Promise<any> {
    try {
      const response = await this.client.get('/contacts/', {
        params: {
          locationId: this.locationId,
          email: email,
        },
      });

      const contacts = response.data.contacts || [];
      return contacts.length > 0 ? contacts[0] : null;
    } catch (error: any) {
      console.error('Error finding contact by email:', error.response?.data || error.message);
      return null;
    }
  }

  /**
   * Find contact by phone
   */
  async findContactByPhone(phone: string): Promise<any> {
    try {
      const response = await this.client.get('/contacts/', {
        params: {
          locationId: this.locationId,
          phone: phone,
        },
      });

      const contacts = response.data.contacts || [];
      return contacts.length > 0 ? contacts[0] : null;
    } catch (error: any) {
      console.error('Error finding contact by phone:', error.response?.data || error.message);
      return null;
    }
  }

  /**
   * Add tags to a contact
   */
  async addTagsToContact(contactId: string, tags: string[]): Promise<any> {
    try {
      const response = await this.client.post(`/contacts/${contactId}/tags`, {
        tags: tags,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error adding tags to contact:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Remove tags from a contact
   */
  async removeTagsFromContact(contactId: string, tags: string[]): Promise<any> {
    try {
      const response = await this.client.delete(`/contacts/${contactId}/tags`, {
        data: { tags: tags },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error removing tags from contact:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Create a tag in GHL
   */
  async createTag(tagName: string): Promise<any> {
    try {
      const response = await this.client.post('/tags/', {
        name: tagName,
        locationId: this.locationId,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating tag:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get all tags for a location
   */
  async getTags(): Promise<any> {
    try {
      const response = await this.client.get('/tags/', {
        params: {
          locationId: this.locationId,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting tags:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Add contact to workflow
   */
  async addContactToWorkflow(contactId: string, workflowId: string): Promise<any> {
    try {
      const response = await this.client.post(`/contacts/${contactId}/workflows/${workflowId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error adding contact to workflow:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Update custom field for contact
   */
  async updateCustomField(contactId: string, fieldKey: string, value: any): Promise<any> {
    try {
      const response = await this.client.put(`/contacts/${contactId}/`, {
        customFields: {
          [fieldKey]: value,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating custom field:', error.response?.data || error.message);
      throw error;
    }
  }
}

/**
 * Get GHL client instance
 */
export function getGHLClient(): GHLClient {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    throw new Error('GHL_API_KEY and GHL_LOCATION_ID must be set in environment variables');
  }

  return new GHLClient(apiKey, locationId);
}
