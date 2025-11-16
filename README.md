# Todo List Application

This project is a full-stack Todo List application built with **React**,
**TypeScript**, **Node.js**, and **MongoDB**.\
The app provides a clean interface for creating, updating, and managing
daily tasks.\
It includes authentication, protected routes, and a connected database
for storing user-specific todos.

## Features

### Frontend

-   React + TypeScript
-   Login and Register pages
-   JWT-based authentication
-   Create, update, delete, and complete tasks
-   Zustand for state management
-   React Query for server state
-   Responsive UI

### Backend

-   Express + TypeScript
-   Password hashing
-   JWT authorization
-   CRUD operations for todos
-   MongoDB Atlas (Mongoose)
-   Error handling middleware
-   CORS configuration for production

## Tech Stack

### Frontend

-   React
-   Vite
-   TypeScript
-   Axios
-   Zustand
-   React Query

### Backend

-   Node.js
-   Express
-   Typescript
-   Mongoose
-   JWT
-   Bcrypt

### Database

-   MongoDB Atlas

## API Endpoints

### Auth

-   **POST /api/auth/register** -- register new user\
-   **POST /api/auth/login** -- login and receive token

### Todos

-   **GET /api/todos** -- get all todos for logged-in user\
-   **POST /api/todos** -- create new todo\
-   **PATCH /api/todos/:id** -- update todo\
-   **DELETE /api/todos/:id** -- delete todo

## Environment Variables

### Backend (.env)

    MONGO_URI=
    JWT_SECRET=
    CLIENT_URL=
    PORT=5000

### Frontend (.env)

    VITE_API_URL=https://todo-list-application-backend0.onrender.com/api

## Running Locally

### Frontend

    cd frontend
    npm install
    npm run dev

### Backend

    cd backend
    npm install
    npm run dev

## Deployment

### Frontend

-   Hosted on Vercel
-   Uses VITE_API_URL env variable

### Backend

-   Hosted on Render
-   Connected to MongoDB Atlas
-   CORS configured for frontend domain

## Future Enhancements

-   Dark mode
-   Task categories
-   Drag-and-drop sorting
-   Password reset

## Author
Aarushi | Developer
