import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { RootState } from '../store/store';
import styles from './Cart.module.css';

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

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
      userId: user.uid,
      items: cartItems.map(({ id, title, price, quantity }) => ({
        productId: id.toString(),
        title,
        price,
        quantity,
      })),
      total,
      createdAt: serverTimestamp() as Timestamp,
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
    <div className={styles.cartContainer} data-testid="cart">
      <h2 className={styles.cartTitle}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartList}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.title} className={styles.image} />
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
                  className={styles.input}
                />
              </label>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                className={styles.removeButton}
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
