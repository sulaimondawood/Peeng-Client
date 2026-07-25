import { Monitor, Incident, Member, Invoice, CheckHistoryItem } from './types';

export const INITIAL_MONITORS: Monitor[] = [
  {
    id: 'mon-1',
    name: 'Acme Frontend SPA',
    url: 'https://acme.com',
    status: 'UP',
    interval: 30,
    timeout: 3000,
    expectedStatus: 200,
    expectedKeyword: 'Vercel',
    failureThreshold: 2,
    recoveryThreshold: 2,
    lastChecked: 'Just now',
    uptime: 99.98,
    responseTime: 84,
    tags: ['production', 'frontend'],
    sslStatus: {
      valid: true,
      expiresInDays: 142,
      issuer: "Let's Encrypt Authority X3"
    }
  },
  {
    id: 'mon-2',
    name: 'Acme Auth Service',
    url: 'https://api.acme.com/v1/auth',
    status: 'UP',
    interval: 30,
    timeout: 2000,
    expectedStatus: 200,
    expectedKeyword: 'OK',
    failureThreshold: 3,
    recoveryThreshold: 1,
    lastChecked: '2s ago',
    uptime: 100.00,
    responseTime: 142,
    tags: ['production', 'backend', 'critical'],
    sslStatus: {
      valid: true,
      expiresInDays: 84,
      issuer: "Let's Encrypt Authority X3"
    }
  },
  {
    id: 'mon-3',
    name: 'Acme Database API Node',
    url: 'https://db-node.acme.internal/healthz',
    status: 'DOWN',
    interval: 15,
    timeout: 5000,
    expectedStatus: 200,
    expectedKeyword: '',
    failureThreshold: 2,
    recoveryThreshold: 2,
    lastChecked: '12s ago',
    uptime: 98.42,
    responseTime: 0,
    tags: ['internal', 'database'],
  },
  {
    id: 'mon-4',
    name: 'Acme Payment Webhook Handler',
    url: 'https://hooks.stripe.com/acme-callback',
    status: 'PAUSED',
    interval: 60,
    timeout: 4000,
    expectedStatus: 200,
    expectedKeyword: '',
    failureThreshold: 3,
    recoveryThreshold: 3,
    lastChecked: '1h ago',
    uptime: 99.50,
    responseTime: 0,
    tags: ['production', 'billing']
  },
  {
    id: 'mon-5',
    name: 'Acme Search Service (Elastic)',
    url: 'https://search.acme.com/_cluster/health',
    status: 'PENDING',
    interval: 30,
    timeout: 2000,
    expectedStatus: 200,
    expectedKeyword: 'green',
    failureThreshold: 2,
    recoveryThreshold: 2,
    lastChecked: 'Never',
    uptime: 100.00,
    responseTime: 0,
    tags: ['search', 'internal']
  }
];

