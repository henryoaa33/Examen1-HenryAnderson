"use client";
import { createContext } from 'react';
import { Gasto } from '../models/Gasto';

export interface GastosContextProps {
  isAuthenticated: boolean;
  presupuesto: number;
  gastos: Gasto[];
  totalGastado: number;
  login: (clave: string) => boolean;
  establecerPresupuesto: (monto: number) => void;
  agregarGasto: (gasto: Gasto) => Promise<void>;
  cargarGastos: () => void;
}

export const GastosContext = createContext<GastosContextProps>({} as GastosContextProps);