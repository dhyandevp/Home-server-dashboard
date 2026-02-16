import type { PropsWithChildren } from 'react';

export function SectionPanel({ children }: PropsWithChildren) {
  return <section className="rounded-xl border border-border bg-panel p-5">{children}</section>;
}
