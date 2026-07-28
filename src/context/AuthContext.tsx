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
    getStoredUser,
    setLastTenantId,
    setAuth,
    getLastTenantId,
    getStoredMemberships
} from "../lib/api/auth-storage";
import { tenantApi } from "../lib/api/tenant";

interface AuthContextValue {
    user: UserSession | null;
    memberships: MembershipSession[];
    activeTenantId: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    switchWorkspace: (targetTenantId: string) => Promise<MembershipSession>;
    updateMemberships: (newMemberships: MembershipSession[], targetTenantId?: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const token = getAccessToken();

    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ["auth", "user"],
        queryFn: () => getStoredUser(),
        initialData: getStoredUser(),
        staleTime: Infinity,
    });

    const { data: memberships = [], isLoading: isWorkspacesLoading } = useQuery({
        queryKey: ["auth", "memberships"],
        queryFn: async () => {
            const remoteWorkspaces = await tenantApi.getMyWorkspaces();
            if (user && token) {
                setAuth(token, user, remoteWorkspaces, getLastTenantId());
            }
            return remoteWorkspaces;
        },
        initialData: getStoredMemberships(),
        enabled: !!token,
        staleTime: Infinity
    });


    const { data: activeTenantId } = useQuery({
        queryKey: ["auth", "activeTenantId"],
        queryFn: () => getLastTenantId(),
        initialData: getLastTenantId(),
        staleTime: Infinity,
    });


    const switchWorkspace = async (targetTenantId: string): Promise<MembershipSession> => {
        const activeMembership = await tenantApi.switchWorkspace(targetTenantId);

        setLastTenantId(targetTenantId);
        queryClient.setQueryData(["auth", "activeTenantId"], targetTenantId);

        await queryClient.invalidateQueries({ queryKey: ["auth", "memberships"] });
        queryClient.invalidateQueries();

        return activeMembership;
    };

    const updateMemberships = (newMemberships: MembershipSession[], targetTenantId?: string) => {
        const updatedTenantId = targetTenantId || newMemberships[newMemberships.length - 1]?.tenantId;

        if (updatedTenantId) {
            setLastTenantId(updatedTenantId);
        }

        if (user && token) {
            setAuth(token, user, newMemberships, updatedTenantId || null);
        }

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
            isAuthenticated: !!token && !!user,
            isLoading: isUserLoading || isWorkspacesLoading,
            switchWorkspace,
            updateMemberships,
        }),
        [user, memberships, activeTenantId, isUserLoading, isWorkspacesLoading, token]
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