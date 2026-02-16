import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { apiLimiter } from './middleware/rate-limit.middleware.js';
import { requireAuth } from './middleware/auth.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { metricsRoutes } from './routes/metrics.routes.js';
import { dockerRoutes } from './routes/docker.routes.js';
import { pluginRoutes } from './routes/plugin.routes.js';
import { logsRoutes } from './routes/logs.routes.js';
import { fileRoutes } from './routes/files.routes.js';
import { alertsRoutes } from './routes/alerts.routes.js';
import { proxyRoutes } from './routes/proxy.routes.js';
import { swaggerDoc } from './swagger.js';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(apiLimiter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/auth', authRoutes);

app.use('/api', requireAuth);
app.use('/api/metrics', metricsRoutes);
app.use('/api/docker', dockerRoutes);
app.use('/api/plugins', pluginRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/proxy', proxyRoutes);
