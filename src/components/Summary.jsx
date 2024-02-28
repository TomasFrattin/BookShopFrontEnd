import "./Summary.css";
import { useCart } from "../hooks/useCart";
import axios from "axios";
import { useState } from 'react';

import { Notification } from './Notification.jsx';


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

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const closeNotification = () => {
    setErrorMessages([]);
    setSuccessMessage('');
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
    const message = `Hola, mi nombre es ${formData.firstName} ${formData.lastName}. Mi dirección es ${formData.address} ${formData.streetNumber}, ${formData.city}, ${formData.province}. Quisiera encargar: ${cart.map(product => `
      ${product.title} (${product.quantity})`).join(', ')}`;
    const whatsappLink = `https://wa.me/${formData.phoneNumber}?text=${encodeURIComponent(message)}`;
  
    try {
      // Realizar una solicitud al backend para actualizar la base de datos
      await axios.post('http://localhost:1234/sales', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        streetNumber: formData.streetNumber,
        city: formData.city,
        province: formData.province,
        // items: cart.map(product => ({
        //   bookId: product.id,
        //   quantity: product.quantity,
        //   price: product.price,
        // })),
      });
  
      // Abrir el enlace de WhatsApp después de la actualización exitosa
      window.open(whatsappLink, '_blank');
    } catch (error) {
      console.error('Error al actualizar la base de datos:', error);
      // Manejar el error, mostrar mensaje al usuario, etc.
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