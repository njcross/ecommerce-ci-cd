// Cart display page// src/components/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { removeFromCart, clearCart } from '../store/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    alert('Checkout successful!');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} width={50} />
                <span>{item.title}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${item.price}</span>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
