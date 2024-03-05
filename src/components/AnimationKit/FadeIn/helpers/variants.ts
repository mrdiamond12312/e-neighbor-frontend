import classNames from 'classnames';
import { Variants } from 'framer-motion';

export const FADE_IN_VARIANT: Variants = {
  hidden: ({ direction = 'left' }) => ({
    opacity: 0,
    x: classNames({
      '-75': direction === 'left',
      '75': direction === 'right',
      0: direction !== 'left' && direction !== 'right',
    }),
    y: classNames({
      '-75': direction === 'top',
      '75': direction === 'bottom',
      0: direction !== 'top' && direction !== 'bottom',
    }),
  }),
  visible: ({ index = 0 }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25 + index * 0.1,
    },
  }),
};
