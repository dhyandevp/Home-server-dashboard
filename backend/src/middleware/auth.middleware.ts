import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface AuthRequest extends Request {
  user?: { sub: string; role: 'admin' | 'user'; email: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing bearer token' });
  }

  const token = auth.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, env.jwtSecret) as AuthRequest['user'];
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(roles: Array<'admin' | 'user'>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  };
}
