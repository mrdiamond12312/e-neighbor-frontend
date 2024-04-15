import { InfoCircleOutlined } from '@ant-design/icons';
import { FormattedHTMLMessage } from '@umijs/max';
import { Flex } from 'antd/lib';
import React, { Fragment } from 'react';

export type TSurchargeInfoProps = {
  data?: API.IProductDetails;
};

export const SurchargeInfo: React.FC<TSurchargeInfoProps> = ({ data }) => {
  return (
    <section className="">
      <h2 className="text-heading-5 text-teal-5">
        <FormattedHTMLMessage
          id="product.details.surcharge.label"
          defaultMessage="Surcharges if violate"
        />
      </h2>
      {data &&
        data.productSurcharges.map((surC) => {
          if (surC.surcharge) {
            const surchargeName = surC.surcharge?.name;
            const surchargeDescription = surC.surcharge?.description;
            return (
              <Flex key={surC.id} className="flex-row gap-2 justify-start items-start">
                <InfoCircleOutlined className="text-neutral-5 text-body-1-semibold" />
                <Flex className="flex-col gap-1">
                  <Flex className="flex-row justify-between">
                    <p className="text-body-2-semibold">
                      <FormattedHTMLMessage id={surchargeName} defaultMessage={surchargeName} />
                    </p>
                    <p className="text-body-2-semibold">{surC.price}</p>
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
        })}
    </section>
  );
};
