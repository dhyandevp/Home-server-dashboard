import { Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode, lazy, Suspense } from 'react';
import { AppShell } from './core/layout/AppShell';
import { useAuth } from './context/AuthContext';

// Lazy load apps
const ObservabilityApp = lazy(() => import('./apps/observability/ObservabilityApp').then(module => ({ default: module.ObservabilityApp })));
const ContainersApp = lazy(() => import('./apps/containers/ContainersApp').then(module => ({ default: module.ContainersApp })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));

function LoadingFallback() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-cyan-500">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                <p className="text-sm font-medium tracking-wide">INITIALIZING SYSTEM...</p>
            </div>
        </div>
    );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingFallback />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <AppShell>
            {children}
        </AppShell>
    );
}

export function AppRoutes() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<ProtectedRoute><ObservabilityApp /></ProtectedRoute>} />
                <Route path="/containers" element={<ProtectedRoute><ContainersApp /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><div className="text-white">System Configuration (Loading...)</div></ProtectedRoute>} />
            </Routes>
        </Suspense>
    );
}
