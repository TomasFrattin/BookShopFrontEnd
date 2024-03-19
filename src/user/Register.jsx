import { useState } from "react";
import axios from "axios";
import { Notification } from "../common/Notification";
import { useNavigate } from "react-router-dom";

export function RegistroUsuario() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
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
      console.log("Objeto de user enviado al backend:", user);
      await axios.post("http://localhost:1234/users", user);
      setSuccessMessage({
        type: "success",
        message: "El Usuario fue registrado exitosamente.",
      });

      setUser({ nombre: "", password: "" });
      setErrorMessages([]);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessages([
        "El nombre de Usuario ya se encuentra registrado. Por favor, inténtelo nuevamente.",
      ]);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Registrar Usuario</h1>
      <form
        className="bg-custom1 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mx-20 mb-6">
          <div className="w-full h-24 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Nombre de Usuario
            </label>
            <input
              className={`appearance-none border border-${
                user.username ? "gray" : "red"
              }-500 block w-full bg-gray-200 text-black border border-gray-200 
              rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              name="username"
              type="text"
              placeholder="JaneDoe"
              value={user.username}
              onChange={handleChange}
            />
            {user.username === "" && (
              <p className="text-red-500 text-xs font-bold italic">
                Por favor, escriba un nombre de usuario.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border
              py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
            />{" "}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Contraseña
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 
              rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
            <p className="text-white text-xs font-bold italic">
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
                text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:text-black focus:bg-white focus:border-gray-500"
                name="province"
                value={user.province}
                onChange={handleChange}
              >
                <option>Santa Fe</option>
                <option>Buenos Aires</option>
                <option>Entre Ríos</option>
                <option>Córdoba</option>
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
            className="shadow-md bg-custom2 hover:bg-gray-700 transition duration-500 ease-in-out text-white font-bold py-2 
              px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Usuario
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-white hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => navigate("/register")}
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
      )}{" "}
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
