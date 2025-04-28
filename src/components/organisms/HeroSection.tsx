import React from 'react';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import AnimatedContainer from '../atoms/AnimatedContainer';
import Logo from '../atoms/Logo';
import { Link } from 'react-router-dom';

/**
 * The hero section component for the home page.
 * 
 * @returns {JSX.Element} The hero section component.
 */
const HeroSection: React.FC = () => {
  return (
    <AnimatedContainer className="text-center py-16">
      <Logo 
        src="/src/assets/images/cute-logo.avif" 
        alt="VenSHORT Logo" 
        className="h-24 mx-auto mb-6" 
      />
      <Heading level={1} className="text-[var(--accentPurple)] mb-4">
        مرحباً بك في VenSHORT
      </Heading>
      <p className="text-xl text-[var(--fg1)] mb-8 max-w-2xl mx-auto">
        المكان الأمثل لاستكشاف وتخصيص إضافات Vencord. أنشئ تكوينك المثالي بسهولة وسرعة.
      </p>
      <div className="space-x-4">
        <Link to="/plugins">
          <Button variant="primary" className="px-6 py-3 text-lg">
            استكشف الإضافات ⚙️
          </Button>
        </Link>
        <a 
          href="https://github.com/Vendicated/Vencord" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="px-6 py-3 text-lg">
            تنزيل Vencord الرسمي
          </Button>
        </a>
      </div>
    </AnimatedContainer>
  );
};

export default HeroSection;
