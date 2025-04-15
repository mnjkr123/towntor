import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/auth/auth-signup';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth-login" replace />;
  }

  return children;
};

export default ProtectedRoute;