export type MonitorLifecycleStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
export type Severity = 'CRITICAL' | 'WARNING' | 'INFO';
export type MonitorHttpType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
export type MonitorType = 'HTTP' | 'PING' | 'PORT';
export type TimeUnit = 'SECONDS' | 'MINUTES' | 'HOURS';
export type MonitorStatus = 'UP' | 'DOWN' | 'PENDING' | 'PAUSED';


export interface CreateMonitorRequest {
    name: string;
    url: string;
    intervalValue: number;
    intervalUnit: TimeUnit;
    timeoutSeconds: number;
    failureThreshold: number;
    recoveryThreshold: number;
    expectedStatusCode: number;
    expectedKeyword?: string;
}

export interface MonitorResponse {
    id: string;
    name: string;
    url: string;
    slug: string;
    type: MonitorType;
    status: MonitorStatus;
    method: MonitorHttpType;
    intervalInSeconds: number;
    nextCheckAt: string;
    timeoutInSeconds: number;
    latestResponseTimeMs: number | null;
    lifecycle: MonitorLifecycleStatus;
}

export interface MonitorStats {
    uptimePercentage: number;
    averageResponseTime: number;
    maxResponseTime: number;
    minResponseTime: number;
    totalChecks: number;
    successfulChecks: number;
    failedChecks: number;
    incidentCount: number;
}

export interface ResponseTimePoint {
    timestamp: string;
    responseTimeMs: number;
    minResponseTime: number;
    maxResponseTime: number;
    successfulCount: number;
}

export interface UptimeBlock {
    timestamp: string;
    responseTimeMs: number;
    successfulCount: number;
    containedCount: number;
    uptimePercentage: number;
}

export interface MonitorCheck {
    statusCode: number;
    responseTimeMs: number;
    errorMessage: string | null;
    checkedAt: string;
    successful: boolean;
}

export interface IncidentResponse {
    id: string;
    status: IncidentStatus;
    latestErrorMessage: string | null;
    initialStatusCode: number;
    resolvedStatusCode: number | null;
    durationSeconds: number | null;
    monitor: MonitorResponse;
    severity: Severity;
}