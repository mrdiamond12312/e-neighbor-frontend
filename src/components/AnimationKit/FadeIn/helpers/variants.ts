import classNames from 'classnames';
import { Variants } from 'framer-motion';

export const FADE_IN_VARIANT: Variants = {
  hidden: ({ direction = 'left' }) => ({
    opacity: 0,
    x: parseInt(
      classNames({
        '-75': direction === 'left',
        '75': direction === 'right',
        '0': direction !== 'left' && direction !== 'right',
      }),
    ),
    y: parseInt(
      classNames({
        '-75': direction === 'top',
        '75': direction === 'bottom',
        '0': direction !== 'top' && direction !== 'bottom',
      }),
    ),
  }),
  exit: ({ exitDirection = 'left' }) => ({
    opacity: 0,
    x: parseInt(
      classNames({
        '-75': exitDirection === 'left',
        '75': exitDirection === 'right',
        '0': exitDirection !== 'left' && exitDirection !== 'right',
      }),
    ),
    y: parseInt(
      classNames({
        '-75': exitDirection === 'top',
        '75': exitDirection === 'bottom',
        '0': exitDirection !== 'top' && exitDirection !== 'bottom',
      }),
    ),
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
