import classNames from 'classnames';
import React, { Fragment } from 'react';

export type TLogo = {
  logoText?: string;
  imgClassName?: string;
  logoTextClassName?: string;
  mode?: 'teal' | 'neutral';
};

const Logo: React.FC<TLogo> = ({ logoText, imgClassName, logoTextClassName, mode = 'teal' }) => {
  const combinedImgClassName = classNames('h-10', imgClassName);
  const combinedLogoTextClassName = classNames(
    'text-heading-4 text-teal-2 hidden sm:block',
    logoTextClassName,
  );

  const chosenLogo = classNames({
    '/teal-favicon.png': mode === 'teal',
    '/favicon.png': mode === 'neutral',
  });
  return (
    <Fragment>
      <img src={chosenLogo} className={combinedImgClassName} />
      <span className={combinedLogoTextClassName}>{logoText ?? 'E-Neighbor'}</span>
    </Fragment>
  );
};

export default Logo;
