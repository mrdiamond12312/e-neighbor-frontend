import aboutUs from '@/locales/en-US/aboutUs';
import common from '@/locales/en-US/common';
import { feedbackLocales } from '@/locales/en-US/feedbacks';
import lessor from '@/locales/en-US/lessor';
import lessorBreadCrumbs from '@/locales/en-US/lessor-breadcrumbs';
import login from '@/locales/en-US/login';
import menu from '@/locales/en-US/menu';
import order from '@/locales/en-US/order';
import { product } from '@/locales/en-US/product';
import register from '@/locales/en-US/register';
import { rentLocale } from '@/locales/en-US/rent';
import store from '@/locales/en-US/store';
import thankYou from '@/locales/en-US/thankYou';
import user from '@/locales/en-US/user';

export default {
  'nav.Home': 'Landing Page',
  'nav.Store': 'Rental',
  'nav.AboutUs': 'AboutUs',
  ...product,
  ...lessorBreadCrumbs,
  ...aboutUs,
  ...menu,
  ...login,
  ...register,
  ...store,
  ...lessor,
  ...common,
  ...thankYou,
  ...order,
  ...user,
  ...rentLocale,
  ...feedbackLocales,
};
