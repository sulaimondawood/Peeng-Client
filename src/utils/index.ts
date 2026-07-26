import { IncidentFilterRequest } from "../types/incident";

const DEFAULTS: IncidentFilterRequest = {
    page: 0,
    size: 25,
};

export function parseIncidentFilters(
    searchParams: URLSearchParams
): IncidentFilterRequest {
    const page = Number(searchParams.get("page"));
    const size = Number(searchParams.get("size"));

    return {
        status: searchParams.get("status") || undefined,
        monitorId: searchParams.get("monitorId") || undefined,
        dateBucket: searchParams.get("dateBucket") || undefined,
        date: searchParams.get("date") || undefined,
        startDate: searchParams.get("startDate") || undefined,
        endDate: searchParams.get("endDate") || undefined,
        page: Number.isFinite(page) && page >= 0 ? page : DEFAULTS.page,
        size: Number.isFinite(size) && size >= 1 ? size : DEFAULTS.size,
    };
}

export function toSearchParams(
    filters: IncidentFilterRequest
): URLSearchParams {
    const params = new URLSearchParams();

    if (filters.status) params.set("status", filters.status);
    if (filters.monitorId) params.set("monitorId", filters.monitorId);
    if (filters.dateBucket) params.set("dateBucket", filters.dateBucket);
    if (filters.date) params.set("date", filters.date);
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);

    // Only put page/size in URL when not default (keeps URLs clean)
    if (filters.page && filters.page > 0) {
        params.set("page", String(filters.page));
    }
    if (filters.size && filters.size !== 25) {
        params.set("size", String(filters.size));
    }

    return params;
}


export function toApiFilters(
    filters: IncidentFilterRequest
): IncidentFilterRequest {
    const base: IncidentFilterRequest = {
        status: filters.status,
        monitorId: filters.monitorId,
        page: filters.page ?? 0,
        size: filters.size ?? 25,
    };

    switch (filters.dateBucket) {
        case "TODAY":
        case "YESTERDAY":
        case "LAST_7_DAYS":
        case "LAST_30_DAYS":
            return { ...base, dateBucket: filters.dateBucket };

        case "CUSTOM":
            return {
                ...base,
                dateBucket: "CUSTOM",
                startDate: filters.startDate,
                endDate: filters.endDate,
            };

        case "ON_DATE":
            return {
                ...base,
                date: filters.date,
            };

        default:
            return base;
    }
}