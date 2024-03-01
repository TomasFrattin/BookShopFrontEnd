import "./AlterBook.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth/auth";

import { Notification } from "./Notification.jsx";

export function AlterBook() {
  const [books, setBooks] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [updatedPrices, setUpdatedPrices] = useState({});
  const [updatedStocks, setUpdatedStocks] = useState({});

  const navigate = useNavigate();

  const closeNotification = () => {
    setErrorMessages([]);
    //setSuccessMessage('');
  };

  useEffect(() => {
    const userRole = getUserRole();

    if (userRole !== "admin") {
      setErrorMessages([
        "El usuario no cuenta con los permisos para ingresar a esta página.",
      ]);
      setTimeout(() => {
        navigate("/books");
      }, 3000);
    } else {
      axios
        .get("http://localhost:1234/books")
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de libros:", error);
        });
    }
  }, [navigate]);

  const handleUpdatePrice = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:1234/books/${id}/updatePrice`, {
        input: { price: updatedPrices[id] },
      });
      console.log("Respuesta del servidor:", response.data);

      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.map((book) => {
          if (book.id === id) {
            return { ...book, price: updatedPrices[id] };
          }
          return book;
        });
        return updatedBooks;
      });
      setUpdatedPrices((prevPrices) => ({ ...prevPrices, [id]: "" }));
    } catch (error) {
      console.error("Error al actualizar el precio del libro:", error);
      setErrorMessages(["Error al actualizar el precio del libro"]);
    }
  };

  const handleUpdateStock = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:1234/books/${id}/updateStock`, {
        input: { stock: updatedStocks[id] },
      });
      console.log("Respuesta del servidor:", response.data);
  
      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.map((book) => {
          if (book.id === id) {
            return { ...book, stock: updatedStocks[id] };
          }
          return book;
        });
        return updatedBooks;
      });
      setUpdatedStocks((prevStocks) => ({ ...prevStocks, [id]: "" }));
    } catch (error) {
      console.error("Error al actualizar el stock del libro:", error);
      setErrorMessages(["Error al actualizar el stock del libro"]);
    }
  };

  return (
    <div className="alterList">
      <h2>Modificar Libros</h2>
      {errorMessages.length > 0 && (
        <Notification
          messages={errorMessages}
          type="error"
          onClose={closeNotification}
        />
      )}
      <ul>
        {books.map((book) => (
          <div key={book.id}>
            <li key={book.id}>
              <img src={book.image} alt={book.title} />
              <span>{book.title}</span>
              <span>Precio actual: ${book.price}</span>
              <input
                type="text"
                placeholder="Nuevo precio"
                value={updatedPrices[book.id] || ""}
                onChange={(e) =>
                  setUpdatedPrices((prevPrices) => ({
                    ...prevPrices,
                    [book.id]: e.target.value,
                  }))
                }
              />
              <button onClick={() => handleUpdatePrice(book.id)}>
                Actualizar Precio
              </button>

              <span>Stock actual: {book.stock}</span>
              <input
                type="text"
                placeholder="Nuevo stock"
                value={updatedStocks[book.id] || ""}
                onChange={(e) =>
                  setUpdatedStocks((prevStocks) => ({
                    ...prevStocks,
                    [book.id]: e.target.value,
                  }))
                }
              />
              <button onClick={() => handleUpdateStock(book.id)}>
                Actualizar Stock
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
