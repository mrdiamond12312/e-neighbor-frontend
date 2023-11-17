import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'E-Neighbor',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  layout: 'top',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F

    header: {
      colorBgHeader: 'rgba(0, 164, 153, 1)',
      colorTextRightActionsItem: '#fff',
      colorHeaderTitle: '#fff',
      colorTextMenu: '#fff',
      colorTextMenuSelected: '#fff',
      colorBgMenuItemSelected: 'rgba(255, 255, 255, 0.3)',
      colorBgMenuItemHover: 'rgba(255, 255, 255, 0.1)',
    },
    pageContainer: {
      paddingBlockPageContainerContent: 0,
      paddingInlinePageContainerContent: 12,
    },
  },
};

export default Settings;
