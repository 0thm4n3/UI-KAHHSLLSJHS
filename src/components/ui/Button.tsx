import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white shadow-sm',
    outline: 'border border-gray-600 text-gray-300 hover:bg-gray-800',
    danger: 'bg-red-700 hover:bg-red-800 text-white shadow-sm',
    ghost: 'text-gray-300 hover:bg-gray-800 hover:text-white',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Icon spacing
  const iconSpacing = icon ? 'space-x-2' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? disabledClasses : ''}
        ${widthClasses}
        ${iconSpacing}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;