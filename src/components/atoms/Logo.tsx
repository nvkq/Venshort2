import React from 'react';

type LogoProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * A simple component to display a logo image.
 *
 * @param {string} src - The source URL of the logo image.
 * @param {string} alt - The alt text for the logo image.
 * @param {string} [className] - Optional additional CSS classes.
 * @returns {JSX.Element} The logo image component.
 */
const Logo: React.FC<LogoProps> = ({ src, alt, className = '' }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`h-8 w-auto ${className}`} // Adjust height as needed
    />
  );
};

export default Logo;
