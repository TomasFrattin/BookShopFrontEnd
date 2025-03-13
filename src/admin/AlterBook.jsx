import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth/auth.js";
import { Notification } from "../common/Notification.jsx";
import { api } from "../utils/axiosInstance.js";

export function AlterBook() {
  const [books, setBooks] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [updatedPrices, setUpdatedPrices] = useState({});
  const [updatedStocks, setUpdatedStocks] = useState({});

  const navigate = useNavigate();

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  useEffect(() => {
    const userRol = getUserRole();

    if (userRol !== "admin") {
      setErrorMessages([
        "El usuario no cuenta con los permisos para ingresar a esta página.",
      ]);
      setTimeout(() => {
        navigate("/books");
      }, 2000);
    } else {
      api
        .get("/books")
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de libros:", error);
        });
    }
  }, [navigate, setErrorMessages]);

  const handleUpdatePrice = async (id) => {
    try {
      const response = await api.patch(
        `/books/${id}/updatePrice`,
        {
          input: { price: updatedPrices[id] },
        }
      );
      console.log("Respuesta del servidor:", response.data);

      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.map((book) => {
          if (book.id === id) {
            return { ...book, price: updatedPrices[id] };
          }
          return book;
        });
        setSuccessMessage({
          type: "success",
          message: "El Precio fue cambiado correctamente.",
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
      const response = await api.patch(
        `/books/${id}/updateStock`,
        {
          input: { stock: updatedStocks[id] },
        }
      );
      console.log("Respuesta del servidor:", response.data);

      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.map((book) => {
          if (book.id === id) {
            return { ...book, stock: updatedStocks[id] };
          }
          return book;
        });
        setSuccessMessage({
          type: "success",
          message: "El Stock fue cambiado correctamente.",
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
    <div className="alterList max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Modificar Libros</h1>
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
      <ul className="bg-custom2 list-none space-y-4 rounded-lg p-5 overflow-y-auto">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-custom1 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <li className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex flex-col items-center w-40 space-y-3">
                <p className="text-lg font-bold">{book.title}</p>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-lg font-semibold">
                  Precio actual: ${book.price}
                </p>
                <div className="flex flex-col items-center space-y-2 mx-14">
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
                    className="text-black bg-gray-200 px-4 py-2 w-32 rounded-lg text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  />
                  <button
                    onClick={() => handleUpdatePrice(book.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Actualizar Precio
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-lg font-semibold">
                  Stock actual: {book.stock}
                </p>
                <div className="flex flex-col items-center space-y-2 mx-14">
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
                    className="text-black bg-gray-200 px-4 py-2 w-32 rounded-lg text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  />
                  <button
                    onClick={() => handleUpdateStock(book.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Actualizar Stock
                  </button>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
