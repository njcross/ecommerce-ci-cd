// src/__tests__/pages/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('Home Page', () => {
  it('renders Product Catalog heading', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText(/Product Catalog/i)).toBeInTheDocument();
  });
});
