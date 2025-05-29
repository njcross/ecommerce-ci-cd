import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../api/products';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  type NewProductInput = {
    title: string;
    price: string; // keep as string for input handling
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

  
  // Define the shape of the update payload
  type UpdatePayload = {
    id: string;
    updates: Partial<Product>; // Replace with your actual Product type
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
    <div>
      <h1>Product Catalog</h1>

      <h2>Create Product</h2>
      <input
        placeholder="Title"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <input
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        placeholder="Image URL"
        value={newProduct.imageUrl }
        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
      />
      <input
        placeholder="Stock"
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
      />

      <button onClick={handleCreate}>Create</button>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products?.map((product: any) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.title} width={100} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
              <button onClick={() => handleUpdate(product.id, product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
