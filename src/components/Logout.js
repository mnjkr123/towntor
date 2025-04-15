import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/auth/auth-signup';

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth-login');
  }, [setUser, navigate]);

  return null;
};

export default Logout;