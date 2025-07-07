import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  fullWidth = true,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  
  const baseInputClasses = 'block border rounded-md shadow-sm focus:outline-none sm:text-sm';
  const stateClasses = hasError
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500';
  
  const widthClass = fullWidth ? 'w-full' : '';
  const paddingClasses = `py-2 ${leftIcon ? 'pl-10' : 'pl-3'} ${rightIcon ? 'pr-10' : 'pr-3'}`;
  
  const combinedClasses = `${baseInputClasses} ${stateClasses} ${widthClass} ${paddingClasses} ${className}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={combinedClasses}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p 
          className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}
          id={hasError ? `${inputId}-error` : undefined}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
} 