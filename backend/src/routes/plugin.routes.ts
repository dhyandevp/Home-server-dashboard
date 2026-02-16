import { Router } from 'express';
import { requireRole } from '../middleware/auth.middleware.js';
import { auditService } from '../services/audit.service.js';
import { discoverPlugins, togglePlugin } from '../services/plugin.service.js';

export const pluginRoutes = Router();

pluginRoutes.get('/', (_req, res) => {
  const plugins = discoverPlugins();
  res.json(plugins);
});

pluginRoutes.patch('/:key', requireRole(['admin']), (req, res) => {
  const plugin = togglePlugin(req.params.key, Boolean(req.body.enabled));
  if (!plugin) {
    return res.status(404).json({ message: 'Plugin not found' });
  }

  auditService.log({ action: 'plugin.toggle', resource: plugin.key, details: { enabled: plugin.enabled } });
  return res.json(plugin);
});
