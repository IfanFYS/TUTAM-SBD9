import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/Elements';

const FilterButton = ({ active, onClick, children, icon }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm flex items-center transition-all duration-200 border-none ${
        active 
          ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400" 
          : "bg-white text-secondary-600 dark:bg-transparent dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800"
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const TodoFilters = ({ onFilterChange, onSearchChange, onSortChange }) => {
  const [searchValue, setSearchValue] = useState('');  const [activeFilter, setActiveFilter] = useState('all');
  const [activePriorityFilter, setActivePriorityFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange({status: filter, priority: activePriorityFilter});
  };
  
  const handlePriorityFilterClick = (priority) => {
    setActivePriorityFilter(priority);
    onFilterChange({status: activeFilter, priority: priority});
    setShowPriorityOptions(false);
  };

  const handleSortClick = (sort) => {
    setActiveSort(sort);
    onSortChange(sort);
    setShowSortOptions(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-secondary-800 p-4 rounded-xl shadow-soft mb-6 border border-secondary-100 dark:border-secondary-700"
    >
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchValue}
          onChange={handleSearchChange}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={activeFilter === 'all'}
            onClick={() => handleFilterClick('all')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            }
          >
            All
          </FilterButton>
          
          <FilterButton
            active={activeFilter === 'active'}
            onClick={() => handleFilterClick('active')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            Active
          </FilterButton>
          
          <FilterButton
            active={activeFilter === 'completed'}
            onClick={() => handleFilterClick('completed')}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
          >
            Completed
          </FilterButton>
          
          <div className="relative">
            <FilterButton
              active={showPriorityOptions || activePriorityFilter !== 'all'}
              onClick={() => setShowPriorityOptions(!showPriorityOptions)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              }
            >
              {activePriorityFilter === 'all' ? 'Priority' : 
               activePriorityFilter === 'high' ? 'High' : 
               activePriorityFilter === 'medium' ? 'Medium' : 'Low'}
            </FilterButton>
            
            {showPriorityOptions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-0 mt-2 w-40 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 z-10"
              >
                <div className="py-1">
                  <button
                    className={`px-4 py-2 text-sm w-full text-left flex items-center ${
                      activePriorityFilter === 'all' 
                        ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                        : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                    }`}
                    onClick={() => handlePriorityFilterClick('all')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    All Priorities
                  </button>
                  
                  <button
                    className={`px-4 py-2 text-sm w-full text-left flex items-center ${
                      activePriorityFilter === 'high' 
                        ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                        : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                    }`}
                    onClick={() => handlePriorityFilterClick('high')}
                  >
                    <span className="h-3 w-3 mr-2 rounded-full bg-red-500"></span>
                    High
                  </button>
                  
                  <button
                    className={`px-4 py-2 text-sm w-full text-left flex items-center ${
                      activePriorityFilter === 'medium' 
                        ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                        : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                    }`}
                    onClick={() => handlePriorityFilterClick('medium')}
                  >
                    <span className="h-3 w-3 mr-2 rounded-full bg-yellow-500"></span>
                    Medium
                  </button>
                  
                  <button
                    className={`px-4 py-2 text-sm w-full text-left flex items-center ${
                      activePriorityFilter === 'low' 
                        ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                        : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                    }`}
                    onClick={() => handlePriorityFilterClick('low')}
                  >
                    <span className="h-3 w-3 mr-2 rounded-full bg-blue-500"></span>
                    Low
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="relative">
          <FilterButton
            active={showSortOptions}
            onClick={() => setShowSortOptions(!showSortOptions)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            }
          >
            Sort
          </FilterButton>
          
          {showSortOptions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 z-10"
            >
              <div className="py-1">                <button
                  className={`px-4 py-2 text-sm w-full text-left flex items-center border-none ${
                    activeSort === 'newest' 
                      ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                      : 'text-secondary-700 dark:text-secondary-300 bg-white dark:bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-700'
                  }`}
                  onClick={() => handleSortClick('newest')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Newest First
                </button>
                  <button
                  className={`px-4 py-2 text-sm w-full text-left flex items-center border-none ${
                    activeSort === 'oldest' 
                      ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                      : 'text-secondary-700 dark:text-secondary-300 bg-white dark:bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-700'
                  }`}
                  onClick={() => handleSortClick('oldest')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Oldest First
                </button>
                
                <button
                  className={`px-4 py-2 text-sm w-full text-left flex items-center ${
                    activeSort === 'a-z' 
                      ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                      : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                  }`}
                  onClick={() => handleSortClick('a-z')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  A to Z
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TodoFilters;
