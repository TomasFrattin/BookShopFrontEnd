import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from '../auth/auth.js'

export function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Credentials before request:', credentials);
  
      const response = await axios.post('http://localhost:1234/users/login', credentials);
      console.log('Server Response:', response.data);
  
      setAuthData(response.data.token, response.data.role, response.data.nombre);
      navigate('/books');
    } catch (error) {
      setError('Credenciales incorrectas. Verifica tus datos e intenta nuevamente.');
      console.error('Error al iniciar sesión:', error);
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

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}