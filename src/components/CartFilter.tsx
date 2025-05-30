import { useAppDispatch, useAppSelector } from '../hooks/useTypedRedux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { Button, Table } from 'react-bootstrap';
import styles from './CartFilter.module.css';


const Cart: React.FC = () => {
  const { items } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Checkout complete!');
    dispatch(clearCart());
  };

  return (
    <div className={styles.cartfilterContainer}>
      <h2 className={styles.cartfilterTitle}>Shopping Cart</h2>
      <div className={styles.cartfilterContent}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} height={50} />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h4 className={styles.cartfilterTotal}>Total: ${totalPrice.toFixed(2)}</h4>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );

};

export default Cart;
