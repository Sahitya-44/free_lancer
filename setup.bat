@echo off
REM Colors for output
setlocal enabledelayedexpansion

echo.
echo 🚀 Starting Freelancer Portfolio Builder Setup
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install it first.
    exit /b 1
)

echo ✅ Node.js is installed

REM Backend Setup
echo.
echo 📦 Setting up Backend...
cd backend

if not exist .env (
    echo Creating .env file from .env.example
    copy .env.example .env
    echo ⚠️  Please update backend/.env with your MongoDB URI and JWT secret
)

echo Installing backend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)

echo ✅ Backend dependencies installed

cd ..

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd frontend

if not exist .env (
    echo Creating .env file from .env.example
    copy .env.example .env
)

echo Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)

echo ✅ Frontend dependencies installed

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 📝 Next steps:
echo 1. Update backend/.env with your MongoDB URI
echo 2. Update backend/.env with a strong JWT_SECRET
echo 3. Open two terminals
echo 4. In terminal 1: cd backend ^&^& npm run dev
echo 5. In terminal 2: cd frontend ^&^& npm start
echo 6. Visit http://localhost:3000
echo.
echo Happy Building! 🎉
echo.
pause
