import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import VehicleCard from './VehicleCard';
import '../styles/catalog.css';

const Catalog = ({ irALogin, irARegistro, irAPublicar, verDetalles }) => {
  // 1. Creamos un espacio en la memoria para guardar los autos que vengan del backend
  const [vehiculos, setVehiculos] = useState([]);

  // Revisamos si hay un token guardado para saber si el usuario está logueado
  const token = localStorage.getItem('token');
  const nombreUsuario = localStorage.getItem('nombreUsuario');

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token'); // Borramos el carnet
    localStorage.removeItem('nombreUsuario'); // Borramos el nombre del usuario
    localStorage.removeItem('idUsuario'); // Borramos el ID del usuario
    window.location.reload(); // Recargamos la página para actualizar los botones
  };

  // 2. Usamos useEffect para ir a buscar los autos apenas cargue la página
  useEffect(() => {
    const obtenerAutos = async () => {
      try {
        const respuesta = await fetch('http://localhost:4000/api/vehicles');
        const datos = await respuesta.json();
        
        // Si el backend envía { vehiculos: [...] }, usamos datos.vehiculos
        // Si envía solo [...], usamos datos
        const listaReal = Array.isArray(datos) ? datos : (datos.vehiculos || []);

        // Guardamos los datos en la memoria
        setVehiculos(listaReal);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
      }
    };

    obtenerAutos();
  }, []); // Los corchetes vacíos significan que esto solo se ejecuta una vez al inicio

  return (
    <div>
      <header className="catalog-header">
        <h1>AutoMarket</h1>
        <div className="auth-buttons">
{token ? (
            // SI ESTÁ LOGUEADO: Mostramos Publicar, su Nombre y el botón de Cerrar Sesión
            <>
              <button onClick={irAPublicar} className="btn-register" style={{backgroundColor: '#2e7d32', marginRight: '10px'}}>
                + Publicar Auto
              </button>
              
              <span style={{marginRight: '15px', fontWeight: 'bold', color: 'white'}}>
                ¡Hola, {nombreUsuario}!
              </span>
              
              {/*BOTÓN DE CERRAR SESIÓN */}
              <button onClick={cerrarSesion} className="btn-login" style={{backgroundColor: '#dc3545', color: 'white', border: 'none'}}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            // SI NO ESTÁ LOGUEADO: Mostramos Iniciar Sesión y Registro
            <>
              <button onClick={irALogin} className="btn-login">Iniciar Sesión</button>
              <button onClick={irARegistro} className="btn-register">Registrarse</button>
            </>
          )}
          
         {/* <button onClick={irAPublicar} className="btn-register" style={{backgroundColor: '#2e7d32', marginRight: '10px'}}>+ Publicar Auto</button>
          <button onClick={irALogin} className="btn-login">Iniciar Sesión</button>
          <button onClick={irARegistro} className="btn-register">Registrarse</button>*/}
        </div>
      </header>

      <div className="catalog-container">
        <Sidebar />
        
        <main className="catalog-main">
          <h2>Vehículos Destacados</h2>
          
          <div className="vehicle-grid">
            {/* 3. Por cada vehículo en la lista, dibujamos una tarjeta */}
            {vehiculos.length === 0 ? (
              <p>No hay vehículos publicados todavía.</p>
            ) : (
              vehiculos.map((auto) => (
                <VehicleCard 
                  key={auto._id} 
                  auto={auto} 
                  verDetalles={verDetalles} 
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Catalog;