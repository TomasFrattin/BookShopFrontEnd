import "./AlterBook.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../auth/auth';
import { Notification } from './Notification.jsx';

export function AlterBook() {
  const [books, setBooks] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [updatedPrice, setUpdatedPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = getUserRole();

    if (userRole !== 'admin') {
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
  }, []); // Asegúrate de pasar un array vacío para que el efecto se ejecute solo una vez

  const handleUpdatePrice = async (id, currentPrice) => {
    try {
      await axios.put(`http://localhost:1234/books/${id}`, { price: updatedPrice });

      setBooks(prevBooks => {
        const updatedBooks = prevBooks.map(book => {
          if (book.id === id) {
            return { ...book, price: updatedPrice };
          }
          return book;
        });
        return updatedBooks;
      });
    } catch (error) {
      console.error('Error al actualizar el precio del libro:', error);
      setErrorMessages(['Error al actualizar el precio del libro']);
    }
  };

  return (
    <div className="alterList">
      <h1>Modificar Libros</h1>
      {errorMessages.length > 0 && (
        <Notification messages={errorMessages} type="error" />
      )}
      <ul>
        {books.map(book => (
          <div key={book.id}>
            <li key={book.id}>
              <img src={book.image} alt={book.title} />
              <span>{book.title}</span>
              <span>Precio actual: ${book.price}</span>
              <input
                type="text"
                placeholder="Nuevo precio"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
              <button onClick={() => handleUpdatePrice(book.id, book.price)}>
                Actualizar Precio
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
