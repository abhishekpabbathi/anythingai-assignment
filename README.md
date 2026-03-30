# Anythingai Assignment

A full stack Task Manager app built with React, Node.js, Express, MongoDB and JWT authentication.

## Features
- User Registration and Login
- JWT Authentication
- Protected Routes
- Create, Read, Update, Delete Tasks

## Tech Stack
- Frontend: React (React Router v5, js-cookie)
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Auth: JWT + bcryptjs

## How to Run

### Backend
```
cd backend
npm install
nodemon app.js
```

### Frontend
```
cd frontend
npm install
npm start
```

## API Endpoints
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/tasks
- POST /api/v1/tasks
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id
