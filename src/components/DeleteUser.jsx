import "./DeleteUser.css"
import { useState, useEffect } from "react"
import axios from "axios"

import { getUserRole } from "../auth/auth.js"
import { Notification } from "./Notification.jsx"
import { useNavigate} from "react-router-dom"

export function DeleteUser() {
const [errorMessages, setErrorMessages] = useState([])
const [users, setUsers] = useState([])
const navigate = useNavigate()

  useEffect(() => {
    const userRole = getUserRole();

    if (userRole !== 'admin') {
      setErrorMessages(['El usuario no cuenta con los permisos para ingresar a esta página.']);
      setTimeout(() => {
        navigate('/books');
      }, 3000);
    } else {
      axios.get('http://localhost:1234/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la lista de usuarios:', error);
        });
    }
  }, [navigate]);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este usuario? El proceso es irreversible.");
    if (confirmDelete) {
      axios.delete(`http://localhost:1234/users/${userId}`)
        .then(() => {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          console.log('Usuario borrado con éxito.');
        })
        .catch(error => {
          console.error('Error al borrar el usuario:', error);
        });
    } else {
      console.log('Borrado cancelado.');
    }
  };


  return (
    <div className="delete-users-list">
      <h1>Borrar Usuarios</h1>
      {errorMessages.length > 0 && (
        <Notification messages={errorMessages} 
        type="error" />
      )}
      <ul>
        {users.map(user => (
          <div key={user.id}>
            <li key={user.id}>
              <span>{user.nombre}</span>
              <span>{user.rol}</span>
              <button className="delete-users-button" 
              onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}