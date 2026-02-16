import { Router } from 'express';
import { db } from '../services/store.js';

export const platformRoutes = Router();

platformRoutes.get('/api-stats', (_req, res) => {
  const stats = [...db.apiStats].sort((a, b) => b.count - a.count);
  res.json(stats.slice(0, 20));
});

platformRoutes.get('/backup/export', (_req, res) => {
  res.json({
    exportedAt: new Date().toISOString(),
    data: {
      plugins: db.plugins,
      alertRules: db.alertRules,
      proxyRoutes: db.proxyRoutes
    }
  });
});

platformRoutes.post('/backup/import', (req, res) => {
  const data = req.body?.data;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ message: 'Invalid backup payload' });
  }

  db.plugins = Array.isArray(data.plugins) ? data.plugins : db.plugins;
  db.alertRules = Array.isArray(data.alertRules) ? data.alertRules : db.alertRules;
  db.proxyRoutes = Array.isArray(data.proxyRoutes) ? data.proxyRoutes : db.proxyRoutes;

  return res.json({ status: 'imported' });
});
