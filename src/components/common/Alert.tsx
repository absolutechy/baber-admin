import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  show: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export default function Alert({
  type,
  message,
  show,
  onClose,
  autoClose = true,
  autoCloseTime = 3000,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, isVisible, onClose]);

  if (!isVisible) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          text: 'text-green-800',
          icon: <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />,
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          icon: <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />,
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />,
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          icon: <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />,
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-800',
          icon: <InformationCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`fixed bottom-4 right-4 z-50 rounded-lg ${styles.bg} p-4 shadow-lg max-w-md`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={() => {
                setIsVisible(false);
                if (onClose) {
                  onClose();
                }
              }}
              className={`inline-flex rounded-md p-1.5 ${styles.bg} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 