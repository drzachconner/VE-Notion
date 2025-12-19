/**
 * Simple logging utility
 * Can be extended to use a logging service like Datadog, LogRocket, etc.
 */

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

class Logger {
  private logLevel: LogLevel;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
  }

  error(message: string, error?: any) {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message, error));
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message, data));
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(LogLevel.INFO, message, data));
    }
  }

  debug(message: string, data?: any) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, data));
    }
  }

  /**
   * Log without PHI (Protected Health Information)
   * Use this when logging patient-related data
   */
  logSafe(level: LogLevel, message: string, data?: any) {
    const sanitizedData = this.sanitizePHI(data);

    switch (level) {
      case LogLevel.ERROR:
        this.error(message, sanitizedData);
        break;
      case LogLevel.WARN:
        this.warn(message, sanitizedData);
        break;
      case LogLevel.INFO:
        this.info(message, sanitizedData);
        break;
      case LogLevel.DEBUG:
        this.debug(message, sanitizedData);
        break;
    }
  }

  /**
   * Remove or mask PHI from log data
   */
  private sanitizePHI(data: any): any {
    if (!data) return data;

    const sensitiveFields = [
      'email',
      'phone',
      'ssn',
      'dateOfBirth',
      'address',
      'medicalRecordNumber',
    ];

    if (typeof data === 'object') {
      const sanitized = { ...data };

      sensitiveFields.forEach((field) => {
        if (sanitized[field]) {
          sanitized[field] = '***REDACTED***';
        }
      });

      // Recursively sanitize nested objects
      Object.keys(sanitized).forEach((key) => {
        if (typeof sanitized[key] === 'object') {
          sanitized[key] = this.sanitizePHI(sanitized[key]);
        }
      });

      return sanitized;
    }

    return data;
  }
}

export const logger = new Logger();
