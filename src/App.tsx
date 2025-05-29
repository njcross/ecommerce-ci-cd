// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrdersDetail';

const App: React.FC = () => {
  const user = useSelector((state: any) => state.auth?.user);
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/cart">Cart</Link> 
        {user && <> | <Link to="/orders">My Orders</Link></>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
