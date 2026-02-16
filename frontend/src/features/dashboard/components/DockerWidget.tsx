import { useEffect, useState } from 'react';
import { Package, Play, Square, RotateCcw, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import api from '../../../lib/api';
import { cn } from '../../../lib/utils';
import { ContainerSummary } from '../../../types';
import { toast } from 'sonner';

export function DockerWidget() {
    const [containers, setContainers] = useState<ContainerSummary[]>([]);
    const [loading, setLoading] = useState(true);

    // We should move this data fetching to React Query later
    useEffect(() => {
        fetchContainers();
        const interval = setInterval(fetchContainers, 5000);
        return () => clearInterval(interval);
    }, []);

    async function fetchContainers() {
        try {
            const { data } = await api.get<ContainerSummary[]>('/api/docker/containers');
            setContainers(data);
        } catch (error) {
            console.error("Failed to fetch containers", error);
        } finally {
            setLoading(false);
        }
    }

    const handleAction = async (id: string, action: 'start' | 'stop' | 'restart') => {
        try {
            toast.promise(api.post(`/api/docker/containers/${id}/${action}`), {
                loading: `${action}ing container...`,
                success: `Container ${action}ed successfully`,
                error: `Failed to ${action} container`,
            });
            // await api.post(`/api/docker/containers/${id}/${action}`);
            setTimeout(fetchContainers, 1000); // Small delay to allow state change
        } catch (e) {
            console.error(`Failed to ${action} container`, e);
        }
    };

    if (loading && containers.length === 0) {
        return <div>Loading containers...</div>;
    }

    return (
        <Card className="col-span-4 lg:col-span-2">
            <CardHeader>
                <CardTitle>Docker Containers</CardTitle>
                <CardDescription>Manage your running services</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {containers.map((container) => (
                        <div
                            key={container.id}
                            className="flex items-center justify-between rounded-sm border border-border bg-subtle p-3 hover:bg-hover transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-sm bg-surface",
                                        container.state === 'running' ? "text-action bg-action/10" : "text-muted"
                                    )}
                                >
                                    <Package className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-primary">{container.name}</div>
                                    <div className="text-xs text-muted capitalize">
                                        {container.state} - {container.status}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {container.state !== 'running' && (
                                    <Button variant="ghost" size="icon" onClick={() => handleAction(container.id, 'start')} title="Start">
                                        <Play className="h-4 w-4 text-action" />
                                    </Button>
                                )}
                                {container.state === 'running' && (
                                    <Button variant="ghost" size="icon" onClick={() => handleAction(container.id, 'stop')} title="Stop">
                                        <Square className="h-4 w-4 text-primary" />
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon" onClick={() => handleAction(container.id, 'restart')} title="Restart">
                                    <RotateCcw className="h-4 w-4 text-secondary" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {containers.length === 0 && !loading && (
                        <div className="py-6 text-center text-muted">
                            No containers found
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
