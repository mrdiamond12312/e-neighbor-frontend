import { FormattedHTMLMessage } from '@umijs/max';
import { Col, Flex, Rate, Row } from 'antd/lib';
import React, { Fragment } from 'react';

import Button from '@/components/Button';

const INTRO_CHARACTERISTICS = [
  'furniture-characteristics-function',
  'furniture-characteristics-brand',
  'furniture-characteristics-origin',
  'furniture-characteristics-size',
  'furniture-characteristics-height',
  'furniture-characteristics-material',
  'furniture-characteristics-weight',
  'vehicle-characteristics-seats',
  'vehicle-characteristics-fuel',
  'vehicle-characteristics-utility-GPS',
];
type TCharacteristic = {
  characteristics?: API.IProductCharacteristic[];
};

export type TProductCharacteristicsProps = {
  data?: API.IProductDetails;
};

export const Characteristic: React.FC<TCharacteristic> = ({ characteristics }) => {
  if (characteristics)
    return (
      <div className="w-full ">
        {characteristics
          .filter(
            (char) =>
              INTRO_CHARACTERISTICS.includes(char.localeId) &&
              char.description &&
              char.description.toString().length !== 0,
          )

          .map((char) => (
            <Row key={char.localeId} gutter={12}>
              <Col span={9} className=" font-sans text-right text-heading-5 font-light">
                <FormattedHTMLMessage
                  id={char.localeId ?? 'unknown'}
                  defaultMessage={char.localeId ?? 'unknown'}
                />
              </Col>
              <Col span={15}>
                <p className="text-heading-5 font-normal">{char.description}</p>
              </Col>
            </Row>
          ))}
      </div>
    );
  else return <Fragment />;
};

export const ProductLanding: React.FC<TProductCharacteristicsProps> = ({ data }) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-heading-1 font-sans font-medium m-0 pb-4">{data?.name}</h1>
      <Flex className="flex-row gap-2 justify-start items-center text-heading-5 font-normal">
        <Rate value={data?.averageStar} disabled />
        <p className="font-sans text-neutral-6">{data?.averageStar ?? 0}</p>
        <p>|</p>
        <p>{0}</p>
        <FormattedHTMLMessage id="product.details.feedback.count" defaultMessage="Feedbacks" />
      </Flex>
      <Flex className="flex-row gap-2 justify-start items-center text-heading-2 font-sans font-normal py-2">
        <p className="text-teal-1">{data?.price}</p>
        <FormattedHTMLMessage id={data?.timeUnit} />
      </Flex>
      <Flex className="flex-row gap-2">
        <Button type="dashed" btnSize="large" className="text-heading-5 w-full">
          <FormattedHTMLMessage id="store.preview.card.btn.wish" defaultMessage="Add to Wishlist" />
        </Button>

        <Button type="primary" btnSize="large" className="text-heading-5 w-full">
          <FormattedHTMLMessage id="store.preview.card.btn.rent" defaultMessage="Rent Now!" />
        </Button>
      </Flex>
      <Flex className="pt-3">
        <Characteristic characteristics={data?.characteristics} />
      </Flex>
    </div>
  );
};