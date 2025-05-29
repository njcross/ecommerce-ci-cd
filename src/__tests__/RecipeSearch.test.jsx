// src/__tests__/RecipeSearch.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RecipeApp from '../components/RecipeApp';

describe('RecipeApp Component', () => {
  test('renders the full list of recipes initially', () => {
    const { getByText } = render(<RecipeApp />);
    expect(getByText(/Spaghetti Carbonara/i)).toBeInTheDocument();
    expect(getByText(/Chicken Tikka Masala/i)).toBeInTheDocument();
    // Add assertions for a few more recipes to confirm initial render
  });

  test('updates the list based on search query', () => {
    const { getByPlaceholderText, queryByText } = render(<RecipeApp />);
    fireEvent.change(getByPlaceholderText(/Search recipes.../i), { target: { value: 'chicken' } });

    expect(queryByText(/Chicken Parmesan/i)).toBeInTheDocument();
    expect(queryByText(/Chicken Tikka Masala/i)).toBeInTheDocument();
    expect(queryByText(/Spaghetti Carbonara/i)).not.toBeInTheDocument(); // A non-chicken recipe should not be present
  });

  test('is case-insensitive in search', () => {
    const { getByPlaceholderText, queryByText } = render(<RecipeApp />);
    fireEvent.change(getByPlaceholderText(/Search recipes.../i), { target: { value: 'ChIcKeN' } }); // Mixed case query

    expect(queryByText(/Chicken Parmesan/i)).toBeInTheDocument();
    expect(queryByText(/Chicken Tikka Masala/i)).toBeInTheDocument();
  });
});