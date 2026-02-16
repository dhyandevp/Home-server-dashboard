export const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Home Server Platform API',
    version: '1.1.0'
  },
  paths: {
    '/api/auth/login': { post: { summary: 'Authenticate and return JWT' } },
    '/api/auth/me': { get: { summary: 'Get current authenticated user' } },
    '/api/metrics/current': { get: { summary: 'Current system metrics snapshot' } },
    '/api/metrics/history': { get: { summary: 'Recent metrics history for charts' } },
    '/api/docker/containers': { get: { summary: 'List docker containers' } },
    '/api/docker/compose/deploy': { post: { summary: 'Queue a docker compose deployment' } },
    '/api/plugins': { get: { summary: 'List discovered plugins' }, post: { summary: 'Install custom plugin descriptor' } },
    '/api/platform/api-stats': { get: { summary: 'Top API usage endpoints' } }
  }
};
