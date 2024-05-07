import aboutUs from '@/locales/vi-VN/aboutUs';
import common from '@/locales/vi-VN/common';
import lessor from '@/locales/vi-VN/lessor';
import lessorBreadCrumbs from '@/locales/vi-VN/lessor-breadcrumbs';
import login from '@/locales/vi-VN/login';
import menu from '@/locales/vi-VN/menu';
import order from '@/locales/vi-VN/order';
import { product } from '@/locales/vi-VN/product';
import register from '@/locales/vi-VN/register';
import { rentLocale } from '@/locales/vi-VN/rent';
import store from '@/locales/vi-VN/store';
import thankYou from '@/locales/vi-VN/thankYou';
import user from '@/locales/vi-VN/user';

export default {
  'nav.Home': 'Landing Page',
  'nav.Store': 'Thuê sản phẩm',
  'nav.AboutUs': 'Giới thiệu',
  ...product,
  ...lessorBreadCrumbs,
  ...menu,
  ...aboutUs,
  ...login,
  ...register,
  ...store,
  ...lessor,
  ...common,
  ...thankYou,
  ...order,
  ...user,
  ...rentLocale,
};
