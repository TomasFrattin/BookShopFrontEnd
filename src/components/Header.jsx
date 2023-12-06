import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole, clearAuthData } from "../auth/auth";
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
    <header className="navbar" ref={headerRef}>
      <div className="settings-container">
        <span
          className="custom-icon"
          onClick={() => setShowSettings(!showSettings)}
        >
          <img src={customIcon} alt="Configuración" />
        </span>
        {showSettings && (userRole === "admin" || userRole === "user") &&(
          <div className="settings-options">
            <ul>
              <li>
                <Link to="/changePassword">Cambiar Contraseña</Link>
              </li>
              <li onClick={handleLogout}>Cerrar Sesión</li>
            </ul>
          </div>
        )}
      </div>
      <nav>
        <ul>
          {userRole === "guest" &&(
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
