// src/components/PublicarAuto.jsx
import React, { useState } from 'react';
import '../styles/PublicarAuto.css';

const PublicarAuto = ({ volverCatalogo }) => {
  // Estados para guardar toda la info del auto
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [precio, setPrecio] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [motor, setMotor] = useState('');
  const [combustible, setCombustible] = useState('Gasolina');
  const [transmision, setTransmision] = useState('Manual');
  const [descripcion, setDescripcion] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Por ahora solo es visual, luego lo conectaremos al backend
    alert('¡Diseño listo! Luego enviaremos este auto a la base de datos.');
    volverCatalogo();
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

          {/* Más adelante agregaremos el input para subir imágenes aquí */}

          <button type="submit" className="btn-publicar">Publicar Vehículo</button>
        </form>
      </div>
    </div>
  );
};

export default PublicarAuto;