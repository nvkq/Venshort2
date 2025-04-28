import React from 'react';
import ThemeToggle from '../atoms/ThemeToggle';

/**
 * The footer component for the application.
 * 
 * @returns {JSX.Element} The footer component.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg1)] text-[var(--fg1)] py-4 mt-8 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm mb-2 sm:mb-0">
          تم الإنشاء بواسطة Manus | 
          <a 
            href="https://manus.ai/create" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--accentPurple)] hover:underline ml-1"
          >
            أنشئ موقعك الخاص
          </a>
        </p>
        <div className="flex items-center">
          <span className="text-sm mr-2">تبديل المظهر:</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
