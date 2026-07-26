import { MonitorResponse } from "@/src/types/dashboard";
import { Meta } from "./meta";

export type IncidentStatus = "OPEN" | "INVESTIGATING" | "RESOLVED" | "MONITORING";
export type Severity = "CRITICAL" | "WARNING" | "INFO";
export type ActivityType = "STATUS_CHANGE" | "ASSIGNMENT" | "DIAGNOSTIC" | "COMMENT" | "NOTIFICATION";

export interface IncidentDTO {
    id: string;
    status: IncidentStatus;
    latestErrorMessage: string | null;
    initialStatusCode: number | null;
    resolvedStatusCode: number | null;
    durationSeconds: number | null;
    monitor: MonitorResponse;
    severity: Severity;
}

export interface IncidentNotificationTraceDTO {
    // add fields if you have them; placeholder for now
    id?: string;
    channel?: string;
    status?: string;
    sentAt?: string;
}

export interface IncidentOverview {
    outageDuration: number | null;
    monitor: MonitorResponse;
    assignedTo: string | null;
    notificationTrace: IncidentNotificationTraceDTO[];
}

export interface IncidentDiagnosticTraceDTO {
    message: string;
    statusCode: number;
    responseTimeMs: number;
    successful: boolean;
}

export interface IncidentActivityDTO {
    occurredAt: string;
    title: string;
    message: string;
    type: ActivityType;
}

export interface MembershipResponse {
    id: string;
    name: string;
}

export interface IncidentFilterRequest {
    status?: string;
    monitorId?: string;
    dateBucket?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}


export interface PaginatedIncidents {
    data: IncidentDTO[];
    meta: Meta;
}