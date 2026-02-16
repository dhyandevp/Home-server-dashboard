import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen w-full flex-col items-center justify-center bg-base p-4 text-center">
                    <div className="mb-4 rounded-full bg-red-500/10 p-4">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">System Malfunction</h1>
                    <p className="mb-6 max-w-md text-muted-foreground">
                        The mission control interface encountered a critical error.
                        {this.state.error?.message && <span className="block mt-2 font-mono text-xs bg-black/30 p-2 rounded">{this.state.error.message}</span>}
                    </p>
                    <div className="flex gap-4">
                        <Button onClick={() => window.location.reload()} variant="default">
                            Reboot System
                        </Button>
                        <Button onClick={() => window.location.href = '/'} variant="outline">
                            Return to Base
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
