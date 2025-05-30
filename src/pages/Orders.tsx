import { useQuery } from '@tanstack/react-query';
import { fetchUserOrders } from '../api/orders';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { Order } from '../types';
import styles from './Orders.module.css';

const Orders = () => {
  const user = useSelector((state: any) => state.auth.user);

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ['orders', user?.uid],
    queryFn: () => fetchUserOrders(user.uid),
    enabled: !!user?.uid,
  });

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.ordersTitle}>Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p>
            <strong>Date:</strong>{' '}
            {new Date(order.createdAt.seconds * 1000).toLocaleString()}
          </p>
          <p><strong>Total:</strong> ${order.total}</p>
          <Link to={`/orders/${order.id}`} className={styles.detailsLink}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Orders;
