const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const { pool, testConnection } = require('./db');

const todosRouter = require('./routes/todos');
const notesRouter = require('./routes/notes');

const app = express();

app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'https://tutam9-frontend.vercel.app', 'https://tutam9-ifan.vercel.app'];
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, true); // Just allow all origins in development
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api/todos', todosRouter);
app.use('/api/notes', notesRouter);

app.get('/api/health', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(), 
      dbStatus: dbConnected ? 'connected' : 'disconnected',
      env: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message,
      timestamp: new Date().toISOString() 
    });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'TUTAM SBD9 Ifan API is running' });
});

app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Only start the server if we're not on Vercel (which uses serverless functions)
// In production on Vercel, the app will be imported as a handler
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === undefined) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

// Export the Express API for Vercel serverless deployment
module.exports = app;