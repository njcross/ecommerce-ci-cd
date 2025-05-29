// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/authSlice';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrdersDetail';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth?.user); // Ensure this is defined in your Redux store

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
        {user && (
          <>
            {' '}| <Link to="/orders">My Orders</Link>
            {' '}| <button onClick={() => dispatch(logout())}>Logout</button>
          </>
        )}
        {!user && (
          <>
            {' '}| <Link to="/login">Login</Link>
            {' '}| <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add your Login route if not already included */}
      </Routes>
    </Router>
  );
};

export default App;
