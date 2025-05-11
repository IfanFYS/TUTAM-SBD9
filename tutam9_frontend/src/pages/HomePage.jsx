import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoFilters from '../components/TodoFilters';
import TaskStatistics from '../components/TaskStatistics';
import { getTodos, createTodo, deleteTodo, toggleTodoCompletion, searchTodos } from '../services/todoService';

const HomePage = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('newest');
  const [searchDebounceTimeout, setSearchDebounceTimeout] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout);
    }

    if (searchTerm) {
      const timeout = setTimeout(() => {
        searchForTodos(searchTerm);
      }, 500);
      setSearchDebounceTimeout(timeout);
    } else {
      fetchTodos();
    }
    
    return () => {
      if (searchDebounceTimeout) {
        clearTimeout(searchDebounceTimeout);
      }
    };
  }, [searchTerm]);  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setAllTodos(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please try again later.');
      // Show error toast
      toast.error('Failed to load todos. Please try again later.');
      // Use empty array for todos when there's an error
      setAllTodos([]);
    } finally {
      setLoading(false);
    }
  };
  
  const searchForTodos = async (term) => {
    try {
      setLoading(true);
      // For simplicity we'll filter in the frontend, normally this would be a backend search
      const data = await getTodos();
      const filtered = data.filter(todo => 
        todo.title.toLowerCase().includes(term.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(term.toLowerCase()))
      );
      setAllTodos(filtered);
      setError(null);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setAllTodos([newTodo, ...allTodos]);
      toast.success('Task added successfully!');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      toast.error('Failed to add task. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setAllTodos(allTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };
  const handleToggleComplete = async (id) => {
    try {
      const updatedTodo = await toggleTodoCompletion(id);
      setAllTodos(allTodos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      toast.error('Failed to update task status. Please try again.');
      console.error('Error toggling todo completion:', err);
    }
  };const [priorityFilter, setPriorityFilter] = useState('all');

  // Apply filters and sorting
  const filteredAndSortedTodos = useMemo(() => {
    // First apply filter
    let result = [...allTodos];
    
    // Apply status filter
    if (filterType === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filterType === 'completed') {
      result = result.filter(todo => todo.completed);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(todo => todo.priority === priorityFilter);
    }
    
    // Then apply sorting
    switch (sortType) {
      case 'newest':
        return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'oldest':
        return result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'a-z':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return result;
    }
  }, [allTodos, filterType, priorityFilter, sortType]);

  const handleFilterChange = (filters) => {
    setFilterType(filters.status);
    setPriorityFilter(filters.priority);
  };

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  const handleSortChange = (sort) => {
    setSortType(sort);
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 pb-10 mt-4"
    >
      <div className="flex items-center justify-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary-600 to-accent-500 text-white py-2 px-6 rounded-full inline-flex items-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h1 className="text-xl font-bold">Task Master</h1>
        </motion.div>
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6 border border-red-200 dark:border-red-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}
        <TodoForm onAddTodo={handleAddTodo} />
      
      {allTodos.length > 0 && (
        <TaskStatistics todos={allTodos} />
      )}
      
      <TodoFilters 
        onFilterChange={handleFilterChange} 
        onSearchChange={handleSearchChange} 
        onSortChange={handleSortChange} 
      />
      
      {loading ? (
        <motion.div 
          className="flex flex-col items-center justify-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-secondary-200 dark:border-secondary-700 border-solid rounded-full"></div>
            <div className="w-16 h-16 border-4 border-t-primary-600 dark:border-t-primary-400 border-solid rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">Loading tasks...</p>
        </motion.div>
      ) : (
        <>
          {searchTerm && filteredAndSortedTodos.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-secondary-600 dark:text-secondary-400">No results found for "{searchTerm}"</p>
            </motion.div>
          )}
            <TodoList 
            todos={filteredAndSortedTodos} 
            onDeleteTodo={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
            loading={loading}
            error={error}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-sm text-secondary-500 dark:text-secondary-400"
          >
            {filteredAndSortedTodos.length} {filteredAndSortedTodos.length === 1 ? 'task' : 'tasks'} • 
            {allTodos.filter(todo => todo.completed).length} completed
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default HomePage;
