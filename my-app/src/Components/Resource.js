import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Pagination,
  Snackbar,
  Alert,
  Tooltip
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  Person as PersonIcon,
  FilterList as FilterIcon,
  Upload as UploadIcon,
  Share as ShareIcon,
  Chat as ChatIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import axios from 'axios';
import PageHeader from './PageHeader';
import { motion } from 'framer-motion';

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const availableTags = [
  'Lecture Notes',
  'Assignment',
  'Solution',
  'Exam',
  'Quiz',
  'Project',
  'Book',
  'Article',
  'Tutorial',
  'Reference',
];

const years = ['2020', '2021', '2022', '2023', '2024'];
const semesters = ['Spring', 'Summer', 'Fall', 'Winter'];

const Resource = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for tabs
  const [tabValue, setTabValue] = useState(0);

  // State for upload form
  const [openUpload, setOpenUpload] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileTags, setFileTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // State for search and filters
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    instructor: '',
    semester: '',
    year: '',
    categories: {
      assignments: false,
      books: false,
      endterm: false,
      lectureslides: false,
      midterm: false,
      notes: false,
      programming: false,
      quizzes: false,
      tutorials: false,
      miscellaneous: false,
    },
  });

  // State for materials
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for comments
  const [openComments, setOpenComments] = useState(false);
  const [currentMaterialId, setCurrentMaterialId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Add new state for animations
  const [votingAnimation, setVotingAnimation] = useState({});
  const [commentAnimation, setCommentAnimation] = useState({});

  // Add new state for snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch materials
  const fetchMaterials = async (page = 1) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:5000/recent-uploads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(response.data.materials);
      setTotalPages(Math.ceil(response.data.materials.length / 10)); // Assuming 10 items per page
    } catch (error) {
      console.error('Error fetching materials:', error);
      setSnackbar({
        open: true,
        message: 'Failed to fetch materials. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials(currentPage);
  }, [currentPage]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle upload dialog
  const handleUploadClick = () => {
    setOpenUpload(true);
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
    setSelectedFile(null);
    setFileTitle('');
    setFileDescription('');
    setFileTags([]);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Handle upload submission
  const handleUpload = async () => {
    try {
      if (!courseCode || !description || selectedTags.length === 0) {
        setSnackbar({
          open: true,
          message: 'Please fill in all required fields (Course Code, Description, and Tags)',
          severity: 'error'
        });
        return;
      }

      if (!selectedFile && !link) {
        setSnackbar({
          open: true,
          message: 'Please either select a file or provide a link',
          severity: 'error'
        });
        return;
      }

      setIsUploading(true);
      const token = localStorage.getItem('token');

      // Create FormData
      const formData = new FormData();
      formData.append('course_code', courseCode);
      formData.append('description', description);
      formData.append('tags', selectedTags.join(','));
      
      if (year) formData.append('year', year);
      if (semester) formData.append('semester', semester);

      // Add either file or link
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else if (link) {
        formData.append('link', link);
      }

      const response = await axios.post(
        'http://127.0.0.1:5000/uploads',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: selectedFile ? 'File uploaded successfully!' : 'Link uploaded successfully!',
          severity: 'success'
        });
        handleCloseUpload();
        fetchMaterials();
      }
    } catch (error) {
      console.error('Upload error:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to upload',
        severity: 'error'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Update the handleVote function to properly handle vote toggling
  const handleVote = async (materialId, voteType) => {
    try {
      const material = materials.find(m => m.id === materialId);
      const currentVote = material?.userVote;
      
      // If clicking the same vote type, remove the vote
      if (currentVote === voteType) {
        const response = await axios.post(
          `http://127.0.0.1:5000/uploads/${materialId}/vote`,
          { type: 'remove' },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.status === 200) {
          setMaterials(prevMaterials => 
            prevMaterials.map(m => {
              if (m.id === materialId) {
                return {
                  ...m,
                  userVote: null,
                  upvotes: response.data.upvotes,
                  downvotes: response.data.downvotes
                };
              }
              return m;
            })
          );
        }
      } else {
        // If changing vote or voting for the first time
        const response = await axios.post(
          `http://127.0.0.1:5000/uploads/${materialId}/vote`,
          { 
            type: voteType,
            previous_vote: currentVote 
          },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.status === 200) {
          setMaterials(prevMaterials => 
            prevMaterials.map(m => {
              if (m.id === materialId) {
                return {
                  ...m,
                  userVote: voteType,
                  upvotes: response.data.upvotes,
                  downvotes: response.data.downvotes
                };
              }
              return m;
            })
          );
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to vote',
        severity: 'error'
      });
    }
  };

  // Handle comment dialog
  const handleCommentsClick = async (materialId) => {
    setCurrentMaterialId(materialId);
    setOpenComments(true);
    await fetchComments(materialId);
  };

  const handleCloseComments = () => {
    setOpenComments(false);
    setCurrentMaterialId(null);
    setCommentText('');
    setComments([]);
  };

  // Fetch comments
  const fetchComments = async (materialId) => {
    setIsLoadingComments(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://127.0.0.1:5000/uploads/${materialId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Enhanced comment submission with animation
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/uploads/${currentMaterialId}/comments`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        // Add animation for new comment
        setCommentAnimation((prev) => ({
          ...prev,
          [response.data.comment.id]: true,
        }));

        setComments((prevComments) => [...prevComments, response.data.comment]);
        setCommentText('');

        // Reset animation after 500ms
        setTimeout(() => {
          setCommentAnimation((prev) => ({
            ...prev,
            [response.data.comment.id]: false,
          }));
        }, 500);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setSnackbar({
        open: true,
        message: 'Failed to post comment. Please try again.',
        severity: 'error'
      });
    }
  };

  // Add handleDelete function
  const handleDelete = async (materialId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/uploads/${materialId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Material deleted successfully',
          severity: 'success'
        });
        // Update the materials list by filtering out the deleted item
        setMaterials(prevMaterials => prevMaterials.filter(m => m.id !== materialId));
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to delete material',
        severity: 'error'
      });
    }
  };

  // Enhanced material card render with animations
  const renderMaterialCard = (material) => {
    const tags = Array.isArray(material.tags) ? material.tags : material.tags?.split(',') || [];

    return (
      <motion.div
        key={material.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 3,
              transition: 'all 0.3s ease-in-out'
            }
          }}
        >
          {material.file_url && (
            <CardMedia
              component="img"
              height="140"
              image={material.file_url}
              alt={material.title}
              sx={{ 
                objectFit: 'cover',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            />
          )}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1
            }}>
              {material.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {material.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.trim()}
                  size="small"
                  sx={{ 
                    backgroundColor: 'primary.light',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.main'
                    }
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Course: {material.course_code} | Year: {material.year} | Semester: {material.semester}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Tooltip title="Upvote">
                <IconButton 
                  onClick={() => handleVote(material.id, 'upvote')}
                  color={material.userVote === 'upvote' ? 'primary' : 'default'}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                {material.upvotes || 0}
              </Typography>
              <Tooltip title="Downvote">
                <IconButton
                  onClick={() => handleVote(material.id, 'downvote')}
                  color={material.userVote === 'downvote' ? 'error' : 'default'}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                {material.downvotes || 0}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button 
                size="small" 
                color="primary"
                onClick={() => handleCommentsClick(material.id)}
                startIcon={<ChatIcon />}
              >
                Comments
              </Button>
              {material.file_url && (
                <Button 
                  size="small" 
                  color="primary"
                  href={material.file_url}
                  target="_blank"
                  startIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              )}
              <Tooltip title="Delete material">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this material?')) {
                      handleDelete(material.id);
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </CardActions>
        </Card>
      </motion.div>
    );
  };

  const handleAddTag = () => {
    if (newTag && !fileTags.includes(newTag)) {
      setFileTags([...fileTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFileTags(fileTags.filter(tag => tag !== tagToRemove));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PageHeader title="Educational Resources" />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={handleUploadClick}
            sx={{ minWidth: '120px' }}
          >
            Upload
          </Button>
        </Box>

        <Grid container spacing={3}>
          {isLoading ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Grid>
          ) : materials.length === 0 ? (
            <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No resources found. Be the first to upload!
              </Typography>
            </Grid>
          ) : (
            materials.map((material) => (
              <Grid item xs={12} md={6} lg={4} key={material.id}>
                {renderMaterialCard(material)}
              </Grid>
            ))
          )}
        </Grid>

        {materials.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>

      {/* Upload Dialog */}
      <Dialog
        open={openUpload}
        onClose={handleCloseUpload}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Upload Resource
          <IconButton
            aria-label="close"
            onClick={handleCloseUpload}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                label="Year"
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Semester</InputLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                label="Semester"
              >
                {semesters.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Link (Optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                      },
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Tags</InputLabel>
                  <Select
                    value=""
                    onChange={(e) => {
                      if (e.target.value && !selectedTags.includes(e.target.value)) {
                        setSelectedTags([...selectedTags, e.target.value]);
                      }
                    }}
                    label="Select Tags"
                  >
                    {availableTags.map((tag) => (
                      <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Select File
              <input
                type="file"
                hidden
                onChange={handleFileSelect}
              />
            </Button>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpload}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={isUploading || !courseCode || (!link && !selectedFile) || selectedTags.length === 0}
          >
            {isUploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comments Dialog */}
      <Dialog
        open={openComments}
        onClose={handleCloseComments}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Comments
          <IconButton
            aria-label="close"
            onClick={handleCloseComments}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <List>
              {isLoadingComments ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <CircularProgress />
                </Box>
              ) : comments.length === 0 ? (
                <Typography variant="body2" color="text.secondary" align="center">
                  No comments yet. Be the first to comment!
                </Typography>
              ) : (
                comments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{comment.author[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.author}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment.text}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                              {new Date(comment.created_at).toLocaleString()}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))
              )}
            </List>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                placeholder="Add a comment..."
                multiline
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                fullWidth
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
              >
                Post Comment
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Resource; 