import { MonitorStatus } from "./types/monitor";

export interface CheckHistoryItem {
  id: string;
  timestamp: string;
  status: 'UP' | 'DOWN';
  responseTime: number;
  statusCode: number;
  message?: string;
}

export interface Monitor {
  id: string;
  name: string;
  url: string;
  status: MonitorStatus;
  interval: number; // in seconds
  timeout: number; // in ms
  expectedStatus: number;
  expectedKeyword: string;
  failureThreshold: number;
  recoveryThreshold: number;
  lastChecked: string;
  uptime: number; // percentage, e.g. 99.94
  responseTime: number; // current last checked response time in ms
  tags: string[];
  sslStatus?: {
    valid: boolean;
    expiresInDays: number;
    issuer: string;
  };
}

export type IncidentStatus = 'OPEN' | 'RESOLVED';
export type IncidentSeverity = 'CRITICAL' | 'WARNING';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Incident {
  id: string;
  title: string;
  monitorId: string;
  monitorName: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  openedAt: string;
  resolvedAt?: string;
  timeline: TimelineEvent[];
}

export type Role = 'owner' | 'admin' | 'member' | 'viewer';

export interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  status: 'active' | 'invited' | 'expired';
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

export interface Workspace {
  slug: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

