#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Freelancer Portfolio Builder Setup${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js is installed${NC}"

# Backend Setup
echo -e "${YELLOW}\n📦 Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your MongoDB URI and JWT secret${NC}"
fi

echo -e "${YELLOW}Installing backend dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

cd ..

# Frontend Setup
echo -e "${YELLOW}\n📦 Setting up Frontend...${NC}"
cd frontend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp .env.example .env
fi

echo -e "${YELLOW}Installing frontend dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

echo -e "${GREEN}\n✅ Setup Complete!${NC}"
echo -e "${YELLOW}\n📝 Next steps:${NC}"
echo -e "1. Update backend/.env with your MongoDB URI"
echo -e "2. Update backend/.env with a strong JWT_SECRET"
echo -e "3. Open two terminals"
echo -e "4. In terminal 1: cd backend && npm run dev"
echo -e "5. In terminal 2: cd frontend && npm start"
echo -e "6. Visit http://localhost:3000"
echo -e "\n${GREEN}Happy Building! 🎉${NC}"
