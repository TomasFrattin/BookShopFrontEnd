import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from '../auth/auth.js'
import { Notification } from './Notification';

export function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage('');
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Credentials before request:', credentials);
  
      const response = await axios.post('http://localhost:1234/users/login', credentials);

      setAuthData(response.data.token, response.data.role, response.data.username);
      console.log(localStorage.getItem('userName'))
      navigate('/books');
    } catch (error) {
      setErrorMessages(['Los datos ingresados no corresponden a un usuario creado. Intente nuevamente'])
    }
  };
  
  

  return (
    <form className='login-box' onSubmit={handleSubmit}>
      <h1>Inicio de Sesión</h1>
      <label>
        <h3 className='title-login-box'>Nombre de Usuario</h3>
        <input type="text" name="username" value={credentials.username} onChange={handleChange} />
      </label>
      <label>
        <h3 className='title-login-box'>Contraseña</h3>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      </label>
      <button type="submit">Iniciar Sesión</button>

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