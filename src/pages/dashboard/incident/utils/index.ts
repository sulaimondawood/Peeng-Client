import type { IncidentDTO } from "@/src/types/incident";

export function getIncidentTitle(inc: IncidentDTO) {
    return inc.latestErrorMessage || `${inc.monitor?.name ?? "Monitor"} outage`;
}

export function formatDuration(seconds?: number | null) {
    if (seconds == null) return "—";
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const rem = mins % 60;
    return `${hours}h ${rem}m`;
}

export function exportIncidentsCsv(incidents: IncidentDTO[]) {
    if (!incidents.length) return;

    const headers =
        "ID,Status,Monitor,Severity,Error,DurationSeconds,InitialStatusCode\n";

    const rows = incidents
        .map((inc) =>
            [
                inc.id,
                inc.status,
                inc.monitor?.name ?? "",
                inc.severity ?? "",
                (inc.latestErrorMessage ?? "").replace(/"/g, '""'),
                inc.durationSeconds ?? "",
                inc.initialStatusCode ?? "",
            ]
                .map((v) => `"${v}"`)
                .join(",")
        )
        .join("\n");

    const blob = new Blob([headers + rows], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `incidents_report_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}

export const DATE_PRESETS = [
    { label: "Any time", value: undefined },
    { label: "Today", value: "TODAY" },
    { label: "Yesterday", value: "YESTERDAY" },
    { label: "Last 7 days", value: "LAST_7_DAYS" },
    { label: "Last 30 days", value: "LAST_30_DAYS" },
    { label: "Custom range", value: "CUSTOM" },
] as const;