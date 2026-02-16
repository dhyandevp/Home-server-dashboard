import { Router } from 'express';
import { z } from 'zod';
import { requireRole } from '../middleware/auth.middleware.js';
import { auditService } from '../services/audit.service.js';
import { discoverPlugins, togglePlugin } from '../services/plugin.service.js';
import { db } from '../services/store.js';

const pluginSchema = z.object({
  key: z.string().min(2),
  name: z.string().min(2),
  description: z.string().min(4),
  source: z.string().default('custom')
});

export const pluginRoutes = Router();

pluginRoutes.get('/', (_req, res) => {
  const plugins = discoverPlugins();
  res.json(plugins);
});

pluginRoutes.post('/', requireRole(['admin']), (req, res) => {
  const parsed = pluginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
  }

  if (db.plugins.find((p) => p.key === parsed.data.key)) {
    return res.status(409).json({ message: 'Plugin key already exists' });
  }

  const plugin = { ...parsed.data, enabled: false };
  db.plugins.push(plugin);
  auditService.log({ action: 'plugin.installed', resource: plugin.key, details: plugin });
  return res.status(201).json(plugin);
});

pluginRoutes.patch('/:key', requireRole(['admin']), (req, res) => {
  const plugin = togglePlugin(req.params.key, Boolean(req.body.enabled));
  if (!plugin) {
    return res.status(404).json({ message: 'Plugin not found' });
  }

  auditService.log({ action: 'plugin.toggle', resource: plugin.key, details: { enabled: plugin.enabled } });
  return res.json(plugin);
});

pluginRoutes.delete('/:key', requireRole(['admin']), (req, res) => {
  const index = db.plugins.findIndex((plugin) => plugin.key === req.params.key);
  if (index === -1) {
    return res.status(404).json({ message: 'Plugin not found' });
  }

  const removed = db.plugins.splice(index, 1)[0];
  auditService.log({ action: 'plugin.removed', resource: removed.key });
  return res.json({ status: 'removed' });
});
