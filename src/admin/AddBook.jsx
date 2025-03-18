import { useState, useEffect } from "react";
import { bookSchema } from "../schemas/books.js";
import { Notification } from "../common/Notification.jsx";
import { getUserRole } from "../auth/auth.js";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosInstance";

export function AddBook() {
  const [bookData, setBookData] = useState({
    title: undefined,
    year: "",
    author: "",
    price: "",
    image: "",
    rate: "",
    stock: "",
    genre: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  const navigate = useNavigate();

  useEffect(() => {
    const userRol = getUserRole();

    if (userRol !== "admin") {
      setErrorMessages([
        "El usuario no cuenta con los permisos para ingresar a esta página.",
      ]);

      const timer = setTimeout(() => {
        navigate("/books");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [navigate, setErrorMessages]);

  const addBook = async () => {
    if (validateFormData()) {
      try {
        console.log(
          "Token en el frontend antes de la solicitud:",
          localStorage.getItem("token")
        );

        await api.post("/books", bookData);

        setSuccessMessage({
          type: "success",
          message: "El Libro fue agregado exitosamente.",
        });

        setBookData({
          title: "",
          year: "",
          author: "",
          price: "",
          image: "",
          rate: "",
          stock: "",
          genre: "",
        });
      } catch (error) {
        console.error(
          "Error en addBook:",
          error.response?.data || error.message
        );
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

  function handleChange(e) {
    const { name, value } = e.target;
  
    let newValue = value;
  
    // Si el campo es un número (year, price, stock, rate), convertir a número
    if (name === "year" || name === "price" || name === "stock" || name === "rate") {
      newValue = value ? parseFloat(value) : ""; // Convertir a número o a vacío
    }
  
    setBookData((prevData) => ({ ...prevData, [name]: newValue }));
    console.log(bookData.price, bookData.genre, bookData.title, bookData.rate);
  }
  
  

  return (
    <div className="mb-10 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold mb-4">Agregar Libro</h1>
      <div className="bg-custom2 p-6">
      <form className="bg-custom1 shadow-md rounded py-4 px-6 w-full max-w-3xl">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-3/4 px-3 mb-4 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Título
            </label>
            <input
              className="w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="title"
              placeholder="Moby B. Dick"
              value={bookData.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Año
            </label>
            <input
              className="w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              name="year"
              placeholder="2019"
              value={bookData.year}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-3/4 px-3 mb-4 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Autor
            </label>
            <input
              className="w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="author"
              placeholder="Herman Melville"
              value={bookData.author}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Precio
            </label>
            <input
              className="w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              placeholder="20"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Género
            </label>
            <select
              className="w-full bg-gray-200 border border-gray-300 text-black py-3 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500"
              name="genre"
              value={bookData.genre || ""}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Seleccione uno
              </option>
              <option value="History">History</option>
              <option value="Horror">Horror</option>
              <option value="Mistery">Mistery</option>
              <option value="Psychology">Psychology</option>
              <option value="Religion">Religion</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Self Help">Self Help</option>
            </select>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Calificación
            </label>
            <select
  className="w-full bg-gray-200 border border-gray-300 text-black py-3 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500"
  name="rate"
  value={bookData.rate || ""} // Asegúrate de que el valor sea numérico o vacío
  onChange={handleChange}
>
  <option value="" disabled hidden>
    Seleccione una
  </option>
  {[1, 2, 3, 4, 5].map((num) => (
    <option key={num} value={num}>
      {num}
    </option>
  ))}
</select>
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Stock
            </label>
            <input
              className="w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              name="stock"
              value={bookData.stock}
              onChange={handleChange}
              placeholder="12"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center mb-6">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Imagen
          </label>
          <input
            className="w-full bg-gray-200 text-black border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="image"
            value={bookData.image}
            onChange={handleChange}
            placeholder="Ingrese el enlace de la imagen"
          />
          <img
            src={
              bookData.image ||
              "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"
            }
            width={200}
            height={200}
            alt="Vista previa de la imagen"
            className="mt-4 rounded-lg shadow-lg border-8 border-gray-900"
          />
        </div>

        <div className="flex justify-center">
          <button
            className="w-full md:w-auto shadow-md bg-custom2 hover:bg-gray-700 transition duration-500 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addBook}
          >
            Agregar Libro
          </button>
        </div>
      </form>

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
    </div>
    </div>
  );
}
