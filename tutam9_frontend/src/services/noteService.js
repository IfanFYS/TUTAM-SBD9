import axios from 'axios';

// Make sure we're pointing to the notes API endpoint
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/notes';

export const getNotes = async () => {
  try {
    console.log('Fetching notes from:', API_URL);
    const response = await axios.get(API_URL);
    console.log('Notes API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note ${id}:`, error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, note);
    return response.data;
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw error;
  }
};

const noteService = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};

export default noteService;
