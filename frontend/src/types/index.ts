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

export interface ContainerSummary {
    id: string;
    name: string;
    state: 'running' | 'exited' | 'restarting' | 'paused' | 'dead' | 'created';
    status: string;
    image: string;
    ports: string[];
}

export interface User {
    id: string;
    email: string;
    role: 'admin' | 'user';
    name?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    status: number;
}
