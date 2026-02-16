import { type FormEvent, useState } from 'react';
import api from '../services/api';

interface LoginPageProps {
  onAuthenticated: () => void;
}

export function LoginPage({ onAuthenticated }: LoginPageProps) {
  const [email, setEmail] = useState('admin@homeserver.local');
  const [password, setPassword] = useState('admin123!');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('session_expiry', String(Date.now() + 60 * 60 * 1000));
      onAuthenticated();
    } catch {
      setError('Invalid credentials');
    }
  }

  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl border border-border bg-panel p-8">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mt-2 text-slate-400">Secure access to your home server platform.</p>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <input
          className="w-full rounded-md border border-border bg-base p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full rounded-md border border-border bg-base p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          className="w-full rounded-md border border-border bg-base p-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="2FA code (optional in scaffold)"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-md bg-accent p-3 font-medium text-white">Login</button>
      </form>
    </main>
  );
}
