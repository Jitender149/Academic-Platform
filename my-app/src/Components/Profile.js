
// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import {
//   Container,
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   TextField,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   CircularProgress,
<<<<<<< HEAD
//   Badge,
//   Tooltip,
//   IconButton,
// } from "@mui/material"
// import { CloudUpload as CloudUploadIcon, Edit as EditIcon } from "@mui/icons-material"
=======
// } from "@mui/material"
// import { CloudUpload as CloudUploadIcon } from "@mui/icons-material"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
// import { useAuth } from "../context/auth/AuthContext"

// const Profile = () => {
//   const navigate = useNavigate()
//   const { user } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [saving, setSaving] = useState(false)
<<<<<<< HEAD
//   const [uploadingPicture, setUploadingPicture] = useState(false)
=======
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     bio: "",
//     profile_picture: "",
//   })
//   const [stats, setStats] = useState({
//     uploads: 0,
//     comments: 0,
//     placements_added: 0,
//     placements_searches: 0,
//     interview_experiences_added: 0,
//     interview_experience_searches: 0,
//     dsa_searches: 0,
//     classrooms_created: [],
//     classrooms_joined: [],
//     recent_activity: [],
//   })
//   const [openDialog, setOpenDialog] = useState(false)
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

//   useEffect(() => {
//     fetchProfileData()
//   }, [])

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
<<<<<<< HEAD
//         const response = await fetch("http://localhost:5000/user-stats", {
=======
//         const response = await fetch("http://127.0.0.1:5000/user-stats", {
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         })
//         if (response.ok) {
//           const data = await response.json()
//           setStats(data)
//         } else {
//           console.error("Failed to fetch user stats")
//         }
//       } catch (error) {
//         console.error("Error fetching user stats:", error)
//       }
//     }

//     fetchStats()
//   }, [])

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true)
<<<<<<< HEAD

//       // Fetch profile data
//       const profileResponse = await fetch("http://localhost:5000/profile", {
=======
//       const response = await fetch("http://127.0.0.1:5000/profile", {
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
<<<<<<< HEAD

//       if (profileResponse.ok) {
//         const profileData = await profileResponse.json()
//         console.log("Fetched profile data:", profileData)

//         // Ensure no null values in the profile data
//         setProfileData({
//           username: profileData.username || "",
//           email: profileData.email || "",
//           bio: profileData.bio || "",
//           profile_picture: profileData.profile_picture || "",
//         })
//       } else {
//         const errorData = await profileResponse.json()
//         setError(errorData.message || "Failed to fetch profile data")
//       }

//       // Fetch stats data
//       const statsResponse = await fetch("http://localhost:5000/user-stats", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })

//       if (statsResponse.ok) {
//         const statsData = await statsResponse.json()
//         setStats(statsData)
//       } else {
//         console.error("Failed to fetch user stats")
//       }
//     } catch (err) {
//       console.error("Error fetching profile data:", err)
//       setError("Failed to fetch profile data: " + (err.message || "Unknown error"))
=======
//       const data = await response.json()

//       if (response.ok) {
//         setProfileData(data)
//         setStats(
//           data.stats || {
//             uploads: 0,
//             comments: 0,
//             placements_added: 0,
//             placements_searches: 0,
//             interview_experiences_added: 0,
//             interview_experience_searches: 0,
//             dsa_searches: 0,
//             classrooms_created: [],
//             classrooms_joined: [],
//             recent_activity: [],
//           },
//         )
//       } else {
//         setError(data.message || "Failed to fetch profile data")
//       }
//     } catch (err) {
//       setError("Failed to fetch profile data")
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setProfileData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//     setHasUnsavedChanges(true)
//   }

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0]
<<<<<<< HEAD
//     // if (!file) return
//     // if (!file) {
//     //   console.log("Balle Balle", file?.name, file?.type)
//     //   return
//     // }
    
=======
//     if (!file) return
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
<<<<<<< HEAD
//       setUploadingPicture(true)
//       setError("") // Clear any previous errors
//       setSuccess("") // Clear any previous success messages

//       console.log("Uploading profile picture...", file.name, file.type)

//       // Debug the FormData contents
//       for (const pair of formData.entries()) {
//         console.log(pair[0] + ": " + pair[1])
//       }

//       const response = await fetch("http://localhost:5000/upload-profile-picture", {
//         method: "POST",
//         headers: {
//           // Do NOT set Content-Type header when using FormData
//           // The browser will automatically set the correct Content-Type with boundary
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//         // Add these options to help with debugging
//         credentials: "include",
//       })

//       console.log("Response status:", response.status)

