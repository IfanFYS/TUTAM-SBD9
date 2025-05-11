const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    console.log('Fetched todos with priority breakdown:', {
      total: result.rows.length,
      priorities: {
        high: result.rows.filter(todo => todo.priority === 'high').length,
        medium: result.rows.filter(todo => todo.priority === 'medium').length,
        low: result.rows.filter(todo => todo.priority === 'low').length,
      }
    });
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    console.log('Creating todo with priority:', priority);
    
    const result = await pool.query(
      'INSERT INTO todos (title, description, priority) VALUES ($1, $2, $3) RETURNING *',
      [title, description || '', priority || 'medium']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully', todo: result.rows[0] });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle todo completion status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
