import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const AdminManageBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmAuthor, setConfirmAuthor] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Sample static book data
  const initialBooks = [
    {
      id: 1,
      book_name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 19.99,
      status: 1,
    },
    {
      id: 2,
      book_name: '1984',
      author: 'George Orwell',
      price: 15.99,
      status: 0,
    },
    {
      id: 3,
      book_name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 12.99,
      status: 1,
    },
    {
      id: 4,
      book_name: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 11.99,
      status: 1,
    },
  ];

  // Load books once on mount
  useEffect(() => {
    setBooks(initialBooks);
  }, []);

  const handleCreateBook = () => {
    navigate('/admin/create-book');
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setConfirmAuthor('');
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (confirmAuthor === selectedBook.author) {
      const updatedBooks = books.filter((book) => book.id !== selectedBook.id);
      setBooks(updatedBooks);
      setShowModal(false);
      toast.success('Book deleted successfully!');
    } else {
      toast.error('Author name does not match. Cannot delete the book.');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">📚 Manage Books</h2>
        <button
          onClick={handleCreateBook}
          className="flex items-center gap-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} />
          Create Book
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Book Name</th>
              <th className="px-6 py-4 text-left">Price (₱)</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{book.id}</td>
                <td className="px-6 py-4">{book.book_name}</td>
                <td className="px-6 py-4">₱{book.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      book.status === 1
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {book.status === 1 ? 'Verified' : 'Unverified'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button className="flex items-center text-blue-600 hover:underline">
                      <Pencil size={16} className="mr-1" />
                      Edit
                    </button>
                    <button
                      className="flex items-center text-red-600 hover:underline"
                      onClick={() => handleDeleteClick(book)}
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
        <div className="fixed inset-0  bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Confirm Delete</h3>
            <p className="mb-2">
              To confirm deletion, type the author’s name: <strong>{selectedBook.author}</strong>
            </p>
            <input
              type="text"
              value={confirmAuthor}
              onChange={(e) => setConfirmAuthor(e.target.value)}
              placeholder="Type author's name"
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

export default AdminManageBook;
