"use client";
import { useGastos } from './providers/GastosProvider';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

export default function HomePage() {
  const { isAuthenticated } = useGastos();

  return (
    <main>
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </main>
  );
}