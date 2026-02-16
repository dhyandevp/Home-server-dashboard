import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { db } from './store.js';
import type { Role } from '../types.js';

export function authenticate(email: string, password: string) {
  const user = db.users.find((u) => u.email === email);
  if (!user) {
    return null;
  }

  const valid = bcrypt.compareSync(password, user.passwordHash);
  if (!valid) {
    return null;
  }

  const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

  return { token, user: { id: user.id, email: user.email, role: user.role as Role } };
}
