import { Router } from 'express';
import { z } from 'zod';
import { requireRole } from '../middleware/auth.middleware.js';
import { dockerService } from '../services/docker.service.js';
import { auditService } from '../services/audit.service.js';

const composeSchema = z.object({
  name: z.string().min(2),
  content: z.string().min(20)
});

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
  auditService.log({ action: `docker.${action}`, resource: id, userId: req.user?.sub });
  return res.json({ status: 'ok' });
});

dockerRoutes.get('/containers/:id/logs', async (req, res) => {
  const logs = await dockerService.logs(req.params.id);
  res.json({ logs });
});

dockerRoutes.post('/compose/deploy', requireRole(['admin']), (req, res) => {
  const parsed = composeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid compose payload', errors: parsed.error.flatten() });
  }

  // This is intentionally a safe scaffold. In production, this endpoint should
  // execute compose commands through a hardened worker process.
  auditService.log({
    action: 'docker.compose.deployed',
    resource: parsed.data.name,
    details: { preview: parsed.data.content.slice(0, 120) },
    userId: req.user?.sub
  });

  return res.status(202).json({ status: 'queued', stack: parsed.data.name });
});
