// // Optimized Login.js with Improved Error Handling & UX Enhancements

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { TextField, Button, Container, Typography, Paper, CircularProgress } from "@mui/material";
// import "./Login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!username || !password) {
//       setError("Please enter both username and password.");
//       return;
//     }
    
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
//       localStorage.setItem("token", response.data.access_token);
//       navigate("/home");
//     } catch (error) {
//       setError(error.response?.data?.message || "Invalid credentials. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" className="auth-container">
//       <Paper className="auth-card" elevation={6}>
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <TextField
//           label="Username"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleLogin}
//           className="auth-button"
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} /> : "Login"}
//         </Button>
//         <Button
//           variant="text"
//           fullWidth
//           onClick={() => navigate("/signup")}
//           className="switch-auth"
//         >
//           Don't have an account? Sign Up
//         </Button>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from '@mui/material';
import { useAuth } from '../context/auth/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          
          <TextField
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            required
            fullWidth
          />
          
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
            fullWidth
          />
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
