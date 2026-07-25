const TOKEN_KEY = "peeng_access_token";
const USER_KEY = "peeng_user";
const MEMBERSHIPS_KEY = "peeng_memberships";
const LAST_TENANT_KEY = "peeng_last_workspace_id";

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuth = (
    token: string,
    user: any,
    memberships: any[],
    lastTenantId: string | null
) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(MEMBERSHIPS_KEY, JSON.stringify(memberships));

    if (lastTenantId) {
        localStorage.setItem(LAST_TENANT_KEY, lastTenantId);
    } else {
        localStorage.removeItem(LAST_TENANT_KEY);
    }
};

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LAST_TENANT_KEY);
    localStorage.removeItem(MEMBERSHIPS_KEY);
};

export const getStoredUser = () => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
};

export const getStoredMemberships = () => {
    const raw = localStorage.getItem(MEMBERSHIPS_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const getLastTenantId = (): string | null => {
    return localStorage.getItem(LAST_TENANT_KEY);
};

export const setLastTenantId = (tenantId: string) => {
    localStorage.setItem(LAST_TENANT_KEY, tenantId);
};