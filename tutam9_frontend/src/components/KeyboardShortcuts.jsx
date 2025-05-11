import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useKeyboardShortcut from '../hooks/useKeyboardShortcut';

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleShortcutsModal = () => {
    setIsOpen(!isOpen);
  };
  
  useKeyboardShortcut(['?', true], toggleShortcutsModal);
  useKeyboardShortcut('Escape', () => {
    if (isOpen) setIsOpen(false);
  });
  const shortcuts = [
    { keys: ['Ctrl', '?'], description: 'Show keyboard shortcuts' },
    { keys: ['Ctrl', 'N'], description: 'Create new task or note' },
    { keys: ['Ctrl', '/'], description: 'Focus search box' },
    { keys: ['Ctrl', '.'], description: 'Toggle dark mode' },
    { keys: ['Escape'], description: 'Close modal / Cancel editing' }
  ];
  
  return (
    <>
      <button 
        onClick={toggleShortcutsModal}
        className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors duration-200 dark:bg-primary-700 dark:hover:bg-primary-600"
        aria-label="Show keyboard shortcuts"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary-800/50 dark:bg-secondary-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={toggleShortcutsModal}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-secondary-800 dark:text-white">Keyboard Shortcuts</h2>
                <button 
                  onClick={toggleShortcutsModal}
                  className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span 
                          key={keyIndex} 
                          className="inline-block bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 px-2 py-1 rounded text-sm font-mono"
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                    <span className="text-secondary-600 dark:text-secondary-400">{shortcut.description}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-xs text-secondary-500 dark:text-secondary-400 text-center">
                Press <span className="font-mono bg-secondary-100 dark:bg-secondary-700 px-1 py-0.5 rounded">Esc</span> to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
