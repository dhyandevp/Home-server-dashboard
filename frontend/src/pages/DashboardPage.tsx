import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Moon,
  Network,
  Package,
  Play,
  ScrollText,
  Square,
  Sun,
  RotateCcw
} from 'lucide-react';
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

interface MetricSample {
  cpu: number;
  at: string;
}

interface ApiStat {
  path: string;
  method: string;
  count: number;
}

export function DashboardPage() {
  const metrics = useRealtimeMetrics();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [containers, setContainers] = useState<ContainerSummary[]>([]);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [auditLogs, setAuditLogs] = useState<Array<Record<string, unknown>>>([]);
  const [history, setHistory] = useState<MetricSample[]>([]);
  const [apiStats, setApiStats] = useState<ApiStat[]>([]);
  const [alertThreshold, setAlertThreshold] = useState(85);

  const pageClass =
    theme === 'dark'
      ? 'bg-base text-slate-100'
      : 'bg-slate-100 text-slate-900 [&_.panel]:bg-white [&_.panel]:text-slate-900 [&_.soft]:bg-slate-100';

  async function refreshDashboard() {
    const responses = await Promise.all([
      api.get('/api/docker/containers'),
      api.get('/api/plugins'),
      api.get('/api/logs/audit'),
      api.get('/api/metrics/history'),
      api.get('/api/platform/api-stats')
    ]);

    setContainers(responses[0].data);
    setPlugins(responses[1].data);
    setAuditLogs(responses[2].data);
    setHistory(responses[3].data);
    setApiStats(responses[4].data);
  }

  useEffect(() => {
    void refreshDashboard();
  }, []);

  async function containerAction(id: string, action: 'start' | 'stop' | 'restart') {
    await api.post(`/api/docker/containers/${id}/${action}`);
    await refreshDashboard();
  }

  async function togglePlugin(key: string, enabled: boolean) {
    await api.patch(`/api/plugins/${key}`, { enabled: !enabled });
    await refreshDashboard();
  }

  async function createCpuAlert() {
    await api.post('/api/alerts', {
      metric: 'cpu',
      threshold: alertThreshold,
      channel: 'discord',
      destination: 'https://discord.com/api/webhooks/example'
    });
    await refreshDashboard();
  }

  const historyPolyline = useMemo(() => {
    if (!history.length) {
      return '';
    }

    return history
      .slice(-20)
      .map((point, index) => `${index * 16},${100 - point.cpu}`)
      .join(' ');
  }, [history]);

  return (
    <main className={`${pageClass} min-h-screen`}>
      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Home Server Management Platform</h1>
            <p className="text-slate-400">Real-time overview and control center.</p>
          </div>
          <button
            className="panel flex items-center gap-2 self-start rounded-md border border-border px-3 py-2"
            onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="CPU" value={`${metrics?.cpu ?? 0}%`} />
          <MetricCard label="RAM" value={`${metrics?.ram ?? 0}%`} />
          <MetricCard label="Disk" value={`${metrics?.disk ?? 0}%`} />
          <MetricCard label="Temperature" value={metrics?.temperature ? `${metrics.temperature}°C` : 'N/A'} />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionPanel>
            <div className="mb-4 flex items-center gap-2 text-lg font-medium">
              <Package size={18} /> Docker Manager
            </div>
            <ul className="space-y-2 text-sm">
              {containers.map((container) => (
                <li key={container.id} className="soft flex items-center justify-between rounded-md bg-base p-3">
                  <div>
                    <p className="font-medium">{container.name}</p>
                    <p className="text-xs text-slate-400">{container.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => containerAction(container.id, 'start')} title="Start">
                      <Play size={16} />
                    </button>
                    <button onClick={() => containerAction(container.id, 'stop')} title="Stop">
                      <Square size={16} />
                    </button>
                    <button onClick={() => containerAction(container.id, 'restart')} title="Restart">
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </SectionPanel>

          <SectionPanel>
            <div className="mb-4 flex items-center gap-2 text-lg font-medium">
              <Cpu size={18} /> Service Marketplace
            </div>
            <ul className="space-y-2 text-sm">
              {plugins.map((plugin) => (
                <li key={plugin.key} className="soft rounded-md bg-base p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{plugin.name}</p>
                      <p className="text-slate-400">{plugin.description}</p>
                    </div>
                    <button className="rounded border border-border px-2 py-1" onClick={() => togglePlugin(plugin.key, plugin.enabled)}>
                      {plugin.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </SectionPanel>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <SectionPanel>
            <div className="mb-2 flex items-center gap-2">
              <Network size={16} /> Network
            </div>
            <p className="text-slate-300">RX {metrics?.networkRx ?? 0} B/s</p>
            <p className="text-slate-300">TX {metrics?.networkTx ?? 0} B/s</p>
          </SectionPanel>
          <SectionPanel>
            <div className="mb-2 flex items-center gap-2">
              <MemoryStick size={16} /> Uptime
            </div>
            <p className="text-slate-300">{metrics?.uptime ?? 0} seconds</p>
          </SectionPanel>
          <SectionPanel>
            <div className="mb-2 flex items-center gap-2">
              <HardDrive size={16} /> Logs Center
            </div>
            <p className="text-sm text-slate-400">{auditLogs.length} events</p>
          </SectionPanel>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionPanel>
            <div className="mb-3 flex items-center gap-2 text-lg font-medium">
              <Activity size={18} /> CPU History
            </div>
            <svg className="soft h-28 w-full rounded-md bg-base p-2" viewBox="0 0 320 100" preserveAspectRatio="none">
              <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={historyPolyline} />
            </svg>
          </SectionPanel>

          <SectionPanel>
            <div className="mb-3 flex items-center gap-2 text-lg font-medium">
              <Cpu size={18} /> Monitoring Alerts
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                className="soft w-24 rounded border border-border bg-base px-2 py-1"
                value={alertThreshold}
                onChange={(event) => setAlertThreshold(Number(event.target.value))}
              />
              <button className="rounded bg-accent px-3 py-2 text-white" onClick={createCpuAlert}>
                Add CPU Alert
              </button>
            </div>
          </SectionPanel>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionPanel>
            <div className="mb-4 flex items-center gap-2 text-lg font-medium">
              <ScrollText size={18} /> Recent Activity
            </div>
            <pre className="soft max-h-56 overflow-auto rounded-md bg-base p-3 text-xs text-slate-300">
              {JSON.stringify(auditLogs.slice(0, 8), null, 2)}
            </pre>
          </SectionPanel>

          <SectionPanel>
            <div className="mb-4 flex items-center gap-2 text-lg font-medium">
              <Activity size={18} /> API Usage Stats
            </div>
            <ul className="space-y-2 text-xs">
              {apiStats.map((entry) => (
                <li key={`${entry.method}-${entry.path}`} className="soft flex justify-between rounded bg-base p-2">
                  <span>
                    {entry.method} {entry.path}
                  </span>
                  <span>{entry.count}</span>
                </li>
              ))}
            </ul>
          </SectionPanel>
        </section>
      </div>
    </main>
  );
}
