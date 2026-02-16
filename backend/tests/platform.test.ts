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

describe('platform and plugin features', () => {
  it('creates plugin and returns API stats', async () => {
    const bearer = `Bearer ${await token()}`;

    const createPlugin = await request(app)
      .post('/api/plugins')
      .set('Authorization', bearer)
      .send({
        key: 'minecraft',
        name: 'Minecraft Server Status',
        description: 'Tracks minecraft server uptime.',
        source: 'custom'
      });

    expect(createPlugin.status).toBe(201);

    const stats = await request(app).get('/api/platform/api-stats').set('Authorization', bearer);
    expect(stats.status).toBe(200);
    expect(Array.isArray(stats.body)).toBe(true);
  });
});
