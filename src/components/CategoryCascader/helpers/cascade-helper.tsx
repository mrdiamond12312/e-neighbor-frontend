import { FormattedHTMLMessage } from '@umijs/max';

export interface ICascaderOption {
  value?: string | number | null | boolean;
  label: React.ReactNode;
  children?: ICascaderOption[];
  isLeaf?: boolean;
}

export const categoriesOptions: ICascaderOption[] = [
  {
    value: true,
    label: <FormattedHTMLMessage id="product.category.vehicles" defaultMessage="Vehicles" />,
    isLeaf: false,
  },
  {
    value: false,
    label: <FormattedHTMLMessage id="product.category.furnitures" defaultMessage="Furnitures" />,
    isLeaf: false,
  },
];
