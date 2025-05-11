# TUTAM SBD9 Ifan - Task and Note Manager

A comprehensive Task and Note Manager application built with React.js (frontend) and Express.js (backend) using Neon PostgreSQL as the database.

## Features

### Tasks Feature
- Create new tasks with title, description and priority
- View all tasks with their creation date and priority
- Filter tasks by status and priority
- Delete tasks
- Mark tasks as completed
- Task statistics with priority breakdown

### Notes Feature
- Create new notes with title and content
- View all notes with search functionality
- Edit existing notes
- Delete notes
- Responsive grid layout

## Tech Stack

### Frontend
- React.js with Vite
- React Router DOM for navigation
- Axios for API requests
- TailwindCSS for styling

### Backend
- Express.js
- Neon PostgreSQL database
- RESTful API

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
