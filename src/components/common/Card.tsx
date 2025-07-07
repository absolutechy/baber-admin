import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  footer,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
}: CardProps) {
  const hasHeader = title || subtitle;
  
  return (
    <div className={`bg-white shadow overflow-hidden rounded-lg ${className}`}>
      {hasHeader && (
        <div className={`px-4 py-5 sm:px-6 ${headerClassName}`}>
          {title && <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className={`px-4 py-5 sm:p-6 ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`px-4 py-4 sm:px-6 bg-gray-50 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
} 