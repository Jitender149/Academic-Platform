import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Typography,
  Box,
  Grid,
  Pagination,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import VotingComponent from "./VotingComponent";
import CommentsSection from "./CommentsSection";
import UploadForm from "./UploadForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contributors, setContributors] = useState([]);
  const [filters, setFilters] = useState({
    instructor: "",
    semester: "",
    year: "",
    categories: {
      assignments: false,
      books: false,
      endtermAssessments: false,
      lectureSlides: false,
      midtermAssessments: false,
      notes: false,
      programmingAssessments: false,
      quizzes: false,
      videoLectures: false,
      tutorials: false,
      miscellaneous: false,
    },
  });

  // Memoize fetchUploads to avoid re-creating it on every render
  const fetchUploads = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const params = {
        page: currentPage,
        instructor: filters.instructor,
        semester: filters.semester,
        year: filters.year,
        categories: Object.keys(filters.categories)
          .filter((key) => filters.categories[key])
          .join(","),
      };
      const response = await axios.get("http://127.0.0.1:5000/uploads", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setUploads(response.data.uploads || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  }, [currentPage, filters]);

  // Fetch contributors
  const fetchContributors = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://127.0.0.1:5000/top-contributors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContributors(response.data.contributors || []);
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };

  // Use fetchUploads inside useEffect
  useEffect(() => {
    fetchUploads();
    fetchContributors();
  }, [fetchUploads]); // Include fetchUploads in the dependency array

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleToggleFilter = (key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: {
        ...prevFilters.categories,
        [key]: !prevFilters.categories[key],
      },
    }));
  };

  return (
    <Container className="dashboard-container">
      <Typography variant="h4" className="dashboard-title">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <Box className="dashboard-sidebar">
            <Typography variant="h6" className="sidebar-title">
              Refine Your Search
            </Typography>
            <Typography variant="body2" className="sidebar-subtitle">
              By choosing appropriate filters.
            </Typography>
            {/* Category Filters */}
            {Object.keys(filters.categories).map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Switch
                    checked={filters.categories[category]}
                    onChange={() => handleToggleFilter(category)}
                  />
                }
                label={category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, " $1")}
              />
            ))}
            {/* Other Filters */}
            <TextField
              label="Instructor"
              fullWidth
              margin="normal"
              value={filters.instructor}
              onChange={(e) =>
                setFilters((prevFilters) => ({ ...prevFilters, instructor: e.target.value }))
              }
              placeholder="Select instructor..."
            />
            <TextField
              label="Semester"
              fullWidth
              margin="normal"
              value={filters.semester}
              onChange={(e) =>
                setFilters((prevFilters) => ({ ...prevFilters, semester: e.target.value }))
              }
              placeholder="Select semester..."
            />
            <TextField
              label="Year"
              fullWidth
              margin="normal"
              value={filters.year}
              onChange={(e) =>
                setFilters((prevFilters) => ({ ...prevFilters, year: e.target.value }))
              }
              placeholder="Select year..."
            />
            <Button variant="contained" color="primary" className="apply-btn">
              Apply
            </Button>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            className="upload-btn"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? "Hide Upload Form" : "Upload File"}
          </Button>
          {showUploadForm && (
            <UploadForm onUploadSuccess={() => fetchUploads(currentPage)} />
          )}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map((upload) => (
                  <TableRow key={upload.id}>
                    <TableCell>{upload.author}</TableCell>
                    <TableCell>{upload.course_code}</TableCell>
                    <TableCell>{upload.description}</TableCell>
                    <TableCell>
                      {upload.tags.split(",").map((tag, idx) => (
                        <Chip key={idx} label={`#${tag}`} className="tag-chip" />
                      ))}
                    </TableCell>
                    <TableCell>
                      <VotingComponent uploadId={upload.id} initialUpvotes={upload.upvotes} />
                      <CommentsSection uploadId={upload.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box className="pagination">
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
          </Box>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={3}>
          <Box className="dashboard-paper">
            <Typography variant="h6">Top Contributors</Typography>
            {contributors.map((contributor, index) => (
              <Typography key={index} className="contributor-item">
                {contributor.name} ({contributor.upvotes} Upvotes)
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
