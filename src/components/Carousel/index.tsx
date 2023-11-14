import { Col, Row } from 'antd';
import classNames from 'classnames';
import React, { Fragment } from 'react';

export type TCarouselProps = {
  header?: string;
  datas: {
    image: string;
    title: string;
    description: string;
    tags?: string;
  }[];
};

const Carousel: React.FC<TCarouselProps> = ({ datas }) => {
  return (
    <Fragment>
      <Row gutter={16}>
        <Col span={12}>
          <div className="flex flex-col flex-wrap w-full aspect-square ">
            {datas.map((data, index) => {
              return (
                <div
                  key={data.title}
                  className={classNames('w-1/3 h-1/3 overflow-hidden', {
                    'w-2/3 h-2/3 rounded-lg overflow-clip': index === 0,
                  })}
                >
                  <div className="p-2  w-full h-full">
                    <img src={data.image} className="w-full h-full object-cover rounded-lg" />
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Carousel;
