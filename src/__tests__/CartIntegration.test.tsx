import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import * as api from '../api/products'; // Import the API to mock

const queryClient = new QueryClient();

jest.mock('../api/products'); // Mock the whole module

const mockProduct = {
  id: '1',
  title: 'Test Product',
  price: 10,
  description: 'This is a test product.',
  imageUrl: 'http://example.com/image.jpg',
  stock: 5,
};

describe('Cart Integration Test', () => {
  beforeEach(() => {
    // @ts-ignore
    api.fetchProducts.mockResolvedValue([mockProduct]);
  });

  test('adds product to cart and updates cart display', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Home />
            <Cart />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    // Wait for products to appear
    await waitFor(() => expect(screen.getByText('Test Product')).toBeInTheDocument());

    // Simulate clicking "Add to Cart"
    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    // Confirm item shows up in the cart
    await waitFor(() => {
      expect(screen.getByText(/Stock:/i)).toBeInTheDocument();
    });
  });
});
