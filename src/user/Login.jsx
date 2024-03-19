import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../auth/auth.js";
import { Notification } from "../common/Notification.jsx";

export function Login() {
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  const [password, setPassword] = useState("");
  
  const handleChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
      const response = await axios.post("http://localhost:1234/users/login", {
        username,
        password,
      });

      setAuthData(
        response.data.token,
        response.data.role,
        response.data.username
      );

      navigate("/books");
    } catch (error) {
      setErrorMessages([
        "Los datos ingresados no corresponden a un usuario creado. Intente nuevamente",
      ]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Iniciar Sesión</h1>
      <div className="w-full max-w-xs">
        <form
          className="bg-custom1 h-[300px] shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-xs uppercase text-white font-bold mb-2">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 bg-gray-200 text-black leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500"
              name="username"
              type="text"
              placeholder="JaneDoe"
            />
          </div>
          <div className="h-24 mb-6">
            <label className="block text-xs uppercase text-white font-bold mb-2">
              Contraseña
            </label>
            <input
        className={`shadow appearance-none border border-${password ? 'gray' : 'red'}-500 rounded w-full py-3 px-3 bg-gray-200 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500`}
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      {password === "" && (
        <p className="text-red-500 text-xs font-bold italic">
          Por favor, escriba su contraseña.
        </p>
      )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="shadow-md bg-custom2 hover:bg-gray-700 transition duration-500 ease-in-out text-white font-bold py-2 
              px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ingresar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-white hover:scale-105 transition duration-300 ease-in-out"
              onClick={() => navigate('/register')}
            >
              ¿No tienes cuenta?
            </a>
          </div>
        </form>
      </div>
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
