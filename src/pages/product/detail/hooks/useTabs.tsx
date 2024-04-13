import { FormattedHTMLMessage } from '@umijs/max';

import { ProductInformative } from '@/pages/product/detail/components/ProductInformative';

export const useTabs = (data?: API.IProductDetails) => {
  const tabs = [
    {
      key: 'product.details.tab.detailsInfo',
      label: (
        <FormattedHTMLMessage
          id="product.details.tab.detailsInfo"
          defaultMessage="Detailed Information"
        />
      ),
      children: <ProductInformative data={data} />,
    },
    {
      key: '2',
      label: <FormattedHTMLMessage id="product.details.tab.feedbacks" defaultMessage="Feedbacks" />,
      children: 'Content of Tab Pane 2',
    },
  ];
  return { tabs } as const;
};
