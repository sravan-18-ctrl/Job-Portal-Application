# 💼 Job Portal - MERN Stack Application

A complete job listing portal built with the MERN stack (MongoDB, Express, React, Node.js) featuring secure JWT authentication, role-based authorization, and full-featured job management.

## 🚀 Features

- ✅ **User Authentication**: Secure register/login with JWT tokens
- ✅ **Role-Based Access**: Two roles - Job Seeker and Recruiter
- ✅ **Job Management**: Recruiters can create, view, and delete job postings
- ✅ **Job Listings**: Job seekers can browse all available jobs
- ✅ **Password Security**: Bcrypt hashing for password encryption
- ✅ **Protected Routes**: Frontend route protection with context API
- ✅ **Auto-Login**: Remember user session on page refresh
- ✅ **Responsive Design**: Mobile-friendly UI with CSS
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Clean Code**: Well-organized, commented code

## 📋 Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## 📁 Project Structure

```
job-portal/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Jobs.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── PostJob.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .env.example
```

## 🔧 Prerequisites

Before getting started, make sure you have:
- **Node.js** (v14 or higher) and **npm** installed
- **MongoDB Atlas** account (free tier available at https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)
- **Postman** (optional, for API testing)

## 📦 Installation & Setup

### Step 1: Clone/Download the Project

```bash
# Navigate to the project directory
cd job-portal
```

### Step 2: Backend Setup

#### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2.2 Create Environment File

Create a `.env` file in the backend directory (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobportal
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier)
3. Create a database user with username and password
4. Click "Connect" and copy the connection string
5. Replace `<username>`, `<password>`, and update the database name to `jobportal`

#### 2.3 Start Backend Server

```bash
npm run dev
```

Expected output:
```
✅ MongoDB Connected: cluster.mongodb.net
🚀 Server running on port 5000
```

**Backend is ready at:** `http://localhost:5000`

### Step 3: Frontend Setup

#### 3.1 Install Frontend Dependencies

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

#### 3.2 Create Environment File

Create a `.env` file in the frontend directory (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

#### 3.3 Start Frontend Development Server

```bash
npm run dev
```

Expected output:
```
➜  frontend git:(main) npm run dev
  VITE v5.0.0  ready in 456 ms
  ➜  Local:   http://localhost:3000/
  ➜  Browser can be opened with: http://localhost:3000
```

**Frontend is ready at:** `http://localhost:3000`

## 🎮 Application Usage

### User Roles

#### 1. **Job Seeker**
- View all job listings
- Browse jobs from different companies
- See job details and recruiter information

#### 2. **Recruiter**
- Post new job openings
- View their own job postings
- Delete job postings
- Access recruiter dashboard

### Demo Credentials

You can use these credentials to test the application:

**Recruiter Account:**
```
Email: recruiter@example.com
Password: password123
```

**Job Seeker Account:**
```
Email: jobseeker@example.com
Password: password123
```

Or create your own accounts by registering.

### Workflow

1. **Register/Login**: Create an account or login
   - Choose your role (Job Seeker or Recruiter)
   - Set a secure password (min 6 characters)

2. **For Recruiters**:
   - Go to Dashboard after login
   - Click "Post New Job"
   - Fill in job details (title, company, location, salary, description)
   - Submit to post the job
   - Manage posted jobs from dashboard

3. **For Job Seekers**:
   - Browse all jobs on the home page
   - View job details, company name, location, and salary
   - See which recruiter posted the job

## 🔌 API Documentation

### Authentication APIs

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobseeker" | "recruiter"
}

