import { useState, useEffect } from 'react';
import axios from 'axios';

import { Notification } from './Notification.jsx';

export function AlterBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1234/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de libros:', error);
      });
  }, []);

  return (
    <div className="alterList">
      <h1>Modificar Libro</h1>
        <ul>
          {books.map(book => (
            <div key={book.id}>
              <li key={book.id}>
                <img src={book.image} alt={book.title} />
                <span>{book.title}</span>
              </li>
            </div>
          ))}
        </ul>
    </div>
  )
}
