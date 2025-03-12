import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole, clearAuthData } from "../auth/auth.js";
import { useState, useRef, useEffect } from "react";

import customIcon from "../assets/account.svg";
import { useCart } from "../hooks/useCart.js";

export function Header() {
  const userRol = getUserRole();
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false); // Estado para manejar la animación

  const { clearCart } = useCart();
  const settingsRef = useRef(null);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  const handleLogout = () => {
    clearCart();
    clearAuthData();
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
    const handleOutsideClick = (event) => {
       // Activa la animación después de 100ms

      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains("menu-icon")
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header
    className={`min-h-16 rounded-b-[40px] bg-custom1 font-bold text-white px-6 py-2 flex items-center justify-between relative 
      transition-all duration-1000 ease-in-out 
      ${isVisible ? "translate-y-0 shadow-spotlight" : "-translate-y-20 shadow-none"}`}
      
      ref={headerRef}
    >
      {/* Icono de configuración */}
      {(userRol === "admin" || userRol === "user") && (
        <div className="settings-container absolute left-4 top-1/2 -translate-y-1/2" ref={settingsRef}>
          <span
            className="cursor-pointer w-12 h-12"
            onClick={() => setShowSettings(!showSettings)}
          >
            <img
              className="w-12 h-12 object-contain invert"
              src={customIcon}
              alt="Configuración"
            />
          </span>
          {showSettings && (userRol === "admin" || userRol === "user") && (
            <div className="absolute w-32 -left-9 bg-custom1 rounded overflow-hidden z-10">
              <ul className="text-sm uppercase flex flex-col justify-center items-center gap-2 py-1">
                <li className="w-full py-2 text-center transition duration-300 hover:bg-gray-700">
                  <Link
                    onClick={() => setShowSettings(false)}
                    to="/changePassword"
                  >
                    Cambiar Contraseña
                  </Link>
                </li>
                <li
                  className="w-full py-2 text-center transition duration-300 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setShowSettings(false);
                    handleLogout();
                  }}
                >
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Botón de menú hamburguesa */}
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 menu-icon md:hidden cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        ☰
      </div>

      {/* Menú de navegación */}
      <nav className={`stroke ${showMenu ? "open" : ""}`} ref={menuRef}>
        <ul>
          {userRol !== "user" && userRol !== "admin" && (
            <>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/register">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/login">
                  Ingresar
                </Link>
              </li>
            </>
          )}
          {(userRol === "user" || userRol === "admin") && (
            <>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/books">
                  Libros
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/summary">
                  Resumen
                </Link>
              </li>
            </>
          )}
          {userRol === "admin" && (
            <>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/addBook">
                  Añadir Libro
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/deleteBook">
                  Eliminar Libros
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/alterBook">
                  Modificar Libros
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowMenu(false)} to="/deleteUser">
                  Eliminar Usuarios
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
