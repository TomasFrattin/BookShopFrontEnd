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
    const userRole = getUserRole();

    if (userRole !== 'admin') {
      setErrorMessages(['El usuario no cuenta con los permisos para ingresar a esta página.']);
      setTimeout(() => {
        navigate('/books');
      }, 3000);
    } else {
      axios.get('http://localhost:1234/books')
        .then(response => {
          setBooks(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la lista de libros:', error);
        });
    }
  }, [navigate]);

  const handleDeleteBook = async (bookId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este libro? El proceso es irreversible.");
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:1234/books/${bookId}`);
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        console.log('Libro borrado con éxito.');
      } catch (error) {
        setErrorMessages([
          "Imposible eliminar el libro, tiene una venta ligada.",
        ]);
      }
    } else {
      console.log('Borrado cancelado.');
    }
  };

  const closeNotification = () => {
    setErrorMessages([]);
  };

  return (
    <div className="deleteList">
      <h2>Borrar Libros</h2>
      {errorMessages.length > 0 && (
              <Notification
                messages={errorMessages}
                type="error"
                onClose={closeNotification}
              />
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
