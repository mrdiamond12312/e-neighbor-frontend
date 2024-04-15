export type TTranslateObject = {
  id: string;
  defaultMessage?: string;
};

import { getLocale } from '@umijs/max';

import en from '@/locales/en-US';
import vn from '@/locales/vi-VN';

export const translate = ({ id, defaultMessage }: TTranslateObject) => {
  const locale = getLocale();

  switch (locale) {
    case 'vi-VN':
      return vn[id as keyof typeof vn] ?? defaultMessage;
    default:
      return en[id as keyof typeof en] ?? defaultMessage;
  }
};
