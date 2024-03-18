import classNames from 'classnames';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import React from 'react';

import { FADE_IN_VARIANT } from './helpers/variants';

export interface IFadeInProps extends AnimationProps {
  children: React.ReactNode;
  index?: number;
  direction: 'top' | 'bottom' | 'left' | 'right';
  keyId?: string | number;
  mode?: 'wait' | 'sync' | 'popLayout';
  className?: string;
}

const FadeIn: React.FC<IFadeInProps> = ({
  children,
  direction,
  index,
  keyId,
  className,
  mode = 'popLayout',
}) => {
  const rootClassName = classNames('w-fit', className);
  return (
    <AnimatePresence mode={mode}>
      <motion.div
        custom={{ index, direction }}
        animate="visible"
        initial="hidden"
        exit={{ opacity: 0 }}
        key={keyId}
        variants={FADE_IN_VARIANT}
        className={rootClassName}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeIn;
