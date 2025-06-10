import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categoryList = [
    {
      name: 'Classic Literature',
      description: 'Explore timeless classics from legendary authors.',
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Romance',
      description: 'Fall in love with heartwarming romantic stories.',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Categories</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {categoryList.map((cat, index) => (
          <Link to={cat.link} key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={cat.image} alt={cat.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
              <p className="text-gray-600">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
