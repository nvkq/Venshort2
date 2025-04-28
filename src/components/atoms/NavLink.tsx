import React from 'react';
import { Link } from 'react-router-dom';

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A component for navigation links using React Router.
 *
 * @param {string} to - The path to link to.
 * @param {React.ReactNode} children - The content of the link.
 * @param {string} [className] - Optional additional CSS classes.
 * @returns {JSX.Element} The navigation link component.
 */
const NavLink: React.FC<NavLinkProps> = ({ to, children, className = '' }) => {
  return (
    <Link 
      to={to} 
      className={`text-[var(--fg1)] hover:text-[var(--accentPurple)] transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
