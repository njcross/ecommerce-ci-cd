// Cart display page// src/components/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeFromCart, clearCart, updateQuantity } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please log in to proceed with checkout.');
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
      userId: user.uid,
      items: cartItems.map(({ id, title, price, quantity }) => ({ productId: id, title, price, quantity })),
      total,
      createdAt: serverTimestamp(),
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
      {/* Existing cart display code */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