export const INITIAL_CHECK_HISTORY: Record<string, CheckHistoryItem[]> = {
  'mon-1': Array.from({ length: 30 }, (_, i) => ({
    id: `ch-1-${i}`,
    timestamp: new Date(Date.now() - (30 - i) * 60000).toISOString(),
    status: 'UP',
    responseTime: Math.floor(Math.random() * 40) + 65,
    statusCode: 200
  })),
  'mon-2': Array.from({ length: 30 }, (_, i) => ({
    id: `ch-2-${i}`,
    timestamp: new Date(Date.now() - (30 - i) * 60000).toISOString(),
    status: 'UP',
    responseTime: Math.floor(Math.random() * 60) + 120,
    statusCode: 200
  })),
  'mon-3': Array.from({ length: 30 }, (_, i) => {
    const isDown = i > 25; // simulate going down at the end
    return {
      id: `ch-3-${i}`,
      timestamp: new Date(Date.now() - (30 - i) * 60000).toISOString(),
      status: isDown ? 'DOWN' : 'UP',
      responseTime: isDown ? 0 : Math.floor(Math.random() * 80) + 180,
      statusCode: isDown ? 503 : 200,
      message: isDown ? 'Service unavailable / Timeout exceeded' : undefined
    } as CheckHistoryItem;
  }),
  'mon-4': [],
  'mon-5': []
};

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-1',
    title: 'Database connection pools exhausted',
    monitorId: 'mon-3',
    monitorName: 'Acme Database API Node',
    status: 'OPEN',
    severity: 'CRITICAL',
    openedAt: new Date(Date.now() - 3600000).toISOString(), // 1h ago
    timeline: [
      {
        id: 't-1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        title: 'Incident opened automatically',
        description: 'Monitor Acme Database API Node detected active status DOWN (Expected 200, received 503 Service unavailable).'
      },
      {
        id: 't-2',
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        title: 'PagerDuty & Slack notifications sent',
        description: 'Alerted On-Call channel #ops-alerts and notified sulaimond70@gmail.com'
      },
      {
        id: 't-3',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        title: 'Diagnostics check performed',
        description: 'Server returned payload: max_connections exceeded (1000/1000).'
      }
    ]
  },
  {
    id: 'inc-2',
    title: 'Frontend CDN asset spike latency',
    monitorId: 'mon-1',
    monitorName: 'Acme Frontend SPA',
    status: 'RESOLVED',
    severity: 'WARNING',
    openedAt: new Date(Date.now() - 7200000).toISOString(), // 2h ago
    resolvedAt: new Date(Date.now() - 5400000).toISOString(), // 1.5h ago
    timeline: [
      {
        id: 't-4',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        title: 'Performance degradation alert',
        description: 'Monitor Acme Frontend SPA average response time exceeded 2000ms threshold (measured 2410ms).'
      },
      {
        id: 't-5',
        timestamp: new Date(Date.now() - 6000000).toISOString(),
        title: 'Vercel Edge Network routing update',
        description: 'Traffic re-routed around degraded transatlantic cables. Automated node recovery.'
      },
      {
        id: 't-6',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        title: 'Incident resolved',
        description: 'Monitor response time recovered (measured 74ms) below threshold. System returned to status UP.'
      }
    ]
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    name: 'Sulaimon D.',
    email: 'sulaimond70@gmail.com',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop',
    status: 'active'
  },
  {
    id: 'mem-2',
    name: 'Alexander V.',
    email: 'alex@acme.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop',
    status: 'active'
  },
  {
    id: 'mem-3',
    name: 'Charlotte Green',
    email: 'c.green@acme.com',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
    status: 'active'
  },
  {
    id: 'mem-4',
    name: 'Devon Wells (On Call)',
    email: 'devon@acme.com',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop',
    status: 'invited'
  },
  {
    id: 'mem-5',
    name: 'Marcus Sterling',
    email: 'marcus@acme.com',
    role: 'viewer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=96&h=96&fit=crop',
    status: 'expired'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-004',
    date: '2026-05-15',
    amount: 49.00,
    status: 'paid'
  },
  {
    id: 'INV-2026-003',
    date: '2026-04-15',
    amount: 49.00,
    status: 'paid'
  },
  {
    id: 'INV-2026-002',
    date: '2026-03-15',
    amount: 49.00,
    status: 'paid'
  },
  {
    id: 'INV-2026-001',
    date: '2026-02-15',
    amount: 49.00,
    status: 'paid'
  }
];

export const STATUS_PAGES = [
  {
    id: 'sp-1',
    name: 'Acme Status Page',
    slug: 'acme-status',
    logo: '⚡',
    theme: 'dark',
    customDomain: 'status.acme.com',
    monitors: ['mon-1', 'mon-2', 'mon-3'],
    public: true
  }
];

export const RECENT_ALERTS = [
  { id: 'al-1', timestamp: '5m ago', message: 'Acme Database API Node status changed to DOWN', severity: 'critical' },
  { id: 'al-2', timestamp: '1h ago', message: 'Acme Auth Service returned 502 Bad Gateway (automated resolve in 12s)', severity: 'warning' },
  { id: 'al-3', timestamp: '2h ago', message: 'Acme Frontend SPA resolved Latency Alert', severity: 'info' }
];

export const API_KEYS = [
  { id: 'key-1', name: 'Production Daemon ingestion', key: 'peeng_live_4ef298a...890ab', created: '2026-02-10' },
  { id: 'key-2', name: 'Grafana proxy token', key: 'peeng_live_901de72...ff328', created: '2026-04-18' }
];
