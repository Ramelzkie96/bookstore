import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate

const AdminCreateBook = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [bookName, setBookName] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookName || !price || !author || !category || !imageFile) {
      toast.error('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('book_name', bookName);
    formData.append('price', price);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:8000/api/books/create/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Book submitted successfully!');
        // Optional: reset form
        setBookName('');
        setPrice('');
        setAuthor('');
        setCategory('');
        setImageFile(null);
        setPreview(null);

        // ✅ Redirect to manage-book route
        setTimeout(() => navigate('/admin/manage-book'), 1500);
      } else {
        const errorData = await response.json();
        toast.error('Error submitting book. Check form data.');
        console.error(errorData);
      }
    } catch (err) {
      toast.error('Network error. Try again later.');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">📖 Create Book</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-5 max-w-2xl"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Enter book name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select category</option>
            <option value="fiction">Fiction</option>
            <option value="nonfiction">Non-fiction</option>
            <option value="science">Science</option>
            <option value="biography">Biography</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border border-gray-300 rounded px-4 py-2 bg-white"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-32 rounded shadow-md object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Submit Book
        </button>
      </form>
    </div>
  );
};

export default AdminCreateBook;
