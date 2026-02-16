import { Activity, Cpu, HardDrive, MemoryStick, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

import { useSocket } from '../../../context/SocketContext';
import { cn } from '../../../lib/utils';
import { Metrics } from '../../../types';

// Helper for progress bars
function ProgressBar({ value, className }: { value: number; className?: string }) {
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
            <div
                className={cn("h-full transition-all duration-500 ease-in-out", className)}
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    );
}

function MetricItem({
    title,
    value,
    icon: Icon,
    subtext,
    progressColor = "bg-primary"
}: {
    title: string;
    value: number;
    icon: typeof Activity;
    subtext?: string;
    progressColor?: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-primary">{value.toFixed(1)}%</div>
                <ProgressBar value={value} className={cn("mt-2", progressColor)} />
                {subtext && <p className="mt-1 text-xs text-muted">{subtext}</p>}
            </CardContent>
        </Card>
    );
}

export function MetricOverview() {
    const { metrics } = useSocket();

    if (!metrics) {
        // Skeleton state or null state
        return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
                <Card key={i} className="animate-pulse bg-subtle">
                    <CardHeader className="h-16" />
                    <CardContent className="h-24" />
                </Card>
            ))}
        </div>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricItem
                title="CPU Usage"
                value={metrics.cpu}
                icon={Cpu}
                progressColor={metrics.cpu > 80 ? "bg-error" : "bg-action"}
            />
            <MetricItem
                title="Memory Usage"
                value={metrics.ram}
                icon={MemoryStick}
                progressColor="bg-warning"
            />
            <MetricItem
                title="Disk Usage"
                value={metrics.disk}
                icon={HardDrive}
                progressColor="bg-info"
            />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-secondary">Network</CardTitle>
                    <Network className="h-4 w-4 text-muted" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        <span className="text-success">↓ {metrics.networkRx.toFixed(1)}</span>
                        <span className="mx-2 text-muted">/</span>
                        <span className="text-action">↑ {metrics.networkTx.toFixed(1)}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted">MB/s</p>
                </CardContent>
            </Card>
        </div>
    );
}
