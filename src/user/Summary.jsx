import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart.js";
import { Notification } from "../common/Notification.jsx";
import { getUserUsername } from "../auth/auth.js";
import { api } from "../utils/axiosInstance";

export function Summary() {
  const username = getUserUsername();
  const { cart, clearCart  } = useCart();

  const [userData, setUserData] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  const totalAmount = cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get(`/users/${username}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario", error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setErrorMessages([
        "El carrito está vacío. Agrega productos antes de enviar el pedido.",
      ]);
      return;
    }

    if (!userData) {
      setErrorMessages(["No se pudieron obtener los datos del usuario."]);
      return;
    }
console.log("Datos del usuario:", userData);
    const { firstName, lastName, address, city, province } = userData;

    const message = `
Hola, mi nombre es ${firstName} ${lastName}.
Vivo en ${address}, ${city}, ${province}.

Quisiera encargar:
${cart.map((product) => `- ${product.title} (${product.quantity})`).join("\n")}

Total del pedido: $${totalAmount.toFixed(2)}.
    `;

    const whatsappLink = `https://wa.me/3417181961?text=${encodeURIComponent(
      message
    )}`;

    try {
      await api.post("/sales", {
        username,
        books: cart.map((product) => ({
          bookId: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: totalAmount.toFixed(2),
      });

      setSuccessMessage({
        type: "success",
        message: "El pedido ha sido registrado",
      });

      setTimeout(() => {
        window.open(whatsappLink, "_blank");
        clearCart();
      }, 2000);
    } catch (error) {
      setErrorMessages([
        "Uno de los libros del carrito no cuenta con la existencia suficiente.",
      ]);
    }
  };

  return (
    <div>
      <section className="flex justify-center">
        <article className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-white">
            Resumen del Carrito
          </h1>

          <div className="bg-custom2 rounded-lg p-4 max-h-[500px] overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-white font-bold text-2xl text-center">
                El carrito está vacío
              </p>
            ) : (
              <ul className="list-none space-y-4 w-full">
                {cart.map((product) => (
                  <li
                    key={product.id}
                    className="bg-custom1 p-4 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-300 flex items-center gap-8"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-32 w-24 rounded-lg object-cover shadow-md"
                    />
                    <div className="flex flex-col justify-center text-left">
                      <span className="font-semibold text-white">
                        {product.title}
                      </span>
                      <span className="text-md text-gray-400">
                        Cantidad: {product.quantity} <br />
                        Parcial: $
                        {(product.quantity * product.price).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h2 className="mt-6 text-xl font-bold text-white bg-custom2 p-3 rounded-md">
            Total a Pagar: ${totalAmount.toFixed(2)}
          </h2>

          <button
            className="my-6 bg-blue-600 font-bold text-white rounded-lg text-md hover:bg-blue-700 transition w-full py-2"
            onClick={handleSubmit}
          >
            Enviar Pedido por WhatsApp
          </button>

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
        </article>
      </section>
    </div>
  );
}
