const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const logger = require('../logger');

// Get all notes
router.get('/', async (req, res) => {
  try {
    logger.info('Fetching all notes');
    const result = await pool.query(
      'SELECT * FROM notes ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    logger.error(`Error fetching notes: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching note with ID: ${id}`);
    
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      logger.warn(`Note with ID ${id} not found`);
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    logger.error(`Error fetching note ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    logger.info('Creating new note:', { title });
    
    const result = await pool.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content || '']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error(`Error creating note: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    logger.info(`Updating note with ID: ${id}`);
    
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, content || '', id]
    );
    
    if (result.rows.length === 0) {
      logger.warn(`Note with ID ${id} not found for update`);
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    logger.error(`Error updating note ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Deleting note with ID: ${id}`);
    
    const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      logger.warn(`Note with ID ${id} not found for deletion`);
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully', note: result.rows[0] });
  } catch (error) {
    logger.error(`Error deleting note ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
