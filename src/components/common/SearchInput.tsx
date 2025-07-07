import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  placeholder?: string;
  fullWidth?: boolean;
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  placeholder = 'Search',
  fullWidth = true,
  className = '',
  value,
  onChange,
  onSearch,
  ...props
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.currentTarget.value);
    }
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`relative ${widthClass}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
} 