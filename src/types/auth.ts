// src/types/auth.ts

export type RoleType = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export interface UserSession {
    name: string;
    email: string;
    emailVerified: boolean;
    avatarUrl: string | null;
}

export interface MembershipSession {
    id: string;
    tenantId: string;
    workspaceName: string;
    slug: string;
    role: RoleType;
    status: "ACTIVE" | "INVITED" | "SUSPENDED";
}

export interface LoginResponse {
    accessToken: string;
    memberships: MembershipSession[];
    user: UserSession;
    message?: string | null;
    lastTenantId: string | null
}

export interface RegisterResponse {
    email: string;
    requiresEmailVerification: boolean;
    message: string;
}

export interface VerifyEmailResponse {
    success: boolean;
    message: string;
    email: string;
    newTokenSent?: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    workspaceName: string;
}

export interface UpdateNameRequest {
    name: string;
}

export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}