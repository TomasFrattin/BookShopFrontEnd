import "./ChangePassword.css"
import { useState } from 'react';
import axios from "axios";
import { Notification } from "./Notification.jsx"

export function ChangePassword(){
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage('');
  };

  const handleChangePassword = async () => {
    const username = localStorage.getItem('userName');

    try {
      await axios.patch('http://localhost:1234/users/change-password', {
        username,
        currentPassword,
        newPassword,
      });
      setSuccessMessage({ type: "success", message: "La contraseña fue cambiada exitosamente." });
    } catch (error) {
      setErrorMessages(['Error al cambiar la contraseña. Por favor, inténtelo nuevamente.']);
    }
  };

  return (
    <div className="changePassword-box">
      <h2>Cambiar Contraseña</h2>

      {successMessage && successMessage.type === "success" && (
        <Notification message={successMessage.message} 
        type="success" 
        onClose={closeNotification} />
      )}
      
      {errorMessages.length > 0 && (
       <Notification messages={errorMessages} 
       type="error" 
       onClose={closeNotification} />
       )}

      <label>
        <h3 className="title-changePassword-box">Contraseña Actual</h3>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </label>
      <label>
        <h3 className="title-changePassword-box">Nueva Contraseña</h3>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <label>
        <h3 className="title-changePassword-box">Confirmar Nueva Contraseña</h3>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <button onClick={handleChangePassword}>Cambiar Contraseña</button>
    </div>
  )

}


