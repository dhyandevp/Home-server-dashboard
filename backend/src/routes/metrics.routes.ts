import { Router } from 'express';
import { getSystemSnapshot } from '../services/system.service.js';
import { metricsHistoryService } from '../services/metrics-history.service.js';
import { alertsService } from '../services/alerts.service.js';

export const metricsRoutes = Router();

metricsRoutes.get('/current', async (_req, res) => {
  const data = await getSystemSnapshot();
  metricsHistoryService.append(data);
  alertsService.evaluate(data);
  res.json(data);
});

metricsRoutes.get('/history', (_req, res) => {
  res.json(metricsHistoryService.list());
});
