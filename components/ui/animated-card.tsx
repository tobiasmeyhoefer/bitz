/**
 * A React component that renders an animated card with a delay.
 *
 * @param {Object} props - The component props.
 * @param {number} props.delay - The delay in seconds before the card animation starts.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 * @param {string} [props.className] - An optional CSS class name to apply to the card.
 * @returns {React.ReactElement} - The animated card component.
 */

'use client';

import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import React from 'react';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

interface AnimatedCardProps {
  delay: number;
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ delay, children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        transition={{ delay, duration: 0.5 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default AnimatedCard;
