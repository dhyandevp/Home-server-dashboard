import { db, type MetricSnapshot } from './store.js';

const HISTORY_LIMIT = 300;

export const metricsHistoryService = {
  append(sample: MetricSnapshot) {
    db.metricHistory.push(sample);
    if (db.metricHistory.length > HISTORY_LIMIT) {
      db.metricHistory.shift();
    }
  },
  list() {
    return db.metricHistory;
  }
};
