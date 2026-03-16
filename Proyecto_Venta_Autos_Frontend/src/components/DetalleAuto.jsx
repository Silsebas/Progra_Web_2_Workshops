import React from 'react';

const DetalleAuto = ({ auto, volverCatalogo, irAInbox }) => {
  // Si por alguna razón el auto no carga rápido, evitamos que la pantalla explote
  if (!auto) return <div>Cargando detalles...</div>;

  // 1. Sacamos el ID del usuario que está en el storage del navegador
  const miId = localStorage.getItem('idUsuario');

  // 2.MongoDB a veces manda el vendedor como un texto o como un objeto.
  // Esta línea saca el ID real sin importar cómo venga.
  const idVendedor = auto.vendedor?._id || auto.vendedor;

  // 3. Los convertimos a texto (String) para que la comparación sea perfecta
  const esMiAuto = miId && idVendedor && String(miId) === String(idVendedor);

  return (
    <div className="detalle-pantalla" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={volverCatalogo} className="btn-back" style={{ marginBottom: '20px' }}>
        ⬅ Volver al Catálogo
      </button>

      <div style={{ display: 'flex', gap: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        
        {/* Imagen dinámica */}
        <div style={{ flex: '1' }}>
          <img 
            src={auto.imagenes && auto.imagenes.length > 0 ? auto.imagenes[0] : "https://via.placeholder.com/800x500?text=Sin+Imagen"} 
            alt={`${auto.marca} ${auto.modelo}`} 
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
          />
        </div>

        {/* Info y Botones de Acción */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Título y precio dinámicos */}
          <h2>{auto.marca} {auto.modelo} {auto.anio}</h2>
          <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '10px 0' }}>
            ${auto.precio.toLocaleString()}
          </h1>
          
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
            <li><strong>Kilometraje:</strong> {auto.kilometraje} km</li>
            <li><strong>Motor:</strong> {auto.motor}</li>
            <li><strong>Transmisión:</strong> {auto.transmision}</li>
            <li><strong>Combustible:</strong> {auto.combustible}</li>
          </ul>

          <p><strong>Descripción:</strong> {auto.descripcion}</p>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            {/* 4. El operador condicional para mostrar botones */}
            {esMiAuto ? (
              // SI ES MI AUTO: Muestro botones de administrador
              <div style={{ width: '100%', padding: '15px', backgroundColor: '#f8f9fa', border: '2px dashed #ccc', textAlign: 'center', borderRadius: '5px' }}>
                <h3 style={{ color: '#555', margin: 0 }}> Esta es tu publicación</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#777' }}>No puedes comprarte a ti mismo.</p>
              </div>
            ) : (
              // SI NO ES MI AUTO: Muestro los botones de compra normales
              <>
                <button 
                  onClick={() => irAInbox('comprar')} 
                  style={{ flex: 1, padding: '15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>
                  🛒 Comprar Ahora
                </button>
                <button 
                  onClick={() => irAInbox('chatear')} 
                  style={{ flex: 1, padding: '15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>
                  💬 Chatear con Vendedor
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetalleAuto;