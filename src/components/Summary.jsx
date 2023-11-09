import "./Summary.css";
import { useCart } from "../hooks/useCart";

import { useState } from 'react';

export function Summary() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '3464499396',
    address: '',
    streetNumber: '',
    city: '',
    province: '',
  });

  const { cart } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario y el resumen del carrito por WhatsApp
    const message = `Hola, mi nombre es ${formData.firstName} ${formData.lastName}. Mi dirección es ${formData.address} ${formData.streetNumber}, ${formData.city}, ${formData.province}. Quisiera encargar: ${cart.map(product => `
    ${product.title} (${product.quantity})`).join(', ')}`;
    const whatsappLink = `https://wa.me/${formData.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };


  // Calcular el total a pagar y mostrar el precio total por producto
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
          <input type="text" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} required />
          <input type="text" name="streetNumber" placeholder="Altura" value={formData.streetNumber} onChange={handleChange} required />
          <input type="text" name="city" placeholder="Localidad" value={formData.city} onChange={handleChange} required />
          <input type="text" name="province" placeholder="Provincia" value={formData.province} onChange={handleChange} required />
          <button className="sendOrderButton" type="submit">Enviar Pedido por WhatsApp</button>
        </form>
      </article>
      </section>
    </div>
  );
}