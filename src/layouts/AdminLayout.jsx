import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminAside from '../pages/admin/AdminAside';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      <AdminAside/>
      
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
