/**
 * A React component that wraps its children in a motion animation using Framer Motion.
 * The component initializes the children with a vertical offset and zero opacity, then animates them to their final position with a smooth easing transition.
 * This component can be used to add a subtle animation effect to the content of a page or section.
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