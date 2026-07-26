// src/hooks/use-auth.ts
import { useAppState } from "@/src/context/StateContext";
import { authApi } from "@/src/lib/api/auth";
import { clearAuth, setAuth } from "@/src/lib/api/auth-storage";
import { LoginRequest } from "@/src/types/auth";
import { PATHS } from "@/src/utils/routes/paths";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";


export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { addToast } = useAppState();


    return useMutation({
        mutationFn: (payload: LoginRequest) => authApi.login(payload),
        onSuccess: (data) => {

            const lastTenantId =
                data.lastTenantId ||
                data.memberships[0]?.tenantId ||
                null;

            setAuth(data.accessToken, data.user, data.memberships, lastTenantId);

            queryClient.setQueryData(["auth", "user"], data.user);
            queryClient.setQueryData(["auth", "memberships"], data.memberships);

            if (!data.user.emailVerified) {
                navigate("/verify-email");
                return;
            }

            if (data.memberships.length === 0) {
                navigate("/onboarding");
                return;
            }

            navigate("/dashboard");
        },
        onError: (error: AxiosError<any>) => {
            const message =
                error.response?.data?.message || "Login failed. Please try again.";
            addToast(message, "error");
        },
    });
}

export function useRegister() {
    const { addToast } = useAppState();


    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            addToast(data?.message)
        },
        onError: (error: AxiosError<any>) => {
            const message =
                error.response?.data?.message || "Registration failed. Please try again.";
            addToast(message, "error");
        },
    });
}

export function useVerifyEmail(token: string) {
    return useQuery({
        queryFn: () => authApi.verifyEmail(token),
        queryKey: ["verify", token],
        enabled: !!token,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}

export function useResendVerification() {
    return useMutation({
        mutationFn: authApi.resendVerificationEmail,
    });
}

export function useUpdateName() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.updateName,
        onSuccess: (_, variables) => {
            queryClient.setQueryData(["auth", "user"], (old: any) =>
                old ? { ...old, name: variables.name } : old
            );
        },
    });
}

export function useUpdatePassword() {
    return useMutation({
        mutationFn: authApi.updatePassword,
    });
}

export function useLogout() {

    const queryClient = useQueryClient();

    return () => {
        clearAuth();
        queryClient.clear();
        window.location.replace(PATHS.AUTH.LOGIN);
    };
}