import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShieldCheck, Command } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function LoginPage() {
  const [username, setUsername] = useState('dhyandev');
  const [password, setPassword] = useState('keethu');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const payload = { email: username, password };
      const { data } = await api.post('/api/auth/login', payload);

      const user = data.user || { id: '1', email: username, role: 'admin' };

      login(data.token, user);
      toast.success(`System Access Granted: ${username}`);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Access Denied: Invalid Credentials');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex h-screen w-full items-center justify-center bg-default font-sans text-primary">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#262626 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="z-10 w-full max-w-sm">
        <div className="overflow-hidden rounded-sm border border-border bg-subtle shadow-sm">
          {/* Header */}
          <div className="border-b border-border bg-surface/50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-border/30">
              <Command className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-primary">Battlestation</h1>
            <p className="mt-1 text-xs uppercase tracking-wider text-secondary">Restricted Access</p>
          </div>

          <div className="p-6">
            <form className="space-y-4" onSubmit={submit}>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-secondary">Identity</label>
                <Input
                  className="bg-default border-border text-primary placeholder:text-muted focus-visible:ring-active rounded-sm h-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-secondary">Key</label>
                <Input
                  className="bg-default border-border text-primary placeholder:text-muted focus-visible:ring-active rounded-sm h-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>

              <Button
                className="w-full bg-action hover:bg-action-hover text-white rounded-sm h-10 uppercase tracking-wide text-xs font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Initialize Session
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Footer Status */}
          <div className="bg-default/50 px-6 py-3 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success"></div>
              <span className="text-[10px] text-secondary uppercase tracking-wider">System Online</span>
            </div>
            <span className="text-[10px] text-muted">v2.0.4</span>
          </div>
        </div>
      </div>
    </main>
  );
}
