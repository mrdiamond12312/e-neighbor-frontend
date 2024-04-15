import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { Fragment } from 'react';

export type TSwipeNavigationProps = {
  datas: any[];
  setPointer: React.Dispatch<React.SetStateAction<number>>;
};

const SwipeNavigation: React.FC<TSwipeNavigationProps> = ({ setPointer, datas }) => {
  return (
    <Fragment>
      <div className="flex flex-row gap-2 bg-neutral-8 rounded-full p-1">
        <div className="pr-5">
          <Button
            className="arrow-btn-left"
            onClick={() => setPointer((prev) => (prev > 0 ? prev - 1 : prev))}
          >
            <ArrowLeftOutlined
              style={{
                fontSize: '16px',
                strokeWidth: '300',
              }}
            />
          </Button>
        </div>
        {datas.map((data, index) => (
          <Button
            key={'member' + data.id}
            className="swipe-nav-button overflow-hidden"
            onClick={() => setPointer(index)}
          >
            <img
              className="skew-x-[45deg] translate-x-3/4 translate-y-[0] scale-125"
              src={data.image ?? '/team-members/unknown.webp'}
            ></img>
          </Button>
        ))}

        <div className="pl-5">
          <Button
            className="arrow-btn-right"
            onClick={() => setPointer((prev) => (prev === datas.length - 1 ? prev : prev + 1))}
          >
            <ArrowRightOutlined
              style={{
                fontSize: '16px',
                strokeWidth: '300',
              }}
            />
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default SwipeNavigation;
