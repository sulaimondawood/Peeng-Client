export interface CreateTenantRequest {
    workspaceName: string;
}

export interface TenantSessionDTO {
    tenantId: string;
    workspaceName: string;
    role: string;
}