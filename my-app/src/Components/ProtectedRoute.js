import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute; 