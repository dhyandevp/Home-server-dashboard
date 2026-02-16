import bcrypt from 'bcryptjs';
import type { PluginDefinition, User } from '../types.js';

const adminPassword = bcrypt.hashSync('admin123!', 10);

export const db = {
  users: [
    {
      id: 'u_admin',
      email: 'admin@homeserver.local',
      passwordHash: adminPassword,
      role: 'admin'
    } satisfies User
  ],
  plugins: [] as PluginDefinition[],
  auditLogs: [] as Array<Record<string, unknown>>,
  alertRules: [] as Array<Record<string, unknown>>,
  proxyRoutes: [] as Array<Record<string, unknown>>
};
