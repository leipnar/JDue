export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Recurrence {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  // For 'weekly', array of numbers 0 (Sun) to 6 (Sat)
  daysOfWeek: number[]; 
  // For 'yearly', e.g., 1 for every year, 2 for every 2 years
  yearlyInterval: number;
}

export interface Reminder {
  value: number;
  unit: 'minutes' | 'hours' | 'days';
  // True for reminder before due date, false for after.
  isBefore: boolean; 
}

export interface Task {
  id: string;
  title: string;
  description: string;
  // ISO string format with time, e.g., from datetime-local input
  dueDate: string | null; 
  priority: Priority;
  isComplete: boolean;
  projectId: string;
  recurrence: Recurrence | null;
  reminders: Reminder[];
  // Key is a unique identifier for the reminder, value is timestamp of last notification
  notificationsSent: { [key: string]: number };
  labels: string[];
}

export interface Project {
  id: string;
  name: string;
  userId: string;
}

// A simplified structure to store what's needed for WebAuthn authentication
export interface PasskeyCredential {
  id: string; // The credential ID, base64url encoded
  publicKey: string; // The public key, base64url encoded
  algorithm: number; // The algorithm used, e.g., -7 for ES256
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash?: string; // The hashed password
  salt?: string; // A unique salt for each user
  isAdmin: boolean;
  passkeys: PasskeyCredential[];
  status: 'active' | 'banned' | 'deactivated';
}