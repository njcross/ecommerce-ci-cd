import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../components/Register';
import store from '../../store';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe('Register Component', () => {
  test('renders register form inputs and button', () => {
    renderWithProviders(<Register />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('handles user input and enables register button', () => {
    renderWithProviders(<Register />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/^password$/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    // Initially disabled
    expect(registerButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

    expect(emailInput).toHaveValue('newuser@example.com');
    expect(passwordInput).toHaveValue('newpassword');

    // Button should now be enabled if your component allows it
    expect(registerButton).not.toBeDisabled();
  });
});
