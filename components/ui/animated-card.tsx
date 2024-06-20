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
