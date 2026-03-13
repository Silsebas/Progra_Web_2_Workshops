// src/components/FormularioRegistro.jsx
import React, { useState } from 'react';
import '../styles/Formulario.css'; // Traemos los estilos que acabas de crear
import { FiMail, FiLock, FiEyeOff } from 'react-icons/fi'; // Traemos los iconos

const FormularioRegistro = ({ cambiarVista }) => {
  // Aquí guardaremos lo que el usuario escriba
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// Agregamos la palabra async porque el envío de datos toma tiempo
  const manejarEnvio = async (e) => {
    e.preventDefault(); 
    
    try {
      // Construimos el puente hacia el Backend (puerto 4000) enviando la ruta y los datos que el usuario escribió
      const respuesta = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST', // Método para enviar datos nuevos
        headers: {
          'Content-Type': 'application/json', // Le decimos que enviamos datos en formato JSON
        },
        // Empacamos el nombre, email y password que el usuario escribió
        body: JSON.stringify({ name: nombre, email, password }), 
      });

      // 2. Esperamos la respuesta del servidor
      const datos = await respuesta.json();

      // 3. Revisamos si todo salió bien
      if (respuesta.ok) {
        alert('¡Usuario registrado con éxito en la base de datos!');
        // Limpiamos los campos para que quede como nuevo
        setNombre('');
        setEmail('');
        setPassword('');
        // Opcional: Manda al usuario directo a la pantalla de Login
        cambiarVista(); 
      } else {
        // Si el correo ya existe o falta algo, mostramos el error del backend
        alert('Error: ' + (datos.mensaje || 'No se pudo registrar'));
      }

    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Hubo un problema de conexión con el Backend. Revisa la terminal.');
    }
  };

  return (
    <div className="pantalla-completa">
      <form className="contenedor-formulario" onSubmit={manejarEnvio}>
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
            {/* Icono del ojito a la derecha */}
            <FiEyeOff style={{position: 'absolute', right: '15px', color: '#adb5bd', cursor: 'pointer'}} />
          </div>
        </div>

        <button type="submit" className="boton-enviar">Sign Up</button> 

        <div className="contenedor-enlace">
          <p>Already have an account? <span className="texto-enlace" onClick={cambiarVista}>Sign In</span></p>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;