'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimatedFadeInProps = Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'animate' | 'transition'
> & {
  children: ReactNode;
  delay?: number;
  whileHover?: boolean;
  reducedMotion?: 'reduce' | 'respect';
};

export function AnimatedFadeIn({
  children,
  delay = 0,
  whileHover,
  reducedMotion = 'respect',
  ...rest
}: AnimatedFadeInProps) {
  // Determine transition duration based on reduced motion preference
  const reducedMotionValue =
    reducedMotion === 'reduce' ||
    typeof window !== 'undefined' &&
      (window as any).matchMedia('(prefers-reduced-motion: reduce)').matches;

  const transition = {
    duration: reducedMotionValue ? 0 : 0.5,
    delay,
    type: 'spring' as const,
    stiffness: 120,
    damping: 30,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotionValue ? 0 : 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      whileHover={whileHover}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
