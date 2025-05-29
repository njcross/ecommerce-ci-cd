// src/main.tsx
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import store from './store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { login, logout } from './store/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Wait for Firebase Auth to determine user state before rendering
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(login({ uid: user.uid, email: user.email || '' }));
  } else {
    store.dispatch(logout());
  }

  // Only render once, after auth state is known
  root.render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
});
