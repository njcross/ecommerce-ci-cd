// src/__tests__/pages/Cart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../../pages/Cart';
import { Provider } from 'react-redux';
import store from '../../store';
import { MemoryRouter } from 'react-router-dom';

test('renders Your Cart heading', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </Provider>
  );

  const headings = screen.getAllByText(/Your Cart/i);
  expect(headings[0].tagName).toBe('H2'); // checks the actual heading exists
});
