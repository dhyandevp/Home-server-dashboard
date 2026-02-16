import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useResourceHistory } from '../hooks/useResourceHistory';
import { Activity } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';
import { useEffect, useState } from 'react';

export function ResourceHistory() {
    const { history: initialHistory, isLoading } = useResourceHistory();
    const { metrics } = useSocket();
    const [data, setData] = useState(initialHistory);

    // Update local history when initial fetch finishes
    useEffect(() => {
        if (initialHistory.length > 0) setData(initialHistory);
    }, [initialHistory]);

    // Append new socket metrics to the chart data live
    useEffect(() => {
        if (metrics) {
            setData(prev => {
                const newData = [...prev, metrics];
                // Keep last 60 points (1 minute if 1s interval)
                if (newData.length > 60) return newData.slice(newData.length - 60);
                return newData;
            });
        }
    }, [metrics]);

    if (isLoading && data.length === 0) {
        return (
            <Card className="col-span-1 border-slate-800 bg-slate-900/50 h-[300px] animate-pulse">
                <CardHeader><CardTitle>System Load</CardTitle></CardHeader>
            </Card>
        );
    }

    return (
        <Card className="col-span-1 border-slate-800 bg-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                    Resource History (Last 60s)
                </CardTitle>
                <Activity className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent className="h-[250px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis hide />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                            itemStyle={{ color: '#06b6d4' }}
                            labelStyle={{ display: 'none' }}
                            formatter={(val: number | undefined) => (val ?? 0).toFixed(1) + '%'}
                        />
                        <Area
                            type="monotone"
                            dataKey="cpu"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCpu)"
                            isAnimationActive={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="ram"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fillOpacity={0.1}
                            fill="#8b5cf6"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
