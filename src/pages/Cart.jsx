import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
  const { cartItems } = useCart();
  

  const [quantities, setQuantities] = useState(cartItems.map(() => 1));
  const [showModal, setShowModal] = useState(false);

  const handleIncrease = (index) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index ? qty + 1 : qty))
    );
  };

  const handleDecrease = (index) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index && qty > 1 ? qty - 1 : qty))
    );
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item, index) => {
      return sum + item.price * quantities[index];
    }, 0);
    return total.toFixed(2);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">
                      <img
                        src={item.image || '/fallback.jpg'}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                        onError={(e) => (e.target.src = '/fallback.jpg')}
                      />
                    </td>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">{item.author}</td>
                    <td className="px-4 py-2 font-semibold text-indigo-600">
                      ${item.price}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrease(index)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="min-w-[20px] text-center">
                          {quantities[index]}
                        </span>
                        <button
                          onClick={() => handleIncrease(index)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 font-medium">
                      ${(item.price * quantities[index]).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total and Pay Button */}
          <div className="flex justify-end items-center mt-6 gap-4">
            <p className="text-lg font-semibold">
              Total to Pay:{' '}
              <span className="text-indigo-600">${calculateTotal()}</span>
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}

{/* Payment Modal */}
{showModal && (
  <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4 text-center">Enter Payment Details</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const isValid = form.checkValidity();

          if (isValid) {
            toast.success('Successfully paid!');
            setShowModal(false);

            // Refresh the page after a short delay to allow toast to display
            setTimeout(() => {
              window.location.reload();
            }, 1500); // wait 1.5 seconds before refreshing
          } else {
            toast.error('Please fill out all required fields');
          }
        }}

      >
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Billing Address"
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Credit Card Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-lg shadow-md">
          <label className="block text-sm mb-1">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-3 py-2 rounded text-black bg-white"
            maxLength={19}
            required
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/\D/g, '')
                .replace(/(.{4})/g, '$1 ')
                .trim();
            }}
          />
          <div className="flex gap-2 mt-3">
            <div className="flex-1">
              <label className="block text-sm mb-1">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 rounded text-black bg-white"
                maxLength={5}
                required
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9]/g, '')
                    .replace(/(\d{2})(\d{1,2})/, '$1/$2')
                    .slice(0, 5);
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">CVC</label>
              <input
                type="text"
                placeholder="123"
                maxLength={4}
                className="w-full px-3 py-2 rounded text-black bg-white"
                required
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-right font-bold text-lg">
          Total to Pay: <span className="text-indigo-600">${calculateTotal()}</span>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Pay Now
        </button>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default Cart;
