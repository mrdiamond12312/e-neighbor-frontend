import { CaretDoubleLeft, CaretDoubleRight } from '@phosphor-icons/react';
import { Carousel, Flex } from 'antd/lib';
import { CarouselRef } from 'antd/lib/carousel';
import React, { createRef } from 'react';

import { OverallOrderStatistic } from '@/pages/lessor/dashboard/components/OverallOrderStatistic';
import { OverallProductStatistic } from '@/pages/lessor/dashboard/components/OverallProductStatistic';

export type TOverallStatisticProps = {
  data?: API.TOverallStatistic;
  isLoading: boolean;
};

export const OverallStatistic: React.FC<TOverallStatisticProps> = ({ data, isLoading }) => {
  const carouselRef = createRef<CarouselRef>();
  return (
    <Flex className="flex-col w-full relative">
      <Flex className="flex-row justify-between items-center absolute w-full top-4 z-10">
        <CaretDoubleLeft
          size={32}
          className="fill-teal-1 cursor-pointer"
          weight="duotone"
          onClick={() => carouselRef.current?.prev()}
        />
        <CaretDoubleRight
          size={32}
          className="fill-teal-1 cursor-pointer"
          weight="duotone"
          onClick={() => carouselRef.current?.next()}
        />
      </Flex>
      <Carousel
        rootClassName="custom-carousel w-full justify-center items-center"
        ref={carouselRef}
        autoplay
        infinite
        dots={false}
      >
        <OverallProductStatistic data={data} isLoading={isLoading} />

        <OverallOrderStatistic data={data} isLoading={isLoading} />
      </Carousel>
    </Flex>
  );
};
