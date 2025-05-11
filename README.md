# 📝✅ TUTAM SBD9 Ifan - Task and Note Manager 🚀

> 🎓 **Academic Project**: This application is submitted as an additional assignment for Module 9 of the Database Systems Practicum (SBD Praktikum).

A comprehensive and modern Task and Note Manager application built with React.js (frontend) and Express.js (backend) using Neon PostgreSQL as the database. Deployed on Vercel for seamless cloud access! 🌩️

## ✨ Features

### 📋 Tasks Feature
- ➕ Create new tasks with title, description and priority levels
- 👁️ View all tasks with their creation date and priority indicators
- 🔍 Filter tasks by status (active/completed) and priority
- 🗑️ Delete tasks with confirmation dialog
- ✅ Mark tasks as completed with status tracking
- 📊 Task statistics with priority breakdown

### 📔 Notes Feature
- ✏️ Create new notes with title and content
- 🔎 View all notes with powerful search functionality
- 📝 Edit existing notes easily
- 🗑️ Delete notes with confirmation
- 📱 Responsive grid layout for all devices

## 🛠️ Tech Stack

### 🖥️ Frontend
- ⚛️ React.js with Vite for blazing-fast development
- 🧭 React Router DOM for seamless navigation
- 🔄 Axios for efficient API requests
- 🎨 TailwindCSS for beautiful, responsive styling
- 🎬 Framer Motion for smooth animations
- 🍞 React Toastify for notifications

### ⚙️ Backend
- 🚂 Express.js for server-side logic
- 🐘 Neon PostgreSQL database (cloud PostgreSQL)
- 🔌 RESTful API architecture
- 📝 Winston for logging

### ☁️ Deployment
- 🚀 Vercel for both frontend and backend hosting
- 🔄 CI/CD with GitHub integration
- 🌐 Custom domain configuration

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher recommended)
- Neon PostgreSQL database (already set up)

### Database Setup
The application is configured to use a Neon PostgreSQL database. The connection details are already set up in the backend `.env` file.

### Installation

1. Clone this repository
2. Install dependencies for both frontend and backend:
```
npm run install:all
```

Or install them separately:
```
# Install root dependencies
npm install

# Install backend dependencies
cd tutam9_backend
npm install

# Install frontend dependencies
cd ../tutam9_frontend
npm install
```

3. The database connection is already configured with Neon PostgreSQL credentials in the `.env` file.

### Running the Application

To run both frontend and backend concurrently:
```
npm run dev
```

To run them separately:
```
# Run backend
npm run start:backend

# Run frontend in a different terminal
npm run start:frontend
```

- Frontend will be available at: http://localhost:5173
- Backend API will be available at: http://localhost:5000

## 🌐 Live Deployment

The application is deployed and accessible online:

- 🌟 **Frontend**: [https://tutam9-frontend.vercel.app](https://tutam9-frontend.vercel.app)
- 🔌 **Backend API**: [https://tutam-sbd-9-back.vercel.app](https://tutam-sbd-9-back.vercel.app)

## 👨‍🎓 Student Information

- **Name**: Fathan Yazid Satriani
- **NPM**: 2306250560
- **Course**: Database Systems Practicum (SBD9)
- **Assignment**: TUTAM (Additional Module)

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

## Project Structure

```
tutam9_todo_app/
│
├── tutam9_backend/           # Backend Express application
│   ├── routes/               # API route definitions
│   │   └── todos.js          # Todo routes
│   ├── db.js                 # Database connection and initialization
│   ├── server.js             # Main server entry point
│   └── .env                  # Environment variables
│
├── tutam9_frontend/          # Frontend React application
│   ├── public/               # Public assets
│   └── src/
│       ├── assets/           # Static assets
│       ├── components/       # React components
│       │   ├── Layout.jsx    # Main layout with navigation
│       │   ├── TodoForm.jsx  # Form for creating todos
│       │   ├── TodoItem.jsx  # Individual todo item
│       │   └── TodoList.jsx  # List of todos
│       ├── pages/            # Page components
│       │   ├── HomePage.jsx  # Main todo list page
│       │   └── AboutPage.jsx # About page
│       ├── services/         # API service functions
│       │   └── todoService.js # Todo API client
│       ├── App.jsx           # Main app component with routing
│       └── main.jsx          # Application entry point
│
├── package.json              # Root package.json for running both apps
└── README.md                 # This documentation
```

## Application Usage

1. **Adding a New Todo**:
   - Fill in the title (required) and description (optional) in the form at the top of the home page
   - Click "Add Todo"

2. **Completing a Todo**:
   - Click the checkbox next to a todo to mark it as complete/incomplete

3. **Deleting a Todo**:
   - Hover over a todo and click the trash icon on the right to delete it

4. **Navigating Pages**:
   - Use the navigation links in the header to switch between Home and About pages
