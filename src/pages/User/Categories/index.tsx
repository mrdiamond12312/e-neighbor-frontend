import { Menu } from 'antd';
import { useIntl, Link, history, useLocation } from 'umi';

import {
  PATH_USER_ORDER,
  PATH_USER_PAYMENT,
  PATH_USER_PROFILE,
  PATH_USER_WISHLIST,
} from '@/const/path';

export type TCategoriesProps = {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const UserCategories: React.FC<TCategoriesProps> = ({ setCategory }) => {
  const { formatMessage } = useIntl();
  const location = useLocation();

  const items = [
    {
      label: formatMessage({
        id: 'user.category.title',
        defaultMessage: 'My Account',
      }),
      key: 'category',
      children: [
        {
          label: formatMessage({
            id: 'user.category.profile',
            defaultMessage: 'Profile',
          }),
          key: 'profile',
          path: PATH_USER_PROFILE,
        },
        {
          label: formatMessage({
            id: 'user.category.payment',
            defaultMessage: 'Payment',
          }),
          key: 'payment',
          path: PATH_USER_PAYMENT,
        },
        {
          label: formatMessage({
            id: 'user.category.order',
            defaultMessage: 'Order',
          }),
          key: 'order',
          path: PATH_USER_ORDER,
        },
        {
          label: formatMessage({
            id: 'user.category.wishlist',
            defaultMessage: 'Wishlist',
          }),
          key: 'wishlist',
          path: PATH_USER_WISHLIST,
        },
      ],
    },
  ];

  const handleSelect = ({ key }: { key: string }) => {
    setCategory(key);
    let path = '';
    switch (key) {
      case 'profile':
        path = PATH_USER_PROFILE;
        break;
      case 'payment':
        path = PATH_USER_PAYMENT;
        break;
      case 'order':
        path = PATH_USER_ORDER;
        break;
      case 'wishlist':
        path = PATH_USER_WISHLIST;
        break;
      default:
        path = PATH_USER_PROFILE;
    }
    history.push(path);
  };

  const selectedKey = items[0].children.find((item) => item.path === location.pathname)?.key || '';

  return (
    <Menu
      onSelect={handleSelect}
      disabledOverflow={true}
      openKeys={['category']}
      className="category-menu"
      mode="inline"
      items={items}
      selectedKeys={[selectedKey]}
    >
      {items[0].children.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default UserCategories;