//       // Try to get the response text first to see if it's valid JSON
//       const responseText = await response.text()
//       console.log("Response text:", responseText)

//       let data
//       try {
//         data = JSON.parse(responseText)
//         console.log("Upload response:", data)
//       } catch (e) {
//         console.error("Error parsing JSON response:", e)
//         setError("Invalid response from server")
//         setUploadingPicture(false)
//         return
//       }
=======
//       setSaving(true)
//       const response = await fetch("http://127.0.0.1:5000/upload-profile-picture", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       })
//       const data = await response.json()
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd

//       if (response.ok) {
//         setProfileData((prev) => ({
//           ...prev,
<<<<<<< HEAD
//           profile_picture: data.profile_picture || prev.profile_picture,
//         }))
//         setSuccess("Profile picture updated successfully")
=======
//           profile_picture: data.profile_picture,
//         }))
//         setSuccess("Profile picture updated successfully")
//         setHasUnsavedChanges(true)
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//       } else {
//         setError(data.message || "Failed to upload profile picture")
//       }
//     } catch (err) {
<<<<<<< HEAD
//       console.error("Error uploading profile picture:", err)
//       setError("Failed to upload profile picture: " + (err.message || "Unknown error"))
//     } finally {
//       setUploadingPicture(false)
=======
//       setError("Failed to upload profile picture")
//     } finally {
//       setSaving(false)
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//     }
//   }

//   const handleSave = async () => {
//     try {
//       setSaving(true)
<<<<<<< HEAD
//       const response = await fetch("http://localhost:5000/update-profile", {
=======
//       const response = await fetch("http://127.0.0.1:5000/update-profile", {
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(profileData),
//       })
//       const data = await response.json()

