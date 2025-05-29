// Cart display page// src/components/Cart.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';



const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth?.user);

  const handleCheckout = async () => {
  if (!user) {
    alert('Please log in to proceed with checkout.');
    return;
  }

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Create order object matching the Order type (excluding `id`)
  const orderData = {
    userId: user.uid,
    items: cartItems.map(({ id, title, price, quantity }) => ({
      productId: id.toString(), // ensure string type for productId
      title,
      price,
      quantity,
    })),
    total,
    createdAt: serverTimestamp() as Timestamp, // cast to match your Order type
  };

  try {
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    dispatch(clearCart());
    navigate(`/orders/${docRef.id}`);
  } catch (error) {
    console.error('Error creating order:', error);
    alert('Failed to create order. Please try again.');
  }
};

  return (
  <div>
    <h2>Your Cart</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: '1rem' }}>
          <img src={item.imageUrl} alt={item.title} width={80} />
          <p><strong>{item.title}</strong></p>
          <p>Price: ${item.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
              }
            />
          </label>
          <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          <br />
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))
    )}
    {cartItems.length > 0 && (
      <button onClick={handleCheckout}>Checkout</button>
    )}
  </div>
);

};

export default Cart;
