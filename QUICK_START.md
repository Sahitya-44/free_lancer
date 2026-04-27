# 🚀 Quick Start Guide

## 5-Minute Setup

Follow these steps to get the application running:

### Prerequisites Check
- [ ] Node.js v14+ installed (`node --version`)
- [ ] MongoDB running locally or MongoDB Atlas account
- [ ] Git installed

### Step 1: Clone Repository
```bash
git clone https://github.com/Sahitya-44/free_lancer.git
cd free_lancer
```

### Step 2: Run Setup Script

**On Windows:**
```bash
setup.bat
```

**On Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Step 3: Configure Environment

#### Backend Configuration
Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/freelancer_db
JWT_SECRET=your-secret-key-here-change-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration
Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Step 5: Access Application

Open browser and navigate to: **http://localhost:3000**

---

## 🎯 Quick Test

### 1. Sign Up
- Click "Sign Up" on landing page
- Fill in details:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Password: `password123`
- Click "Create Account"

### 2. Select Template
- Choose any template
- Click "Confirm & Continue"

### 3. Setup Profile
- Fill in your details in Dashboard
- Add profile image URL
- Save changes

### 4. Add Skills
- Click "Skills" in menu
- Add skills like "React", "Node.js"
- Click "+ Add Skill"

### 5. Add Projects
- Click "Projects" in menu
- Click "+ Add Project"
- Fill details and save

### 6. View Portfolio
- Click "Preview" to see portfolio
- Click "Share" to get public link
- Copy and share your portfolio URL

### 7. View Public Portfolio
- Click the share link or visit:
  `http://localhost:3000/portfolio/john-doe`

---

## 📱 Testing Accounts

Create your own accounts during sign up. No pre-made accounts needed.

---

## 🔧 Troubleshooting Quick Fixes

### Port 5000 Already in Use
```bash
# Change PORT in backend/.env to 5001
PORT=5001

# Also update frontend/.env
REACT_APP_API_URL=http://localhost:5001/api
```

### MongoDB Connection Error
```bash
# Check MongoDB is running
mongod

# Or use MongoDB Atlas:
# 1. Create cluster at mongodb.com/cloud/atlas
# 2. Get connection string
# 3. Add to backend/.env MONGODB_URI
```

### CORS Error
```bash
# Restart backend server
# Make sure FRONTEND_URL in .env matches your frontend URL
```

### Dependencies Not Installing
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Project Structure

```
free_lancer/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Main server
│   ├── package.json
│   └── .env            # Configuration
│
├── frontend/
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   ├── context/    # Auth context
│   │   ├── api/        # API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env            # Configuration
│
├── SETUP.md            # Detailed setup guide
├── API_DOCUMENTATION.md # API reference
└── README.md           # Project overview
```

---

## 🌐 Key Features

✅ **Authentication**
- JWT-based secure login
- Password hashing
- Protected routes

✅ **Profile Management**
- Edit personal info
- Profile picture
- Social links (Gmail, LinkedIn, GitHub)

✅ **Skills Management**
- Add/Edit/Delete skills
- Proficiency levels

✅ **Projects Showcase**
- Project details
- Technologies used
- Live links and GitHub repos
- Project images

✅ **Experience Timeline**
- Work experience
- Duration tracking
- Current job indicator

✅ **Public Portfolio**
- Unique URL per user
- Beautiful presentation
- Share-friendly
- Responsive design

✅ **Beautiful UI**
- Gradient designs
- Smooth animations
- Dark mode
- Mobile responsive

---

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',      // Change primary color
  secondary: '#8b5cf6',    // Change secondary color
}
```

### Change Port
Edit `backend/.env`:
```env
PORT=5001
```

Update `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

---

## 📊 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Main Endpoints
- `POST /auth/signup` - Register
- `POST /auth/login` - Login
- `GET /auth/me` - Current user
- `PUT /profile` - Update profile
- `GET/POST/DELETE /skills` - Skills management
- `GET/POST/DELETE /projects` - Projects management
- `GET/POST/DELETE /experience` - Experience management
- `GET /portfolio/:username` - Public portfolio

See `API_DOCUMENTATION.md` for detailed API reference.

---

## 🚀 Deployment

### Deploy Backend

**Heroku:**
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_uri JWT_SECRET=your_secret
git push heroku main
```

**Railway:**
```bash
railway up
```

### Deploy Frontend

**Vercel:**
```bash
vercel
```

**Netlify:**
```bash
netlify deploy --prod
```

---

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

---

## ❓ FAQ

**Q: Can I use this for multiple users?**
A: Yes! Each user gets their own portfolio URL and can manage their own data.

**Q: How do I backup my data?**
A: MongoDB Atlas provides automatic backups. Export data using mongoexport.

**Q: Can I change the template after selecting?**
A: Yes, you can select a different template anytime from the Dashboard.

**Q: Is my data secure?**
A: Passwords are hashed with bcryptjs. Use strong JWT_SECRET in production.

**Q: How do I add more templates?**
A: Add templates to MongoDB using the Template model.

---

## 💡 Next Steps

1. ✅ Complete the setup
2. 🎨 Customize the UI colors
3. 📝 Add more portfolio features
4. 🔒 Implement additional security
5. 📱 Add mobile app version
6. 🚀 Deploy to production

---

## 🆘 Need Help?

1. Check troubleshooting section
2. Review error messages
3. Check browser console (F12)
4. Check server logs
5. Review `SETUP.md` for detailed guide
6. Check `API_DOCUMENTATION.md` for API details

---

**Made with ❤️ for freelancers**

Happy building! 🎉
