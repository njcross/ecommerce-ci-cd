import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import * as api from '../api/products';
import { within } from '@testing-library/react';

const queryClient = new QueryClient();

jest.mock('../api/products');

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

    // 1. Wait for product to load on Home page
    await waitFor(() => expect(screen.getByText('Test Product')).toBeInTheDocument());

    // 2. Click "Add to Cart"
    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    // 3. Wait for Cart to reflect the change
    await waitFor(() => {
    const cart = screen.getByTestId('cart');
    expect(within(cart).getByText('Test Product')).toBeInTheDocument();
    expect(within(cart).getByText(/Price: \$10/)).toBeInTheDocument();
    expect(within(cart).getByText(/Total: \$10\.00/)).toBeInTheDocument();
    });

    
  });
});
