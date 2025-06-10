import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded credentials
    const validEmail = 'ramel@gmail.com';
    const validPassword = 'Ramel12345';

    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Logged in successfully!');
        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Optional: reload to reflect logged-in state
        }, 1500);
      } else {
        toast.error('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700">Log into Bookstore</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full mt-1 px-3 py-2 border-none bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mt-1 px-3 py-2 border-none bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Create an account
          </Link>
        </p>

        <p className="text-center text-sm text-gray-500 mt-2">
          <Link to="/forgot-password" className="hover:underline">Can’t log in?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
