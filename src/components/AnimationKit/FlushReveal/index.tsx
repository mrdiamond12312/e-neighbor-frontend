import classNames from 'classnames';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import React from 'react';

import { FLUSH_CONTAINER_VARIANT, FLUSH_POINTER_VARIANT } from './helpers/variants';

export interface IFlushRevealProps extends AnimationProps {
  rootClassName?: string;
  pointerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
  keyId?: string | number;
  index?: number;
}

const FlushReveal: React.FC<IFlushRevealProps> = ({
  children,
  rootClassName,
  contentClassName,
  pointerClassName,
  index,
  mode = 'wait',
  keyId,
}) => {
  const rootClassNames = classNames('w-fit relative overflow-hidden', rootClassName);
  const pointerClassNames = classNames(
    'absolute w-full h-full bg-teal-4 z-10 top-0 left-0',
    pointerClassName,
  );
  return (
    <AnimatePresence mode={mode}>
      <div className={rootClassNames}>
        <motion.div
          custom={index}
          animate="visible"
          initial="hidden"
          exit="hidden"
          key={keyId}
          className={contentClassName}
          variants={FLUSH_CONTAINER_VARIANT}
        >
          {children}
        </motion.div>
        <motion.div
          className={pointerClassNames}
          custom={index}
          initial="visible"
          animate="hidden"
          variants={FLUSH_POINTER_VARIANT}
        />
      </div>
    </AnimatePresence>
  );
};

export default FlushReveal;
