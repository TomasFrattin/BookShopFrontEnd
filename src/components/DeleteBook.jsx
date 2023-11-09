import "./DeleteBook.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

export function DeleteBook () {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET para obtener la lista de libros
    axios.get('http://localhost:1234/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de libros:', error);
      });
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  const handleDeleteBook = (bookId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este libro? El proceso es irreversible.");
    if (confirmDelete) {
      // Realizar la solicitud DELETE para borrar un libro específico por su ID
      axios.delete(`http://localhost:1234/books/${bookId}`)
        .then(response => {
          // Actualizar la lista de libros después de borrar el libro
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
    
      <h1>Lista de Libros</h1>
      <ul>
        {books.map(book => (
          <div key={book.id}>
            <li key={book.id}>
              <img src={book.image} alt={book.title} />
              <span>{book.title}</span>
              <button className="deleteButton" onClick={() => handleDeleteBook(book.id)}>Eliminar</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
