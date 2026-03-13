// src/App.jsx
import React, { useState } from 'react';
import FormularioLogin from './components/FormularioLogin';
import FormularioRegistro from './components/FormularioRegistro';

function App() {
  // Aquí le decimos a React que empiece mostrando la pantalla de 'login'
  const [vistaActual, setVistaActual] = useState('login'); 

  return (
    <div>
      {/* Si la vista es 'login', mostramos el Login. Si no, mostramos el Registro */}
      {vistaActual === 'login' ? (
        <FormularioLogin cambiarVista={() => setVistaActual('registro')} />
      ) : (
        <FormularioRegistro cambiarVista={() => setVistaActual('login')} />
      )}
    </div>
  );
}

export default App;