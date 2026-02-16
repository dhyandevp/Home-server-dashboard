import { MetricOverview } from './components/MetricOverview';
import { DockerWidget } from './components/DockerWidget';
import { ServiceLinks } from './components/ServiceLinks';
import { CpuMemoryChart } from './components/CpuMemoryChart';

export function ObservabilityApp() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">System Status</h2>
                    <p className="text-slate-400">
                        Real-time infrastructure telemetry
                    </p>
                </div>
            </div>

            <MetricOverview />

            <CpuMemoryChart />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <DockerWidget />
                </div>
                <div className="lg:col-span-3">
                    <ServiceLinks />
                </div>
            </div>
        </div>
    );
}
