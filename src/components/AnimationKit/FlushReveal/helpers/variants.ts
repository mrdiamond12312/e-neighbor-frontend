import { Variants } from 'framer-motion';

export const FLUSH_CONTAINER_VARIANT: Variants = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25 + index * 0.05,
    },
  }),
  exit: {
    opacity: 0,
    y: 75,
  },
};

export const FLUSH_POINTER_VARIANT: Variants = {
  visible: {
    left: 0,
  },
  hidden: (index = 0) => ({
    left: '100%',
    transition: {
      duration: 0.5,
      delay: 0 + index * 0.05,
      ease: 'easeIn',
    },
  }),
  exit: (index = 0) => ({
    left: '100%',
    transition: {
      duration: 0.5,
      delay: 0 + index * 0.05,
      ease: 'easeIn',
    },
  }),
};
