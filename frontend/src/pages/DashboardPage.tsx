import { MetricOverview } from '../features/dashboard/components/MetricOverview';
import { DockerWidget } from '../features/dashboard/components/DockerWidget';
import { ServiceLinks } from '../features/dashboard/components/ServiceLinks';
import { CpuMemoryChart } from '../features/dashboard/components/CpuMemoryChart';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          System overview and management
        </p>
      </div>

      <MetricOverview />

      <CpuMemoryChart />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DockerWidget />
        <ServiceLinks />
      </div>
    </div>
  );
}
