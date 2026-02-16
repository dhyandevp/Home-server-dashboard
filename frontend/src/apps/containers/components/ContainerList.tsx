import { useEffect } from 'react';
import { useDocker } from '../hooks/useDocker';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Play, Square, RotateCw, Box } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function ContainerList() {
    const { containers, isLoading, fetchContainers, performAction } = useDocker();

    useEffect(() => {
        fetchContainers();
        const interval = setInterval(fetchContainers, 5000); // Auto-refresh every 5s
        return () => clearInterval(interval);
    }, [fetchContainers]);

    if (isLoading && containers.length === 0) {
        return <div className="text-slate-500 animate-pulse">Loading containers...</div>;
    }

    return (
        <div className="rounded-md border border-slate-800 bg-slate-900/50">
            <Table>
                <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="w-[300px] text-slate-400">Container</TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                        <TableHead className="text-slate-400">Image</TableHead>
                        <TableHead className="text-slate-400">Ports</TableHead>
                        <TableHead className="text-right text-slate-400">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {containers.map((container) => (
                        <TableRow key={container.id} className="border-slate-800 hover:bg-slate-800/50">
                            <TableCell className="font-medium text-slate-200">
                                <div className="flex items-center gap-2">
                                    <Box className="h-4 w-4 text-cyan-500" />
                                    {container.name.replace('/', '')}
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono ml-6">{container.id.substring(0, 12)}</span>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={cn("capitalize border-0",
                                        container.state === 'running' ? "bg-green-500/10 text-green-500" :
                                            container.state === 'exited' ? "bg-red-500/10 text-red-500" :
                                                "bg-yellow-500/10 text-yellow-500"
                                    )}
                                >
                                    {container.state}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-slate-400 font-mono text-xs">{container.image}</TableCell>
                            <TableCell className="text-slate-400 font-mono text-xs max-w-[200px] truncate">
                                {container.ports?.join(', ') || '-'}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {container.state !== 'running' && (
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-slate-700 bg-slate-800 hover:bg-green-900/20 hover:text-green-500" onClick={() => performAction(container.id, 'start')}>
                                            <Play className="h-3 w-3" />
                                            <span className="sr-only">Start</span>
                                        </Button>
                                    )}
                                    {container.state === 'running' && (
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-slate-700 bg-slate-800 hover:bg-red-900/20 hover:text-red-500" onClick={() => performAction(container.id, 'stop')}>
                                            <Square className="h-3 w-3" />
                                            <span className="sr-only">Stop</span>
                                        </Button>
                                    )}
                                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-slate-700 bg-slate-800 hover:bg-cyan-900/20 hover:text-cyan-500" onClick={() => performAction(container.id, 'restart')}>
                                        <RotateCw className="h-3 w-3" />
                                        <span className="sr-only">Restart</span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
