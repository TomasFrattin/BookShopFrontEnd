import "./AddBook.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { bookSchema } from "../schemas/books.js";
import { Notification } from "../common/Notification.jsx";

import { getUserRole } from "../auth/auth.js";
import { useNavigate } from "react-router-dom";

export function AddBook() {
  const [bookData, setBookData] = useState({
    title: undefined,
    year: undefined,
    author: undefined,
    price: undefined,
    image: undefined,
    rate: undefined,
    genre: [undefined],
    stock: undefined,
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = getUserRole();

    if (userRole !== "admin") {
      setErrorMessages([
        "El usuario no cuenta con los permisos para ingresar a esta página.",
      ]);
      setTimeout(() => {
        navigate("/books");
      }, 3000);
    }
  }, [navigate]);

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  const addBook = async () => {
    if (validateFormData()) {
      try {
        console.log(bookData.author, bookData.stock, bookData.year);
        await axios.post("http://localhost:1234/books", bookData);
        setSuccessMessage({
          type: "success",
          message: "El Libro fue agregado exitosamente.",
        });
      } catch (error) {
        setErrorMessages([
          "Error al agregar el libro. Por favor, inténtelo nuevamente.",
        ]);
      }
    }
  };

  const validateFormData = () => {
    try {
      bookSchema.parse(bookData);
      return true;
    } catch (error) {
      setErrorMessages([...error.errors.map((err) => err.message)]);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genre") {
      setBookData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((genre) => genre.trim()),
      }));
    } else {
      const numericValue = !isNaN(value) ? parseFloat(value) : value;
      setBookData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    }
  };
  

  return (
    <div className="formContainer">
      <h2>Agregar Libro</h2>
      <form className="addBookForm">
        {successMessage && successMessage.type === "success" && (
          <Notification
            message={successMessage.message}
            type="success"
            onClose={closeNotification}
          />
        )}

        {errorMessages.length > 0 && (
          <Notification
            messages={errorMessages}
            type="error"
            onClose={closeNotification}
          />
        )}

        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id="title"
          name="title"
          value={bookData.title}
          onChange={handleChange}
        />

        <label htmlFor="year">Año</label>
        <input
          type="text"
          id="year"
          name="year"
          value={bookData.year}
          onChange={handleChange}
        />

        <label htmlFor="author">Autor</label>
        <input
          type="text"
          id="author"
          name="author"
          value={bookData.author}
          onChange={handleChange}
        />

        <label htmlFor="price">Precio</label>
        <input
          type="text"
          id="price"
          name="price"
          value={bookData.price}
          onChange={handleChange}
        />

        <label htmlFor="image">Imagen</label>
        <input
          type="text"
          id="image"
          name="image"
          value={bookData.image}
          onChange={handleChange}
        />

        <label htmlFor="rate">Calificación</label>
        <input
          type="text"
          id="rate"
          name="rate"
          value={bookData.rate}
          onChange={handleChange}
        />

        <label htmlFor="genre">Género</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={bookData.genre.join(",")}
          onChange={handleChange}
        />

         <label htmlFor="stock">Stock</label>
        <input
          type="text"
          id="stock"
          name="stock"
          value={bookData.stock}
          onChange={handleChange}
        /> 
      </form>
      <button className="addBook" type="button" onClick={addBook}>
        Agregar Libro
      </button>
    </div>
  );
}
