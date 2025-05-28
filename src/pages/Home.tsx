import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api/products';
import { addToCart } from '../store/cartSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Fetch products (all or by category)
  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () =>
      selectedCategory === 'all'
        ? fetchProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  return (
    <div>
      <h1>Product Catalog</h1>

      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : (
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories?.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}

      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products?.map((product: any) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} width={100} />
              <h3>{product.title}</h3>
              <p>{product.category}</p>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p>Rating: {product.rating.rate}</p>
              <button onClick={() => dispatch(addToCart(product))}>
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
