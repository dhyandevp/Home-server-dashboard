import { MetricOverview } from './components/MetricOverview';
import { DockerWidget } from './components/DockerWidget';
import { ServiceLinks } from './components/ServiceLinks';
import { ResourceHistory } from './components/ResourceHistory';
import { ProcessViewer } from './components/ProcessViewer';

export function ObservabilityApp() {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white shadow-cyan-500/20 drop-shadow-sm">System Status</h2>
                    <p className="text-slate-400">
                        Real-time infrastructure telemetry and process monitoring
                    </p>
                </div>
            </div>

            <MetricOverview />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2 h-[350px]">
                    <ResourceHistory />
                </div>
                <div className="lg:col-span-1 h-[350px]">
                    <ProcessViewer />
                </div>
            </div>

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
