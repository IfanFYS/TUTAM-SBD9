import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Input, Textarea, Button, Select } from './ui/Elements';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium'); // Set default priority
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);
  
  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }
    
    setError(null);
    onAddTodo({ title, description, priority });
      // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium'); // Reset to default medium priority
    setIsExpanded(false);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-soft mb-8 border border-secondary-100 dark:border-secondary-700"
    >
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-secondary-800 dark:text-secondary-200">Create New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="What's on your todo list?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            onFocus={() => setIsExpanded(true)}
            error={error}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          />
        </div>
        
        <AnimatePresence>          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <Textarea
                placeholder="Add some details... (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mb-4"
              />
              
              <Select
                label="Priority Level"
                placeholder="Select priority level"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                options={priorityOptions}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex justify-between">
          {isExpanded && (
            <Button 
              variant="ghost"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
          )}
          
          <Button 
            variant={!title.trim() ? "secondary" : "primary"}
            disabled={!title.trim()}
            className={!title.trim() ? "opacity-50 cursor-not-allowed" : ""}
            type="submit"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            Add Task
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TodoForm;
