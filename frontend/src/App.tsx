import { useEffect, useState } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

function hasValidSession() {
  const token = localStorage.getItem('token');
  const expiry = Number(localStorage.getItem('session_expiry') ?? 0);
  return Boolean(token) && Date.now() < expiry;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(hasValidSession());

  useEffect(() => {
    const timer = setInterval(() => {
      if (!hasValidSession()) {
        localStorage.removeItem('token');
        setAuthenticated(false);
      }
    }, 30_000);

    return () => clearInterval(timer);
  }, []);

  return authenticated ? <DashboardPage /> : <LoginPage onAuthenticated={() => setAuthenticated(true)} />;
}
