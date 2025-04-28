import React, { useState, useEffect } from 'react';

type ThemeToggleProps = {
  className?: string;
};

/**
 * A component for toggling between light and dark themes.
 *
 * @param {string} [className] - Optional additional CSS classes.
 * @returns {JSX.Element} The theme toggle component.
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for user preference on initial load
    const userPrefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(userPrefersDark);
    }
  }, []);

  useEffect(() => {
    // Update HTML class and localStorage when theme changes
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`p-2 rounded-full transition-colors ${className}`}
      aria-label={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
    >
      {isDark ? (
        <span className="text-[var(--yellow)]">☀️</span>
      ) : (
        <span className="text-[var(--blue)]">🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;
