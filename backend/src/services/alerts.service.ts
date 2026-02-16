import { db, type MetricSnapshot } from './store.js';
import { auditService } from './audit.service.js';

function extractMetric(metric: string, sample: MetricSnapshot): number {
  if (metric === 'cpu') return sample.cpu;
  if (metric === 'ram') return sample.ram;
  if (metric === 'disk') return sample.disk;
  if (metric === 'temperature') return sample.temperature ?? 0;
  return 0;
}

export const alertsService = {
  evaluate(sample: MetricSnapshot) {
    for (const rule of db.alertRules) {
      if (!rule.enabled) {
        continue;
      }

      const currentValue = extractMetric(String(rule.metric), sample);
      if (currentValue <= Number(rule.threshold)) {
        continue;
      }

      const notification = {
        id: crypto.randomUUID(),
        channel: rule.channel,
        destination: rule.destination,
        message: `Alert: ${rule.metric} is ${currentValue} (threshold ${rule.threshold})`,
        createdAt: new Date().toISOString()
      };

      db.notifications.push(notification);
      auditService.log({ action: 'alerts.triggered', resource: String(rule.metric), details: notification });
    }
  }
};
