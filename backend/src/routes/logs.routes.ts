import { Router } from 'express';
import { auditService } from '../services/audit.service.js';

export const logsRoutes = Router();

logsRoutes.get('/audit', (req, res) => {
  const query = String(req.query.q ?? '').toLowerCase();
  const logs = auditService.list();
  if (!query) {
    return res.json(logs);
  }

  const filtered = logs.filter((entry) => JSON.stringify(entry).toLowerCase().includes(query));
  return res.json(filtered);
});

logsRoutes.get('/audit/export', (_req, res) => {
  const payload = JSON.stringify(auditService.list(), null, 2);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="audit-logs.json"');
  res.send(payload);
});
