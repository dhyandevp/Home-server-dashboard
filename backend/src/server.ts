import { createServer } from 'node:http';
import { app } from './app.js';
import { env } from './config/env.js';
import { createSocketServer } from './ws/socket.js';

const server = createServer(app);
createSocketServer(server);

server.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${env.port}`);
});
