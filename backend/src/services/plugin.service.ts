import fs from 'node:fs';
import path from 'node:path';
import { db } from './store.js';
import type { PluginDefinition } from '../types.js';

const pluginDir = path.resolve(process.cwd(), 'src/plugins');

export function discoverPlugins() {
  if (!fs.existsSync(pluginDir)) {
    return db.plugins;
  }

  const files = fs.readdirSync(pluginDir).filter((f) => f.endsWith('.json'));
  const discovered = files.map((file) => {
    const full = path.join(pluginDir, file);
    const plugin = JSON.parse(fs.readFileSync(full, 'utf-8')) as PluginDefinition;
    const existing = db.plugins.find((p) => p.key === plugin.key);
    return existing ? { ...plugin, enabled: existing.enabled } : plugin;
  });

  db.plugins = discovered;
  return db.plugins;
}

export function togglePlugin(key: string, enabled: boolean) {
  const plugin = db.plugins.find((p) => p.key === key);
  if (!plugin) {
    return null;
  }

  plugin.enabled = enabled;
  return plugin;
}
