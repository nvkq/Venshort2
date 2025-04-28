import React from 'react';
import { Helmet } from 'react-helmet-async';

type ContentSecurityPolicyProps = {
  children: React.ReactNode;
};

/**
 * Sets the Content Security Policy (CSP) for the application using Helmet.
 * This helps mitigate cross-site scripting (XSS) and other injection attacks.
 *
 * @param {React.ReactNode} children - The child components to wrap.
 * @returns {JSX.Element} A fragment containing the Helmet component and children.
 */
const ContentSecurityPolicy: React.FC<ContentSecurityPolicyProps> = ({ children }) => {
  // Define your CSP rules here. Adjust as needed for your specific requirements.
  // This is a basic example; you might need stricter rules for production.
  const csp = `
    default-src 'self'; 
    script-src 'self' 'unsafe-inline'; 
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
    img-src 'self' data:; 
    font-src 'self' https://fonts.gstatic.com; 
    connect-src 'self'; 
    object-src 'none'; 
    frame-ancestors 'none'; 
    base-uri 'self'; 
    form-action 'self';
  `.replace(/\s+/g, ' ').trim();

  return (
    <>
      <Helmet>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </Helmet>
      {children}
    </>
  );
};

export default ContentSecurityPolicy;
