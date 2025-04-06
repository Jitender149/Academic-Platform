<<<<<<< HEAD
# DEP Platform

A comprehensive platform for IIT Ropar students with secure authentication, resource sharing, and various academic features.

## Features

### Authentication System
- **Dual Authentication Methods**:
  - OTP-based Login (Primary)
  - Password-based Login (Alternative)
- **Secure Signup**:
  - IITRPR Email Domain Validation (@iitrpr.ac.in)
  - Strong Password Requirements
  - Real-time Validation
- **Password Reset**:
  - OTP-based Reset System
  - Session Invalidation on Reset
  - Rate Limiting Protection

### Academic Resources
- **Study Materials**:
  - Course-specific Resources
  - Previous Year Papers
  - Notes and Tutorials
- **DSA Resources**:
  - Curated DSA Topics
  - Interview Preparation Materials
  - Practice Problems

### Internship & Placement
- **Opportunities**:
  - Job Listings
  - Interview Experiences
  - Company-wise Resources
- **Seniors Data**:
  - Placement Statistics
  - Success Stories
  - Resume Templates

### Community Features
- **Discussion Groups**:
  - Course-specific Discussions
  - Doubt Resolution
  - Peer Learning
- **Resource Sharing**:
  - File Upload/Download
  - Cloud Storage Integration
  - Version Control

## Security Features
- JWT-based Authentication
- Password Hashing with bcrypt
- Rate Limiting for API Endpoints
- Content Security Policy (CSP)
- XSS Protection
- CORS Protection
- Secure Headers

## Password Requirements
- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Visual strength indicator

## Setup Instructions

1. **Clone the Repository**
```bash
git clone <repository-url>
cd DEP-main
```

2. **Set Up Python Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Environment Variables**
- Copy `.env.example` to `.env`
- Update the variables with your values
```bash
cp .env.example .env
```

4. **Database Setup**
```bash
flask db init
flask db migrate
flask db upgrade
```

5. **Start the Backend Server**
```bash
python app.py
```

6. **Start the Frontend Development Server**
```bash
cd my-app
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /signup` - Create new account
- `POST /login` - Password-based login
- `POST /generate-otp` - Request OTP for login
- `POST /verify-otp` - Verify OTP for login
- `POST /request-password-reset` - Request password reset
- `POST /verify-reset-otp` - Reset password with OTP

### Resources
- `GET /resources` - List all resources
- `POST /resources` - Upload new resource
- `GET /resources/:id` - Get resource details
- `PUT /resources/:id` - Update resource
- `DELETE /resources/:id` - Delete resource

### Rate Limits
- OTP Generation: 5 attempts per hour
- OTP Verification: 5 attempts per OTP
- Password Reset: 5 attempts per hour
- Resource Upload: 50 per day

## Tech Stack
- **Backend**: Flask, SQLAlchemy, JWT
- **Frontend**: React, Material-UI
- **Database**: SQLite
- **File Storage**: Cloudinary
- **Email**: SMTP (Gmail)

## Environment Variables Required
See `.env.example` for required environment variables.

## Team Members
- **Jatin (2022MCB1266)** - Frontend Developer
- **Jitender (2022MCB1318)** - Backend Developer
- **Sarthak (2022MCB1278)** - Database Manager

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
=======
# Academic Resource Portal

A full-stack web application for sharing academic resources, built with React and Flask.

## Features

- User Authentication (Login/Signup)
- Resource Upload and Sharing
- File Management with Cloudinary
- Voting System
- Comments System
- Search and Filter Resources
- Responsive Design
- Dark/Light Mode
- Protected Routes

## Tech Stack

### Frontend
- React.js
- Material-UI
- Axios
- React Router
- Context API

### Backend
- Flask
- SQLAlchemy
- JWT Authentication
- Cloudinary
- CORS

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Cloudinary account
- SQLite (included with Python)

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd AcademicPlatform
```

2. Set up the backend:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

3. Set up the frontend:
```bash
cd my-app
npm install
```

4. Start the development servers:

Backend:
```bash
# From the root directory
flask run
```

Frontend:
```bash
# From the my-app directory
npm start
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
>>>>>>> fad2872af265d079db5dd37c27b5b78c8a55027c
 
