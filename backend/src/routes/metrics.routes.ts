import { Router } from 'express';
import { getSystemSnapshot } from '../services/system.service.js';
import { metricsHistoryService } from '../services/metrics-history.service.js';
import { alertsService } from '../services/alerts.service.js';

export const metricsRoutes = Router();

metricsRoutes.get('/current', async (_req, res) => {
  const data = await getSystemSnapshot();

  // Extract processes to exclude from history
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { processes, ...historyData } = data;

  metricsHistoryService.append(historyData as any); // Cast avoiding strict typecheck for now
  alertsService.evaluate(historyData as any);

  res.json(data);
});

metricsRoutes.get('/history', (_req, res) => {
  res.json(metricsHistoryService.list());
});
