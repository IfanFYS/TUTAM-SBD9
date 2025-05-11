const { Pool } = require('pg');
require('dotenv').config();

let pool;

if (process.env.DATABASE_URL) {
  // Use connection string for production (Vercel)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Use individual parameters for local development
  pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    ssl: process.env.PG_SSL === 'require' ? { rejectUnauthorized: false } : false
  });
}

const createTableQuery = `
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(10) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

// Check if column exists and add it if it doesn't
const ensurePriorityColumnExists = `
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'todos' AND column_name = 'priority'
  ) THEN
    ALTER TABLE todos ADD COLUMN priority VARCHAR(10) DEFAULT 'medium';
  END IF;
END $$;
`;

const initDatabase = async () => {
  try {
    // Connect to PostgreSQL
    await pool.connect();
    console.log('Connected to PostgreSQL database');
    
    // Create todos and notes tables if they don't exist
    await pool.query(createTableQuery);
    console.log('Database tables (todos & notes) created or already exist');
    
    // Check if notes table exists
    const notesTableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'notes'
      );
    `);
    console.log('Notes table exists:', notesTableCheck.rows[0].exists);
    
    // Ensure the priority column exists
    await pool.query(ensurePriorityColumnExists);
    console.log('Priority column checked and added if needed');
    
    return pool;
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

module.exports = { pool, initDatabase };
