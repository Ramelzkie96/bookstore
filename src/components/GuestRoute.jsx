import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access');
  const location = useLocation();

  if (accessToken) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return children;
};

export default GuestRoute;
