import "./AddBook.css"
import { useState } from 'react';
import axios from "axios";

import { bookSchema } from '../schemas/books.js';
import { Notification } from './Notification.jsx';


export function AddBook() {
  const [bookData, setBookData] = useState({
    title: undefined,
    year: undefined,
    author: undefined,
    price: undefined,
    image: undefined,
    rate: undefined,
    genre: [ 
      undefined
    ]
  });

  const [errorMessages, setErrorMessages] = useState([]);
  
  const closeNotification = () => {
    setErrorMessages([]);
  };

  const addBook = async () => {
    // Validar los datos antes de enviar la solicitud POST
    if (validateFormData()) {
      try {
        // Realizar la solicitud POST con los datos del estado del libro
        await axios.post('http://localhost:1234/books', bookData);
        console.log('Libro agregado con éxito');
      } catch (error) {
        console.error('Error al agregar el libro:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Si el nombre del campo es "genre", convierte la cadena en un array
    // separando los elementos por comas
    if (name === 'genre') {
      setBookData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map((genre) => genre.trim()),
      }));
    } else {
      // Para otros campos, realiza la conversión a número si es posible
      setBookData((prevData) => ({
        ...prevData,
        [name]: name === 'year' || name === 'price' || name === 'rate' ? parseInt(value, 10) : value,
      }));
    }
  };
  
  
  const validateFormData = () => {
    try {
      bookSchema.parse(bookData);
      setErrorMessages([]); // Limpiar los mensajes de error cuando la validación es exitosa
      return true;
    } catch (error) {
      setErrorMessages(error.errors.map(err => err.message)); // Obtener la lista de mensajes de error
      return false;
    }
  };

  return (
    <div className="formContainer">
      <h1>Agregar Libro</h1>
      <form className="addBookForm">
        {errorMessages.length > 0 && (
        <Notification messages={errorMessages} onClose={closeNotification} />
        )}

        <label htmlFor="">Titulo</label>
        <input type="text" name="title" value={bookData.title} onChange={handleChange} />
        <label htmlFor="">Año</label>
        <input type="text" name="year" value={bookData.year} onChange={handleChange} />
        <label htmlFor="">Autor</label>
        <input type="text" name="author" value={bookData.author} onChange={handleChange} />
        <label htmlFor="">Precio</label>
        <input type="text" name="price" value={bookData.price} onChange={handleChange} />
        <label htmlFor="">Imagen</label>
        <input type="text" name="image" value={bookData.image} onChange={handleChange} />
        <label htmlFor="">Calificación</label>
        <input type="text" name="rate" value={bookData.rate} onChange={handleChange} />
        <label htmlFor="">Género</label>
        <input type="text" name="genre" value={bookData.genre.join(',')} onChange={handleChange} />
      </form>
      <button className="addBook" type="button" onClick={addBook}>Agregar Libro</button>
    </div>
  )
}
