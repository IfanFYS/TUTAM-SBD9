import axios from 'axios';

// Use the same environment variable approach as noteService
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/todos';

// Configure axios with defaults
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with a status code outside of 2xx
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - no response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request configuration error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getTodos = async (params = {}) => {
  try {
    const response = await api.get('/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const searchTodos = async (searchTerm) => {
  try {
    const response = await api.get(`/search`, { params: { q: searchTerm } });
    return response.data;
  } catch (error) {
    console.error('Error searching todos:', error);
    throw error;
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/', todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const toggleTodoCompletion = async (id) => {
  try {
    const response = await api.patch(`/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling todo completion:', error);
    throw error;
  }
};
