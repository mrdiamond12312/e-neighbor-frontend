import aboutUs from '@/locales/en-US/aboutUs';
import common from '@/locales/en-US/common';
import lessor from '@/locales/en-US/lessor';
import login from '@/locales/en-US/login';
import menu from '@/locales/en-US/menu';
import register from '@/locales/en-US/register';
import store from '@/locales/en-US/store';

export default {
  'nav.Home': 'Landing Page',
  'nav.Store': 'Rental',
  'nav.AboutUs': 'AboutUs',
  ...aboutUs,
  ...menu,
  ...login,
  ...register,
  ...store,
  ...lessor,
  ...common,
};
