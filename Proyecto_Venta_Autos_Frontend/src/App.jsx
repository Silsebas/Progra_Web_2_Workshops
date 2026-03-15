// src/App.jsx
import React, { useState } from 'react';
import FormularioLogin from './components/FormularioLogin';
import FormularioRegistro from './components/FormularioRegistro';
import Catalog from './components/Catalog'; 
import PublicarAuto from './components/PublicarAuto';

function App() {
  // 1. Iniciamos en el catálogo, como pide el requerimiento.
  const [vistaActual, setVistaActual] = useState('catalogo'); 

  return (
    <div>
      {/* 2. Si la vista es el catálogo, le pasamos las funciones para ir a login/registro */}
        {vistaActual === 'catalogo' && (
        <Catalog 
          irALogin={() => setVistaActual('login')} 
          irARegistro={() => setVistaActual('registro')} 
          irAPublicar={() => setVistaActual('publicar')} // <- NUEVA FUNCIÓN
        /> 
        )}

      {/* 3. Vistas de autenticación */}
      {vistaActual === 'login' && (
        <FormularioLogin 
          cambiarVista={() => setVistaActual('registro')} 
          // Es buena idea pasar una función para regresar al catálogo si se arrepienten
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
    </div>
  );
}

export default App;