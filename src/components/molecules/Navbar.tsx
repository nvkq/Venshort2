import React from 'react';
import Logo from '../atoms/Logo';
import NavLink from '../atoms/NavLink';
import ThemeToggle from '../atoms/ThemeToggle';

/**
 * The main navigation bar component for the application.
 * 
 * @returns {JSX.Element} The navbar component.
 */
const Navbar: React.FC = () => {
  return (
    <nav className="bg-[var(--bg1)] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <Logo 
              src="/src/assets/images/logo-nav-oneko-padding.png" 
              alt="VenSHORT Home" 
              className="h-8 mr-2" 
            />
          </NavLink>
        </div>
        
        <div className="flex items-center space-x-6">
          <NavLink to="/plugins" className="text-lg">
            الإضافات ⚙️
          </NavLink>
          
          <a 
            href="https://github.com/Vendicated/Vencord" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[var(--accentPurple)] text-white px-3 py-1 rounded-md hover:bg-[var(--accentLavender)] transition-colors duration-200"
          >
            تنزيل Vencord الرسمي
          </a>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
