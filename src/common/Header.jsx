import { Link, useNavigate } from "react-router-dom";
import { getUserRole, clearAuthData } from "../auth/auth.js";
import { useState, useRef, useEffect } from "react";

import customIcon from "../assets/account.svg";
import { useCart } from "../hooks/useCart.js";

export function Header() {
  const userRole = getUserRole();
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const { clearCart } = useCart();

  const headerRef = useRef();

  const handleLogout = () => {
    clearCart();
    clearAuthData();
    navigate("/");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-custom1 font-bold text-white px-6 py-2 flex justify-between items-center">
      <div className="settings-container relative">
        <span
          className="cursor-pointer w-10 h-10"
          onClick={() => setShowSettings(!showSettings)}
        >
          <img
            className="w-14 h-14 object-contain invert"
            src={customIcon}
            alt="Configuración"
          />
        </span>
        {showSettings && (userRole === "admin" || userRole === "user") && (
          <div className="absolute w-32 -left-9 bg-custom1 rounded overflow-hidden z-10">
            <ul className="text-sm uppercase flex flex-col justify-center items-center gap-2 py-1">
              <li className="w-full py-2 text-center transition duration-300 hover:bg-gray-700">
                <Link
                  onClick={() => setShowSettings(!showSettings)}
                  to="/changePassword"
                >
                  Cambiar Contraseña
                </Link>
              </li>
              <li
                className="w-full py-2 text-center transition duration-300 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setShowSettings(!showSettings);
                  handleLogout();
                }}
              >
                Cerrar Sesión
              </li>
            </ul>
          </div>
        )}
      </div>
      <nav>
        <ul className="uppercase flex items-center space-x-4">
          {userRole === "guest" && (
            <>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
              <li>
                <Link to="/login">Ingresar</Link>
              </li>
            </>
          )}
          {userRole !== "guest" && (
            <>
              <li>
                <Link to="/books">Libros</Link>
              </li>
              <li>
                <Link to="/summary">Resumen</Link>
              </li>
            </>
          )}
          {userRole === "admin" && (
            <>
              <li>
                <Link to="/addBook">Añadir Libro</Link>
              </li>
              <li>
                <Link to="/deleteBook">Eliminar Libros</Link>
              </li>
              <li>
                <Link to="/alterBook">Modificar Libros</Link>
              </li>
              <li>
                <Link to="/deleteUser">Eliminar Usuarios</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
