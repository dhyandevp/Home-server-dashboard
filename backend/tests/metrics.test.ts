import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';

async function token() {
  const auth = await request(app).post('/api/auth/login').send({
    email: 'admin@homeserver.local',
    password: 'admin123!'
  });

  return auth.body.token as string;
}

describe('metrics endpoint', () => {
  it('returns current metrics for authenticated user', async () => {
    const response = await request(app)
      .get('/api/metrics/current')
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cpu');
    expect(response.body).toHaveProperty('ram');
  });
});
