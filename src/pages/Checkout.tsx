import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
  return <p>Please log in to view your orders.</p>;
  }

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => navigate('/orders'),
  });

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    mutation.mutate({
      userId: user.uid,
      items: cartItems.map(({ id, quantity, price }) => ({ productId: id, quantity, price })),
      total,
    });
  };

  return <button onClick={handleCheckout}>Place Order</button>;
};

export default Checkout;
