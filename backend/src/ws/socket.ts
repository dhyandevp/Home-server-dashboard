import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { getSystemSnapshot } from '../services/system.service.js';

export function createSocketServer(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    socket.emit('connected', { message: 'Realtime stream ready' });
  });

  setInterval(async () => {
    const metrics = await getSystemSnapshot();
    io.emit('metrics:update', metrics);
  }, 5000);

  return io;
}
