import "./Summary.css";
import { useCart } from "../hooks/useCart.js";
import axios from "axios";
import { useState } from "react";

import { Notification } from "../common/Notification.jsx";

export function Summary() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "3464499396",
    address: "",
    streetNumber: "",
    city: "",
    province: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage("");
  };

  const { cart } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = `Hola, mi nombre es ${formData.firstName} ${
      formData.lastName
    }. Mi dirección es ${formData.address} ${formData.streetNumber}, ${
      formData.city
    }, ${formData.province}. Quisiera encargar: ${cart
      .map(
        (product) => `
      ${product.title} (${product.quantity})`
      )
      .join(", ")}. 
      
      El total del pedido es $${totalAmount}.`;

    const whatsappLink = `https://wa.me/${
      formData.phoneNumber
    }?text=${encodeURIComponent(message)}`;

    try {
      await axios.post("http://localhost:1234/sales", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        streetNumber: formData.streetNumber,
        city: formData.city,
        province: formData.province,

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
      setErrorMessages([
        "Uno de los libros del carrito no cuenta con la existencia suficiente.",
      ]);
    }
  };

  const totalAmount = cart.reduce((total, product) => {
    const productTotal = product.quantity * product.price;
    return total + productTotal;
  }, 0);

  return (
    <div>
      <section className="summary">
        <article className="summaryList">
          <h2>Resumen del Carrito</h2>
          <ul>
            {cart.map((product) => (
              <div key={product.id}>
                <li key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <span>{product.title}</span> -{" "}
                  <span>
                    Cantidad: {product.quantity} <br /> Parcial: ${" "}
                    {(product.quantity * product.price).toFixed(2)}
                  </span>
                </li>
              </div>
            ))}
          </ul>
          <h2 className="total">Total a Pagar: ${totalAmount.toFixed(2)}</h2>
        </article>

        <article>
          <h2>Completa tus Datos y Confirma tu Compra</h2>
          <form className="summaryData" onSubmit={handleSubmit}>
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

            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="streetNumber"
              placeholder="Altura"
              value={formData.streetNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Localidad"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="province"
              placeholder="Provincia"
              value={formData.province}
              onChange={handleChange}
              required
            />
            <button className="sendOrderButton" type="submit">
              Enviar Pedido por WhatsApp
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}
