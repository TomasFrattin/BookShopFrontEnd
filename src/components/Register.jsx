import './Register.css'
import { useState } from 'react';
import axios from 'axios';
import { Notification } from './Notification';
import { useNavigate } from 'react-router-dom';


export function RegistroUsuario() {
  const [usuario, setUsuario] = useState({ nombre: '', password: '' });
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage('');
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:1234/users', usuario);
      setSuccessMessage({ type: "success", message: "El Usuario fue registrado exitosamente." });

      setUsuario({ nombre: '', password: '' });
      setErrorMessages([]);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessages(['El nombre de Usuario ya se encuentra registrado. Por favor, inténtelo nuevamente.']);
    }
  }



  return (
    <form className="register-box" onSubmit={handleSubmit}>
        <h1>Inicio de Sesión</h1>
        <label>
          <span>Te invitamos a que te crees un usuario para continuar.</span>
          <h3 className='title-register-box'>Nombre de Usuario</h3>
          <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} />
        </label>
        <label>
        <h3 className='title-register-box'>Contraseña</h3>
          <input type="password" name="password" value={usuario.password} onChange={handleChange} />
        </label>

        <button type="submit">Registrar Usuario</button>
        <span>En caso de que ya tengas un usuario puedes.</span>
        <button type='button' onClick={() => navigate('/login')}>Iniciar Sesion</button>

      {successMessage && successMessage.type === "success" && (
        <Notification message={successMessage.message} 
        type="success" 
        onClose={closeNotification} />
      )}
      
      {errorMessages.length > 0 &&
       <Notification messages={errorMessages} 
       type="error" 
       onClose={closeNotification} />}
    </form>
  );
}
