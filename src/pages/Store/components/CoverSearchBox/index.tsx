import { useIntl } from '@umijs/max';
import { Image } from 'antd/lib';
import classNames from 'classnames';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import { SearchBar } from '@/components/SearchBar';

export type TCoverSearchBoxProps = {
  onPressEnter: React.KeyboardEventHandler<HTMLInputElement>;
  category: string;
};

export const CoverSearchBox: React.FC<TCoverSearchBoxProps> = ({ onPressEnter, category }) => {
  const { formatMessage } = useIntl();
  const coverImage = classNames({
    '/store-cover/furniture.png': category === 'furnitures',
    '/store-cover/vehicle.png': category === 'vehicles',
  });

  return (
    <FadeIn direction="right" className="w-full" keyId="store-searchbox">
      <div className="h-96 flex items-center justify-center relative overflow-visible">
        <FadeIn
          direction="right"
          keyId={coverImage}
          className="h-96 overflow-hidden flex items-center justify-center absolute left-0 top-0 w-full"
        >
          <Image
            rootClassName="h-96 overflow-hidden flex items-center justify-center absolute left-0 top-0"
            src={coverImage}
            preview={false}
          />
        </FadeIn>
        <div className="bg-neutral-1/80 backdrop-blur-sm m-auto p-4 rounded max-w-[70%] flex flex-col items-center justify-center gap-2">
          <FadeIn direction="right" keyId={`store.cover.${category}`}>
            <h1 className="m-0 text-heading-1 font-sans text-center">
              {formatMessage({ id: `store.cover.${category}`, defaultMessage: 'Title' })}
            </h1>
          </FadeIn>

          <FadeIn
            className="w-full max-w-[65%] p-4 flex flex-col gap-4"
            direction="right"
            keyId={'store.cover.para'}
          >
            <span className="text-body-1-regular text-center">
              {formatMessage({
                id: 'store.cover.para',
                defaultMessage:
                  'Discover a spectrum of rentals - from everyday comfort to high-end elegance, we have your style covered',
              })}
            </span>
            <SearchBar
              onPressEnter={onPressEnter}
              placeholder={formatMessage({
                id: 'store.cover.search.placeholder',
                defaultMessage: 'Search',
              })}
            ></SearchBar>
          </FadeIn>
        </div>
      </div>
    </FadeIn>
  );
};
