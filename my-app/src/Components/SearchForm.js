"use client"

import { useState } from "react"
<<<<<<< HEAD
import { Box, Paper, Typography, useTheme, alpha } from '@mui/material';

function SearchForm({ onSearch }) {
  const theme = useTheme();
=======

function SearchForm({ onSearch }) {
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
  const [searchParams, setSearchParams] = useState({
    field: "",
    geoid: "",
    page: 0,
    sortBy: "",
    jobType: "",
    expLevel: "",
    workType: "",
    filterByCompany: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchParams)
  }

  return (
<<<<<<< HEAD
    <Paper 
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : 'white',
        boxShadow: theme.palette.mode === 'dark' 
          ? `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}`
          : `0 2px 10px ${alpha(theme.palette.common.black, 0.05)}`
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          mb: 3,
          color: 'text.primary',
          fontWeight: 600
        }}
      >
        Search Jobs
      </Typography>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="field" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: theme.palette.text.primary,
              fontWeight: 500
            }}>Keywords</label>
=======
    <div className="search-form-container">
      <h2>Search Jobs</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="field">Keywords</label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            <input
              type="text"
              id="field"
              name="field"
              value={searchParams.field}
              onChange={handleChange}
              placeholder="Job title, skills, or company"
<<<<<<< HEAD
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                color: theme.palette.text.primary,
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
=======
              className="form-control"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            />
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label htmlFor="geoid" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: theme.palette.text.primary,
              fontWeight: 500
            }}>Location</label>
=======
            <label htmlFor="geoid">Location</label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            <input
              type="text"
              id="geoid"
              name="geoid"
              value={searchParams.geoid}
              onChange={handleChange}
              placeholder="City, state, or country"
<<<<<<< HEAD
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                color: theme.palette.text.primary,
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
=======
              className="form-control"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            />
          </div>
        </div>

<<<<<<< HEAD
        <div className="form-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="jobType" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: theme.palette.text.primary,
              fontWeight: 500
            }}>Job Type</label>
=======
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="jobType">Job Type</label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            <select
              id="jobType"
              name="jobType"
              value={searchParams.jobType}
              onChange={handleChange}
<<<<<<< HEAD
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                color: theme.palette.text.primary,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
=======
              className="form-control"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            >
              <option value="">All Job Types</option>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="temoporary">Temporary</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label htmlFor="expLevel" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: theme.palette.text.primary,
              fontWeight: 500
            }}>Experience Level</label>
=======
            <label htmlFor="expLevel">Experience Level</label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            <select
              id="expLevel"
              name="expLevel"
              value={searchParams.expLevel}
              onChange={handleChange}
<<<<<<< HEAD
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                color: theme.palette.text.primary,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
=======
              className="form-control"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            >
              <option value="">All Experience Levels</option>
              <option value="internship">Internship</option>
              <option value="entry_level">Entry level</option>
              <option value="associate">Associate</option>
              <option value="mid_senior_level">Mid-Senior level</option>
              <option value="director">Director</option>
            </select>
          </div>
        </div>

<<<<<<< HEAD
        <div className="form-row" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="workType" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: theme.palette.text.primary,
              fontWeight: 500
            }}>Work Type</label>
=======
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workType">Work Type</label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            <select
              id="workType"
              name="workType"
              value={searchParams.workType}
              onChange={handleChange}
<<<<<<< HEAD
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                color: theme.palette.text.primary,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
=======
              className="form-control"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            >
              <option value="">All Work Types</option>
              <option value="at_work">At Work</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label htmlFor="sortBy" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: theme.palette.text.primary,
              fontWeight: 500
            }}>Sort By</label>
=======
            <label htmlFor="sortBy">Sort By</label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            <select
              id="sortBy"
              name="sortBy"
              value={searchParams.sortBy}
              onChange={handleChange}
<<<<<<< HEAD
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                color: theme.palette.text.primary,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
=======
              className="form-control"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            >
              <option value="">All</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>

<<<<<<< HEAD
        <div className="form-row" style={{ 
          marginBottom: '20px'
        }}>
          <div className="form-group">
            <label htmlFor="filterByCompany" style={{ 
              display: 'block',
              marginBottom: '8px',
              color: theme.palette.text.primary,
              fontWeight: 500
            }}>Company</label>
=======
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="filterByCompany">Company</label>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            <input
              type="text"
              id="filterByCompany"
              name="filterByCompany"
              value={searchParams.filterByCompany}
              onChange={handleChange}
              placeholder="Filter by company"
<<<<<<< HEAD
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                color: theme.palette.text.primary,
                '&:focus': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
=======
              className="form-control"
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
            />
          </div>
        </div>

<<<<<<< HEAD
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '14px 24px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.1)}`
            }
          }}
        >
          Search Jobs
        </button>
      </form>
    </Paper>
=======
        <button type="submit" className="search-button">
          Search Jobs
        </button>
      </form>
    </div>
>>>>>>> 9f1d0996107cb3e3c142f33b61fdd1f7ec0a7dbd
  )
}

export default SearchForm

