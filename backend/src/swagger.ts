export const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Home Server Platform API',
    version: '1.0.0'
  },
  paths: {
    '/api/auth/login': { post: { summary: 'Authenticate and return JWT' } },
    '/api/metrics/current': { get: { summary: 'Current system metrics snapshot' } },
    '/api/docker/containers': { get: { summary: 'List docker containers' } },
    '/api/plugins': { get: { summary: 'List discovered plugins' } }
  }
};
