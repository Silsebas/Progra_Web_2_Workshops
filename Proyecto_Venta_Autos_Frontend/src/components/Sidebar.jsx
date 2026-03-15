import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Filtros de Búsqueda</h3>
      <hr />
      
      <div className="filter-group">
        <label>Búsqueda</label>
        <input type="text" placeholder="Ej: Hilux, Civic..." />
      </div>

      <div className="filter-group">
        <label>Marca</label>
        <select>
          <option value="">Todas las marcas</option>
          <option value="toyota">Toyota</option>
          <option value="nissan">Nissan</option>
          <option value="honda">Honda</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Precio Máximo</label>
        <input type="range" min="0" max="50000" />
      </div>
      
      <button className="btn-filter">Aplicar Filtros</button>
    </aside>
  );
};

export default Sidebar;