import { Router } from 'express';
import { db } from '../services/store.js';

export const alertsRoutes = Router();

alertsRoutes.get('/', (_req, res) => res.json(db.alertRules));

alertsRoutes.post('/', (req, res) => {
  const rule = {
    id: crypto.randomUUID(),
    metric: req.body.metric,
    threshold: Number(req.body.threshold),
    channel: req.body.channel,
    destination: req.body.destination,
    enabled: true
  };
  db.alertRules.push(rule);
  res.status(201).json(rule);
});
