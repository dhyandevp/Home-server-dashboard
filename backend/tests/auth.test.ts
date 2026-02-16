import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';

describe('auth login', () => {
  it('returns jwt token for valid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'admin@homeserver.local',
      password: 'admin123!'
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTypeOf('string');
  });

  it('rejects invalid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'admin@homeserver.local',
      password: 'wrong-password'
    });

    expect(response.status).toBe(401);
  });
});
