import { useIntl } from '@umijs/max';
import { Image } from 'antd/lib';
import classNames from 'classnames';
import React from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import { SearchBar } from '@/components/SearchBar';

export type TCoverSearchBoxProps = {
  kwValue?: string;
  onPressEnter: React.KeyboardEventHandler<HTMLInputElement>;
  category: string;
};

export const CoverSearchBox: React.FC<TCoverSearchBoxProps> = ({
  onPressEnter,
  category,
  kwValue,
}) => {
  const { formatMessage } = useIntl();
  const coverImage = classNames({
    '/store-cover/furniture.png': category === 'furnitures',
    '/store-cover/vehicle.png': category === 'vehicles',
  });

  return (
    <FadeIn direction="right" exitDirection="right" className="w-full" keyId="store-searchbox">
      <div className="h-72 max-h-96 sm:h-96 flex items-center justify-center relative overflow-visible">
        <FadeIn
          direction="right"
          exitDirection="right"
          keyId={coverImage}
          className="h-full overflow-hidden flex items-center justify-center xs:overflow-hidden"
          mode="wait"
        >
          <Image
            rootClassName="h-full overflow-hidden flex items-center justify-center "
            src={coverImage}
            preview={false}
          />
        </FadeIn>
        <div className="bg-neutral-1/80 backdrop-blur-sm p-4 rounded w-[65%] flex flex-col items-center justify-center gap-2  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FadeIn
            direction="right"
            exitDirection="right"
            className="w-full"
            keyId={`store.cover.${category}`}
            mode="wait"
          >
            <h1 className="m-0 text-heading-1 font-sans text-center">
              {formatMessage({ id: `store.cover.${category}`, defaultMessage: 'Title' })}
            </h1>
          </FadeIn>

          <FadeIn
            className="w-full max-w-[75%] p-4 flex flex-col gap-4"
            direction="right"
            exitDirection="right"
            keyId={'store.cover.para'}
          >
            <span className="text-body-1-regular text-center line-clamp-3 hidden sm:block">
              {formatMessage({
                id: 'store.cover.para',
                defaultMessage:
                  'Discover a spectrum of rentals - from everyday comfort to high-end elegance, we have your style covered',
              })}
            </span>
            <SearchBar
              onPressEnter={(event) => onPressEnter(event)}
              placeholder={formatMessage({
                id: 'store.cover.search.placeholder',
                defaultMessage: 'Search',
              })}
              defaultValue={kwValue}
            />
          </FadeIn>
        </div>
      </div>
    </FadeIn>
  );
};
