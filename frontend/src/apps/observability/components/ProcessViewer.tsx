import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useSocket } from "../../../context/SocketContext";
import { Activity } from "lucide-react";

export function ProcessViewer() {
    const { metrics } = useSocket();

    return (
        <Card className="col-span-1 h-full bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                    Top Processes
                </CardTitle>
                <Activity className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
                {metrics?.processes ? (
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-xs text-slate-500">Name</TableHead>
                                <TableHead className="text-xs text-slate-500 text-right">PID</TableHead>
                                <TableHead className="text-xs text-slate-500 text-right">CPU%</TableHead>
                                <TableHead className="text-xs text-slate-500 text-right">Mem%</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {metrics.processes.map((proc) => (
                                <TableRow key={proc.pid} className="border-slate-800 hover:bg-slate-800/50 group">
                                    <TableCell className="font-medium text-slate-300 text-xs py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                                            {proc.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-xs text-right py-2">{proc.pid}</TableCell>
                                    <TableCell className="text-right py-2">
                                        <Badge variant="outline" className="border-slate-700 bg-slate-900 text-cyan-500 text-[10px] h-5">
                                            {proc.cpu.toFixed(1)}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-400 text-xs text-right py-2">{proc.mem.toFixed(1)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex h-40 items-center justify-center text-xs text-slate-500">
                        Waiting for telemetry...
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
