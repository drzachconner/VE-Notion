import { google } from 'googleapis';

/**
 * Google Sheets API Client
 * Used to read/write content calendar data
 */

export interface SheetRow {
  Title?: string;
  'Media URL (google drive)'?: string;
  Caption?: string;
  Status?: string;
  [key: string]: any;
}

export class GoogleSheetsClient {
  private sheets: any;
  private spreadsheetId: string;

  constructor(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;

    // Initialize Google Sheets API with service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: this.getCredentials(),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  /**
   * Get Google service account credentials from environment
   */
  private getCredentials(): any {
    const credsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!credsJson) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable not set');
    }

    try {
      return JSON.parse(credsJson);
    } catch (error) {
      throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_JSON format');
    }
  }

  /**
   * Get rows from sheet with optional filter
   */
  async getRows(sheetName: string = 'Sheet1', filter?: { column: string; value: string }): Promise<SheetRow[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
      });

      const rows = response.data.values;

      if (!rows || rows.length === 0) {
        return [];
      }

      // First row is headers
      const headers = rows[0];
      const dataRows = rows.slice(1);

      // Convert to objects
      let objects = dataRows.map((row: any[]) => {
        const obj: SheetRow = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });

      // Apply filter if provided
      if (filter) {
        objects = objects.filter((obj) => obj[filter.column] === filter.value);
      }

      return objects;
    } catch (error: any) {
      console.error('Error reading Google Sheet:', error.message);
      throw error;
    }
  }

  /**
   * Get first row matching filter criteria
   */
  async getFirstRow(sheetName: string = 'Sheet1', filter: { column: string; value: string }): Promise<SheetRow | null> {
    const rows = await this.getRows(sheetName, filter);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Update a row in the sheet
   */
  async updateRow(
    sheetName: string = 'Sheet1',
    matchColumn: string,
    matchValue: string,
    updates: Partial<SheetRow>
  ): Promise<boolean> {
    try {
      // Get all rows to find the matching one
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
      });

      const rows = response.data.values;

      if (!rows || rows.length === 0) {
        return false;
      }

      const headers = rows[0];
      const matchColumnIndex = headers.indexOf(matchColumn);

      if (matchColumnIndex === -1) {
        throw new Error(`Column "${matchColumn}" not found in sheet`);
      }

      // Find row index that matches
      let rowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][matchColumnIndex] === matchValue) {
          rowIndex = i;
          break;
        }
      }

      if (rowIndex === -1) {
        console.warn(`No row found with ${matchColumn} = ${matchValue}`);
        return false;
      }

      // Build update values
      const updateValues = [...rows[rowIndex]];
      Object.keys(updates).forEach((key) => {
        const columnIndex = headers.indexOf(key);
        if (columnIndex !== -1) {
          updateValues[columnIndex] = updates[key];
        }
      });

      // Update the row (rowIndex is 0-based, but sheet rows are 1-based, +1 for header)
      const range = `${sheetName}!A${rowIndex + 1}:Z${rowIndex + 1}`;

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [updateValues],
        },
      });

      return true;
    } catch (error: any) {
      console.error('Error updating Google Sheet:', error.message);
      throw error;
    }
  }

  /**
   * Append a new row to the sheet
   */
  async appendRow(sheetName: string = 'Sheet1', data: SheetRow): Promise<boolean> {
    try {
      // Get headers to ensure correct column order
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A1:Z1`,
      });

      const headers = response.data.values?.[0] || [];

      // Build row values in correct order
      const values = headers.map((header: string) => data[header] || '');

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [values],
        },
      });

      return true;
    } catch (error: any) {
      console.error('Error appending to Google Sheet:', error.message);
      throw error;
    }
  }
}

/**
 * Get Google Sheets client instance
 */
export function getGoogleSheetsClient(spreadsheetId?: string): GoogleSheetsClient {
  const sheetId = spreadsheetId || process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID must be set in environment variables or provided as parameter');
  }

  return new GoogleSheetsClient(sheetId);
}
