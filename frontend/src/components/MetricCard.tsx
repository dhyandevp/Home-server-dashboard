interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <article className="panel rounded-xl border border-border bg-panel/80 p-4 backdrop-blur-sm">
      <p className="text-sm text-muted">{label}</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight">{value}</h3>
    </article>
  );
}
