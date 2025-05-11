# Todo App Backend

This is the Express.js backend for the Todo List application.

## Features

- RESTful API for managing todos
- Connected to Neon PostgreSQL database
- CORS enabled for frontend communication

## Tech Stack

- Express.js
- PostgreSQL (Neon)
- Node.js

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following content (already configured):
   ```
   PORT=5000
   PG_HOST=ep-gentle-scene-a1m1zme2-pooler.ap-southeast-1.aws.neon.tech
   PG_USER=tutam9_backend_owner
   PG_PASSWORD=npg_KeAd7s2FhBiT
   PG_DATABASE=tutam9_backend
   PG_PORT=5432
   PG_SSL=require
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Database Schema

The application uses a single table:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```
