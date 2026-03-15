// src/components/Inbox.jsx
import React from 'react';
import '../styles/Inbox.css'; // Llamamos a los estilos nuevos

const Inbox = ({ volverCatalogo }) => {
  return (
    <div className="inbox-wrapper">
      <div className="inbox-header">
        <button onClick={volverCatalogo} className="btn-back">⬅ Volver al Catálogo</button>
        <h2>Bandeja de Mensajes</h2>
      </div>

      <div className="inbox-container">
        {/* PANEL IZQUIERDO: Lista de Conversaciones */}
        <aside className="chat-sidebar">
          <div className="chat-item active">
            <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=150" alt="Auto" className="chat-item-img"/>
            <div className="chat-item-details">
              <h4>Toyota Hilux 2021</h4>
              <p>Vendedor: Carlos M.</p>
            </div>
          </div>
          <div className="chat-item">
            <img src="https://via.placeholder.com/150/000000/FFFFFF/?text=Civic" alt="Auto" className="chat-item-img"/>
            <div className="chat-item-details">
              <h4>Honda Civic 2018</h4>
              <p>Vendedor: Ana S.</p>
            </div>
          </div>
        </aside>

        {/* PANEL DERECHO: El Chat Activo */}
        <main className="chat-window">
          <div className="chat-messages">
            
            {/* 1. Ejemplo de Mensaje Automático del Sistema (La orden de compra) */}
            <div className="message system-message">
              <div className="system-box">
                <span className="system-icon">🛒</span>
                <div>
                  <strong>¡Orden de Compra Generada! #ORD-9982</strong>
                  <p>Has indicado que quieres comprar este vehículo. El vendedor ha sido notificado.</p>
                </div>
              </div>
            </div>

            {/* 2. Ejemplo de Mensaje Enviado (Tuyo) */}
            <div className="message sent">
              <div className="message-bubble">
                <p>¡Hola Carlos! Ya generé la orden. ¿Cuándo puedo ir a ver el auto?</p>
                <span className="message-time">10:30 AM</span>
              </div>
            </div>

            {/* 3. Ejemplo de Mensaje Recibido (Del Vendedor) */}
            <div className="message received">
              <div className="message-bubble">
                <p>¡Hola Jordan! Claro que sí, gracias por tu interés. ¿Te parece bien mañana en la mañana?</p>
                <span className="message-time">10:35 AM</span>
              </div>
            </div>

          </div>

          {/* Área para escribir el mensaje */}
          <div className="chat-input-area">
            <input type="text" placeholder="Es tu turno de responder..." className="chat-input" />
            <button className="btn-send">Enviar</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inbox;