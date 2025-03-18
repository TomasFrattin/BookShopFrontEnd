import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getUserRole } from "../auth/auth.js";
import { Notification } from "../common/Notification.jsx";
import { api } from "../utils/axiosInstance.js";

export function DeleteBook() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  useEffect(() => {
    // const userRol = getUserRole();

    // if (userRol !== "admin") {
    //   setErrorMessages([
    //     "El usuario no cuenta con los permisos para ingresar a esta página.",
    //   ]);
    //   setTimeout(() => {
    //     navigate("/books");
    //   }, 3000);
    // } else {
    api
      .get("/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de libros:", error);
      });
    // }
  }, [navigate]);

  const handleDeleteBook = async (bookId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres borrar este libro? El proceso es irreversible."
    );
  
    if (confirmDelete) {
      try {
        console.log(
          "Token antes de eliminar un libro:",
          localStorage.getItem("token")
        );
  
        await api.delete(`/books/${bookId}`);
  
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        setSuccessMessage({
          type: "success",
          message: "El Libro fue eliminado exitosamente.",
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            setErrorMessages([
              "No posee los permisos necesarios para borrar este libro.",
            ]);
          } else if (error.response.status === 409) {
            setErrorMessages([
              "No se puede borrar este libro porque tiene ventas asociadas en la base de datos.",
            ]);
          } else {
            setErrorMessages([
              "Ocurrió un error al intentar eliminar el libro. Por favor, inténtelo de nuevo más tarde.",
            ]);
          }
        } else {
          setErrorMessages([
            "No se pudo conectar con el servidor. Verifique su conexión a internet.",
          ]);
        }
      }
    } else {
      console.log("Borrado cancelado.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Borrar Libros</h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-custom1 shadow-md rounded-lg p-4 flex flex-col items-center min-h-[300px] justify-between"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-md mb-3"
            />
            <span className="text-lg font-bold text-white">{book.title}</span>
            <button
              className="mt-3 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              onClick={() => handleDeleteBook(book.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
