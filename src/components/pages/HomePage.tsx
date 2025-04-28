import React from 'react';
import Layout from '../templates/Layout';
import HeroSection from '../organisms/HeroSection';

/**
 * The home page component.
 * 
 * @returns {JSX.Element} The home page component.
 */
const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      {/* Add other sections for the home page if needed */}
    </Layout>
  );
};

export default HomePage;
