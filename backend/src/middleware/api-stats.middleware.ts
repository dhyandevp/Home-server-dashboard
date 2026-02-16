import type { NextFunction, Request, Response } from 'express';
import { db } from '../services/store.js';

export function captureApiStats(req: Request, _res: Response, next: NextFunction) {
  // Track route-level usage to expose API analytics in the dashboard.
  const entry = db.apiStats.find((item) => item.path === req.path && item.method === req.method);
  const now = new Date().toISOString();

  if (entry) {
    entry.count += 1;
    entry.lastSeenAt = now;
  } else {
    db.apiStats.push({
      path: req.path,
      method: req.method,
      count: 1,
      lastSeenAt: now
    });
  }

  next();
}
