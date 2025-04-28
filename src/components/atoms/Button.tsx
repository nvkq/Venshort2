import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
};

/**
 * A reusable button component with primary and secondary variants.
 *
 * @param {React.ReactNode} children - The content of the button
 * @param {Function} [onClick] - Optional click handler
 * @param {'primary' | 'secondary'} [variant='primary'] - Button style variant
 * @param {string} [className] - Additional CSS classes
 * @param {boolean} [disabled] - Whether the button is disabled
 * @returns {JSX.Element} The button component
 */
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantClasses = variant === 'primary' 
    ? 'bg-[var(--accentPurple)] text-white hover:bg-[var(--accentLavender)] focus:ring-[var(--accentLavender)]' 
    : 'bg-[var(--bg2)] text-[var(--fg0)] hover:bg-[var(--bg3)] focus:ring-[var(--grey0)]';
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
