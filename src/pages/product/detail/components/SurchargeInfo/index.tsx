import { InfoCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Divider, Empty, Flex } from 'antd/lib';
import React, { Fragment } from 'react';

export type TSurchargeInfoProps = {
  data?: API.IProductDetails;
};

export const SurchargeInfo: React.FC<TSurchargeInfoProps> = ({ data }) => {
  const surCharges = data?.productSurcharges.filter((surC) => surC.price > 0);

  return (
    <section className="w-full flex flex-col gap-2">
      <Divider className="!my-1">
        <h2 className="text-heading-5 font-sans text-teal-5">
          <FormattedHTMLMessage
            id="product.details.surcharge.label"
            defaultMessage="Surcharges if violate"
          />
        </h2>
      </Divider>
      {surCharges && surCharges.length ? (
        surCharges.map((surC) => {
          if (surC.surcharge) {
            const surchargeName = surC.surcharge?.name;
            const surchargeDescription = surC.surcharge?.description;
            return (
              <Flex key={surC.id} className="flex-row gap-2 justify-start items-start">
                <InfoCircleOutlined className="text-neutral-5 text-body-1-semibold" />
                <Flex className="flex-col gap-1 w-full">
                  <Flex className="flex-row justify-between">
                    <p className="text-body-2-semibold">
                      <FormattedHTMLMessage id={surchargeName} defaultMessage={surchargeName} />
                    </p>
                    <p className="text-body-2-semibold">{surC.price} ₫</p>
                  </Flex>
                  <p className="text-body-2-regular">
                    <FormattedHTMLMessage
                      id={surchargeDescription}
                      defaultMessage={surchargeDescription}
                    />
                  </p>
                </Flex>
              </Flex>
            );
          }
          return <Fragment key={surC.id} />;
        })
      ) : (
        <Empty
          description={
            <p className="font-sans text-body-2-regular">
              <FormattedHTMLMessage
                id="product.details.surcharge.noData"
                defaultMessage="No Extra fees for this product"
              />
            </p>
          }
        />
      )}
    </section>
  );
};
