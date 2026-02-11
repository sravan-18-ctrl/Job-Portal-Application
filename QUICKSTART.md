# Job Portal - Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Terminal 1: Start Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobportal
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
```

```bash
npm run dev
```

✅ Backend ready at `http://localhost:5000`

### Terminal 2: Start Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

✅ Frontend ready at `http://localhost:3000`

## 📝 Quick Test

### Create a Recruiter Account
1. Go to http://localhost:3000
2. Click "Register"
3. Fill form:
   - Name: Test Recruiter
   - Email: recruiter@test.com
   - Password: password123
   - Role: Recruiter
4. Click Register

### Post a Job
1. Click "Dashboard"
2. Click "Post New Job"
3. Fill form:
   - Title: React Developer
   - Company: My Company
   - Location: New York
   - Salary: 100000
   - Description: Seeking experienced React dev
4. Click "Post Job"

### View Jobs
1. Click "Browse Jobs"
2. See your posted job

### Create a Job Seeker Account
1. Logout
2. Register as Job Seeker
3. View all job listings

## 🔑 API Quick Reference

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "recruiter"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Post Job (use token from login)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Senior Developer",
    "company": "Tech Corp",
    "location": "San Francisco",
    "salary": 150000,
    "description": "Looking for senior developer"
  }'
```

### Get All Jobs
```bash
curl http://localhost:5000/api/jobs
```

### Get My Jobs (Recruiter)
```bash
curl http://localhost:5000/api/jobs/my \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Delete Job
```bash
curl -X DELETE http://localhost:5000/api/jobs/JOB_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## ℹ️ Default Test Credentials

**Recruiter:**
- Email: recruiter@example.com
- Password: password123
- Role: recruiter

**Job Seeker:**
- Email: jobseeker@example.com
- Password: password123
- Role: jobseeker

## 📦 Folder Structure

```
job-portal/
├── backend/              # Node.js + Express API
│   ├── config/          # DB connection
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & role checks
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env
│
└── frontend/            # React + Vite
    ├── src/
    │   ├── pages/       # Page components
    │   ├── components/  # Reusable components
    │   ├── context/     # Auth context
    │   ├── services/    # API calls
    │   └── App.jsx
    ├── package.json
    ├── vite.config.js
    └── .env
```

## 🔒 Key Features Implemented

✅ JWT Authentication (24-hour tokens)
✅ Password Hashing (bcrypt)
✅ Role-Based Access Control (Recruiter/JobSeeker)
✅ Protected Routes (Frontend)
✅ Protected API Endpoints (Backend)
✅ Auto-login on Page Refresh
✅ Secure Token Storage (localStorage)
✅ Comprehensive Error Handling
✅ CORS Enabled
✅ MongoDB Connection Pooling

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Cannot connect to MongoDB | Check MONGO_URI in .env, verify credentials, check MongoDB Atlas network settings |
| Port 5000 in use | Change PORT in backend .env or kill process |
| CORS errors | Verify VITE_API_URL is correct in frontend .env |
| Token invalid | Re-login to get fresh token |
| 401 Unauthorized | Include Authorization header with Bearer token |
| 403 Forbidden | Check user role - may need recruiter account |

## 📚 Full Documentation

See `README.md` for:
- Detailed setup instructions
- Complete API documentation
- Postman collection import
- Deployment guide
- Contributing guidelines

## 🎯 Next Steps

1. ✅ Register an account (choose your role)
2. ✅ If recruiter: Post a test job
3. ✅ If job seeker: View job listings
4. ✅ Try all CRUD operations
5. ✅ Test logout/login flow

---

**Everything working? You're all set! 🎉**

For production deployment, remember to:
- Update JWT_SECRET to a strong value
- Replace MongoDB connection with production DB
- Set NODE_ENV=production
- Add API rate limiting
- Implement email verification
