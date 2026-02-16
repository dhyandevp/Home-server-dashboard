import { db } from './store.js';

export const auditService = {
  log(entry: Record<string, unknown>) {
    db.auditLogs.push({ ...entry, createdAt: new Date().toISOString() });
  },
  list() {
    return db.auditLogs.slice(-500).reverse();
  }
};
