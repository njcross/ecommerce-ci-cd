import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => navigate('/orders'),
  });

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    mutation.mutate({
      userId: user.uid,
      items: cartItems.map(({ id, quantity, price }) => ({
        productId: id,
        quantity,
        price,
      })),
      total,
    });
  };

  if (!user) {
    return <p className={styles.message}>Please log in to view your orders.</p>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.checkoutTitle}>Ready to Order?</h2>
      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
