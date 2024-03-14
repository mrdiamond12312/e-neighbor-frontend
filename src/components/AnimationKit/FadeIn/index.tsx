import React from 'react';
import { AnimationProps, motion } from 'framer-motion';
import { FADE_IN_VARIANT } from './helpers/variants';
import classNames from 'classnames';

export interface IFadeInProps extends AnimationProps {
  children: React.ReactNode;
  index?: number;
  direction: 'top' | 'bottom' | 'left' | 'right';
  layoutId?: string;
  className?: string;
}

const FadeIn: React.FC<IFadeInProps> = ({ children, direction, index, layoutId, className }) => {
  const rootClassName = classNames('w-fit', className);
  return (
    <motion.div
      custom={{ index, direction }}
      animate="visible"
      initial="hidden"
      exit="hidden"
      key={layoutId}
      variants={FADE_IN_VARIANT}
      className={rootClassName}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
