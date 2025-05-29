import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../api/products';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all products from Firestore
  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div>
      <h1>Product Catalog</h1>

      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products?.map((product: any) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} width={100} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  navigate('/cart');
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
