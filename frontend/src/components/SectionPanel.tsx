import type { PropsWithChildren } from 'react';

export function SectionPanel({ children }: PropsWithChildren) {
  return <section className="panel rounded-xl border border-border bg-panel p-5 shadow-sm">{children}</section>;
}
