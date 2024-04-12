import aboutUs from '@/locales/en-US/aboutUs';
import login from '@/locales/en-US/login';
import menu from '@/locales/en-US/menu';
import profile from '@/locales/en-US/profile';
import register from '@/locales/en-US/register';
import store from '@/locales/en-US/store';

export default {
  'nav.Home': 'Landing Page',
  'nav.Store': 'Rental',
  'nav.AboutUs': 'AboutUs',
  ...aboutUs,
  ...menu,
  ...login,
  ...profile,
  ...register,
  ...store,
};
