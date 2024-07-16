/**
 * A React component that wraps its children in a Framer Motion animation.
 * The component uses the `LazyMotion` and `domAnimation` features to lazily load the Framer Motion library and use the DOM-based animation driver.
 * The component applies a fade-in and slide-up animation to its children, with a duration of 0.75 seconds and an "easeInOut" timing function.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be wrapped in the animation.
 * @returns {React.ReactElement} - The animated content wrapped in a Framer Motion `m.div` element.
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