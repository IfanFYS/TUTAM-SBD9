import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/Elements';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(todo.completed);
  const checkboxRef = useRef(null);
  
  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggleComplete(todo.id);
  };
  
  // Format the date more nicely
  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`p-5 mb-4 rounded-xl shadow-soft transition-all duration-300
        ${todo.completed 
          ? 'border border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800/30' 
          : 'border border-secondary-200 bg-white dark:bg-secondary-800 dark:border-secondary-700'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="relative mt-1">
            <input 
              ref={checkboxRef}
              type="checkbox" 
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={handleToggle}
              className="peer absolute w-6 h-6 opacity-0 cursor-pointer z-10"
            />
            <div className={`
              w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer
              transition-all duration-300
              ${todo.completed ? 
                'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600' : 
                'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700'
              }
            `}>
              {todo.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
            <div className="ml-4 flex-1">
            <div className="flex items-center flex-wrap gap-2">
              <h3 className={`text-lg font-medium transition-all duration-300
                ${todo.completed ? 'line-through text-secondary-500 dark:text-secondary-400' : 'text-secondary-900 dark:text-white'}`}
              >
                {todo.title}
              </h3>
              
              {todo.priority && (
                <Badge 
                  variant={
                    todo.priority === 'high' ? 'danger' : 
                    todo.priority === 'medium' ? 'warning' : 
                    'primary'
                  }
                  size="sm"
                >
                  {todo.priority === 'high' ? 'High Priority' : 
                   todo.priority === 'medium' ? 'Medium Priority' : 
                   'Low Priority'}
                </Badge>
              )}
            </div>
            
            {todo.description && (
              <p className={`text-sm mt-1 transition-all duration-300
                ${todo.completed ? 'line-through text-secondary-400 dark:text-secondary-500' : 'text-secondary-600 dark:text-secondary-300'}`}
              >
                {todo.description}
              </p>
            )}
            
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-secondary-400 dark:text-secondary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-secondary-400 dark:text-secondary-500">
                {formatDate(todo.created_at)}
              </p>
            </div>
          </div>
        </div>
          <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(todo.id)}
          className={`text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 
            p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200
            border-none bg-transparent
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          aria-label="Delete todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>
    </motion.div>  );
};

export default TodoItem;
