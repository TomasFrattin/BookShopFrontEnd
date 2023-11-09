/* eslint-disable react/prop-types */
import "./Notification.css"

export const Notification = ({ messages, onClose }) => {
  return (
    <div className="notification">
      <div className="notification-content">
        <ul>
          <h1>¡Cuidado!</h1>
          <h3>Hemos detectado algunos errores, por favor revísalos.</h3>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};