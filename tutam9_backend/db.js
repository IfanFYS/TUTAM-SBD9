const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
  // For production (Vercel)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  console.log('Using DATABASE_URL for connection');
} else {
  // For local development
  pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT || 5432,
    ssl: process.env.PG_SSL === 'require' ? { rejectUnauthorized: false } : undefined
  });
  console.log('Using individual connection parameters');
}

// For serverless environments like Vercel, we shouldn't test the connection on startup
// Instead, we'll test it when needed
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected successfully at:', res.rows[0].now);
    return true;
  } catch (err) {
    console.error('Database connection error:', err.message);
    return false;
  }
};

// Only test the connection when not in production to avoid issues with cold starts
if (process.env.NODE_ENV !== 'production') {
  testConnection();
}

module.exports = { 
  pool, 
  testConnection 
};
