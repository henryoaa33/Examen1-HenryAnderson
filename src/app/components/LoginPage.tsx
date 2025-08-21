"use client";
import { useState } from 'react';
import { useGastos } from '../providers/GastosProvider';

export const LoginPage = () => {
  const [clave, setClave] = useState('');
  const { login } = useGastos();

  const handleLogin = () => {
    if (!login(clave)) {
      alert('Clave incorrecta');
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} placeholder="Clave (admin123)" />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};