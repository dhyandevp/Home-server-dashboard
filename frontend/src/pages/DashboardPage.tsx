import { useEffect, useState } from 'react';
import { Cpu, HardDrive, MemoryStick, Network, Package, ScrollText } from 'lucide-react';
import api from '../services/api';
import { MetricCard } from '../components/MetricCard';
import { SectionPanel } from '../components/SectionPanel';
import { useRealtimeMetrics } from '../hooks/useRealtimeMetrics';

interface ContainerSummary {
  id: string;
  name: string;
  state: string;
  status: string;
}

interface Plugin {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

export function DashboardPage() {
  const metrics = useRealtimeMetrics();
  const [containers, setContainers] = useState<ContainerSummary[]>([]);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [auditLogs, setAuditLogs] = useState<Array<Record<string, string>>>([]);

  useEffect(() => {
    void Promise.all([
      api.get('/api/docker/containers').then((res) => setContainers(res.data)),
      api.get('/api/plugins').then((res) => setPlugins(res.data)),
      api.get('/api/logs/audit').then((res) => setAuditLogs(res.data))
    ]);
  }, []);

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Home Server Management Platform</h1>
        <p className="text-slate-400">Real-time overview and control center.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="CPU" value={`${metrics?.cpu ?? 0}%`} />
        <MetricCard label="RAM" value={`${metrics?.ram ?? 0}%`} />
        <MetricCard label="Disk" value={`${metrics?.disk ?? 0}%`} />
        <MetricCard label="Temperature" value={metrics?.temperature ? `${metrics.temperature}°C` : 'N/A'} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionPanel>
          <div className="mb-4 flex items-center gap-2 text-lg font-medium"><Package size={18} /> Docker Manager</div>
          <ul className="space-y-2 text-sm">
            {containers.map((container) => (
              <li key={container.id} className="flex items-center justify-between rounded-md bg-base p-3">
                <span>{container.name}</span>
                <span className="text-slate-400">{container.status}</span>
              </li>
            ))}
          </ul>
        </SectionPanel>

        <SectionPanel>
          <div className="mb-4 flex items-center gap-2 text-lg font-medium"><Cpu size={18} /> Service Marketplace</div>
          <ul className="space-y-2 text-sm">
            {plugins.map((plugin) => (
              <li key={plugin.key} className="rounded-md bg-base p-3">
                <p className="font-medium">{plugin.name}</p>
                <p className="text-slate-400">{plugin.description}</p>
                <p className="mt-1 text-xs text-accent">{plugin.enabled ? 'Enabled' : 'Disabled'}</p>
              </li>
            ))}
          </ul>
        </SectionPanel>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SectionPanel>
          <div className="mb-2 flex items-center gap-2"><Network size={16} /> Network</div>
          <p className="text-slate-300">RX {metrics?.networkRx ?? 0} B/s</p>
          <p className="text-slate-300">TX {metrics?.networkTx ?? 0} B/s</p>
        </SectionPanel>
        <SectionPanel>
          <div className="mb-2 flex items-center gap-2"><MemoryStick size={16} /> Uptime</div>
          <p className="text-slate-300">{metrics?.uptime ?? 0} seconds</p>
        </SectionPanel>
        <SectionPanel>
          <div className="mb-2 flex items-center gap-2"><HardDrive size={16} /> Logs Center</div>
          <p className="text-sm text-slate-400">{auditLogs.length} events</p>
        </SectionPanel>
      </section>

      <SectionPanel>
        <div className="mb-4 flex items-center gap-2 text-lg font-medium"><ScrollText size={18} /> Recent Activity</div>
        <pre className="max-h-56 overflow-auto rounded-md bg-base p-3 text-xs text-slate-300">{JSON.stringify(auditLogs.slice(0, 8), null, 2)}</pre>
      </SectionPanel>
    </main>
  );
}
