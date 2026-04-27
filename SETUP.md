# 🚀 Setup & Installation Guide

## Prerequisites

Before you begin, make sure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** package manager

## Project Structure

```
free_lancer/
├── backend/                    # Node.js/Express server
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API endpoints
│   ├── middleware/            # Authentication & other middleware
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env.example
│
├── frontend/                  # React.js application
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context (Auth)
│   │   ├── api/              # API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

Open `backend/.env` and update with your values:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/freelancer_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Step 5: Start the Backend Server

```bash
# Development with auto-reload
npm run dev

# Or production
npm start
```

You should see: ✅ MongoDB Connected and 🚀 Server running on port 5000

## Frontend Setup

### Step 1: Navigate to Frontend Directory (in a new terminal)

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

Open `frontend/.env` and update:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start the Frontend Server

```bash
npm start
```

The application will open at: **http://localhost:3000**

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: `mongod`
   - **Mac/Linux**: `brew services start mongodb-community`
3. Your connection string: `mongodb://localhost:27017/freelancer_db`

### Option 2: MongoDB Atlas (Cloud)

1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Profile

- `GET /api/profile` - Get user profile (Protected)
- `PUT /api/profile` - Update profile (Protected)
- `PUT /api/profile/template/:templateId` - Select template (Protected)

### Skills

- `GET /api/skills` - Get all skills (Protected)
- `POST /api/skills` - Add skill (Protected)
- `PUT /api/skills/:id` - Update skill (Protected)
- `DELETE /api/skills/:id` - Delete skill (Protected)

### Projects

- `GET /api/projects` - Get all projects (Protected)
- `POST /api/projects` - Add project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)

### Experience

- `GET /api/experience` - Get all experiences (Protected)
- `POST /api/experience` - Add experience (Protected)
- `PUT /api/experience/:id` - Update experience (Protected)
- `DELETE /api/experience/:id` - Delete experience (Protected)

### Templates

- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get single template

### Portfolio

- `GET /api/portfolio/:portfolioUrl` - Get public portfolio

## Features

✅ **User Authentication**
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes

✅ **Profile Management**
- Update personal information
- Profile picture upload
- Social media links
- Availability status

✅ **Skills Management**
- Add/Edit/Delete skills
- Proficiency levels
- Organized skill listing

✅ **Projects Showcase**
- Add project details
- Multiple technologies per project
- Live links and GitHub repos
- Project images

✅ **Experience Timeline**
- Add work experience
- Employment duration
- Current job indicator
- Detailed descriptions

✅ **Portfolio Templates**
- Multiple beautiful templates
- Easy template selection
- Responsive design

✅ **Public Portfolio**
- Unique URL for each user
- Beautiful public view
- Social media integration
- Share-friendly design

✅ **Beautiful UI**
- Gradient designs
- Smooth animations (Framer Motion)
- Dark mode (default)
- Responsive layout
- Icons and emojis

## Available Pages

### Public Pages
1. **Landing Page** `/` - Welcome and features
2. **Signup Page** `/signup` - User registration
3. **Login Page** `/login` - User login
4. **Public Portfolio** `/portfolio/:username` - View portfolio

### Protected Pages
1. **Template Selection** `/templates` - Choose portfolio template
2. **Dashboard** `/dashboard` - Main control panel with:
   - Profile Editor
   - Skills Manager
   - Projects Manager
   - Experience Manager
   - Portfolio Preview
   - Share Portfolio

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Bcryptjs - Password hashing
- CORS - Cross-origin requests
- Multer - File uploads

### Frontend
- React 18 - UI library
- React Router v6 - Routing
- Tailwind CSS - Styling
- Framer Motion - Animations
- Axios - HTTP client
- React Icons - Icon library
- React Toastify - Notifications

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
1. Check your MongoDB URI in `.env`
2. Ensure MongoDB service is running
3. Check firewall settings (for MongoDB Atlas)
4. Verify username and password

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Kill the process using port 5000
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Error

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
1. Check `FRONTEND_URL` in backend `.env`
2. Ensure it matches your frontend URL
3. Restart the backend server

### Dependencies Not Installing

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Environment Variables Checklist

### Backend (.env)
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secret key for JWT (change in production)
- [ ] `PORT` - Server port (default: 5000)
- [ ] `NODE_ENV` - Environment type
- [ ] `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- [ ] `REACT_APP_API_URL` - Backend API URL

## Security Notes

⚠️ **Important for Production**:

1. Change `JWT_SECRET` to a strong, random string
2. Set `NODE_ENV=production` in backend
3. Use environment variables for sensitive data
4. Enable HTTPS
5. Set secure CORS origins
6. Implement rate limiting
7. Add input validation
8. Use helmet.js for security headers
9. Implement proper error handling
10. Set up logging and monitoring

## Deployment

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_uri JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Support & Help

For issues and questions:
1. Check the troubleshooting section
2. Review error messages carefully
3. Check MongoDB connection
4. Verify environment variables
5. Check browser console for errors
6. Review backend logs

## Next Steps

1. ✅ Complete setup
2. 🧪 Test the application
3. 🎨 Customize templates
4. 📱 Add mobile optimization
5. 🔒 Implement additional security
6. 🚀 Deploy to production

---

**Happy Building! 🎉**
