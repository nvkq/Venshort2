import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ContentSecurityPolicy from './components/atoms/ContentSecurityPolicy';
import './index.css';

// استخدام التحميل البطيء للصفحات
const HomePage = lazy(() => import('./components/pages/HomePage'));
const PluginsPage = lazy(() => import('./components/pages/PluginsPage'));

// مكون التحميل
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen bg-[var(--bg0)]">
    <div className="text-[var(--accentPurple)] text-xl">جاري التحميل...</div>
  </div>
);

/**
 * The main application component.
 * Sets up routing, theme provider, and global styles.
 * 
 * @returns {JSX.Element} The main application component.
 */
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ContentSecurityPolicy>
        <HashRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/plugins" element={<PluginsPage />} />
              {/* Add other routes as needed */}
            </Routes>
          </Suspense>
        </HashRouter>
      </ContentSecurityPolicy>
    </HelmetProvider>
  );
};

export default App;
