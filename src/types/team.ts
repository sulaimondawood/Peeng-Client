export type RoleType = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
export type MembershipStatus = 'ACTIVE' | 'INVITED' | 'SUSPENDED' | "REMOVED";

export interface MembershipDTO {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    role: RoleType;
    status: MembershipStatus;
}

export interface MemberInviteDTO {
    email: string;
    role: RoleType;
}

export interface MemberRoleDTO {
    role: RoleType;
}

export interface InvitePreviewResponseDTO {
    email: string;
    isAlreadyRegistered: boolean;
    workspaceName: string;
}

export interface CompleteInviteRegistrationDTO {
    token: string;
    name: string;
    password?: string;
}

export interface TeamOverview {
    operators: number;
    activeOperators: number;
    pendingOperators: number;
    suspendedOperators: number;
}