# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses are in JSON format:

### Success Response (2xx)
```json
{
  "message": "Success message",
  "data": {}
}
```

### Error Response (4xx, 5xx)
```json
{
  "message": "Error message"
}
```

## Endpoints

### Authentication

#### Sign Up
```
POST /auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "portfolioUrl": "john-doe"
  }
}
```

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "portfolioUrl": "john-doe",
    "selectedTemplate": "template1"
  }
}
```

#### Get Current User
```
GET /auth/me
Authentication: Required
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "title": "Frontend Developer",
  "bio": "I build amazing web apps",
  "location": "New York, USA",
  "profileImage": "https://example.com/image.jpg",
  "availability": "open",
  "socialLinks": {
    "gmail": "john@gmail.com",
    "linkedin": "https://linkedin.com/in/john",
    "github": "https://github.com/john"
  },
  "portfolioUrl": "john-doe",
  "selectedTemplate": "template1"
}
```

### Profile

#### Get Profile
```
GET /profile
Authentication: Required
```

**Response:** Same as Get Current User

#### Update Profile
```
PUT /profile
Authentication: Required
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "title": "Senior Frontend Developer",
  "bio": "I build amazing web apps with React",
  "location": "San Francisco, USA",
  "profileImage": "https://example.com/new-image.jpg",
  "availability": "open",
  "socialLinks": {
    "gmail": "john@gmail.com",
    "linkedin": "https://linkedin.com/in/john",
    "github": "https://github.com/john",
    "twitter": "https://twitter.com/john",
    "website": "https://johndoe.com"
  }
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

#### Select Template
```
PUT /profile/template/:templateId
Authentication: Required
```

**Response:**
```json
{
  "message": "Template selected successfully",
  "user": { /* updated user object */ }
}
```

### Skills

#### Get All Skills
```
GET /skills
Authentication: Required
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "name": "React",
    "proficiency": "Expert",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Add Skill
```
POST /skills
Authentication: Required
```

**Request Body:**
```json
{
  "name": "React",
  "proficiency": "Expert"
}
```

**Response:**
```json
{
  "message": "Skill added successfully",
  "skill": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "name": "React",
    "proficiency": "Expert"
  }
}
```

#### Delete Skill
```
DELETE /skills/:skillId
Authentication: Required
```

**Response:**
```json
{
  "message": "Skill deleted successfully"
}
```

### Projects

#### Get All Projects
```
GET /projects
Authentication: Required
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Portfolio Website",
    "description": "A beautiful portfolio website built with React",
    "image": "https://example.com/project.jpg",
    "technologies": ["React", "Node.js", "MongoDB"],
    "liveLink": "https://example.com",
    "githubLink": "https://github.com/john/portfolio",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-03-01T00:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Add Project
```
POST /projects
Authentication: Required
```

**Request Body:**
```json
{
  "title": "Portfolio Website",
  "description": "A beautiful portfolio website built with React",
  "image": "https://example.com/project.jpg",
  "technologies": ["React", "Node.js", "MongoDB"],
  "liveLink": "https://example.com",
  "githubLink": "https://github.com/john/portfolio",
  "startDate": "2024-01-01",
  "endDate": "2024-03-01"
}
```

**Response:** Project object

#### Update Project
```
PUT /projects/:projectId
Authentication: Required
```

**Request Body:** Same as Add Project

#### Delete Project
```
DELETE /projects/:projectId
Authentication: Required
```

### Experience

#### Get All Experiences
```
GET /experience
Authentication: Required
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "company": "Tech Company",
    "role": "Frontend Developer",
    "description": "Worked on web applications",
    "startDate": "2023-01-01T00:00:00Z",
    "endDate": "2024-01-01T00:00:00Z",
    "currentlyWorking": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Add Experience
```
POST /experience
Authentication: Required
```

**Request Body:**
```json
{
  "company": "Tech Company",
  "role": "Frontend Developer",
  "description": "Worked on web applications",
  "startDate": "2023-01-01",
  "endDate": "2024-01-01",
  "currentlyWorking": false
}
```

**Response:** Experience object

#### Update Experience
```
PUT /experience/:experienceId
Authentication: Required
```

#### Delete Experience
```
DELETE /experience/:experienceId
Authentication: Required
```

### Templates

#### Get All Templates
```
GET /templates
Authentication: Not Required
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "name": "Modern Template",
    "templateId": "template1",
    "description": "A modern portfolio template",
    "color": "from-blue-500 to-purple-600",
    "features": ["Responsive Design", "Fast Loading", "SEO Optimized"],
    "isActive": true
  }
]
```

### Portfolio

#### Get Public Portfolio
```
GET /portfolio/:portfolioUrl
Authentication: Not Required
```

**Response:**
```json
{
  "user": {
    "name": "John Doe",
    "title": "Frontend Developer",
    "bio": "I build amazing web apps",
    "profileImage": "https://example.com/image.jpg",
    "location": "New York, USA",
    "availability": "open",
    "socialLinks": {
      "gmail": "john@gmail.com",
      "linkedin": "https://linkedin.com/in/john"
    },
    "selectedTemplate": "template1",
    "portfolioUrl": "john-doe"
  },
  "skills": [ /* array of skills */ ],
  "projects": [ /* array of projects */ ],
  "experiences": [ /* array of experiences */ ]
}
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate email or resource |
| 500 | Internal Server Error | Server error |

## Rate Limiting

Currently not implemented. Plan to add in production.

## Pagination

Currently not implemented. Plan to add for large datasets.

## CORS

CORS is enabled for the frontend URL specified in `FRONTEND_URL` environment variable.
