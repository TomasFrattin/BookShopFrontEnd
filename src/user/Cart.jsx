/* eslint-disable react/prop-types */
import { useState } from "react";
import { CartIcon } from "../Icons.jsx";
import { useCart } from "../hooks/useCart.js";
import { useNavigate } from "react-router-dom";

export function CartItem({ product, onIncrease, onDecrease }) {
  const { image, price, title, quantity } = product;

  return (
    <li className="flex flex-col items-center justify-between gap-2 bg-custom1 p-4 rounded-lg shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full max-w-[100px] aspect-[3/4] object-cover rounded-md shadow-2xl"
      />
      <div className="font-bold text-center text-sm">
        {title} - ${price}
      </div>
      <footer className="flex items-center justify-center gap-2">
        <button
          onClick={onDecrease}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          -
        </button>
        <small className="">Cantidad:{quantity}</small>
        <button
          onClick={onIncrease}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          +
        </button>
      </footer>
    </li>
  );
}

export function Cart() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { cart, clearCart, addToCart, takeAwayFromCart } = useCart();
  const navigate = useNavigate();

  const handleToggleCart = () => setIsCartVisible(!isCartVisible);

  return (
    <>
      <label
        className="fixed top-4 right-2 h-12 w-12 md:top-2 md:right-2 z-50 flex md:h-16 md:w-16 items-center justify-center rounded-full bg-blue-500 cursor-pointer transition-all hover:scale-105"
        onClick={handleToggleCart}
      >
        <CartIcon />
      </label>

      {isCartVisible && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleToggleCart}
        >
          <div
            className="bg-custom2 rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tu Carrito</h2>
              <button
                className="bg-red-500 text-white py-2 hover:bg-red-600 transition"
                onClick={handleToggleCart}
              >
                ✕
              </button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cart.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  onIncrease={() => addToCart(product)}
                  onDecrease={() => takeAwayFromCart(product)}
                />
              ))}
            </ul>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  clearCart();
                  setIsCartVisible(false);
                }}
                className="w-full bg-red-500 text-white font-semibold rounded-lg py-2 hover:bg-red-600 transition"
              >
                Limpiar Carrito
              </button>

              <button
                onClick={() => navigate("/summary")}
                className="w-full bg-green-500 text-white font-semibold rounded-lg py-2 hover:bg-green-600 transition"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
