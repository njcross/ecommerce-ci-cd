import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Login from '../../components/Login';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe('Login Page', () => {
  test('renders email and password inputs and login button', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('disables login with empty inputs', () => {
    renderWithProviders(<Login />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    // No input means the button should be disabled
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(loginButton).toBeDisabled();
  });

  test('handles user input and enables login button', () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(loginButton).not.toBeDisabled();
  });
});
