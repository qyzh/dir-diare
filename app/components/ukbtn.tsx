import React from 'react';

interface UKButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'error' ;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const UKButton: React.FC<UKButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
  disabled = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 dark:border-teal-600 dark:bg-teal-800 dark:hover:bg-teal-600',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-neutral-800',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800',
    error: 'bg-rose-600 text-gray-900 hover:bg-gray-100 dark:border-rose-600  dark:bg-rose-800 dark:text-rose-300 dark:hover:border-rose-700 dark:hover:bg-rose-950'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default UKButton;
