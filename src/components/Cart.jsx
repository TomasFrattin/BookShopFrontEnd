/* eslint-disable react/prop-types */
import './Cart.css';
import { useState } from 'react';
import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';

export function CartItem({ product, onIncrease, onDecrease }) {
  const { image, price, title, quantity } = product;

  return (
    <li>
      <img src={image} alt={title} />
      <div className='bookData'>
        {title} - ${price}
      </div>

      <footer>
        <button onClick={onDecrease}>-</button>
        <small>Qty: {quantity}</small>
        <button onClick={onIncrease}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { cart, clearCart, addToCart, takeAwayFromCart } = useCart();

  const handleToggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId} onClick={handleToggleCart}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className={`cart ${isCartVisible ? 'visible' : ''}`}>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              product={product}
              onIncrease={() => addToCart(product)}
              onDecrease={() => takeAwayFromCart(product)}
            />
          ))}
        </ul>
        <button className='remove-button' onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
