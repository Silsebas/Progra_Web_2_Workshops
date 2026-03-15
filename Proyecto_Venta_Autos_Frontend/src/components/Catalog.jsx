// src/components/Catalog.jsx
import React from 'react';
import Sidebar from './Sidebar';
import VehicleCard from './VehicleCard';
import '../styles/catalog.css';

// 1. Aquí "Catalog" recibe los 4 controles remotos que le mandó su jefe (App.jsx)
const Catalog = ({ irALogin, irARegistro, irAPublicar, verDetalles }) => {
  return (
    <div>
      {/* Barra de navegación superior */}
      <header className="catalog-header">
        <h1>AutoMarket</h1>
        <div className="auth-buttons">
          <button onClick={irAPublicar} className="btn-register" style={{backgroundColor: '#2e7d32', marginRight: '10px'}}>+ Publicar Auto</button>
          <button onClick={irALogin} className="btn-login">Iniciar Sesión</button>
          <button onClick={irARegistro} className="btn-register">Registrarse</button>
        </div>
      </header>

      {/* Contenedor principal con filtros y tarjetas */}
      <div className="catalog-container">
        <Sidebar />
        
        <main className="catalog-main">
          <h2>Vehículos Destacados</h2>
          <div className="vehicle-grid">
            {/* 2. Aquí "Catalog" le entrega el control "verDetalles" a cada trabajador (VehicleCard) */}
            <VehicleCard verDetalles={verDetalles} />
            <VehicleCard verDetalles={verDetalles} />
            <VehicleCard verDetalles={verDetalles} />
            <VehicleCard verDetalles={verDetalles} />
            <VehicleCard verDetalles={verDetalles} />
            <VehicleCard verDetalles={verDetalles} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Catalog;