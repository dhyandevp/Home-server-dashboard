import { Router } from 'express';
import { z } from 'zod';
import { db } from '../services/store.js';

const alertSchema = z.object({
  metric: z.enum(['cpu', 'ram', 'disk', 'temperature']),
  threshold: z.number().min(1).max(100),
  channel: z.enum(['telegram', 'discord', 'email']),
  destination: z.string().min(2)
});

export const alertsRoutes = Router();

alertsRoutes.get('/', (_req, res) => res.json(db.alertRules));
alertsRoutes.get('/notifications', (_req, res) => res.json(db.notifications.slice(-100).reverse()));

alertsRoutes.post('/', (req, res) => {
  const parsed = alertSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
  }

  const rule = {
    id: crypto.randomUUID(),
    ...parsed.data,
    enabled: true
  };

  db.alertRules.push(rule);
  res.status(201).json(rule);
});

alertsRoutes.patch('/:id/toggle', (req, res) => {
  const rule = db.alertRules.find((entry) => entry.id === req.params.id);
  if (!rule) {
    return res.status(404).json({ message: 'Rule not found' });
  }

  rule.enabled = Boolean(req.body.enabled);
  return res.json(rule);
});
