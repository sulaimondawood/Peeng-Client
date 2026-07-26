
import { IncidentFilterRequest } from "@/src/types/incident";
import { parseIncidentFilters, toApiFilters, toSearchParams } from "@/src/utils";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";


export function useIncidentFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => parseIncidentFilters(searchParams),
        [searchParams]
    );

    const apiFilters = useMemo(() => toApiFilters(filters), [filters]);

    const setFilters = useCallback(
        (patch: Partial<IncidentFilterRequest>) => {
            const next: IncidentFilterRequest = {
                ...filters,
                ...patch,
            };


            if (patch.page === undefined) {
                next.page = 0;
            }


            if (patch.dateBucket && patch.dateBucket !== "CUSTOM") {
                next.startDate = undefined;
                next.endDate = undefined;
                next.date = undefined;
            }
            if (patch.dateBucket === "CUSTOM") {
                next.date = undefined;
            }
            if (patch.dateBucket === "ON_DATE" || patch.date) {
                next.startDate = undefined;
                next.endDate = undefined;
            }

            setSearchParams(toSearchParams(next), { replace: true });
        },
        [filters, setSearchParams]
    );

    const resetFilters = useCallback(() => {
        setSearchParams(new URLSearchParams(), { replace: true });
    }, [setSearchParams]);

    return {
        filters,      // full UI state (from URL)
        apiFilters,   // cleaned payload for the API
        setFilters,
        resetFilters,
    };
}