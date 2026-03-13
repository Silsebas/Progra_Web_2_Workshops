// src/components/FormularioLogin.jsx
import React, { useState } from 'react';
import '../styles/Formulario.css'; // reutilizamos los estilos del formulario de registro
import { FiMail, FiLock, FiEyeOff } from 'react-icons/fi';

const FormularioLogin = ({ cambiarVista }) => {
  // Solo necesitamos guardar el correo y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const manejarEnvio = async (e) => {
    e.preventDefault();
    
    try {
      // Apuntamos a la ruta de login en el backend
      const respuesta = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Aquí enviamos solo el correo y la contraseña
        body: JSON.stringify({ email, password }), 
      });

      const datos = await respuesta.json();

      // Revisamos si las credenciales son correctas
      if (respuesta.ok) {
        alert('¡Login exitoso! Bienvenido');
        console.log('Token recibido:', datos.token); // El backend nos devuelve un token de acceso
        
        // Limpiamos los campos
        setEmail('');
        setPassword('');
      } else {
        // Si la contraseña está mal o el correo no existe
        alert('Error: ' + (datos.mensaje || 'Credenciales incorrectas o usuario no registrado'));
      }

    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Hubo un problema de conexión con el Backend.');
    }
  };

  return (
    <div className="pantalla-completa">
      <form className="contenedor-formulario" onSubmit={manejarEnvio}>
        <p className="texto-subtitulo">Welcome back</p>
        <h1 className="texto-titulo">Sign In to InsideBox</h1> 

        {/* Campo para el Correo */}
        <div className="grupo-input">
          <label className="label-input">E-mail</label> 
          <div className="contenedor-input-icono">
            <FiMail className="icono-input" />
            <input 
              type="email" 
              className="input-estilizado" 
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
        </div>

        {/* Campo para la Contraseña */}
        <div className="grupo-input">
          <label className="label-input">Password</label>
          <div className="contenedor-input-icono">
            <FiLock className="icono-input" />
            <input 
              type="password" 
              className="input-estilizado" 
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <FiEyeOff style={{position: 'absolute', right: '15px', color: '#adb5bd', cursor: 'pointer'}} />
          </div>
        </div>

        <button type="submit" className="boton-enviar">Sign In</button> 
        
        <div className="contenedor-enlace">
          <p>Don't have an account? <span className="texto-enlace" onClick={cambiarVista}>Sign Up</span></p>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;