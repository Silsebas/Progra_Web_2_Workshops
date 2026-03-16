// src/components/PublicarAuto.jsx
import React, { useState } from 'react';
import '../styles/PublicarAuto.css';

const PublicarAuto = ({ volverCatalogo }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [precio, setPrecio] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [motor, setMotor] = useState('');
  const [combustible, setCombustible] = useState('Gasolina');
  const [transmision, setTransmision] = useState('Manual');
  const [descripcion, setDescripcion] = useState('');
  
  // 1. Nuevo estado para guardar la imagen seleccionada
  const [imagen, setImagen] = useState(null);

  const manejarEnvio = async (e) => {
    e.preventDefault(); 

    const token = localStorage.getItem('token');
    
    // MICRÓFONO 2: Ver qué sacamos del bolsillo
    // console.log("TOKEN QUE ESTAMOS A PUNTO DE ENVIAR:", token);

    // 2. Buscamos el Token en el bolsillo del navegador
   // const token = localStorage.getItem('token');
    if (!token) {
      alert('¡Debes iniciar sesión para poder publicar un auto!');
      return; 
    }

    // 3. Empacamos todo en un FormData  para enviar archivos al backend
    const formData = new FormData();
    formData.append('marca', marca);
    formData.append('modelo', modelo);
    formData.append('anio', anio);
    formData.append('precio', precio);
    formData.append('kilometraje', kilometraje);
    formData.append('motor', motor);
    formData.append('combustible', combustible);
    formData.append('transmision', transmision);
    formData.append('descripcion', descripcion);
    
    // Si el usuario seleccionó una imagen, la agregamos a la caja
    if (imagen) {
      formData.append('imagen', imagen); 
    }

    try {
      // 4. Enviamos la caja al backend
      const respuesta = await fetch('http://localhost:4000/api/vehicles', {
        method: 'POST',
        headers: {
          'x-auth-token': token // Presentamos el Token para que el backend sepa quién es el vendedor
          // OJO: Cuando usamos FormData, NO ponemos 'Content-Type': 'application/json'
          // El navegador lo hace automáticamente y le pone el tipo correcto para archivos
        },
        body: formData
      });

      if (respuesta.ok) {
        alert('¡Vehículo publicado con éxito!');
        volverCatalogo(); // Regresamos al catálogo
      } else {
        const datos = await respuesta.json();
        alert('Error: ' + (datos.mensaje || 'Hubo un problema al publicar'));
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="publicar-pantalla">
      <div className="publicar-contenedor">
        <button type="button" onClick={volverCatalogo} className="btn-back">
          ⬅ Volver al Catálogo
        </button>

        <h2>Publicar Nuevo Vehículo</h2>
        <p>Ingresa los detalles del auto que deseas vender.</p>

        <form onSubmit={manejarEnvio} className="formulario-grid">
          
          <div className="campo">
            <label>Marca</label>
            <input type="text" placeholder="Ej. Toyota" required value={marca} onChange={(e) => setMarca(e.target.value)} />
          </div>

          <div className="campo">
            <label>Modelo</label>
            <input type="text" placeholder="Ej. Hilux" required value={modelo} onChange={(e) => setModelo(e.target.value)} />
          </div>

          <div className="campo">
            <label>Año</label>
            <input type="number" placeholder="Ej. 2021" required value={anio} onChange={(e) => setAnio(e.target.value)} />
          </div>

          <div className="campo">
            <label>Precio ($)</label>
            <input type="number" placeholder="Ej. 25000" required value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </div>

          <div className="campo">
            <label>Kilometraje (km)</label>
            <input type="number" placeholder="Ej. 45000" required value={kilometraje} onChange={(e) => setKilometraje(e.target.value)} />
          </div>

          <div className="campo">
            <label>Motor / Cilindraje</label>
            <input type="text" placeholder="Ej. 2.8L" required value={motor} onChange={(e) => setMotor(e.target.value)} />
          </div>

          <div className="campo">
            <label>Combustible</label>
            <select value={combustible} onChange={(e) => setCombustible(e.target.value)}>
              <option value="Gasolina">Gasolina</option>
              <option value="Diesel">Diesel</option>
              <option value="Eléctrico">Eléctrico</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          <div className="campo">
            <label>Transmisión</label>
            <select value={transmision} onChange={(e) => setTransmision(e.target.value)}>
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
            </select>
          </div>

          <div className="campo descripcion-auto">
            <label>Descripción</label>
            <textarea rows="4" placeholder="Describe el estado del auto, extras, etc." required value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
          </div>

          {/*Campo para subir la imagen */}
          <div className="campo descripcion-auto">
            <label>Foto del Vehículo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImagen(e.target.files[0])} 
              style={{ padding: '10px 0' }}
            />
          </div>

          <button type="submit" className="btn-publicar">Publicar Vehículo</button>
        </form>
      </div>
    </div>
  );
};

export default PublicarAuto;