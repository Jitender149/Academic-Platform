<<<<<<< HEAD
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/auth/AuthContext';
// import { Box, CircularProgress } from '@mui/material';

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();
  
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '100vh',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
  
//   if (!user) {
//     return <Navigate to="/login" />;
//   }
  
//   return children;
// };

// export default ProtectedRoute; 

"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/auth/AuthContext"
import { Box, CircularProgress, Typography } from "@mui/material"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

=======
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
  if (loading) {
    return (
      <Box
        sx={{
<<<<<<< HEAD
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "rgb(32, 33, 35)",
          color: "white",
        }}
      >
        <CircularProgress sx={{ color: "#7c3aed" }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    )
  }

  if (!user) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
=======
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
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
