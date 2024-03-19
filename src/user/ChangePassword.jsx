import "./ChangePassword.css"
import { useState } from 'react';
import axios from "axios";
import { Notification } from "../common/Notification.jsx"

import eyeClosed from "../assets/eyeClosed.svg"
import eyeOpen from "../assets/eyeOpen.svg"

export function ChangePassword(){
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage('');
  };

  const toggleShowPassword = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };
  
  const handleChangePassword = async () => {
    const username = localStorage.getItem('userName');

    if (newPassword !== confirmPassword) {
      setErrorMessages(['La nueva contraseña y la de confirmación no coinciden.']);
      return;
    }

    try {
      await axios.patch('http://localhost:1234/users/change-password', {
        username,
        currentPassword,
        newPassword,
      });
      setSuccessMessage({ type: "success", message: "La contraseña fue cambiada exitosamente." });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

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
        <div className="password-input-container">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <img 
            src={showCurrentPassword ? eyeOpen : eyeClosed}
            alt={showCurrentPassword ? 'Ocultar' : 'Mostrar'}
            className="eye-icon"
            onClick={() => toggleShowPassword('current')}
          />
        </div>
      </label>
      <label>
        <h3 className="title-changePassword-box">Nueva Contraseña</h3>
        <div className="password-input-container">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <img 
            src={showNewPassword ? eyeOpen : eyeClosed}
            alt={showNewPassword ? 'Ocultar' : 'Mostrar'}
            className="eye-icon"
            onClick={() => toggleShowPassword('new')}
          />
        </div>
      </label>
      <label>
        <h3 className="title-changePassword-box">Confirmar Nueva Contraseña</h3>
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <img 
            src={showConfirmPassword ? eyeOpen : eyeClosed}
            alt={showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            className="eye-icon"
            onClick={() => toggleShowPassword('confirm')}
          />
        </div>
      </label>
      <button onClick={handleChangePassword}>Cambiar Contraseña</button>
    </div>
  );
}