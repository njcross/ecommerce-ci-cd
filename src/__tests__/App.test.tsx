import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a fresh QueryClient for the test
const queryClient = new QueryClient();

test('renders App without crashing', () => {
  render(
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
        <App />
    </Provider>
    </QueryClientProvider>
  );

  expect(screen.getByText(/product catalog/i)).toBeInTheDocument();
});
