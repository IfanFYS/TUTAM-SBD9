import { useState } from 'react';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  icon = null,
  disabled = false
}) => {
  const baseStyles = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg dark:bg-primary-700 dark:hover:bg-primary-800",
    secondary: "bg-secondary-200 hover:bg-secondary-300 text-secondary-800 dark:bg-secondary-700 dark:hover:bg-secondary-600 dark:text-white",
    accent: "bg-accent-500 hover:bg-accent-600 text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-secondary-800",
    ghost: "bg-transparent hover:bg-secondary-100 text-secondary-800 dark:hover:bg-secondary-800 dark:text-secondary-200",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
  };
  
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', padding = 'p-6', hover = false }) => {
  const hoverEffect = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
  
  return (
    <div className={`bg-white dark:bg-secondary-800 rounded-xl shadow-soft ${padding} ${hoverEffect} ${className}`}>
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = 'default', size = 'sm' }) => {
  const variantStyles = {
    default: "bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200",
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  
  const sizeStyles = {
    sm: "py-1 px-2 text-xs",
    md: "py-1.5 px-2.5 text-sm",
    lg: "py-2 px-3 text-base"
  };
  
  return (
    <span className={`inline-block rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};

export const Input = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  label, 
  icon = null,
  className = '',
  error = null,
  onFocus = () => {},
  onBlur = () => {}
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label}
        </label>
      )}
      <div className={`
        relative rounded-lg overflow-hidden transition-all duration-200 shadow-sm
        ${isFocused ? 'ring-2 ring-primary-500' : ''}
        ${error ? 'border-red-500' : 'border border-secondary-300 dark:border-secondary-600'}
      `}>
        <div className="flex">
          {icon && (
            <div className="flex items-center justify-center px-3 bg-secondary-50 dark:bg-secondary-700 text-secondary-500">
              {icon}
            </div>
          )}
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`
              w-full py-3 px-4 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white 
              placeholder-secondary-400 dark:placeholder-secondary-500 outline-none
              ${className}
            `}
            placeholder={placeholder}
          />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const Textarea = ({
  placeholder,
  value,
  onChange,
  label,
  className = '',
  error = null,
  rows = 3,
  onFocus = () => {},
  onBlur = () => {}
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label}
        </label>
      )}
      <div className={`
        rounded-lg overflow-hidden transition-all duration-200 shadow-sm
        ${isFocused ? 'ring-2 ring-primary-500' : ''}
        ${error ? 'border-red-500' : 'border border-secondary-300 dark:border-secondary-600'}
      `}>
        <textarea
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full py-3 px-4 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white 
            placeholder-secondary-400 dark:placeholder-secondary-500 outline-none resize-none
            ${className}
          `}
          placeholder={placeholder}
          rows={rows}
        ></textarea>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const Select = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  className = "",
  error = null,
  icon = null,
  onFocus = () => {},
  onBlur = () => {}
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label}
        </label>
      )}
      
      <div className={`
        relative rounded-lg overflow-hidden transition-all duration-200 shadow-sm
        ${isFocused ? 'ring-2 ring-primary-500' : ''}
        ${error ? 'border-red-500' : 'border border-secondary-300 dark:border-secondary-600'}
      `}>
        <div className="flex">
          {icon && (
            <div className="flex items-center justify-center px-3 bg-secondary-50 dark:bg-secondary-700 text-secondary-500">
              {icon}
            </div>
          )}
          
          <select
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`
              w-full appearance-none py-3 px-4 bg-white dark:bg-secondary-800 
              text-secondary-900 dark:text-white
              placeholder-secondary-400 dark:placeholder-secondary-500 outline-none
              ${className}
            `}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary-500">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};
