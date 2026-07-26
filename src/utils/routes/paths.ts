export const PATHS = {
    PUBLIC: {
        HOME: '/',
        FEATURES: '/features',
    },
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot',
        RESET_PASSWORD: '/auth/reset',
        VERIFY_EMAIL: '/auth/verify',
    },
    ONBOARDING: {
        INVITE_ACCEPT: '/invite/accept',
        NO_WORKSPACE: '/no-workspace',
    },
    DASHBOARD: {
        ROOT: '/dashboard',
        MONITORS: {
            LIST: '/dashboard/monitors',
            CREATE: '/dashboard/monitors/create',
            DETAILS: (monitorId: string = ':monitorId') => `/dashboard/monitors/${monitorId}`,
        },
        INCIDENTS: {
            LIST: '/dashboard/incidents',
            DETAILS: (incidentId: string = ':incidentId') => `/dashboard/incidents/${incidentId}`,
        },
        SETTINGS: '/dashboard/settings',
        MEMBERS: '/dashboard/members',
        TEAM: '/dashboard/team',
    },
} 