import { Router } from 'express';
import { auditService } from '../services/audit.service.js';

export const logsRoutes = Router();

logsRoutes.get('/audit', (_req, res) => {
  res.json(auditService.list());
});
