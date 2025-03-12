import { useState } from "react";
import axios from "axios";
import { Notification } from "../common/Notification";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../schemas/user.js";

export function RegistroUsuario() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "3464499396",
    address: "",
    city: "",
    province: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUsuario) => ({ ...prevUsuario, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const validatedUser = userSchema.parse(user);

      console.log("Objeto de user enviado al backend:", validatedUser);
      await axios.post("http://localhost:1234/users", validatedUser);
      setSuccessMessage({
        type: "success",
        message: "El Usuario fue registrado exitosamente.",
      });

      setUser({ nombre: "", password: "" });
      setErrorMessages([]);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.errors && error.errors.length > 0) {
        // Muestra todos los errores de validación
        setErrorMessages(error.errors.map((err) => err.message));
      } else {
        // Manejo de otros errores
        setErrorMessages(["El nombre de usuario ya se encuentra registado."]);
      }
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-6 text-gray-100">
    <div className="text-center md:text-left opacity-90 bg-custom2 p-10 rounded-2xl flex flex-col justify-center items-start">
      <h1 className="text-4xl font-bold mb-4 text-white">Registrar Usuario</h1>
      <form
        className="bg-custom1 shadow-md rounded px-8 py-4 mb-4 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mx-20 mb-6">
          <div className="w-full h-24 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Nombre de Usuario
            </label>
            <input
              className={`appearance-none border ${
                user.username ? "border-gray-500" : "border-red-500"
              } block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              name="username"
              type="text"
              placeholder="JaneDoe"
              value={user.username}
              onChange={handleChange}
            />
            <p
              className={`text-${
                user.username === "" ? "red-500" : "white"
              } text-xs font-bold italic`}
            >
              {user.username === "" ? "Escriba un nombre de usuario." : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="firstName"
              type="text"
              placeholder="Jane"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
          
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Apellido
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded 
              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Contraseña
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-black border ${
                user.password ? "border-gray-500" : "border-red-500"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
            <p
              className={`text-${
                user.password === "" ? "red-500" : "white"
              } text-xs font-bold italic`}
            >
              Escriba una contraseña que crea conveniente.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Ciudad
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border 
              border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="city"
              type="text"
              placeholder="Albuquerque"
              value={user.city}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Provincia
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 
    text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
    focus:text-black focus:bg-white focus:border-gray-500"
                name="province"
                value={user.province}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>
                  Seleccione una
                </option>
                <option value="">Seleccione una provincia</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Catamarca">Catamarca</option>
                <option value="Chaco">Chaco</option>
                <option value="Chubut">Chubut</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Formosa">Formosa</option>
                <option value="Jujuy">Jujuy</option>
                <option value="La Pampa">La Pampa</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Misiones">Misiones</option>
                <option value="Neuquén">Neuquén</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Salta">Salta</option>
                <option value="San Juan">San Juan</option>
                <option value="San Luis">San Luis</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Santiago del Estero">Santiago del Estero</option>
                <option value="Tierra del Fuego">Tierra del Fuego</option>
                <option value="Tucumán">Tucumán</option>
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
          <div className="w-full md:w-1/3 px-3 pb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Dirección
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 
              rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="address"
              type="text"
              placeholder="Pepito 2121"
              value={user.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-28">
        <button
                className="shadow-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="submit"
              >
            Crear Usuario
          </button>
          <a
            className="cursor-pointer inline-block align-baseline font-bold text-sm text-white hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => navigate("/login")}
          >
            ¿Tienes cuenta?
          </a>
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
</main>
  )}