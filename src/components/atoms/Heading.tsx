import React from 'react';

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

/**
 * A component for creating headings with different levels.
 *
 * @param {1|2|3|4|5|6} level - The heading level (h1-h6).
 * @param {React.ReactNode} children - The content of the heading.
 * @param {string} [className] - Optional additional CSS classes.
 * @returns {JSX.Element} The heading component.
 */
const Heading: React.FC<HeadingProps> = ({ level, children, className = '' }) => {
  const baseClasses = 'font-bold text-[var(--fg0)]';
  
  const sizeClasses = {
    1: 'text-4xl mb-6',
    2: 'text-3xl mb-5',
    3: 'text-2xl mb-4',
    4: 'text-xl mb-3',
    5: 'text-lg mb-2',
    6: 'text-base mb-2'
  };
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={`${baseClasses} ${sizeClasses[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
