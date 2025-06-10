import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    setIsAuthenticated(isLoggedIn);
    setUserEmail(email || '');
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUserClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      setIsAuthenticated(false);
      setUserEmail('');
      navigate('/login');
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-700 font-semibold transition'
      : 'text-gray-700 hover:text-indigo-600 transition';

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">BookStore</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

          {/* Cart Icon with badge */}
          <div className="relative">
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition">
              <ShoppingCart size={22} />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Authenticated User Info */}
          {isAuthenticated ? (
            <>
              <button
                className="text-gray-700 "
              >
                <User size={22} />
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition ml-3"
              >
                <LogOut size={22} />
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition">
              Login
            </Link>
          )}

        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/categories" className={navLinkClass} onClick={toggleMenu}>Categories</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={toggleMenu}>Contact</NavLink>
          <Link to="/cart" className="block text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>
            Cart ({cartCount})
          </Link>

          {isAuthenticated ? (
            <>
              <button onClick={() => { toggleMenu(); handleUserClick(); }} className="block text-gray-700 hover:text-indigo-600">
                <User size={22} />
              </button>
              <button onClick={() => { toggleMenu(); handleLogout(); }} className="block text-red-600 hover:text-red-800">
                <LogOut size={22} />
              </button>
            </>
          ) : (
            <Link to="/login" className="block bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition w-fit" onClick={toggleMenu}>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
