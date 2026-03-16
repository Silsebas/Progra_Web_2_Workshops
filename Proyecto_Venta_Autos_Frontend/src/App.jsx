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
 const manejarAccionAuto = async (accion) => { 

    // 1. Revisamos si el usuario tiene sesión iniciada
    const token = localStorage.getItem('token');
    
    // 2. Si NO hay token, le avisamos y lo mandamos a Iniciar Sesión
    if (!token) {
      alert("Debes iniciar sesión o registrarte para poder comprar o chatear.");
      setVistaActual('login'); // Lo redirigimos al login
      return; // Cortamos la función aquí para que no avance
    }

    // SI LA ACCIÓN ES SOLO 'VER', NOS VAMOS DIRECTO AL INBOX
    if (accion === 'ver') {
      setVistaActual('inbox');
      return;
    }

    // 3. Si SÍ hay token, todo sigue normal
    // Definimos el mensaje inicial dependiendo de si es una compra o solo un interés
    const esOrden = accion === 'comprar';
    const mensajeInicial = esOrden 
      ? `¡Hola! He generado una orden de compra por el ${autoSeleccionado.marca} ${autoSeleccionado.modelo}.`
      : `¡Hola! Estoy interesado en tu ${autoSeleccionado.marca} ${autoSeleccionado.modelo}. ¿Sigue disponible?`;

    try {
      const respuesta = await fetch('http://localhost:4000/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          vehiculoId: autoSeleccionado._id,
          vendedorId: autoSeleccionado.vendedor._id || autoSeleccionado.vendedor,
          mensajeInicial: mensajeInicial,
          esOrden: esOrden,
          soloAbrir: true // Indicamos que solo queremos abrir el chat, no enviar un mensaje nuevo
        })
      });

      // Obtenemos la respuesta del servidor
      const datos = await respuesta.json();

      if (respuesta.ok) {
        // Si el chat es nuevo o se pudo enviar el mensaje, vamos al Inbox
        setVistaActual('inbox');
      } else if (respuesta.status === 400) {
        // Si es error 400, significa que el chat ya existe. No mostramos error,
        // simplemente redirigimos al usuario para que vea la conversación.
        setVistaActual('inbox');
      } else {
        // Si es otro tipo de error (500, 404, etc.), ahí sí avisamos
        alert("Error al iniciar chat: " + (datos.mensaje || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("Hubo un problema de conexión con el servidor.");
    }
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