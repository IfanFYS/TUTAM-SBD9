import { useEffect } from 'react';

const useKeyboardShortcut = (keyCombo, callback, deps = []) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      let shouldTrigger = false;
      
      if (typeof keyCombo === 'string') {
        shouldTrigger = event.key === keyCombo;
      } else if (Array.isArray(keyCombo)) {
        // Format: [key, ctrlKey, shiftKey, altKey, metaKey]
        const [key, ctrlKey = false, shiftKey = false, altKey = false, metaKey = false] = keyCombo;
        shouldTrigger = 
          event.key.toLowerCase() === key.toLowerCase() &&
          event.ctrlKey === ctrlKey &&
          event.shiftKey === shiftKey &&
          event.altKey === altKey &&
          event.metaKey === metaKey;
      }
      
      if (shouldTrigger) {
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyCombo, callback, ...deps]);
};

export default useKeyboardShortcut;
