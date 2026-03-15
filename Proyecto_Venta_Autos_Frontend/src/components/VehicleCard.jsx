import React from 'react';

const VehicleCard = () => {
  return (
    <div className="vehicle-card">
      <img src="https://via.placeholder.com/300x200?text=Foto+del+Auto" alt="Auto" className="vehicle-img" />
      
      <div className="vehicle-info">
        <h4>Toyota Hilux 2021</h4>
        <h3 className="price">$ 25,000</h3>
        
        <ul className="details">
          <li><strong>Motor:</strong> 2.8L</li>
          <li><strong>Transmisión:</strong> Manual</li>
          <li><strong>Combustible:</strong> Diesel</li>
        </ul>
        
        <button className="btn-details">Ver Detalles</button>
      </div>
    </div>
  );
};

export default VehicleCard;