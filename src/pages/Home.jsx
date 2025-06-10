import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BookCard from '../components/BookCard';
import BookStore from '../assets/data/BookStore'; // <-- use local data

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = BookStore.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">Featured Books</h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              image={book.image}
              title={book.title}
              price={book.price}
              author={book.description} // passing description as author
            />
          ))
        ) : (
          <p className="text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
