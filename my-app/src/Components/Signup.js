// Modernized Signup UI with Enhanced Styling

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from "@mui/material";
import { useAuth } from '../context/auth/AuthContext';
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const result = await signup(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Account created successfully! Please login.');
      navigate('/login');
    } else {
      toast.error(result.error || 'Signup failed');
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
            Sign Up
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
            helperText="Password must be at least 6 characters long"
          />
          
          <TextField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            required
            fullWidth
            error={formData.password !== formData.confirmPassword}
            helperText={formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
          />
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
