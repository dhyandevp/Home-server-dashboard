import { useState } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token')));

  return authenticated ? <DashboardPage /> : <LoginPage onAuthenticated={() => setAuthenticated(true)} />;
}
