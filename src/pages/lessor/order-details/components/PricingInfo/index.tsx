import { Money } from '@phosphor-icons/react';
import { FormattedHTMLMessage, getLocale } from '@umijs/max';
import { Col, Flex, Row } from 'antd/lib';
import dayjs from 'dayjs';

import { getDateFormatNormal } from '@/utils/time-format/index';

export type TPricingInfoProps = {
  data?: API.IOrdersAllDetails;
};

export const PricingInfo: React.FC<TPricingInfoProps> = ({ data }) => {
  const rentTime = dayjs(data?.rentTime);
  const returnTime = dayjs(data?.returnTime);
  const numberOfPaidDay = returnTime.diff(rentTime, 'day');

  return (
    <Flex className="flex-col w-fit pt-2">
      <p className="text-heading-4">
        <FormattedHTMLMessage
          id="order.detail.pricingInfo.header"
          defaultMessage="Price & Payment Information"
        />
      </p>
      <Flex className="flex-row pt-2 w-fit">
        <Row gutter={12} className="text-body-1-regular w-fit max-w-7xl">
          <Col span={8} className="!font-sans text-teal-7 text-body-1-semibold text-right border-r">
            <FormattedHTMLMessage
              id="order.detail.pricingInfo.period"
              defaultMessage="Rental Period"
            />
          </Col>
          <Col span={16} className="!font-sans text-body-1-regular">
            <FormattedHTMLMessage
              id="order.detail.pricingInfo.period.value"
              defaultMessage="From {rentTime} to {returnTime}"
              values={{
                rentTime: getDateFormatNormal(data?.rentTime),
                returnTime: getDateFormatNormal(data?.returnTime),
              }}
            />
          </Col>

          <Col span={8} className="!font-sans text-teal-7 text-body-1-semibold text-right border-r">
            <FormattedHTMLMessage
              id="order.detail.pricingInfo.numOfPaidDay"
              defaultMessage="Number of Paid Day"
            />
          </Col>
          <Col span={16} className="!font-sans text-teal-7 text-body-1-regular">
            <FormattedHTMLMessage
              id="order.detail.pricingInfo.numOfPaidDay.value"
              defaultMessage="{numberOfPaidDay} day(s)"
              values={{
                numberOfPaidDay,
              }}
            />
          </Col>

          <Col span={8} className="!font-sans text-teal-7 text-body-1-semibold text-right border-r">
            <FormattedHTMLMessage
              id="order.detail.pricingInfo.rentalPrice"
              defaultMessage="Rental Price"
            />
          </Col>
          <Col span={16} className="!font-sans text-body-1-regular flex flex-row gap-1">
            {data?.rentPrice.toLocaleString(getLocale())}
            <FormattedHTMLMessage id={data?.timeUnit} defaultMessage={data?.timeUnit} />
          </Col>

          <Col span={8} className="!font-sans text-teal-3 text-heading-5 text-right border-t">
            <FormattedHTMLMessage id="order.detail.pricingInfo.total" defaultMessage="Total:" />
          </Col>
          <Col
            span={16}
            className="!font-sans text-teal-3 text-heading-5 flex flex-row gap-1 border-t"
          >
            {data?.orderValue.toLocaleString(getLocale())} ₫
          </Col>

          <Col
            span={8}
            className="!font-sans text-teal-7 text-body-1-semibold text-right border-t flex flex-row gap-1 items-center justify-end"
          >
            <Money />
            <FormattedHTMLMessage
              id="order.detail.pricingInfo.paymentStatus"
              defaultMessage="Payment Status"
            />
          </Col>
          <Col
            span={16}
            className="!font-sans text-teal-7 text-body-1-medium flex flex-row gap-1 border-t"
          >
            <FormattedHTMLMessage
              id={['order.detail.pricingInfo.paymentStatus', data?.paymentStatus].join('.')}
              defaultMessage={data?.paymentStatus}
            />
            <FormattedHTMLMessage
              id="order.detail.pricingInfo.online"
              defaultMessage="(Through Online Payment Gateway)"
            />
          </Col>
        </Row>
      </Flex>
    </Flex>
  );
};
