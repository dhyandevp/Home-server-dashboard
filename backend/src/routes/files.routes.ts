import fs from 'node:fs';
import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import { env } from '../config/env.js';

const upload = multer({ dest: path.join(env.fileRoot, '.uploads') });

function resolveSafePath(relativePath = '.') {
  const target = path.resolve(env.fileRoot, relativePath);
  const root = path.resolve(env.fileRoot);
  if (!target.startsWith(root)) {
    throw new Error('Path escapes sandbox');
  }

  return target;
}

export const fileRoutes = Router();

fileRoutes.get('/list', (req, res) => {
  const target = resolveSafePath(String(req.query.path ?? '.'));
  const entries = fs.readdirSync(target, { withFileTypes: true }).map((entry) => ({
    name: entry.name,
    isDirectory: entry.isDirectory()
  }));
  res.json({ path: target, entries });
});

fileRoutes.get('/read', (req, res) => {
  const target = resolveSafePath(String(req.query.path ?? '.'));
  const content = fs.readFileSync(target, 'utf-8');
  res.json({ path: target, content });
});

fileRoutes.post('/write', (req, res) => {
  const target = resolveSafePath(String(req.body.path));
  fs.writeFileSync(target, String(req.body.content ?? ''), 'utf-8');
  res.json({ status: 'saved' });
});

fileRoutes.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file?.filename });
});
