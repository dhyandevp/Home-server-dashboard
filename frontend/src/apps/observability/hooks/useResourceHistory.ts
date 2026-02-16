import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import { Metrics } from '../../../types';

export function useResourceHistory() {
    const [history, setHistory] = useState<Metrics[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;

        // Initial fetch
        api.get('/api/metrics/history')
            .then(res => {
                setHistory(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch metrics history', err);
                setIsLoading(false);
            });

        // In a real app, we might just rely on socket updates accumulating in the parent
        // or periodically re-fetch if we suspect drift, but typically we'd merge socket updates
        // into this state. For now, we fetch once.
        // Ideally, we listen to socket and push to this array too.
    }, [isAuthenticated]);

    return { history, isLoading };
}
