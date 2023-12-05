import "./DeleteBook.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

import { getUserRole } from "../auth/auth.js";
import { useNavigate } from 'react-router-dom';
import { Notification } from './Notification.jsx';


export function DeleteBook () {
  const [errorMessages, setErrorMessages] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    // Verificar el rol al cargar el componente
    const userRole = getUserRole();

    if (userRole !== 'admin') {
      // Si el usuario no es un administrador, mostrar mensaje y redirigir a /books
      setErrorMessages(['El usuario no cuenta con los permisos para ingresar a esta página.']);
      setTimeout(() => {
        navigate('/books');
      }, 3000);
    } else {
      // Obtener la lista de libros si el usuario es un administrador
      axios.get('http://localhost:1234/books')
        .then(response => {
          setBooks(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la lista de libros:', error);
        });
    }
  }, [navigate]);

  const handleDeleteBook = (bookId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este libro? El proceso es irreversible.");
    if (confirmDelete) {
      axios.delete(`http://localhost:1234/books/${bookId}`)
        .then(() => {
          setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
          console.log('Libro borrado con éxito.');
        })
        .catch(error => {
          console.error('Error al borrar el libro:', error);
        });
    } else {
      console.log('Borrado cancelado.');
    }
  };

  return (
    <div className="deleteList">
      <h1>Borrar Libros</h1>
      {errorMessages.length > 0 && (
        <Notification messages={errorMessages} 
        type="error" />
      )}
      <ul>
        {books.map(book => (
          <div key={book.id}>
            <li key={book.id}>
              <img src={book.image} alt={book.title} />
              <span>{book.title}</span>
              <button className="deleteButton" 
              onClick={() => handleDeleteBook(book.id)}>Eliminar</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
