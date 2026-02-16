import { Router } from 'express';
import { z } from 'zod';
import { authLimiter } from '../middleware/rate-limit.middleware.js';
import { authenticate } from '../services/auth.service.js';
import { auditService } from '../services/audit.service.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const authRoutes = Router();

authRoutes.post('/login', authLimiter, (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
  }

  const result = authenticate(parsed.data.email, parsed.data.password);
  if (!result) {
    auditService.log({ action: 'auth.failed', resource: 'auth', ip: req.ip });
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  auditService.log({ action: 'auth.login', resource: 'auth', userId: result.user.id, ip: req.ip });
  return res.json(result);
});
