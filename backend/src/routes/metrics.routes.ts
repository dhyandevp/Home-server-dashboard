import { Router } from 'express';
import { getSystemSnapshot } from '../services/system.service.js';

export const metricsRoutes = Router();

metricsRoutes.get('/current', async (_req, res) => {
  const data = await getSystemSnapshot();
  res.json(data);
});
