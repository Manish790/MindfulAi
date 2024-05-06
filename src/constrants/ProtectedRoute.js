import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  console.log("protected", user);
  
  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    }
  }, [user, navigate]);

  return user ? <Component /> : null;
}

export default ProtectedRoute;
