import Docker from 'dockerode';
import { env } from '../config/env.js';

const docker = new Docker({ socketPath: env.dockerSocketPath });

async function safe<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await operation();
  } catch {
    return fallback;
  }
}

export const dockerService = {
  async listContainers() {
    return safe(async () => {
      const containers = await docker.listContainers({ all: true });
      return containers.map((c) => ({
        id: c.Id,
        name: c.Names[0]?.replace('/', ''),
        image: c.Image,
        state: c.State,
        status: c.Status
      }));
    }, []);
  },
  async action(containerId: string, action: 'start' | 'stop' | 'restart') {
    await safe(async () => {
      const container = docker.getContainer(containerId);
      await container[action]();
      return null;
    }, null);
  },
  async logs(containerId: string) {
    return safe(async () => {
      const container = docker.getContainer(containerId);
      const output = await container.logs({ stdout: true, stderr: true, tail: 200 });
      return output.toString('utf-8');
    }, 'Docker log unavailable in this environment.');
  }
};
