import React from 'react';
import { Users, Layers, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
  const totalCategories = 2;
  const totalBooks = 6;
  const totalUsers = 2;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Card */}
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4 border-l-4 border-indigo-500">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Layers className="text-indigo-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
            <p className="text-2xl font-bold text-indigo-700">{totalCategories}</p>
          </div>
        </div>

        {/* Book Card */}
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4 border-l-4 border-green-500">
          <div className="bg-green-100 p-3 rounded-full">
            <BookOpen className="text-green-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Books</h3>
            <p className="text-2xl font-bold text-green-700">{totalBooks}</p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4 border-l-4 border-pink-500">
          <div className="bg-pink-100 p-3 rounded-full">
            <Users className="text-pink-600" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Users</h3>
            <p className="text-2xl font-bold text-pink-700">{totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
