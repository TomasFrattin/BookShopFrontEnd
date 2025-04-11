import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth/auth.js";
import { Notification } from "../common/Notification.jsx";
import { api } from "../utils/axiosInstance.js";
import { getUserUsername } from "../auth/auth.js";

export function DeleteUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  useEffect(() => {
    const userRol = getUserRole();
    const loggedUsername = getUserUsername();

    if (userRol !== "admin") {
      setErrorMessages([
        "El usuario no cuenta con los permisos para ingresar a esta página.",
      ]);
      setTimeout(() => {
        navigate("/books");
      }, 3000);
    } else {
      api
        .get("/users")
        .then((response) => {
          const allUsers = response.data;
          setUsers(allUsers);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de usuarios:", error);
        });
    }
  }, [navigate]);

  const handleDeleteUser = async (userUsername) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres borrar este usuario? El proceso es irreversible."
    );

    if (confirmDelete) {
      try {
        console.log(
          "Token antes de eliminar un usuario:",
          localStorage.getItem("token")
        );

        await api.delete(`/users/${userUsername}`);

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.username !== userUsername)
        );
        setSuccessMessage({
          type: "success",
          message: "El Usuario fue eliminado exitosamente.",
        });
      } catch (error) {
        setErrorMessages([
          "No posee los permisos necesarios para borrar un usuario.",
        ]);
      }
    } else {
      console.log("Borrado cancelado.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Borrar Usuarios</h1>

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

      <div className="bg-custom1 shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr className="">
              <th className="py-3 px-4 text-left text-gray-600">Usuario</th>
              <th className="py-3 px-4 text-left text-gray-600">Rol</th>
              <th className="py-3 px-4 text-center text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.username}
                className="border-t border-gray-300 hover:bg-custom2 transition"
              >
                <td className="py-3 px-4 text-left">{user.username}</td>
                <td className="py-3 px-4 text-left">{user.rol}</td>
                <td className="py-3 px-4 text-center">
                  {user.username === getUserUsername() ? (
                    <span className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded-lg opacity-70 cursor-not-allowed">
                      Logueado
                    </span>
                  ) : (
                    <button
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
                      onClick={() => handleDeleteUser(user.username)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
