import React from 'react';
import Navbar from '../molecules/Navbar';
import Footer from '../organisms/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * The main layout component that wraps all pages.
 * Provides consistent structure with navbar and footer.
 *
 * @param {React.ReactNode} children - The page content to display.
 * @returns {JSX.Element} The layout component.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
