import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Book,
  Layers,
  UserCircle,
  ChevronDown,
  LogOut,
  Edit,
  KeyRound,
} from 'lucide-react';

const AdminAside = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const activeClass = 'text-indigo-600 font-semibold';

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg px-6 py-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-indigo-600 mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2 gap-[30px]">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 transition ${
                isActive ? activeClass : 'text-gray-700 hover:text-indigo-600'
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/manage-book"
            className={({ isActive }) =>
              `flex items-center space-x-2 transition ${
                isActive ? activeClass : 'text-gray-700 hover:text-indigo-600'
              }`
            }
          >
            <Book size={18} />
            <span>Manage Book</span>
          </NavLink>

          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              `flex items-center space-x-2 transition ${
                isActive ? activeClass : 'text-gray-700 hover:text-indigo-600'
              }`
            }
          >
            <Layers size={18} />
            <span>Category</span>
          </NavLink>

          {/* Manage Profile Dropdown */}
          <div className="space-y-1">
            <button
              onClick={toggleProfile}
              className="flex items-center justify-between w-full text-gray-700 hover:text-indigo-600 transition"
            >
              <span className="flex items-center space-x-2">
                <UserCircle size={18} />
                <span>Manage Profile</span>
              </span>
              <ChevronDown
                size={18}
                className={`${isProfileOpen ? 'rotate-180' : ''} transition-transform`}
              />
            </button>
            {isProfileOpen && (
              <div className="ml-6 mt-4 space-y-1 flex flex-col gap-2">
                <NavLink
                  to="/admin/edit-profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-sm transition ${
                      isActive ? activeClass : 'text-gray-600 hover:text-indigo-600'
                    }`
                  }
                >
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </NavLink>
                <NavLink
                  to="/admin/change-password"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-sm transition ${
                      isActive ? activeClass : 'text-gray-600 hover:text-indigo-600'
                    }`
                  }
                >
                  <KeyRound size={16} />
                  <span>Change Password</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-6 border-t">
        <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminAside;
