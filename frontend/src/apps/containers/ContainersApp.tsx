import { ContainerList } from './components/ContainerList';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function ContainersApp() {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white shadow-cyan-500/20 drop-shadow-sm">Docker Manager</h2>
                    <p className="text-slate-400">
                        Container orchestration and lifecycle management
                    </p>
                </div>
                <Button onClick={() => toast.info('Compose Editor coming in Phase 4')} className="bg-cyan-600 hover:bg-cyan-500">
                    <Plus className="mr-2 h-4 w-4" />
                    Deploy Stack
                </Button>
            </div>

            <ContainerList />
        </div>
    );
}
