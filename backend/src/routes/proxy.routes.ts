import { Router } from 'express';
import { db } from '../services/store.js';

export const proxyRoutes = Router();

proxyRoutes.get('/', (_req, res) => res.json(db.proxyRoutes));

proxyRoutes.post('/', (req, res) => {
  const route = {
    id: crypto.randomUUID(),
    domain: req.body.domain,
    target: req.body.target,
    sslEnabled: Boolean(req.body.sslEnabled)
  };
  db.proxyRoutes.push(route);

  const nginx = `server {\n  listen 443 ssl;\n  server_name ${route.domain};\n  location / {\n    proxy_pass http://${route.target};\n  }\n}`;

  res.status(201).json({ route, nginx });
});
