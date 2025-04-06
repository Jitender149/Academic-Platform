import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
<<<<<<< HEAD
      axios.get('http://localhost:5000/verify-token', {
=======
      axios.get('http://127.0.0.1:5000/verify-token', {
>>>>>>> fad2872af265d079db5dd37c27b5b78c8a55027c
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch((error) => {
        localStorage.removeItem('token');
        setUser(null);
        const errorMessage = error.response?.data?.message || 'Session expired. Please login again.';
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
<<<<<<< HEAD
      const response = await axios.post('http://localhost:5000/login', {
=======
      const response = await axios.post('http://127.0.0.1:5000/login', {
>>>>>>> fad2872af265d079db5dd37c27b5b78c8a55027c
        username,
        password
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.username);
        return { success: true };
      }
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Please check your username and password.';
            break;
          case 401:
            errorMessage = 'Invalid username or password.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = error.response.data.message || 'An unexpected error occurred.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

<<<<<<< HEAD
  const signup = async (username, email, password) => {
    try {
      console.log("AuthContext signup called with:", { username, email, password });
      
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
=======
  const signup = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username,
>>>>>>> fad2872af265d079db5dd37c27b5b78c8a55027c
        password
      });

      if (response.status === 201) {
        toast.success('Account created successfully! Please login.');
        return { success: true };
      }
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Please check your input.';
            break;
          case 409:
            errorMessage = 'Username already exists. Please choose another.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = error.response.data.message || 'An unexpected error occurred.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
<<<<<<< HEAD
    signup,
    setUser
=======
    signup
>>>>>>> fad2872af265d079db5dd37c27b5b78c8a55027c
  };

  return (
    <AuthContext.Provider value={value}>
<<<<<<< HEAD
      {children}
=======
      {!loading && children}
>>>>>>> fad2872af265d079db5dd37c27b5b78c8a55027c
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 