# API Response Reference

## Success Response Format

All successful API responses follow this format:

```json
{
  "success": true,
  "message": "Description of what happened",
  "data": {}
}
```

## Auth Responses

### Register Success (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2d8a5a0e8c7a1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

### Login Success (200)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2d8a5a0e8c7a1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "recruiter"
  }
}
```

### Register Error (400)
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### Login Error (401)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Job Responses

### Create Job Success (201)
```json
{
  "success": true,
  "message": "Job posted successfully",
  "job": {
    "_id": "60d5ec49f1b2d8a5a0e8c7a2",
    "title": "Senior React Developer",
    "description": "We are looking for...",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "salary": 150000,
    "createdBy": "60d5ec49f1b2d8a5a0e8c7a1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "__v": 0
  }
}
```

### Get All Jobs Success (200)
```json
{
  "success": true,
  "count": 3,
  "jobs": [
    {
      "_id": "60d5ec49f1b2d8a5a0e8c7a2",
      "title": "Senior React Developer",
      "description": "We are looking for...",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "salary": 150000,
      "createdBy": {
        "_id": "60d5ec49f1b2d8a5a0e8c7a1",
        "name": "Jane Smith",
        "email": "jane@techcorp.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    // ... more jobs
  ]
}
```

### Get My Jobs Success (200)
```json
{
  "success": true,
  "count": 2,
  "jobs": [
    {
      "_id": "60d5ec49f1b2d8a5a0e8c7a2",
      "title": "Full Stack Developer",
      "description": "Join our team...",
      "company": "StartUp Inc",
      "location": "New York, NY",
      "salary": 120000,
      "createdBy": "60d5ec49f1b2d8a5a0e8c7a1",
      "createdAt": "2024-01-14T09:15:00.000Z",
      "updatedAt": "2024-01-14T09:15:00.000Z"
    }
  ]
}
```

### Delete Job Success (200)
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "jwt expired"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Access denied. This action requires recruiter role."
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Job not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Failed to create job",
  "error": "Database connection error"
}
```

## HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, successful update |
| 201 | Created | Successful POST (new resource) |
| 400 | Bad Request | Invalid input, validation error |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions/role |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected server error |

## Token Format

Tokens are JWT (JSON Web Tokens) in the format:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDVlYzQ5ZjFiMmQ4YTVhMGU4YzdhMSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDUzMzI2MDAsImV4cCI6MTcwNTQxOTAwMH0.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

**Token expires in 24 hours (86400 seconds)**

After expiration, user must login again to get a fresh token.

## Error Handling Best Practices

### In Frontend
```javascript
try {
  const response = await api.post('/auth/login', data);
  // Handle success
} catch (error) {
  // Check error type
  if (error.response?.status === 401) {
    // Handle unauthorized
    localStorage.clear();
    navigate('/login');
  } else if (error.response?.status === 403) {
    // Handle forbidden
    console.error('Insufficient permissions');
  } else {
    // Handle other errors
    console.error(error.response?.data?.message || 'An error occurred');
  }
}
```

### In Backend
All endpoints return:
- Success response with data
- Error response with message and optional error details
- Appropriate HTTP status code
- Never expose sensitive data like passwords

---

Reference this document when:
- Building frontend UI for API responses
- Testing with Postman
- Debugging API issues
- Implementing error handling
