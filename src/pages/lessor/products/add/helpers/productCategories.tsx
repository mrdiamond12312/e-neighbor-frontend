import { FormattedHTMLMessage } from '@umijs/max';

export interface IOption {
  value?: string | number | null | boolean;
  label: React.ReactNode;
  children?: IOption[];
  isLeaf?: boolean;
}

export const categoriesOptions: IOption[] = [
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
