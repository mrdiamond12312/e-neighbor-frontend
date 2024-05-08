import classNames from 'classnames';
import { AnimationProps, motion } from 'framer-motion';
import React from 'react';

import { FADE_IN_VARIANT } from './helpers/variants';

export interface IFadeInProps extends AnimationProps {
  children: React.ReactNode;
  index?: number;
  direction: 'top' | 'bottom' | 'left' | 'right' | 'center';
  exitDirection?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  keyId?: string | number;
  mode?: 'wait' | 'sync' | 'popLayout';
  className?: string;
}

const FadeIn: React.FC<IFadeInProps> = ({
  children,
  direction,
  exitDirection,
  index,
  keyId,
  className,
}) => {
  const rootClassName = classNames('w-fit', className);
  return (
    <motion.div
      custom={{ index, direction, exitDirection }}
      animate="visible"
      initial="hidden"
      exit="exit"
      key={keyId}
      variants={FADE_IN_VARIANT}
      className={rootClassName}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
