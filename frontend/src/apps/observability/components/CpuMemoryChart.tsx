import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { useSocket } from '../../../context/SocketContext';
import { Metrics } from '../../../types';

interface ChartData {
    time: string;
    cpu: number;
    ram: number;
}

export function CpuMemoryChart() {
    const { metrics } = useSocket();
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        if (!metrics) return;

        setData(prev => {
            const newData = [
                ...prev,
                {
                    time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    cpu: metrics.cpu,
                    ram: metrics.ram
                }
            ];
            // Keep last 20 data points
            return newData.slice(-20);
        });
    }, [metrics]);

    if (!metrics && data.length === 0) {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>System Performance History</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Waiting for data...
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>System Performance History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9f1239" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#9f1239" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#262626" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#262626" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                            <XAxis
                                dataKey="time"
                                stroke="#525252"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#525252"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#171717', borderColor: '#262626' }}
                                itemStyle={{ color: '#e5e5e5' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="cpu"
                                stroke="#9f1239"
                                fillOpacity={1}
                                fill="url(#colorCpu)"
                                name="CPU Usage"
                            />
                            <Area
                                type="monotone"
                                dataKey="ram"
                                stroke="#525252"
                                fillOpacity={1}
                                fill="url(#colorRam)"
                                name="RAM Usage"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
