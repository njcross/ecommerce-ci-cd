import { useQuery } from '@tanstack/react-query';
import { fetchUserOrders } from '../api/orders';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { Order } from '../types';

const Orders = () => {
  const user = useSelector((state: any) => state.auth.user);

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ['orders', user?.uid],
    queryFn: () => fetchUserOrders(user.uid),
    enabled: !!user?.uid,
  });

  return (
    <div>
      <h1>Order History</h1>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Date: {new Date(order.createdAt.seconds * 1000).toLocaleString()}</p>
          <p>Total: ${order.total}</p>
          <Link to={`/orders/${order.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Orders;
