import si from 'systeminformation';

export async function getSystemSnapshot() {
  const [load, mem, fsSize, networkStats, time, temp] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.time(),
    si.cpuTemperature()
  ]);

  return {
    cpu: Number(load.currentLoad.toFixed(2)),
    ram: Number(((mem.active / mem.total) * 100).toFixed(2)),
    disk: fsSize[0] ? Number(((fsSize[0].used / fsSize[0].size) * 100).toFixed(2)) : 0,
    networkRx: networkStats[0]?.rx_sec ?? 0,
    networkTx: networkStats[0]?.tx_sec ?? 0,
    uptime: time.uptime,
    temperature: temp.main ?? null,
    at: new Date().toISOString()
  };
}
