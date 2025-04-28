import React from 'react';
import { motion } from 'framer-motion';

type AnimatedContainerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * A container component that animates its children on mount.
 *
 * @param {React.ReactNode} children - The content to animate.
 * @param {string} [className] - Optional additional CSS classes.
 * @param {number} [delay=0] - Optional delay before the animation starts.
 * @returns {JSX.Element} The animated container component.
 */
const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
