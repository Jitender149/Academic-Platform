import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import "./App.css";

// PrivateRoute Component for Protected Routes
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" replace />;
};

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="navbar-title">
          Academic Platform
        </Typography>
        {token && (
          <>
            <Button onClick={() => navigate("/home")} className="navbar-button">
              Home
            </Button>
            <Button onClick={handleLogout} className="navbar-button">
              Logout
            </Button>
          </>
        )}
        {!token && (
          <>
            <Button onClick={() => navigate("/")} className="navbar-button">
              Login
            </Button>
            <Button onClick={() => navigate("/signup")} className="navbar-button">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Main App Component
const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Container className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

            {/* Contact Page */}
            <Route path="/contact" element={<Contact />} />

            {/* Fallback 404 Route */}
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
