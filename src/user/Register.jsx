import { useState } from "react";
import { Notification } from "../common/Notification";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../schemas/user.js";
import { api } from "../utils/axiosInstance";

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
      await api.post("/users", validatedUser);
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
        setErrorMessages(error.errors.map((err) => err.message));
      } else {
        setErrorMessages(["El nombre de usuario ya se encuentra registado."]);
      }
    }
  }

  return (
    <main className="my-10 flex items-center justify-center min-h-screen px-4 sm:px-6 text-gray-100">
      <div className="text-center md:text-left opacity-90 bg-custom2 p-6 sm:p-10 rounded-2xl max-w-md sm:max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Registrar Usuario</h1>
        <form className="bg-custom1 shadow-md rounded px-6 sm:px-8 py-6 mb-4 w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs uppercase text-white font-bold mb-2">Nombre de Usuario</label>
            <input
              className={`appearance-none border ${user.username ? "border-gray-500" : "border-red-500"} block w-full bg-gray-200 text-black rounded py-2 sm:py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              name="username"
              type="text"
              placeholder="JaneDoe"
              value={user.username}
              onChange={handleChange}
            />
            {user.username === "" && <p className="text-red-500 text-xs font-bold italic mt-1 lg:mt-3">Escriba un nombre de usuario.</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase text-white font-bold mb-2">Nombre</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-2 sm:py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                name="firstName"
                type="text"
                placeholder="Jane"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-white font-bold mb-2">Apellido</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-2 sm:py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase text-white font-bold mb-2">Contraseña</label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-black border ${user.password ? "border-gray-500" : "border-red-500"} rounded py-2 sm:py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
            <p className="text-red-500 text-xs font-bold italic mt-1 lg:mt-3">Escriba una contraseña que crea conveniente.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase text-white font-bold mb-2">Ciudad</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-2 sm:py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                name="city"
                type="text"
                placeholder="Albuquerque"
                value={user.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-white font-bold mb-2">Provincia</label>
              <select
                className="block appearance-none w-full bg-gray-200 border text-gray-400 py-2 sm:py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:text-black focus:bg-white"
                name="province"
                value={user.province}
                onChange={handleChange}
              >
                <option value="" disabled hidden>Seleccione una</option>
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
            </div>
            <div>
              <label className="block text-xs uppercase text-white font-bold mb-2">Dirección</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-2 sm:py-3 px-3 leading-tight focus:outline-none focus:bg-white"
                name="address"
                type="text"
                placeholder="Pepito 2121"
                value={user.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-10 gap-4 mt-10">
            <button className="w-full sm:w-auto shadow-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out" type="submit">
              Crear Usuario
            </button>
            <a className="cursor-pointer text-sm text-white font-bold hover:scale-105 transition duration-300 ease-in-out" onClick={() => navigate("/login")}>
              ¿Tienes cuenta?
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
    </main>
  );
}