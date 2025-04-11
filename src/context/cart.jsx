import { createContext, useState } from "react";
import { Notification } from "../common/Notification.jsx";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const closeNotification = () => setErrorMessages([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        const existingProduct = prevCart[existingProductIndex];

        if (existingProduct.quantity >= product.stock) {
          setErrorMessages([
            "El libro no cuenta con más stock del ingresado.",
          ]);
          return prevCart;
        }

        const newCart = structuredClone(prevCart);
        newCart[existingProductIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const takeAwayFromCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      if (newCart[productInCartIndex].quantity > 1) {
        newCart[productInCartIndex].quantity -= 1;
      } else {
        newCart.splice(productInCartIndex, 1);
      }
      setCart(newCart);
    }
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      {errorMessages.length > 0 && (
        <Notification
          messages={errorMessages}
          type="error"
          onClose={closeNotification}
        />
      )}
      <CartContext.Provider
        value={{
          cart,
          removeFromCart,
          addToCart,
          clearCart,
          takeAwayFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
