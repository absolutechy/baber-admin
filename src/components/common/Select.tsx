import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  name?: string;
  id?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  fullWidth = true,
  size = 'md',
  disabled = false,
  name,
  id,
}: SelectProps) {
  const selectedOption = options.find((option) => option.value === value);

  const hasError = !!error;

  const sizeClasses = {
    sm: 'py-1.5 text-sm',
    md: 'py-2.5 text-sm',
    lg: 'py-3 text-base',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={widthClass}>
      <Listbox value={value} onChange={onChange} disabled={disabled} name={name}>
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-900 mb-1.5">{label}</Listbox.Label>
          )}
          <div className="relative">
            <Listbox.Button
              id={id}
              className={`relative w-full cursor-default rounded-lg bg-white ${sizeClasses[size]} pl-3 pr-10 text-left border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                hasError
                  ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
              } ${disabled ? 'cursor-not-allowed bg-gray-50' : ''}`}
            >
              <span className="block truncate">{selectedOption?.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
            {(error || helperText) && (
              <p 
                className={`mt-1.5 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}
              >
                {error || helperText}
              </p>
            )}
          </div>
        </>
      </Listbox>
    </div>
  );
} 