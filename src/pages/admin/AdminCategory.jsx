import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Classic Literature' },
    { id: 2, name: 'Romance' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmName, setConfirmName] = useState('');
  const navigate = useNavigate();

  const handleCreateCategory = () => {
    navigate('/admin/create-category');
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setConfirmName('');
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (confirmName === selectedCategory.name) {
      setCategories(prev => prev.filter(cat => cat.id !== selectedCategory.id));
      setShowModal(false);
      toast.success('Category deleted successfully!');
    } else {
      toast.error('Category name does not match. Cannot delete.');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">🗂️ Manage Categories</h2>
        <button
          onClick={handleCreateCategory}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} />
          Create Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Category Name</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{category.id}</td>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button className="flex items-center text-blue-600 hover:underline">
                      <Pencil size={16} className="mr-1" />
                      Edit
                    </button>
                    <button
                      className="flex items-center text-red-600 hover:underline"
                      onClick={() => handleDeleteClick(category)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Confirm Delete</h3>
            <p className="mb-2">
              To confirm deletion, type the category name: <strong>{selectedCategory.name}</strong>
            </p>
            <input
              type="text"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder="Type category name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
