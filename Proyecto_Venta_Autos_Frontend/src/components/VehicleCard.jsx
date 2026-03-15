import React from 'react';

// Recibimos "verDetalles" como prop, que será la función que cambie la pantalla
const VehicleCard = ({ verDetalles }) => {
  return (
    <div className="vehicle-card">
      <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800" alt="Auto" className="vehicle-img" />
      
      <div className="vehicle-info">
        <h4>Toyota Hilux 2021</h4>
        <h3 className="price">$ 25,000</h3>
        
        <ul className="details">
          <li><strong>Motor:</strong> 2.8L</li>
          <li><strong>Transmisión:</strong> Manual</li>
          <li><strong>Kilometraje:</strong> 45,000 km</li>
        </ul>
        
        {/* Este botón activará la vista de detalles */}
        <button onClick={verDetalles} className="btn-details">
          Ver Vehículo
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;