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
  const [successMessage, setSuccessMessage] = useState('');

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage('');
  };

  const addBook = async () => {
    if (validateFormData()) {
      try {
        await axios.post('http://localhost:1234/books', bookData);
        setSuccessMessage({ type: "success", message: "El Libro fue agregado exitosamente." });
        console.log("El libro fue agregado exitosamente.")
      } catch (error) {
        // En caso de error, actualiza el estado errorMessages
        setErrorMessages(['Error al agregar el libro. Por favor, inténtelo nuevamente.']);
        console.error('Error al agregar el libro:', error);
      }
    }
  };


  const validateFormData = () => {
    try {
      bookSchema.parse(bookData);
      //setSuccessMessage({ type: "success", message: "El Libro fue agregado exitosamente." });
      return true;
    } catch (error) {
      setErrorMessages([...error.errors.map((err) => err.message)]);
      return false;
    }
  };
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'genre') {
      setBookData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map((genre) => genre.trim()),
      }));
    } else {
      const numericValue = value !== "" && !isNaN(value) ? parseInt(value, 10) : undefined;
      setBookData((prevData) => ({
        ...prevData,
        [name]: name === 'year' || name === 'price' || name === 'rate' ? numericValue : value,
      }));
    }
  };

  return (
    <div className="formContainer">
      <h1>Agregar Libro</h1>
      <form className="addBookForm">
      
      {successMessage && successMessage.type === "success" && (
        <Notification message={successMessage.message} 
        type="success" 
        onClose={closeNotification} />
      )}
      
      {errorMessages.length > 0 &&
       <Notification messages={errorMessages} 
       type="error" 
       onClose={closeNotification} />}

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
