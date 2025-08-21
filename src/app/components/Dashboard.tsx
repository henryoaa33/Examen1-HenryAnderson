"use client";
import { useState } from 'react';
import { useGastos } from '../providers/GastosProvider';
import { Gasto } from '../models/Gasto';

export const Dashboard = () => {
  const { presupuesto, gastos, totalGastado, establecerPresupuesto, agregarGasto } = useGastos();
  
  const [montoPresupuesto, setMontoPresupuesto] = useState("");
  const [nuevoGasto, setNuevoGasto] = useState({
    categoria: 'Comida',
    monto: "",
    fecha: "",
    descripcion: ""
  });

  const porcentajeGastado = presupuesto > 0 ? (totalGastado / presupuesto) * 100 : 0;

 const handleAgregarGasto = () => {
    // --- VALIDACIÓN MEJORADA ---
    // 1. Verifica que el monto sea un número válido y mayor que cero.
    const montoNumerico = Number(nuevoGasto.monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      alert("Por favor, introduce un monto válido y mayor que cero.");
      return;
    }
    
    // 2. Verifica que se haya seleccionado una fecha.
    if (!nuevoGasto.fecha) {
      alert("Por favor, selecciona una fecha.");
      return;
    }
    
    // Si todas las validaciones pasan, creamos el objeto a enviar.
    const gastoParaGuardar: Gasto = {
      categoria: nuevoGasto.categoria,
      monto: montoNumerico,
      fecha: nuevoGasto.fecha,
    };

    // Llamamos a la función del Provider
    agregarGasto(gastoParaGuardar);

    // Limpiamos el formulario
    setNuevoGasto({ ...nuevoGasto, monto: "", fecha: "" });
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>Administrador de Gastos Personales</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Establecer Presupuesto Mensual</h3>
        <input 
          type="number" 
          value={montoPresupuesto}
          onChange={(e) => setMontoPresupuesto(e.target.value)} 
          placeholder="Monto del presupuesto" 
        />
        <button onClick={() => establecerPresupuesto(Number(montoPresupuesto))}>
          Guardar Presupuesto
        </button>
      </div>
      
      {presupuesto > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <p>Presupuesto Establecido: Lps. {presupuesto.toFixed(2)}</p>
          <p>Total Gastado: Lps. {totalGastado.toFixed(2)}</p>
          
          {porcentajeGastado >= 100 && (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
              ¡Has superado el límite del presupuesto, debes ajustar gastos!
            </div>
          )}
          {porcentajeGastado >= 80 && porcentajeGastado < 100 && (
            <div style={{ color: 'orange', fontWeight: 'bold' }}>
              Ha alcanzado el 80% del presupuesto.
            </div>
          )}
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h3>Registro de Gastos</h3>
        <input 
          type="number" 
          value={nuevoGasto.monto}
          onChange={(e) => setNuevoGasto({...nuevoGasto, monto: e.target.value})} 
          placeholder="Monto" 
        />
        <select value={nuevoGasto.categoria} onChange={(e) => setNuevoGasto({...nuevoGasto, categoria: e.target.value})}>
          <option value="Comida">Comida</option>
          <option value="Ropa">Ropa</option>
          <option value="Entretenimiento">Entretenimiento</option>
        </select>
        <input 
          type="date" 
          value={nuevoGasto.fecha}
          onChange={(e) => setNuevoGasto({...nuevoGasto, fecha: e.target.value})} 
        />
        <button onClick={handleAgregarGasto}>Guardar Gasto</button>
      </div>
      
      <div>
        <h3>Gastos Agregados</h3>
        <table border={1} cellPadding={5} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(gastos) && gastos.map(gasto => (
              <tr key={gasto.idgasto}>
                <td>{gasto.monto.toFixed(2)}</td>
                <td>{gasto.categoria}</td>
                <td>{gasto.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};