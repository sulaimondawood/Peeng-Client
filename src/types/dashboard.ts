
export type MonitorType = "HTTP" | "TCP" | "PING" | "DNS";
export type MonitorStatus = "UP" | "DOWN" | "DEGRADED" | "PAUSED" | "PENDING";
export type MonitorHttpType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
export type IncidentStatus = "OPEN" | "INVESTIGATING" | "RESOLVED" | "MONITORING";
export type MonitorLifeycle = "ACTIVE" | "DELETED" | "PAUSED"
export interface DashboardOverview {
    activeMonitorsCount: number;
    totalMonitorsCount: number;
    downMonitorsCount: number;
    openIncidentsCount: number;
    avgLatencyMs: number;
}

export interface MonitorResponse {
    id: string;
    name: string;
    url: string;
    slug: string;
    type: MonitorType;
    status: MonitorStatus;
    lifecycle: MonitorLifeycle;
    method: MonitorHttpType;
    intervalInSeconds: number;
    nextCheckAt: string | null;
    timeoutInSeconds: number;
    latestResponseTimeMs: number
}

export interface IncidentResponse {
    id: string;
    severity: string;
    status: IncidentStatus;
    latestErrorMessage: string | null;
    initialStatusCode: number | null;
    resolvedStatusCode: number | null;
    durationSeconds: number | null;
    monitor: MonitorResponse;
}