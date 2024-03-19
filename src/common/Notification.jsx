/* eslint-disable react/prop-types */
import "./Notification.css"

export const Notification = ({ message, messages, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <ul>
          {type === "error" ? (
            <>
              <h1>¡Cuidado!</h1>
              <h3>Hemos detectado algunos errores, por favor revísalos.</h3>
              {messages.map((errMsg, index) => (
                <li key={index}>{errMsg}</li>
              ))}
            </>
          ) : type === "success" ? (
            <h2>{message}</h2>
          ) : null}
        </ul>
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};