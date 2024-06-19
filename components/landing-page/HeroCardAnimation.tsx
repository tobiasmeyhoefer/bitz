'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import React from 'react';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

interface HeroCardAnimationProps {
  delay: number;
  children: React.ReactNode;
  className: string;
}

const HeroCardAnimation: React.FC<HeroCardAnimationProps> = ({ delay, children, className }) => (
  <LazyMotion features={domAnimation}>
    <m.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </m.div>
  </LazyMotion>
);

export default HeroCardAnimation;
