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

// Test the connection when the app starts
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = pool;
