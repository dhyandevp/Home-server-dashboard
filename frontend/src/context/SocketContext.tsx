import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { env } from '../config/env';
import { Metrics } from '../types';

interface SocketContextType {
    socket: Socket | null;
    metrics: Metrics | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;

        const socketUrl = env.API_URL;
        const newSocket = io(socketUrl, {
            auth: {
                token: localStorage.getItem('token')
            },
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
        });

        newSocket.on('connect', () => setIsConnected(true));
        newSocket.on('disconnect', () => setIsConnected(false));

        // Listen for global metric updates
        newSocket.on('metrics:update', (data: Metrics) => {
            setMetrics(data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [isAuthenticated]);

    return (
        <SocketContext.Provider value={{ socket, metrics, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}
