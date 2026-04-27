# 🎨 Freelancer Portfolio Builder

A beautiful MERN stack application to create, customize, and share professional portfolios effortlessly.

## ✨ Features

- 🎯 Create Portfolio with Multiple Templates
- 🎨 Beautiful & Responsive UI
- 📱 Mobile Friendly Design
- 🔐 User Authentication (JWT)
- 👤 Profile Management
- 💼 Projects Management
- 🏢 Experience Tracking
- 🎓 Skills Management
- 🔗 Public Portfolio Link
- 📋 Portfolio Preview
- 📤 Share Portfolio Easily

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Framer Motion (Animations)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File Upload)

## 📁 Project Structure

```
free_lancer/
├── frontend/          # React frontend
├── backend/           # Node/Express backend
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB URI and JWT Secret
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Configure your API endpoint
npm start
```

## 📖 Usage

1. **Sign Up** - Create a new account
2. **Select Template** - Choose from available templates
3. **Setup Profile** - Add your personal information
4. **Add Skills** - List your technical skills
5. **Add Projects** - Showcase your work
6. **Add Experience** - Include your professional background
7. **Preview** - See your portfolio
8. **Share** - Get your unique public link

## 🔗 API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET /api/skills` - Get user skills
- `POST /api/skills` - Add skill
- `DELETE /api/skills/:id` - Delete skill
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Add project
- `GET /api/portfolio/:username` - Get public portfolio

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## 🎨 UI/UX

- Modern gradient designs
- Smooth animations
- Dark mode support
- Responsive layout
- Beautiful components

## 📄 License

MIT License - feel free to use this project!

## 👨‍💻 Author

Created by [Your Name]

---

**Happy Building! 🚀**
