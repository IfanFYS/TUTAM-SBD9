import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import ThemeToggle from './ui/ThemeToggle';
import KeyboardShortcuts from './KeyboardShortcuts';
import useKeyboardShortcut from '../hooks/useKeyboardShortcut';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Page transition effect
  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => setPageTransition(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Keyboard shortcuts
  useKeyboardShortcut(['.', true], () => {
    toggleTheme();
  });
  
  useKeyboardShortcut(['/', true], () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });
  // Navigation keyboard shortcuts removed as requested
    return (
    <div className="min-h-screen w-full flex flex-col bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300 overflow-x-hidden">      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-md shadow-md' 
          : 'py-3 bg-white dark:bg-secondary-800'
      }`}>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-7 w-7" />
            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">
              TUTAM SBD9 Ifan
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>                <NavLink 
                  to="/tasks" 
                  className={({ isActive }) => `
                    transition-all duration-200 font-medium 
                    ${isActive 
                      ? 'text-primary-600 dark:text-primary-400 font-bold' 
                      : 'text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }
                  `}
                >
                  Tasks
                </NavLink>
              </li>              <li>
                <NavLink 
                  to="/notes" 
                  className={({ isActive }) => `
                    transition-all duration-200 font-medium
                    ${isActive 
                      ? 'text-primary-600 dark:text-primary-400 font-bold' 
                      : 'text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }
                  `}
                >
                  Notes
                </NavLink>
              </li>
              <li>                <NavLink 
                  to="/" 
                  className={({ isActive }) => `
                    transition-all duration-200 font-medium
                    ${isActive 
                      ? 'text-primary-600 dark:text-primary-400 font-bold' 
                      : 'text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }
                  `}
                  end
                >
                  About
                </NavLink>
              </li>
            </ul>
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
          <div className="px-4 py-2 space-y-2 bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700">            <NavLink 
              to="/tasks" 
              className={({ isActive }) => `
                block py-2 px-3 rounded-md transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold' 
                  : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/80'
                }
              `}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tasks
            </NavLink>            <NavLink 
              to="/notes" 
              className={({ isActive }) => `
                block py-2 px-3 rounded-md transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold' 
                  : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/80'
                }
              `}
              onClick={() => setMobileMenuOpen(false)}
            >
              Notes
            </NavLink><NavLink 
              to="/" 
              className={({ isActive }) => `
                block py-2 px-3 rounded-md transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold' 
                  : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/80'
                }
              `}
              end
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
          </div>
        </div>
      </nav>
      
      <main className={`flex-grow pt-28 pb-10 px-4 transition-opacity duration-300 ${pageTransition ? 'animate-fade-in' : ''}`}>
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
      
      <footer className="py-6 bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">            <p className="text-secondary-600 dark:text-secondary-400">
              &copy; {new Date().getFullYear()} TUTAM SBD9 Ifan
            </p><div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>      </footer>
      
      <KeyboardShortcuts />
    </div>
  );
};

export default Layout;
