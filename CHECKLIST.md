# ✅ Installation Checklist

## Pre-Installation

- [ ] Node.js v14+ installed
- [ ] MongoDB installed or MongoDB Atlas account created
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command prompt ready

## Backend Setup

- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Add `MONGODB_URI`
- [ ] Add `JWT_SECRET` (strong random string)
- [ ] Set `PORT` (default 5000)
- [ ] Set `FRONTEND_URL` to `http://localhost:3000`
- [ ] Test with `npm run dev`
- [ ] See "✅ MongoDB Connected" message
- [ ] See "🚀 Server running on port 5000" message

## Frontend Setup

- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Add `REACT_APP_API_URL=http://localhost:5000/api`
- [ ] Test with `npm start`
- [ ] Browser opens to `http://localhost:3000`

## Verification

### Backend Verification
- [ ] Backend server running on `http://localhost:5000`
- [ ] MongoDB connected (check logs)
- [ ] Can access `http://localhost:5000/api/health`
- [ ] Returns `{"status": "Server is running ✅"}`

### Frontend Verification
- [ ] Frontend running on `http://localhost:3000`
- [ ] Landing page loads
- [ ] Can see "Sign Up" and "Login" buttons
- [ ] Can navigate to signup page

## Functional Testing

- [ ] **Sign Up**
  - [ ] Fill signup form
  - [ ] Click "Create Account"
  - [ ] Redirected to template selection
  - [ ] Token saved in localStorage

- [ ] **Template Selection**
  - [ ] Can see 3 templates
  - [ ] Can select template
  - [ ] Click "Confirm & Continue"
  - [ ] Redirected to dashboard

- [ ] **Dashboard - Profile**
  - [ ] Can edit profile
  - [ ] Can upload profile image
  - [ ] Can add social links
  - [ ] Can save changes

- [ ] **Dashboard - Skills**
  - [ ] Can add skills
  - [ ] Can set proficiency
  - [ ] Can delete skills
  - [ ] Skills persist after refresh

- [ ] **Dashboard - Projects**
  - [ ] Can add projects
  - [ ] Can add technologies
  - [ ] Can add live link
  - [ ] Can add GitHub link
  - [ ] Can delete projects

- [ ] **Dashboard - Experience**
  - [ ] Can add experience
  - [ ] Can set dates
  - [ ] Can mark as current job
  - [ ] Can delete experience

- [ ] **Dashboard - Preview**
  - [ ] Can view portfolio preview
  - [ ] Shows all information
  - [ ] Looks presentable

- [ ] **Dashboard - Share**
  - [ ] Can copy portfolio link
  - [ ] Can open portfolio in new tab
  - [ ] Portfolio URL is unique

- [ ] **Public Portfolio**
  - [ ] Can access via unique URL
  - [ ] Shows all profile info
  - [ ] Shows all skills
  - [ ] Shows all projects
  - [ ] Shows all experience
  - [ ] Social links working

- [ ] **Authentication**
  - [ ] Can logout
  - [ ] After logout, redirected to home
  - [ ] Can't access dashboard without login
  - [ ] Can login with email and password

## Environment Variables

### Backend .env
```
✅ MONGODB_URI=mongodb+srv://...
✅ JWT_SECRET=your_secret_key
✅ PORT=5000
✅ NODE_ENV=development
✅ FRONTEND_URL=http://localhost:3000
```

### Frontend .env
```
✅ REACT_APP_API_URL=http://localhost:5000/api
```

## Dependencies Installation

### Backend Dependencies
- [ ] express
- [ ] mongoose
- [ ] bcryptjs
- [ ] jsonwebtoken
- [ ] dotenv
- [ ] cors
- [ ] multer
- [ ] express-validator

### Frontend Dependencies
- [ ] react
- [ ] react-dom
- [ ] react-router-dom
- [ ] axios
- [ ] tailwindcss
- [ ] framer-motion
- [ ] react-icons
- [ ] react-toastify

## MongoDB Setup

### Local MongoDB
- [ ] MongoDB installed
- [ ] MongoDB service running
- [ ] Can connect with `mongodb://localhost:27017`
- [ ] Database `freelancer_db` created

### MongoDB Atlas (Cloud)
- [ ] Account created
- [ ] Cluster created
- [ ] IP whitelisted (0.0.0.0/0 for development)
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Connection string in `.env`

## API Testing

- [ ] Test signup endpoint
- [ ] Test login endpoint
- [ ] Test get profile endpoint
- [ ] Test update profile endpoint
- [ ] Test add skill endpoint
- [ ] Test get skills endpoint
- [ ] Test add project endpoint
- [ ] Test get projects endpoint
- [ ] Test add experience endpoint
- [ ] Test get experience endpoint
- [ ] Test public portfolio endpoint

## Browser Console

- [ ] No JavaScript errors
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] All API calls successful (2xx status)
- [ ] No warnings in development

## Performance

- [ ] Frontend loads in < 3 seconds
- [ ] API responses < 500ms
- [ ] No lag in interactions
- [ ] Smooth animations
- [ ] Responsive on mobile

## Security

- [ ] JWT token in localStorage
- [ ] Password hashed in backend
- [ ] CORS configured correctly
- [ ] Protected routes working
- [ ] Can't access protected pages without login

## Deployment Ready

- [ ] Remove console.log statements
- [ ] Update environment variables for production
- [ ] Change JWT_SECRET to strong value
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Setup error logging
- [ ] Test all features one more time

## Post-Deployment

- [ ] Test on production URL
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Verify email notifications (if added)
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Monitor user feedback

---

**Date Completed:** _________________

**Notes:** ________________________________________________________________

________________________________________________________________________

**Status:** ☐ In Progress  ☐ Completed  ☐ Ready for Production
