import React from 'react';

const DetalleAuto = ({ volverCatalogo, irAInbox }) => {
  return (
    <div className="detalle-pantalla" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={volverCatalogo} className="btn-back" style={{ marginBottom: '20px' }}>
        ⬅ Volver al Catálogo
      </button>

      <div style={{ display: 'flex', gap: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        {/* Imagen gigante */}
        <div style={{ flex: '1' }}>
          <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800" alt="Toyota Hilux" style={{ width: '100%', borderRadius: '8px' }} />
        </div>

        {/* Info y Botones de Acción */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Toyota Hilux 2021</h2>
          <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '10px 0' }}>$25,000</h1>
          
          <p><strong>Descripción:</strong> Camioneta en excelente estado, un solo dueño, mantenimientos al día. Perfecta para el trabajo duro y la ciudad.</p>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleAuto;