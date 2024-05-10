import { FormattedHTMLMessage } from '@umijs/max';
import { SelectProps } from 'antd/lib';

export const dayRangeOptions: SelectProps['options'] = [
  {
    label: <FormattedHTMLMessage id="common.dayrange.last.week" defaultMessage="Last 7 days" />,
    value: 7,
  },
  {
    label: <FormattedHTMLMessage id="common.dayrange.last.month" defaultMessage="Last 30 days" />,
    value: 30,
  },
];
