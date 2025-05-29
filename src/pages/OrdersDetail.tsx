import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '../api/orders';
import type { Order } from '../types';

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useQuery<Order>({
  queryKey: ['order', orderId],
  queryFn: () => fetchOrderById(orderId!),
  enabled: !!orderId,
});

  if (isLoading) return <p>Loading order...</p>;\
  if (error || !order) return <p>Error loading order details.</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order?.id}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleString()}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>

      <h4>Items:</h4>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> - ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
