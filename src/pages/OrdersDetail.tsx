import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '../api/orders';
import type { Order } from '../types';
import styles from './OrderDetail.module.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId!),
    enabled: !!orderId,
  });

  if (isLoading) return <p className={styles.message}>Loading order...</p>;
  if (error || !order) return <p className={styles.message}>Error loading order details.</p>;

  return (
    <div className={styles.orderContainer}>
      <h2 className={styles.orderTitle}>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleString()}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>

      <h4 className={styles.subheading}>Items:</h4>
      <ul className={styles.itemList}>
        {order.items.map((item, index) => (
          <li key={index} className={styles.item}>
            <strong>{item.title}</strong> – ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
