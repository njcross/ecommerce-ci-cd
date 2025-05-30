import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../api/products';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  type NewProductInput = {
    title: string;
    price: string;
    description: string;
    imageUrl: string;
    stock: string;
  };

  const [newProduct, setNewProduct] = useState<NewProductInput>({
    title: '',
    price: '',
    description: '',
    imageUrl: '',
    stock: '',
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const createMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  type UpdatePayload = {
    id: string;
    updates: Partial<Product>;
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: UpdatePayload) => updateProduct(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const handleCreate = () => {
    const { title, price, description, imageUrl, stock } = newProduct;
    if (!title || !price || !description || !imageUrl || !stock) {
      alert("All fields are required.");
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    if (isNaN(parsedPrice) || isNaN(parsedStock)) {
      alert("Price and Stock must be valid numbers.");
      return;
    }

    createMutation.mutate({
      title,
      price: parsedPrice,
      description,
      imageUrl,
      stock: parsedStock,
    });

    setNewProduct({ title: '', price: '', description: '', imageUrl: '', stock: '' });
  };

  const handleUpdate = (id: string, currentProduct: Product) => {
    const title = prompt('New title:', currentProduct.title);
    const price = prompt('New price:', String(currentProduct.price));
    const description = prompt('New description:', currentProduct.description);
    const stock = prompt('New stock:', String(currentProduct.stock));
    const imageUrl = prompt('New image URL:', currentProduct.imageUrl);

    if (title && price && description && stock && imageUrl) {
      updateMutation.mutate({
        id,
        updates: {
          title,
          price: parseFloat(price),
          description,
          stock: parseInt(stock, 10),
          imageUrl,
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Product Catalog</h1>

      <h2>Create Product</h2>
      <div className={styles.formGroup}>
        {['title', 'price', 'description', 'imageUrl', 'stock'].map((field) => (
          <input
            key={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={newProduct[field as keyof NewProductInput]}
            onChange={(e) =>
              setNewProduct({ ...newProduct, [field]: e.target.value })
            }
            className={styles.input}
          />
        ))}
        <button onClick={handleCreate} className={styles.createButton}>
          Create
        </button>
      </div>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.productList}>
          {products?.map((product: any) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.imageUrl} alt={product.title} className={styles.image} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p>Stock: {product.stock}</p>
              <button
                className={styles.button}
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      imageUrl: product.imageUrl || product.image,
                      quantity: 1,
                    })
                  );
                  navigate('/cart');
                }}
              >
                Add to Cart
              </button>
              <button
                className={styles.button}
                onClick={() => handleUpdate(product.id, product)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
