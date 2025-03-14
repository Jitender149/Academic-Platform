import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import "./UploadForm.css";

const UploadForm = ({ onCancel, onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseTitle: "",
    primaryInstructor: "",
    secondaryInstructor: "",
    semester: "",
    year: "",
    description: "",
    link: "",
    tags: {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: { ...prev.tags, [tag]: !prev.tags[tag] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      console.log("Submitting form data:", formData);
      onUploadSuccess();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Container className="upload-form-container">
      <Typography variant="h5" className="upload-form-title">
        Add a new resource
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Course Details */}
        <Box className="upload-form-section">
          <TextField
            label="Course Code *"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Enter course code..."
          />
          <TextField
            label="Course Title *"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Enter course title..."
          />
          <TextField
            label="Primary Instructor *"
            name="primaryInstructor"
            value={formData.primaryInstructor}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Enter primary instructor..."
          />
          <TextField
            label="Secondary Instructor (If applicable)"
            name="secondaryInstructor"
            value={formData.secondaryInstructor}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Enter secondary instructor..."
          />
          <TextField
            label="Semester *"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Enter semester..."
          />
          <TextField
            label="Year *"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Enter year..."
          />
        </Box>

        {/* Tags */}
        <Box className="upload-form-section">
          <Typography variant="h6" className="tags-title">
            Tags
          </Typography>
          {Object.keys(formData.tags).map((tag) => (
            <FormControlLabel
              key={tag}
              control={
                <Switch checked={formData.tags[tag]} onChange={() => handleToggleTag(tag)} />
              }
              label={tag.charAt(0).toUpperCase() + tag.slice(1).replace(/([A-Z])/g, " $1")}
              className="tag-switch"
              sx={{ color: "#333333" }}
            />
          ))}
        </Box>

        {/* Description and Link */}
        <Box className="upload-form-section">
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Link *"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>

        {/* Buttons */}
        <Box className="upload-form-buttons">
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Upload
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default UploadForm;
