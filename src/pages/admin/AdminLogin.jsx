import React from 'react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input type="password" className="w-full px-3 py-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
