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
        console.log("Token en el frontend antes de la solicitud:", localStorage.getItem("token"));
      
  
        await api.post("http://localhost:1234/books", bookData);
  
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
        console.error("Error en addBook:", error.response?.data || error.message);
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

    // Convertir a número los campos que deben ser números
    const newValue =
      name === "year" || name === "price" || name === "rate" || name === "stock"
        ? Number(value) // Convierte el valor a número
        : value; // Si no es un campo numérico, mantén el valor como está

    setBookData((prevData) => ({ ...prevData, [name]: newValue }));
    console.log(bookData.price, bookData.genre, bookData.title, bookData.rate);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Agregar Libro</h1>
      <form className="bg-custom1 shadow-md rounded px-8 py-4 mb-4">
        <div className="flex flex-wrap mx-20 mb-6">
          <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Titulo
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded 
              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="title"
              placeholder="Moby Dick"
              value={bookData.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Año
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded 
              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="year"
              placeholder="2019"
              value={bookData.year}
              onChange={handleChange}
            />
            
          </div>
        </div>

        <div className="flex flex-wrap mx-20 mb-6">
          <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Autor
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded 
              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                $
              </span>
              <input
                className="pl-8 appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded 
              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                name="price"
                value={bookData.price}
                onChange={handleChange}
                placeholder="20"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mx-20 mb-6">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Género
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 
    text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
    focus:text-black focus:bg-white focus:border-gray-500"
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

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Calificación
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 
    text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
    focus:text-black focus:bg-white focus:border-gray-500"
                name="rate"
                value={bookData.rate || ""}
                onChange={handleChange}
                type="number"
              >
                <option value="" disabled hidden>
                  Seleccione una
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Stock
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded 
              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              name="stock"
              value={bookData.stock}
              onChange={handleChange}
              placeholder="12"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 mx-20 mb-6">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Imagen
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded 
            py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="image"
              value={bookData.image}
              onChange={handleChange}
              placeholder="Ingrese el enlace de la imagen"
            />
            {bookData.image ? (
              <img
                src={bookData.image}
                width={200}
                height={200}
                alt="Vista previa de la imagen"
                style={{
                  background: "black",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  marginTop: "1rem",
                }}
              />
            ) : (
              <img
                src="https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"
                width={200}
                height={200}
                alt="Imagen de prueba"
                style={{
                  background: "black",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  marginTop: "1rem",
                }}
              />
            )}
          </div>
        </div>
        <button
          className="shadow-md bg-custom2 hover:bg-gray-700 transition duration-500 ease-in-out text-white font-bold py-2 
              px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={addBook}
        >
          Agregar Libro
        </button>
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
  );
}
