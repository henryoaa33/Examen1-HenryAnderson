"use client";
import { useState, useEffect, ReactNode, useContext } from 'react';
import { GastosContext } from '../context/GastosContext';
import { Gasto } from '../models/Gasto';

export const GastosProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [totalGastado, setTotalGastado] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Autenticado. Llamando a cargarGastos...");
      cargarGastos();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!Array.isArray(gastos)) return;
    const total = gastos.reduce((acumulador, gasto) => acumulador + gasto.monto, 0);
    setTotalGastado(total);
  }, [gastos]);

  const login = (clave: string): boolean => {
    if (clave === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const establecerPresupuesto = (monto: number) => {
    setPresupuesto(monto);
  };

  const cargarGastos = async () => {
    try {
      const response = await fetch('http://localhost:5000/gasto');
      const data = await response.json();
      console.log("Gastos recibidos de la API:", data); // <-- DEBUG: ¿Qué llega aquí?
      if (Array.isArray(data)) {
        setGastos(data);
      }
    } catch (error) {
      console.error("Error cargando gastos:", error);
    }
  };

  const agregarGasto = async (gasto: Gasto) => {
    try {
      console.log("Enviando gasto a la API:", gasto); // <-- DEBUG: ¿Qué estamos enviando?
      const response = await fetch('http://localhost:5000/gasto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gasto),
      });
      
      if(response.ok) {
        console.log("Gasto guardado exitosamente. Recargando lista...");
        cargarGastos(); // ¡Esta es la línea clave que refresca la tabla!
      } else {
        console.error("La API devolvió un error al guardar.");
      }
    } catch (error) {
      console.error("Error agregando gasto:", error);
    }
  };

  return (
    <GastosContext.Provider value={{ isAuthenticated, presupuesto, gastos, totalGastado, login, establecerPresupuesto, agregarGasto, cargarGastos }}>
      {children}
    </GastosContext.Provider>
  );
};

export const useGastos = () => useContext(GastosContext);