import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../auth/auth.js";
import { Notification } from "../common/Notification.jsx";
import { api } from "../utils/axiosInstance";

import { getUserUsername, getUserRole } from "../auth/auth.js";

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
      const response = await api.post("/users/login", {
        username,
        password,
      });

      console.log("Token recibido en el login:", response.data.token); 


      if (response.data.token) {
        setAuthData(
          response.data.token,
          response.data.rol,
          response.data.username
        );

        const usern = getUserUsername();
        const rol = getUserRole();
        console.log(usern, rol);
        console.log(
          "Token guardado en localStorage:",
          localStorage.getItem("token")
        );

        navigate("/books");
      }
    } catch (error) {
      setErrorMessages([
        "Los datos ingresados no corresponden a un usuario creado.",
      ]);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 sm:px-6 text-gray-100">
      <div className="opacity-90 bg-custom2 p-6 sm:p-10 rounded-xl max-w-sm sm:max-w-xl w-full">
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Iniciar Sesión</h1>
          <form className="bg-custom1 shadow-md rounded px-6 sm:px-8 py-6 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs uppercase text-white font-bold mb-2">Usuario</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 sm:py-3 px-3 bg-gray-200 text-black leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500"
                name="username"
                type="text"
                placeholder="JaneDoe"
              />
            </div>
            <div className="h-24 mb-6">
              <label className="block text-xs uppercase text-white font-bold mb-2">Contraseña</label>
              <input
                className={`shadow appearance-none border border-${password ? "gray" : "red"}-500 rounded w-full py-2 sm:py-3 px-3 bg-gray-200 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500`}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              {password === "" && (
                <p className="text-red-500 text-xs font-bold italic">Por favor, escriba su contraseña.</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                className="w-full sm:w-auto shadow-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="submit"
              >
                Ingresar
              </button>
              <a
                className="cursor-pointer text-sm text-white font-bold hover:scale-105 transition duration-300 ease-in-out"
                onClick={() => navigate("/register")}
              >
                ¿No tienes cuenta?
              </a>
            </div>
          </form>

          {successMessage && successMessage.type === "success" && (
            <Notification message={successMessage.message} type="success" onClose={closeNotification} />
          )}

          {errorMessages.length > 0 && (
            <Notification messages={errorMessages} type="error" onClose={closeNotification} />
          )}
        </div>
      </div>
    </main>
  );
}