Response: {
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

### Job APIs

#### Create Job (Recruiter Only)
```
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior React Developer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "salary": 150000,
  "description": "We are looking for an experienced React developer..."
}

Response: {
  "success": true,
  "message": "Job posted successfully",
  "job": {
    "_id": "...",
    "title": "Senior React Developer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "salary": 150000,
    "description": "...",
    "createdBy": "...",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Jobs (Public)
```
GET /api/jobs

Response: {
  "success": true,
  "count": 5,
  "jobs": [
    {
      "_id": "...",
      "title": "Senior React Developer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "salary": 150000,
      "description": "...",
      "createdBy": {
        "_id": "...",
        "name": "Jane Smith",
        "email": "jane@techcorp.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more jobs
  ]
}
```

#### Get My Jobs (Recruiter Only)
```
GET /api/jobs/my
Authorization: Bearer <token>

Response: {
  "success": true,
  "count": 3,
  "jobs": [...]
}
```

#### Delete Job (Recruiter Only)
```
DELETE /api/jobs/:id
Authorization: Bearer <token>

Response: {
  "success": true,
  "message": "Job deleted successfully"
}
```

#### Health Check
```
GET /api/health

Response: {
  "success": true,
  "message": "Server is running"
}
```

## 📮 Postman Collection

### Setup

1. **Import into Postman**:
   - Open Postman
   - Click "Import"
   - Copy-paste the JSON below or use the raw URL
   - Click "Import"

2. **Set Variables**:
   - Create a variable `base_url` = `http://localhost:5000/api`
   - Create a variable `token` = (will be set after login)

### Sample Requests

#### 1. Register (Job Seeker)
```json
{
  "name": "Test Job Seeker",
  "email": "jobseeker@test.com",
  "password": "password123",
  "role": "jobseeker"
}
```

#### 2. Register (Recruiter)
```json
{
  "name": "Test Recruiter",
  "email": "recruiter@test.com",
  "password": "password123",
  "role": "recruiter"
}
```

#### 3. Login
```json
{
  "email": "recruiter@test.com",
  "password": "password123"
}
```

**After login, copy the token from response and set it in Postman:**
- Click "Manage Environments" or use the variable
- Set `{{token}}` variable to the returned token

#### 4. Post a Job
```json
{
  "title": "Full Stack Developer",
  "company": "Startup Inc",
  "location": "New York, NY",
  "salary": 120000,
  "description": "Looking for a talented full-stack developer with experience in MERN stack. Must have 2+ years experience."
}
```

#### 5. Get All Jobs
No body required - just send GET request

#### 6. Get My Jobs
No body required - requires Authorization header with token

#### 7. Delete Job
Replace `:id` with actual job ID - requires Authorization header

## 🔐 Security Features

- ✅ **Password Hashing**: All passwords hashed with bcrypt (salt rounds: 10)
- ✅ **JWT Tokens**: Secure token-based authentication (expires in 24 hours)
- ✅ **CORS**: Cross-origin requests properly configured
- ✅ **Role-Based Authorization**: Routes protected by user role
- ✅ **Protected Routes**: Frontend routes require authentication
- ✅ **No Sensitive Data**: Passwords never returned in API responses
- ✅ **Token Refresh**: Auto-logout on token expiration

## 🐛 Troubleshooting

### Backend Issues

**"Cannot connect to MongoDB"**
- Verify MongoDB URI in `.env`
- Check network access in MongoDB Atlas
- Ensure database credentials are correct

**"Port 5000 already in use"**
- Change PORT in `.env` to a different port (e.g., 5001)
- Or kill the process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

**"CORS error"**
- Verify frontend URL is correct in frontend `.env`
- Check if backend CORS is set to allow that origin

### Frontend Issues

**"Cannot connect to API"**
- Verify `VITE_API_URL` in `.env` is correct
- Ensure backend is running
- Check browser console for detailed errors

**"Module not found"**
- Run `npm install` in frontend directory
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**"Blank page or 404 errors"**
- Ensure Vite dev server is running
- Clear browser cache (Ctrl+Shift+Delete)
- Try `npm run dev` again

## 📈 Performance Optimization

- **Frontend**: Vite provides fast HMR and optimized build
- **Backend**: Connection pooling with MongoDB
- **API Response**: Only necessary fields returned
- **Code Splitting**: React Router lazy loading ready

## 🚢 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Push to GitHub
2. Connect to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build: `npm run build`
2. Deploy the `dist` folder
3. Update `VITE_API_URL` for production API URL

## 📝 Notes

- All timestamps use UTC and are included in API responses
- Pagination can be added for large job listings
- Email verification and password reset can be added
- Job application feature can be implemented
- Search/filter functionality for jobs can be added

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📄 License

MIT License - Feel free to use this project for personal and commercial purposes.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console logs for error messages
4. Verify all environment variables are set correctly

---

**Happy Coding! 🎉**

Made with ❤️ using MERN Stack
