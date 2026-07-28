
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UpdateNameRequest,
    UpdatePasswordRequest,
    VerifyEmailResponse,
} from "@/src/types/auth";
import { api, request } from "./config";
import { ApiResponse } from "@/src/types/api-response";

export const authApi = {
    register: async (payload: RegisterRequest) => {
        const { data } = await request.post<ApiResponse<RegisterResponse>>(
            "/auth/register",
            payload
        );
        return data.data;
    },

    login: async (payload: LoginRequest) => {
        const { data } = await request.post<ApiResponse<LoginResponse>>(
            "/auth/login",
            payload
        );
        return data.data;
    },

    verifyEmail: async (token: string) => {
        const { data } = await request.get<ApiResponse<VerifyEmailResponse>>(
            `/auth/verify-email?token=${encodeURIComponent(token)}`
        );
        return data.data;
    },

    resendVerificationEmail: async () => {
        const { data } = await request.post<ApiResponse<null>>(
            "/auth/resend-verification"
        );
        return data.data;
    },

    updateName: async (payload: UpdateNameRequest) => {
        const { data } = await api.patch<ApiResponse<null>>(
            "/auth/profile/name",
            payload
        );
        return data.data;
    },

    updatePassword: async (payload: UpdatePasswordRequest) => {
        const { data } = await api.put<ApiResponse<null>>(
            "/auth/profile/password",
            payload
        );
        return data.data;
    },
    forgotPassword: async (payload: { email: string }) => {
        const { data } = await api.post<ApiResponse<null>>(
            "/auth/forgot-password",
            payload
        );
        return data;
    },

    resetPassword: async (payload: {
        token: string;
        newPassword: string;
        confirmPassword: string;
    }) => {
        const { data } = await api.post<ApiResponse<null>>(
            "/auth/reset-password",
            payload
        );
        return data;
    },
};