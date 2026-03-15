import React from 'react';
import Sidebar from './Sidebar';
import VehicleCard from './VehicleCard';
import '../styles/catalog.css';

// Recibimos las funciones que nos mandó App.jsx entre las llaves { }
const Catalog = ({ irALogin, irARegistro, irAPublicar }) => {
  return (
    <div>
      {/* NUEVO: Barra de navegación superior con los botones */}
      <header className="catalog-header">
        <h1>AutoMarket</h1>
         <div className="auth-buttons">
          {/* Este botón lo esconderemos después si no están logueados */}
          <button onClick={irAPublicar} className="btn-register" style={{backgroundColor: '#2e7d32', marginRight: '10px'}}>+ Publicar Auto</button>
          
          <button onClick={irALogin} className="btn-login">Iniciar Sesión</button>
          <button onClick={irARegistro} className="btn-register">Registrarse</button>
         </div>
      </header>

      {/* El contenedor que ya teníamos */}
      <div className="catalog-container">
        <Sidebar />
        <main className="catalog-main">
          <h2>Vehículos Destacados</h2>
          <div className="vehicle-grid">
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Catalog;