// Home.js - Main Home Page after Login

import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="home-container">
      <Paper className="home-card">
        <Typography variant="h4" className="home-title">
          Welcome to the Academic Platform
        </Typography>
        <Typography variant="body1" className="home-subtitle">
          A platform to share and access academic resources easily.
        </Typography>
        <Typography variant="body2" className="home-description">
          This platform allows students and educators to upload, browse, and download academic resources such as lecture notes, assignments, and study materials.
        </Typography>
        <Box className="home-buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/about")}
          >
            About Us
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/resources")}
          >
            Resources
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
