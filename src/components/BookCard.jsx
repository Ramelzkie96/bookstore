import React, { useState } from 'react';
import { ShoppingCart, Heart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const BookCard = ({ image, title, price, author }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const imageUrl = image || '/fallback.jpg';

  // Updated to match your login check
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }

    if (addedToCart) {
      toast.error('Already added to cart');
      return;
    }

    addToCart({ title, image, price, author });
    setAddedToCart(true);
    toast.success('Added to cart');
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add to favorites');
      return;
    }

    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col">
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover rounded cursor-pointer"
          onClick={() => setShowModal(true)}
          onError={(e) => {
            e.target.src = '/fallback.jpg';
          }}
        />
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-indigo-600 font-bold mt-1">${price}</p>
        <p className="text-sm text-gray-600 mt-2 flex-grow">Authored by {author}</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`${
              addedToCart ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition`}
          >
            <ShoppingCart size={16} />
            {addedToCart ? 'Added to Cart' : 'Add to Cart'}
          </button>

          <button
            className={`border px-3 py-1 rounded text-sm flex items-center gap-1 ${
              isFavorite
                ? 'bg-pink-100 border-pink-500 text-pink-600'
                : 'border-indigo-600 text-indigo-600 hover:bg-indigo-100'
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart size={16} fill={isFavorite ? '#ec4899' : 'none'} />
            Favorite
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-xl w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
            >
              <X size={24} />
            </button>
            <img
              src={imageUrl}
              alt={title}
              className="w-full max-h-[80vh] object-contain rounded"
              onError={(e) => {
                e.target.src = '/fallback.jpg';
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
