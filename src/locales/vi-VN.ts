import aboutUs from '@/locales/vi-VN/aboutUs';
import common from '@/locales/vi-VN/common';
import lessor from '@/locales/vi-VN/lessor';
import lessorBreadCrumbs from '@/locales/vi-VN/lessor-breadcrumbs';
import login from '@/locales/vi-VN/login';
import menu from '@/locales/vi-VN/menu';
import { product } from '@/locales/vi-VN/product';
import register from '@/locales/vi-VN/register';
import store from '@/locales/vi-VN/store';

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
};
