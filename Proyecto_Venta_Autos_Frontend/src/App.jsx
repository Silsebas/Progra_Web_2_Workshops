// src/App.jsx
import React, { useState } from 'react';
import FormularioLogin from './components/FormularioLogin';
import FormularioRegistro from './components/FormularioRegistro';
import Catalog from './components/Catalog'; 
import PublicarAuto from './components/PublicarAuto';
import DetalleAuto from './components/DetalleAuto';
import Inbox from './components/Inbox';

function App() {
  const [vistaActual, setVistaActual] = useState('catalogo'); 
  
  // Creamos una memoria para guardar el auto al que le dimos clic
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);

// Función para manejar compras y chats con token de seguridad
  const manejarAccionAuto = (accion) => {
    // 1. Revisamos si el usuario tiene sesión iniciada
    const token = localStorage.getItem('token');
    
    // 2. Si NO hay token, le avisamos y lo mandamos a Iniciar Sesión
    if (!token) {
      alert("Debes iniciar sesión o registrarte para poder comprar o chatear.");
      setVistaActual('login'); // Lo redirigimos al login
      return; // Cortamos la función aquí para que no avance
    }

    // 3. Si SÍ hay token, todo sigue normal
    if(accion === 'comprar') {
      alert("Generando Orden de Compra... Redirigiendo al Inbox.");
    } else {
      alert("Abriendo Chat con el vendedor... Redirigiendo al Inbox.");
    }
    setVistaActual('inbox');
  };

  return (
    <div>
        {vistaActual === 'catalogo' && (
        <Catalog 
          irALogin={() => setVistaActual('login')} 
          irARegistro={() => setVistaActual('registro')} 
          irAPublicar={() => setVistaActual('publicar')}
          // ✨ ¡CAMBIO AQUÍ! Recibimos el auto específico y lo guardamos antes de cambiar la vista
          verDetalles={(autoQueClickeo) => {
            setAutoSeleccionado(autoQueClickeo); // Guardamos el auto en la memoria
            setVistaActual('detalle'); // Cambiamos la pantalla
          }}
        /> 
        )}

      {/* VISTA: Detalles del Auto */}
      {vistaActual === 'detalle' && (
        <DetalleAuto 
          auto={autoSeleccionado} // Le damos al detalle el auto que guardamos
          volverCatalogo={() => setVistaActual('catalogo')}
          irAInbox={manejarAccionAuto}
        />
      )}

      {/* Vistas de autenticación y demás */}
      {vistaActual === 'login' && (
        <FormularioLogin 
          cambiarVista={() => setVistaActual('registro')} 
          volverCatalogo={() => setVistaActual('catalogo')} 
        />
      )}

      {vistaActual === 'registro' && (
        <FormularioRegistro 
          cambiarVista={() => setVistaActual('login')} 
          volverCatalogo={() => setVistaActual('catalogo')} 
        />
      )}
      
      {vistaActual === 'publicar' && (
        <PublicarAuto volverCatalogo={() => setVistaActual('catalogo')} />
      )}

      {vistaActual === 'inbox' && (
        <Inbox volverCatalogo={() => setVistaActual('catalogo')} />
      )}
    </div>
  );
}

export default App;