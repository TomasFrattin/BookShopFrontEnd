import { useCart } from "../hooks/useCart.js";
import { useState } from "react";
import { Notification } from "../common/Notification.jsx";
import { getUserUsername } from "../auth/auth.js";
import { api } from "../utils/axiosInstance";

export function Summary() {
  const username = getUserUsername();

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  const { cart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (cart.length === 0) {
      setErrorMessages(["El carrito está vacío. Agrega productos antes de enviar el pedido."]);
      return;
    }
  
    const message = `Hola, mi nombre es ${username}. Quisiera encargar: ${cart
      .map((product) => `${product.title} (${product.quantity})`)
      .join(", ")}. 
  
    El total del pedido es $${totalAmount}.`;
  
    const whatsappLink = `https://wa.me/${3417181961}?text=${encodeURIComponent(message)}`;
  
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
      }, 2000);
    } catch (error) {
      setErrorMessages(["Uno de los libros del carrito no cuenta con la existencia suficiente."]);
    }
  };

  const totalAmount = cart.reduce((total, product) => {
    const productTotal = product.quantity * product.price;
    return total + productTotal;
  }, 0);

  return (
    <div>
      <section className="flex justify-center">
        <article className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-white">
            Resumen del Carrito
          </h1>
  
          <div className="bg-custom2 rounded-lg p-5 overflow-y-auto max-h-[500px] flex items-center justify-center">
            {cart.length === 0 ? (
              <p className="pt-1 text-white font-bold text-2xl">
                El carrito está vacío
              </p>
            ) : (
              <ul className="list-none space-y-4 w-full">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="bg-custom1 p-4 rounded-lg shadow-sm hover:bg-gray-600 transition-colors duration-300"
                  >
                    <li className="flex items-center gap-8 justify-start">
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
                          Parcial: ${(product.quantity * product.price).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            )}
          </div>
  
          <h2 className="mt-6 text-xl font-bold text-white bg-custom2 p-3 rounded-md">
            Total a Pagar: ${totalAmount.toFixed(2)}
          </h2>
  
          <button
            className="my-6 bg-blue-600 font-bold text-white rounded-lg text-md hover:bg-blue-700 transition"
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
