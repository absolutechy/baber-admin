import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  primaryActionDisabled?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryActionLabel = 'Save',
  secondaryActionLabel = 'Cancel',
  onPrimaryAction,
  onSecondaryAction,
  size = 'md',
  primaryActionDisabled = false,
}: ModalProps) {
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      onClose();
    }
  };

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      onClose();
    }
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  // Prevent scrolling of the background content when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Get modal width based on size
  const getModalWidth = () => {
    switch (size) {
      case 'sm':
        return 'sm:max-w-sm';
      case 'md':
        return 'sm:max-w-lg';
      case 'lg':
        return 'sm:max-w-2xl';
      case 'xl':
        return 'sm:max-w-4xl';
      default:
        return 'sm:max-w-lg';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 opacity-50 transition-opacity z-0" 
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className={`relative z-50 inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle ${getModalWidth()} w-full z-50`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {title}
                </h3>
                <div className="mt-4">
                  {children}
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {onPrimaryAction && (
              <button
                type="button"
                disabled={primaryActionDisabled}
                onClick={handlePrimaryAction}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm
                  ${primaryActionDisabled 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  }`}
              >
                {primaryActionLabel}
              </button>
            )}
            <button
              type="button"
              onClick={handleSecondaryAction}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {secondaryActionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 