//       if (response.ok) {
//         setSuccess("Profile updated successfully")
//         setHasUnsavedChanges(false)
//       } else {
//         setError(data.message || "Failed to update profile")
//       }
//     } catch (err) {
//       setError("Failed to update profile")
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleBack = () => {
//     if (hasUnsavedChanges) {
//       setOpenDialog(true)
//     } else {
//       navigate("/")
//     }
//   }

<<<<<<< HEAD
//   const refreshData = () => {
//     fetchProfileData()
//   }

//   useEffect(() => {
//     const handleFocus = () => {
//       refreshData()
//     }

//     window.addEventListener("focus", handleFocus)

//     return () => {
//       window.removeEventListener("focus", handleFocus)
//     }
//   }, [])

=======
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress />
//       </Box>
//     )
//   }

<<<<<<< HEAD
//   // Determine avatar image source with fallback
//   const avatarSrc = require("../Components/Jitender.jpeg")
//   const getInitials = (name) => {
//     return name ? name.charAt(0).toUpperCase() : "?"
//   }

=======
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//           <Typography variant="h4" component="h1">
//             Profile
//           </Typography>
//           <Box>
//             <Button variant="outlined" onClick={handleBack} sx={{ mr: 2 }}>
//               Back
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
//               {saving ? <CircularProgress size={24} /> : "Save Changes"}
//             </Button>
//           </Box>
//         </Box>

//         {error && (
<<<<<<< HEAD
//           <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
=======
//           <Alert severity="error" sx={{ mb: 2 }}>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//             {error}
//           </Alert>
//         )}

//         {success && (
<<<<<<< HEAD
//           <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
=======
//           <Alert severity="success" sx={{ mb: 2 }}>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//             {success}
//           </Alert>
//         )}

//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
//             <Box sx={{ position: "relative", display: "inline-block" }}>
<<<<<<< HEAD
//               <Badge
//                 overlap="circular"
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 badgeContent={
//                   <Tooltip title="Upload new picture">
//                     <label htmlFor="profile-picture-upload">
//                       <IconButton
//                         component="span"
//                         sx={{
//                           bgcolor: "primary.main",
//                           color: "white",
//                           "&:hover": { bgcolor: "primary.dark" },
//                         }}
//                         disabled={uploadingPicture}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </label>
//                   </Tooltip>
//                 }
//               >
//                 <Avatar
//                   src={avatarSrc}
//                   alt={profileData.username || "User"}
//                   sx={{
//                     width: 150,
//                     height: 150,
//                     border: "3px solid #e0e0e0",
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                     fontSize: "3rem",
//                     bgcolor: avatarSrc ? "transparent" : "primary.light",
//                   }}
//                 >
//                   {!avatarSrc && getInitials(profileData.username)}
//                 </Avatar>
//               </Badge>

=======
//               <Avatar
//                 src={profileData.profile_picture}
//                 alt={profileData.username}
//                 sx={{ width: 150, height: 150, mb: 2 }}
//               />
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//               <input
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 id="profile-picture-upload"
//                 type="file"
//                 onChange={handleImageUpload}
<<<<<<< HEAD
//                 disabled={uploadingPicture}
//               />

//               {uploadingPicture && (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "50%",
//                     backgroundColor: "rgba(0,0,0,0.4)",
//                   }}
//                 >
//                   <CircularProgress size={50} sx={{ color: "white" }} />
//                 </Box>
//               )}
//             </Box>

//             <Box sx={{ mt: 2 }}>
//               <label htmlFor="profile-picture-upload-button">
//                 <Button
//                   component="span"
//                   variant="outlined"
//                   startIcon={<CloudUploadIcon />}
//                   disabled={uploadingPicture}
//                   sx={{ mt: 1 }}
//                 >
//                   {uploadingPicture ? "Uploading..." : "Change Photo"}
//                 </Button>
//               </label>
//               <input
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 id="profile-picture-upload-button"
//                 type="file"
//                 onChange={handleImageUpload}
//               />
=======
//               />
//               <label htmlFor="profile-picture-upload">
//                 <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />} disabled={saving}>
//                   Upload Picture
//                 </Button>
//               </label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 value={profileData.username}
//                 onChange={handleInputChange}
//                 disabled={saving}
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={profileData.email}
//                 onChange={handleInputChange}
//                 disabled={saving}
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Bio"
//                 name="bio"
//                 multiline
//                 rows={4}
//                 value={profileData.bio}
//                 onChange={handleInputChange}
//                 disabled={saving}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             Statistics
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.uploads}</Typography>
//                 <Typography color="textSecondary">Total Uploads</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.comments}</Typography>
//                 <Typography color="textSecondary">Total Comments</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.placements_added}</Typography>
//                 <Typography color="textSecondary">Placements Added</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.placements_searches}</Typography>
//                 <Typography color="textSecondary">Placement Searches</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.interview_experiences_added}</Typography>
//                 <Typography color="textSecondary">Interview Experiences Added</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.interview_experience_searches}</Typography>
//                 <Typography color="textSecondary">Interview Experience Searches</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.dsa_searches}</Typography>
//                 <Typography color="textSecondary">DSA Searches</Typography>
//               </Paper>
//             </Grid>
//           </Grid>

//           {stats.classrooms_created && stats.classrooms_created.length > 0 && (
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Classrooms Created
//               </Typography>
//               <List>
//                 {stats.classrooms_created.map((classroom) => (
//                   <ListItem key={classroom.id} divider>
//                     <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}

//           {stats.classrooms_joined && stats.classrooms_joined.length > 0 && (
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Classrooms Joined
//               </Typography>
//               <List>
//                 {stats.classrooms_joined.map((classroom) => (
//                   <ListItem key={classroom.id} divider>
//                     <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}

//           {stats.recent_activity && stats.recent_activity.length > 0 && (
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Recent Activity
//               </Typography>
//               <List>
//                 {stats.recent_activity.map((activity) => (
//                   <ListItem key={activity.id} divider>
//                     <ListItemText
//                       primary={activity.course_code}
//                       secondary={
//                         <>
//                           <Typography component="span" variant="body2">
//                             {activity.description}
//                           </Typography>
//                           <br />
//                           <Typography component="span" variant="caption" color="textSecondary">
//                             {new Date(activity.created_at).toLocaleDateString()} •{activity.upvotes} upvotes •{" "}
//                             {activity.downvotes} downvotes
//                           </Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}
//         </Box>
//       </Paper>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Confirm Action</DialogTitle>
//         <DialogContent>
//           <Typography>You have unsaved changes. Are you sure you want to leave without saving?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button
//             onClick={() => {
//               setOpenDialog(false)
//               navigate("/")
//             }}
//             color="error"
//             variant="contained"
//           >
//             Leave
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   )
// }

// export default Profile

<<<<<<< HEAD
=======

>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
<<<<<<< HEAD
  Badge,
  Tooltip,
  IconButton,
} from "@mui/material"
import { CloudUpload as CloudUploadIcon, Edit as EditIcon } from "@mui/icons-material"
=======
} from "@mui/material"
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
import { useAuth } from "../context/auth/AuthContext"

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
<<<<<<< HEAD
  const [uploadingPicture, setUploadingPicture] = useState(false)
=======
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    bio: "",
    profile_picture: "",
  })
  const [stats, setStats] = useState({
    uploads: 0,
    comments: 0,
    placements_added: 0,
    placements_searches: 0,
    interview_experiences_added: 0,
    interview_experience_searches: 0,
    dsa_searches: 0,
    classrooms_created: [],
    classrooms_joined: [],
    recent_activity: [],
  })
  const [openDialog, setOpenDialog] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
