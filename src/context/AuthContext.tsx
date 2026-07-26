
import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MembershipSession, UserSession } from "../types/auth";
import {
    getAccessToken,
    getStoredMemberships,
    getStoredUser,
    setLastTenantId,
    setAuth,
    getLastTenantId
} from "../lib/api/auth-storage";

interface AuthContextValue {
    user: UserSession | null;
    memberships: MembershipSession[];
    activeTenantId: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    switchWorkspace: (membership: MembershipSession) => void;
    updateMemberships: (newMemberships: MembershipSession[], targetTenantId?: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({
        queryKey: ["auth", "user"],
        queryFn: () => getStoredUser(),
        initialData: getStoredUser(),
        staleTime: Infinity,
    });

    const { data: memberships = [] } = useQuery({
        queryKey: ["auth", "memberships"],
        queryFn: () => getStoredMemberships(),
        initialData: getStoredMemberships(),
        staleTime: Infinity,
    });

    const { data: activeTenantId } = useQuery({
        queryKey: ["auth", "activeTenantId"],
        queryFn: () => getLastTenantId(),
        initialData: getLastTenantId(),
        staleTime: Infinity,
    });


    const switchWorkspace = (membership: MembershipSession) => {
        setLastTenantId(membership.tenantId);
        queryClient.setQueryData(["auth", "activeTenantId"], membership.tenantId);
        queryClient.invalidateQueries();
    };


    const updateMemberships = (newMemberships: MembershipSession[], targetTenantId?: string) => {
        const updatedTenantId = targetTenantId || newMemberships[newMemberships.length - 1]?.tenantId;

        if (updatedTenantId) {
            setLastTenantId(updatedTenantId);
        }


        if (user) {
            setAuth(getAccessToken() || "", user, newMemberships, updatedTenantId || null);
        }

        // Instantly update React Query cache across app
        queryClient.setQueryData(["auth", "memberships"], newMemberships);
        if (updatedTenantId) {
            queryClient.setQueryData(["auth", "activeTenantId"], updatedTenantId);
        }
        queryClient.invalidateQueries();
    };

    const value = useMemo(
        () => ({
            user: user ?? null,
            memberships,
            activeTenantId: activeTenantId || memberships[0]?.tenantId || null,
            isAuthenticated: !!getAccessToken() && !!user,
            isLoading,
            switchWorkspace,
            updateMemberships,
        }),
        [user, memberships, activeTenantId, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}