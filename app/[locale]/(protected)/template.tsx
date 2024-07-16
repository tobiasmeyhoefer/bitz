/**
 * A React component that provides a wrapper with Framer Motion animations for its children.
 *
 * The component uses the `LazyMotion` and `domAnimation` features from Framer Motion to
 * lazily load the animation library and apply the `domAnimation` feature set.
 *
 * The component applies a fade-in and slide-up animation to its children, with a
 * duration of 0.75 seconds and an "easeInOut" timing function.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be wrapped and animated.
 * @returns {React.ReactElement} - The animated wrapper component.
 */
"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}