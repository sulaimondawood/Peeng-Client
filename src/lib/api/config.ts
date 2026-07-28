import axios, { AxiosError } from "axios";
import { clearAuth, getAccessToken, getLastTenantId } from "./auth-storage";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (confiq) => {
        if (typeof window !== "undefined") {
            const token = getAccessToken()
            if (token) {
                confiq.headers.Authorization = `Bearer ${token}`;
                confiq.headers["X-Tenant-ID"] = getLastTenantId()
            }
        }
        return confiq;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any>) => {
        if (!error.response) {
            console.error("Network Error:", error);
            return Promise.reject(new Error("Network error occurred"));
        }

        const { status, data } = error.response;

        if (status === 401) {
            clearAuth();
            window.location.href = "/auth/login";
        }

        if (status >= 500) {
            console.error("Server Error:", data?.message || error.message);
        }

        return Promise.reject(error);
    },
);
