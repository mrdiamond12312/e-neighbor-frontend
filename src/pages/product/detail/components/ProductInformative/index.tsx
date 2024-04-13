import { FormattedHTMLMessage } from '@umijs/max';
import { Col, Divider, Flex, Row } from 'antd/lib';
import React from 'react';

import {
  MORTGAGE,
  REQUIRED_DOCUMENTS,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';
import { CHARACTERISTICS_ATTRIBUTE_FILTER } from '@/pages/product/detail/components/ProductInformative/helpers/characteristics-filter';

export type TProductInformativeProps = {
  data?: API.IProductDetails;
};

export const ProductInformative: React.FC<TProductInformativeProps> = ({ data }) => {
  const mortgage =
    data?.mortgage === 'NONE' ? 'NONE' : data?.mortgage === 'OPTION1' ? 'OPTION1' : 'OPTION2';

  const requiredDocuments =
    data?.mortgage === 'NONE' ? 'NONE' : data?.mortgage === 'OPTION1' ? 'OPTION1' : 'OPTION2';

  return (
    <Flex className="flex-col gap-2 p-4 max-h-[calc(100vh-242px)] overflow-auto">
      <h2 className="text-heading-5 font-sans m-0">
        <FormattedHTMLMessage
          id="product.details.description.label"
          defaultMessage="Descriptions"
        />
      </h2>
      <p className="text-body-1-medium">{data?.description}</p>
      <Divider />
      <h2 className="text-heading-5 font-sans m-0">
        <FormattedHTMLMessage
          id="product.details.characteristics.label"
          defaultMessage="Products Details provided by Lessor"
        />
      </h2>
      {data?.characteristics
        .filter(
          (char) =>
            CHARACTERISTICS_ATTRIBUTE_FILTER.includes(char.localeId) &&
            char.description &&
            char.description.toString().length !== 0,
        )

        .map((char) => (
          <Row key={char.localeId} gutter={12}>
            <Col
              span={5}
              className=" font-sans text-right text-body-1-regular border-r border-teal-1"
            >
              <FormattedHTMLMessage
                id={char.localeId ?? 'unknown'}
                defaultMessage={char.localeId ?? 'unknown'}
              />
            </Col>
            <Col span={19}>
              <p className=" text-body-1-regular font-normal">{char.description}</p>
            </Col>
          </Row>
        ))}
      <Divider />
      <h2 className="text-heading-5 font-sans m-0">
        <FormattedHTMLMessage
          id="product.details.characteristics.otherUtils.label"
          defaultMessage="Products other Utilities"
        />
      </h2>

      <h2 className="text-heading-5 font-sans m-0">
        <FormattedHTMLMessage
          id="product.details.mortgages.label"
          defaultMessage="Mortgages Requirements"
        />
      </h2>
      <p className="bg-gradient-to-r from-teal-50 to-transparent text-body-1-medium p-4 rounded-l border-l-4 border-teal-7">
        <FormattedHTMLMessage
          id={data?.mortgage ? MORTGAGE[mortgage] : data?.mortgage}
        ></FormattedHTMLMessage>
      </p>

      <h2 className="text-heading-5 font-sans m-0">
        <FormattedHTMLMessage
          id="product.details.requiredDocuments.label"
          defaultMessage="Documents Requirements for renting this product"
        />
      </h2>
      <p className="bg-gradient-to-r from-teal-50 to-transparent text-body-1-medium p-4 rounded-l border-l-4 border-teal-7">
        <FormattedHTMLMessage
          id={
            data?.requiredDocuments
              ? REQUIRED_DOCUMENTS[requiredDocuments]
              : data?.requiredDocuments
          }
        ></FormattedHTMLMessage>
      </p>

      <h2 className="text-heading-5 font-sans m-0">
        <FormattedHTMLMessage id="product.details.policies.label" defaultMessage="Policies" />
      </h2>
      <div className="bg-gradient-to-r flex flex-col gap-2 font-sans from-teal-50 to-transparent text-body-1-medium p-4 rounded-l border-l-4 border-teal-7">
        {data?.policies.map((policy) => (
          <FormattedHTMLMessage key={policy} id={policy} defaultMessage={policy} />
        ))}
      </div>
    </Flex>
  );
};
