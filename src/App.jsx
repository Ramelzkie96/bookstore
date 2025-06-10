import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManageBook from './pages/admin/AdminManageBook';
import AdminCreateBook from './pages/admin/AdminCreateBook';

import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import GuestRoute from './components/GuestRoute'; // ✅ Import GuestRoute
import AdminCategory from './pages/admin/AdminCategory';
import AdminEditProfile from './pages/admin/AdminEditProfile';
import AdminChangePassword from './pages/admin/AdminChangePassword';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <CartProvider>
        <Router>
          <Routes>
            {/* Main Website Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* ✅ Protected guest-only routes */}
              <Route path="/login" element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              } />
              <Route path="/register" element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              } />
            </Route>

            {/* Admin Login Page */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Redirect /admin to /admin/login */}
            <Route path="/admin" element={<Navigate to="/admin/login" />} />

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-book" element={<AdminManageBook />} />
              <Route path="category" element={<AdminCategory/>}/>
              <Route path="create-book" element={<AdminCreateBook />} />
              <Route path="edit-profile" element={<AdminEditProfile/>}/>
              <Route path='change-password' element={<AdminChangePassword/>}/>
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
};

export default App;
