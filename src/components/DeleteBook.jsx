import "./DeleteBook.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

export function DeleteBook () {
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
      <h1>Borrar Libro</h1>
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
