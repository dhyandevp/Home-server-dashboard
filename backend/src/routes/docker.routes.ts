import { Router } from 'express';
import { requireRole } from '../middleware/auth.middleware.js';
import { dockerService } from '../services/docker.service.js';
import { auditService } from '../services/audit.service.js';

export const dockerRoutes = Router();

dockerRoutes.get('/containers', async (_req, res) => {
  const containers = await dockerService.listContainers();
  res.json(containers);
});

dockerRoutes.post('/containers/:id/:action', requireRole(['admin']), async (req, res) => {
  const { id, action } = req.params;
  if (!['start', 'stop', 'restart'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action' });
  }

  await dockerService.action(id, action as 'start' | 'stop' | 'restart');
  auditService.log({ action: `docker.${action}`, resource: id });
  return res.json({ status: 'ok' });
});

dockerRoutes.get('/containers/:id/logs', async (req, res) => {
  const logs = await dockerService.logs(req.params.id);
  res.json({ logs });
});
