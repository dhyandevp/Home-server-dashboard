import bcrypt from 'bcryptjs';
import type { PluginDefinition, User } from '../types.js';

const adminPassword = bcrypt.hashSync('admin123!', 10);
const dhyandevPassword = bcrypt.hashSync('keethu', 10);

export interface ApiStat {
  path: string;
  method: string;
  count: number;
  lastSeenAt: string;
}

export interface MetricSnapshot {
  cpu: number;
  ram: number;
  disk: number;
  networkRx: number;
  networkTx: number;
  uptime: number;
  temperature: number | null;
  at: string;
}

export const db = {
  users: [
    {
      id: 'u_admin',
      email: 'admin@homeserver.local',
      passwordHash: adminPassword,
      role: 'admin'
    } satisfies User,
    {
      id: 'u_dhyandev',
      email: 'dhyandev', // Using username as email for compatibility
      passwordHash: dhyandevPassword,
      role: 'admin'
    } satisfies User
  ],
  plugins: [] as PluginDefinition[],
  auditLogs: [] as Array<Record<string, unknown>>,
  alertRules: [] as Array<Record<string, unknown>>,
  proxyRoutes: [] as Array<Record<string, unknown>>,
  apiStats: [] as ApiStat[],
  metricHistory: [] as MetricSnapshot[],
  notifications: [] as Array<Record<string, unknown>>
};