<<<<<<< HEAD
  // Flag to prevent stats refresh during file upload
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    // Initial data fetch when component mounts
    fetchProfileData()
  }, [])

=======

  useEffect(() => {
    fetchProfileData()
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user-stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          console.error("Failed to fetch user stats")
        }
      } catch (error) {
        console.error("Error fetching user stats:", error)
      }
    }

    fetchStats()
  }, [])

>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
  const fetchProfileData = async () => {
    try {
      setLoading(true)

      // Fetch profile data
<<<<<<< HEAD
      const profileResponse = await fetch("http://localhost:5000/profile", {
=======
      const profileResponse = await fetch("http://127.0.0.1:5000/profile", {
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        console.log("Fetched profile data:", profileData)

        // Ensure no null values in the profile data
        setProfileData({
          username: profileData.username || "",
          email: profileData.email || "",
          bio: profileData.bio || "",
          profile_picture: profileData.profile_picture || "",
        })
      } else {
        const errorData = await profileResponse.json()
        setError(errorData.message || "Failed to fetch profile data")
      }

<<<<<<< HEAD
      // Only fetch stats if not currently uploading a file
      if (!isUploading) {
        await fetchUserStats()
      }
    } catch (err) {
      console.error("Error fetching profile data:", err)
      setError("Failed to fetch profile data: " + (err.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  // Separate function for fetching stats to avoid duplicate code
  const fetchUserStats = async () => {
    if (isUploading) return; // Don't fetch stats during upload
    
    try {
      const statsResponse = await fetch("http://localhost:5000/user-stats", {
=======
      // Fetch stats data
      const statsResponse = await fetch("http://127.0.0.1:5000/user-stats", {
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      } else {
        console.error("Failed to fetch user stats")
      }
<<<<<<< HEAD
    } catch (error) {
      console.error("Error fetching user stats:", error)
=======
    } catch (err) {
      console.error("Error fetching profile data:", err)
      setError("Failed to fetch profile data: " + (err.message || "Unknown error"))
    } finally {
      setLoading(false)
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setHasUnsavedChanges(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
<<<<<<< HEAD
    if (!file) return;
=======
    if (!file) return
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd

    const formData = new FormData()
    formData.append("file", file)

    try {
<<<<<<< HEAD
      // Set flags to prevent unnecessary API calls during upload
      setIsUploading(true)
      setUploadingPicture(true)
      setError("") 
      setSuccess("") 

      console.log("Uploading profile picture...", file.name, file.type)

      // Debug the FormData contents
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1])
      }

      const response = await fetch("http://localhost:5000/upload-profile-picture", {
        method: "POST",
        headers: {
          // Do NOT set Content-Type header when using FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
        credentials: "include",
      })

      console.log("Response status:", response.status)

      // Try to get the response text first to see if it's valid JSON
      const responseText = await response.text()
      console.log("Response text:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
        console.log("Upload response:", data)
      } catch (e) {
        console.error("Error parsing JSON response:", e)
        setError("Invalid response from server")
        return
      }
=======
      setSaving(true)
      setError("") // Clear any previous errors

      console.log("Uploading profile picture...")

      const response = await fetch("http://127.0.0.1:5000/upload-profile-picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })

      const data = await response.json()
      console.log("Upload response:", data)
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd

      if (response.ok) {
        setProfileData((prev) => ({
          ...prev,
          profile_picture: data.profile_picture || prev.profile_picture,
        }))
        setSuccess("Profile picture updated successfully")
<<<<<<< HEAD
=======

        // Force a refresh of the profile data
        setTimeout(() => {
          fetchProfileData()
        }, 500)
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
      } else {
        setError(data.message || "Failed to upload profile picture")
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err)
      setError("Failed to upload profile picture: " + (err.message || "Unknown error"))
    } finally {
<<<<<<< HEAD
      setUploadingPicture(false)
      // Reset the upload flag after a short delay to ensure the upload process is complete
      setTimeout(() => {
        setIsUploading(false)
      }, 500)
=======
      setSaving(false)
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
<<<<<<< HEAD
      const response = await fetch("http://localhost:5000/update-profile", {
=======
      const response = await fetch("http://127.0.0.1:5000/update-profile", {
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData),
      })
      const data = await response.json()

      if (response.ok) {
        setSuccess("Profile updated successfully")
        setHasUnsavedChanges(false)
      } else {
        setError(data.message || "Failed to update profile")
      }
    } catch (err) {
      setError("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setOpenDialog(true)
    } else {
      navigate("/")
    }
  }

<<<<<<< HEAD
  // Modified window focus event listener to use the isUploading flag
  useEffect(() => {
    const handleFocus = () => {
      if (!isUploading && !uploadingPicture) {
        fetchProfileData()
      }
=======
  const refreshData = () => {
    fetchProfileData()
  }

  useEffect(() => {
    const handleFocus = () => {
      refreshData()
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
<<<<<<< HEAD
  }, [isUploading, uploadingPicture])
=======
  }, [])
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    )
  }

<<<<<<< HEAD
  // Determine avatar image source with fallback
  const avatarSrc = require("../Components/Jitender.jpeg")
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?"
  }

=======
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" component="h1">
            Profile
          </Typography>
          <Box>
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
              {saving ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </Box>
        </Box>

        {error && (
<<<<<<< HEAD
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
=======
          <Alert severity="error" sx={{ mb: 2 }}>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            {error}
          </Alert>
        )}

        {success && (
<<<<<<< HEAD
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
=======
          <Alert severity="success" sx={{ mb: 2 }}>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            {success}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
<<<<<<< HEAD
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Tooltip title="Upload new picture">
                    <label htmlFor="profile-picture-upload">
                      <IconButton
                        component="span"
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": { bgcolor: "primary.dark" },
                        }}
                        disabled={uploadingPicture}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </label>
                  </Tooltip>
                }
              >
                <Avatar
                  src={avatarSrc}
                  alt={profileData.username || "User"}
                  sx={{
                    width: 150,
                    height: 150,
                    border: "3px solid #e0e0e0",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    fontSize: "3rem",
                    bgcolor: avatarSrc ? "transparent" : "primary.light",
                  }}
                >
                  {!avatarSrc && getInitials(profileData.username)}
                </Avatar>
              </Badge>

=======
              <Avatar
                src={profileData.profile_picture || ""}
                alt={profileData.username || "User"}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture-upload"
                type="file"
                onChange={handleImageUpload}
<<<<<<< HEAD
                disabled={uploadingPicture}
              />

              {uploadingPicture && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  <CircularProgress size={50} sx={{ color: "white" }} />
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <label htmlFor="profile-picture-upload-button">
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  disabled={uploadingPicture}
                  sx={{ mt: 1 }}
                >
                  {uploadingPicture ? "Uploading..." : "Change Photo"}
                </Button>
              </label>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture-upload-button"
                type="file"
                onChange={handleImageUpload}
              />
=======
              />
              <label htmlFor="profile-picture-upload">
                <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />} disabled={saving}>
                  Upload Picture
                </Button>
              </label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                disabled={saving}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={saving}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={saving}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Statistics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.uploads}</Typography>
                <Typography color="textSecondary">Total Uploads</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.comments}</Typography>
                <Typography color="textSecondary">Total Comments</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.placements_added}</Typography>
                <Typography color="textSecondary">Placements Added</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.placements_searches}</Typography>
                <Typography color="textSecondary">Placement Searches</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.interview_experiences_added}</Typography>
                <Typography color="textSecondary">Interview Experiences Added</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.interview_experience_searches}</Typography>
                <Typography color="textSecondary">Interview Experience Searches</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.dsa_searches}</Typography>
                <Typography color="textSecondary">DSA Searches</Typography>
              </Paper>
            </Grid>
          </Grid>

          {stats.classrooms_created && stats.classrooms_created.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Classrooms Created
              </Typography>
              <List>
                {stats.classrooms_created.map((classroom) => (
                  <ListItem key={classroom.id} divider>
                    <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {stats.classrooms_joined && stats.classrooms_joined.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Classrooms Joined
              </Typography>
              <List>
                {stats.classrooms_joined.map((classroom) => (
                  <ListItem key={classroom.id} divider>
                    <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {stats.recent_activity && stats.recent_activity.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {stats.recent_activity.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemText
                      primary={activity.course_code}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {activity.description}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption" color="textSecondary">
<<<<<<< HEAD
                            {new Date(activity.created_at).toLocaleDateString()} • {activity.upvotes} upvotes •{" "}
=======
                            {new Date(activity.created_at).toLocaleDateString()} •{activity.upvotes} upvotes •{" "}
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
                            {activity.downvotes} downvotes
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>You have unsaved changes. Are you sure you want to leave without saving?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpenDialog(false)
              navigate("/")
            }}
            color="error"
            variant="contained"
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

<<<<<<< HEAD
export default Profile
=======
export default Profile

>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
