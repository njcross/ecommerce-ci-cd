import { useProducts } from '../hooks/useProducts';
import { useAppDispatch } from '../hooks/useTypedRedux';
import { addToCart } from '../store/cartSlice';
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';

interface Props {
  category?: string;
}

const ProductList: React.FC<Props> = ({ category }) => {
  const { data, isLoading } = useProducts(category);
  const dispatch = useAppDispatch();

  if (isLoading) return <Spinner animation="border" />;

  return (
    <Row>
      {data.map((product: any) => (
        <Col key={product.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={product.image} style={{ height: 200, objectFit: 'contain' }} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description.substring(0, 100)}...</Card.Text>
              <Card.Text><strong>${product.price}</strong></Card.Text>
              <Button onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
