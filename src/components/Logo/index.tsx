import classNames from 'classnames';
import React, { Fragment } from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';

export type TLogo = {
  logoText?: string;
  imgClassName?: string;
  logoTextClassName?: string;
  mode?: 'teal' | 'neutral';
  collapsedLogoText?: boolean;
};

const Logo: React.FC<TLogo> = ({
  logoText,
  imgClassName,
  logoTextClassName,
  collapsedLogoText = false,
  mode = 'teal',
}) => {
  const combinedImgClassName = classNames('h-10', imgClassName);
  const combinedLogoTextClassName = classNames(
    'text-heading-4 text-teal-2 hidden sm:block',
    logoTextClassName,
    {
      '!text-teal-2': mode === 'teal',
      '!text-neutral-1 ': mode === 'neutral',
    },
  );

  const chosenLogo = classNames({
    '/teal-favicon.png': mode === 'teal',
    '/favicon.png': mode === 'neutral',
  });
  return (
    <Fragment>
      <img src={chosenLogo} className={combinedImgClassName} />
      {!collapsedLogoText && (
        <FadeIn direction="left">
          <span className={combinedLogoTextClassName}>{logoText ?? 'E-Neighbor'}</span>
        </FadeIn>
      )}
    </Fragment>
  );
};

export default Logo;
