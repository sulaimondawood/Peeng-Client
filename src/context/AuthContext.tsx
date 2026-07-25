// src/context/auth-context.tsx
import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { MembershipSession, UserSession } from "../types/auth";
import { getAccessToken, getStoredMemberships, getStoredUser } from "../lib/api/auth-storage";


interface AuthContextValue {
    user: UserSession | null;
    memberships: MembershipSession[];
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
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

    const value = useMemo(
        () => ({
            user: user ?? null,
            memberships,
            isAuthenticated: !!getAccessToken() && !!user,
            isLoading,
        }),
        [user, memberships, isLoading]
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