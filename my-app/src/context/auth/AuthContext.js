import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      axios.get('http://127.0.0.1:5000/verify-token', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
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
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.username);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const signup = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username,
        password
      });

      if (response.status === 201) {
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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