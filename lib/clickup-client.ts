import axios, { AxiosInstance } from 'axios';
import { ClickUpTask } from '../types/task';

/**
 * ClickUp API Client
 * Documentation: https://clickup.com/api
 */

export interface ClickUpUser {
  id: string;
  username: string;
  email: string;
  initials: string;
}

export interface ClickUpList {
  id: string;
  name: string;
  space: {
    id: string;
    name: string;
  };
}

export interface ClickUpTaskResponse {
  id: string;
  name: string;
  status: {
    status: string;
    type: string;
  };
  date_created: string;
  date_updated: string;
  assignees: ClickUpUser[];
  url: string;
}

export class ClickUpClient {
  private client: AxiosInstance;

  constructor(apiToken: string) {
    this.client = axios.create({
      baseURL: 'https://api.clickup.com/api/v2',
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create a task in ClickUp
   */
  async createTask(task: ClickUpTask): Promise<ClickUpTaskResponse> {
    try {
      const payload = {
        name: task.name,
        description: task.description,
        assignees: task.assignees,
        priority: this.mapPriorityToValue(task.priority),
        due_date: task.dueDate,
        status: task.status,
        tags: task.tags || [],
        custom_fields: this.formatCustomFields(task.customFields),
      };

      const response = await this.client.post(
        `/list/${task.listId}/task`,
        payload
      );

      return response.data;
    } catch (error: any) {
      console.error('Error creating ClickUp task:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get task by ID
   */
  async getTask(taskId: string): Promise<ClickUpTaskResponse> {
    try {
      const response = await this.client.get(`/task/${taskId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting ClickUp task:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Update task
   */
  async updateTask(taskId: string, updates: Partial<ClickUpTask>): Promise<ClickUpTaskResponse> {
    try {
      const payload: any = {};

      if (updates.name) payload.name = updates.name;
      if (updates.description) payload.description = updates.description;
      if (updates.status) payload.status = updates.status;
      if (updates.priority) payload.priority = this.mapPriorityToValue(updates.priority);
      if (updates.dueDate) payload.due_date = updates.dueDate;
      if (updates.assignees) payload.assignees = updates.assignees;

      const response = await this.client.put(`/task/${taskId}`, payload);
      return response.data;
    } catch (error: any) {
      console.error('Error updating ClickUp task:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Delete task
   */
  async deleteTask(taskId: string): Promise<void> {
    try {
      await this.client.delete(`/task/${taskId}`);
    } catch (error: any) {
      console.error('Error deleting ClickUp task:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Add comment to task
   */
  async addComment(taskId: string, comment: string): Promise<any> {
    try {
      const response = await this.client.post(`/task/${taskId}/comment`, {
        comment_text: comment,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error adding comment:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get lists in a folder
   */
  async getLists(folderId: string): Promise<ClickUpList[]> {
    try {
      const response = await this.client.get(`/folder/${folderId}/list`);
      return response.data.lists;
    } catch (error: any) {
      console.error('Error getting lists:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get workspace members
   */
  async getWorkspaceMembers(workspaceId: string): Promise<ClickUpUser[]> {
    try {
      const response = await this.client.get(`/team/${workspaceId}/user`);
      return response.data.members;
    } catch (error: any) {
      console.error('Error getting workspace members:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Map priority string to ClickUp priority value
   * ClickUp uses: 1 = urgent, 2 = high, 3 = normal, 4 = low
   */
  private mapPriorityToValue(priority: string): number {
    const priorityMap: Record<string, number> = {
      'urgent': 1,
      'high': 2,
      'normal': 3,
      'low': 4,
    };

    return priorityMap[priority] || 3; // Default to normal
  }

  /**
   * Format custom fields for ClickUp API
   */
  private formatCustomFields(customFields?: Record<string, any>): any[] {
    if (!customFields) return [];

    // This will need to be mapped to actual custom field IDs
    // For now, return empty array
    // TODO: Map custom field names to ClickUp field IDs
    return [];
  }
}

/**
 * Get ClickUp client instance
 */
export function getClickUpClient(): ClickUpClient {
  const apiToken = process.env.CLICKUP_API_TOKEN;

  if (!apiToken) {
    throw new Error('CLICKUP_API_TOKEN must be set in environment variables');
  }

  return new ClickUpClient(apiToken);
}
