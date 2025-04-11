import { useState } from "react";
import { Notification } from "../common/Notification.jsx";
import { api } from "../utils/axiosInstance";

import eyeClosed from "../assets/eyeClosed.svg";
import eyeOpen from "../assets/eyeOpen.svg";

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  const toggleShowPassword = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleChangePassword = async () => {
    const username = localStorage.getItem("userName");

    if (newPassword !== confirmPassword) {
      setErrorMessages([
        "La nueva contraseña y la de confirmación no coinciden.",
      ]);
      return;
    }

    try {
      await api.patch("/users/change-password", {
        username,
        currentPassword,
        newPassword,
      });
      setSuccessMessage({
        type: "success",
        message: "La contraseña fue cambiada exitosamente.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      setErrorMessages([
        "Error al cambiar la contraseña. Por favor, inténtelo nuevamente.",
      ]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold m-4">Cambiar Contraseña</h2>

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
      <div className="bg-custom2 p-6 rounded-xl">
        <div className="bg-custom2">
          {" "}
          <div className="bg-custom1 py-4 px-8 shadow-md rounded">
            <div className="w-full max-w-xs mb-4">
              <label className="block text-xs uppercase text-white font-bold mb-2">
                Contraseña Actual
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-3 bg-gray-200 text-black leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500"
                />
                <img
                  src={showCurrentPassword ? eyeOpen : eyeClosed}
                  alt={showCurrentPassword ? "Ocultar" : "Mostrar"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer invert"
                  onClick={() => toggleShowPassword("current")}
                />
              </div>
            </div>

            <div className="w-full max-w-xs mb-4">
              <label className="block text-xs uppercase text-white font-bold mb-2">
                Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-3 bg-gray-200 text-black leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500"
                />
                <img
                  src={showNewPassword ? eyeOpen : eyeClosed}
                  alt={showNewPassword ? "Ocultar" : "Mostrar"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer invert"
                  onClick={() => toggleShowPassword("new")}
                />
              </div>
            </div>

            <div className="w-full max-w-xs mb-4">
              <label className="block text-xs uppercase text-white font-bold mb-2">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-3 bg-gray-200 text-black leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500"
                />
                <img
                  src={showConfirmPassword ? eyeOpen : eyeClosed}
                  alt={showConfirmPassword ? "Ocultar" : "Mostrar"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer invert"
                  onClick={() => toggleShowPassword("confirm")}
                />
              </div>
            </div>

            <div className="w-full max-w-xs">
              <button
                onClick={handleChangePassword}
                className="shadow-md bg-custom2 hover:bg-gray-700 transition duration-500 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
