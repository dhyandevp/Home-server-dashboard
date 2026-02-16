import { useState, useCallback } from 'react';
import api from '../../../lib/api';
import { ContainerSummary } from '../../../types';
import { toast } from 'sonner';

export function useDocker() {
    const [containers, setContainers] = useState<ContainerSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchContainers = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get<ContainerSummary[]>('/api/docker/containers');
            setContainers(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load containers');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const performAction = async (id: string, action: 'start' | 'stop' | 'restart') => {
        const loadingId = toast.loading(`${action === 'start' ? 'Starting' : action === 'stop' ? 'Stopping' : 'Restarting'} container...`);
        try {
            await api.post(`/api/docker/containers/${id}/${action}`);
            toast.success(`Container ${action}ed successfully`, { id: loadingId });
            fetchContainers(); // Refresh list
        } catch (err) {
            console.error(err);
            toast.error(`Failed to ${action} container`, { id: loadingId });
        }
    };

    return {
        containers,
        isLoading,
        fetchContainers,
        performAction
    };
}
