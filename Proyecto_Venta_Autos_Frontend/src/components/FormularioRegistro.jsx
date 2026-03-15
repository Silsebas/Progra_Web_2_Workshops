// src/components/FormularioRegistro.jsx
import React, { useState } from 'react';
import '../styles/Formulario.css'; 
import { FiMail, FiLock, FiEyeOff } from 'react-icons/fi'; 

const FormularioRegistro = ({ cambiarVista, volverCatalogo }) => {
  // 1. Estados para guardar lo que el usuario escriba
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Función para enviar los datos al Backend
  const manejarEnvio = async (e) => {
    e.preventDefault(); 
    
    try {
      const respuesta = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nombre, email, password }), 
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        alert('¡Usuario registrado con éxito en la base de datos!');
        setNombre('');
        setEmail('');
        setPassword('');
        cambiarVista(); // Manda al usuario al Login
      } else {
        alert('Error: ' + (datos.mensaje || 'No se pudo registrar'));
      }

    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Hubo un problema de conexión con el Backend. Revisa la terminal.');
    }
  };

  // 3. Lo que se dibuja en la pantalla
  return (
    <div className="pantalla-completa">
      <form className="contenedor-formulario" onSubmit={manejarEnvio}>
        
        {/* BOTÓN PARA VOLVER AL CATÁLOGO (Nota: le puse type="button" para que no intente enviar el formulario por error) */}
        <button type="button" onClick={volverCatalogo} className="btn-back" style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
          ⬅ Volver al Catálogo
        </button>

        <p className="texto-subtitulo">Start your journey</p>
        <h1 className="texto-titulo">Sign Up to InsideBox</h1> 

        {/* Campo para el Nombre */}
        <div className="grupo-input">
          <label className="label-input">Name</label>
          <div className="contenedor-input-icono">
            <FiMail className="icono-input" /> 
            <input 
              type="text" 
              className="input-estilizado" 
              placeholder="Ej. Jordan Cubillo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
          </div>
        </div>

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

        <button type="submit" className="boton-enviar">Sign Up</button> 

        <div className="contenedor-enlace">
          <p>Already have an account? <span className="texto-enlace" onClick={cambiarVista} style={{cursor: 'pointer'}}>Sign In</span></p>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;