/**
 * A React component that renders an animated button.
 *
 * @param onClick - A function to be called when the button is clicked.
 * @param disabled - An optional boolean indicating whether the button should be disabled.
 * @param children - The content to be rendered inside the button.
 * @param className - An optional CSS class name to be applied to the button.
 */

'use client';

import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import React from 'react';

interface AnimatedButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;

}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50  },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick, disabled, children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        ref={ref}
        className={className}
        onClick={onClick}
        disabled={disabled}
        initial="hidden"
        animate={controls}
        variants={buttonVariants}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </m.button>
    </LazyMotion>
  );
};

export default AnimatedButton;