import React from 'react';
import DOMPurify from 'dompurify';

type SafeHtmlProps = {
  html: string;
  className?: string;
};

/**
 * Renders HTML content safely after sanitizing it with DOMPurify.
 *
 * @param {string} html - The HTML string to sanitize and render.
 * @param {string} [className] - Optional additional CSS classes for the container.
 * @returns {JSX.Element} A div element with the sanitized HTML content.
 */
const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className = '' }) => {
  // Sanitize the HTML content
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default SafeHtml;
