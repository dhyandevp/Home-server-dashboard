import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export interface Metrics {
  cpu: number;
  ram: number;
  disk: number;
  networkRx: number;
  networkTx: number;
  uptime: number;
  temperature: number | null;
  at: string;
}

export function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL ?? 'http://localhost:4000');
    socket.on('metrics:update', setMetrics);

    return () => {
      socket.disconnect();
    };
  }, []);

  return metrics;
}
