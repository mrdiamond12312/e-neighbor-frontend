/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: 'user',
    routes: [
      {
        name: 'login',
        path: 'login',
        component: '@/pages/user/login',
      },
      {
        path: 'profile',
        wrappers: ['@/wrappers/Auth', '@/layouts/User'],
        routes: [
          {
            path: '',
            redirect: 'edit',
          },
          {
            name: 'edit-profile',
            path: 'edit',
            component: '@/pages/user/edit-profile',
          },
          {
            name: 'orders',
            path: 'orders',
            component: '@/pages/user/order',
            routes: [
              {
                name: 'payment-thankyou',
                path: 'thank-you',
                component: '@/pages/user/payment-thank-you',
              },
              {
                name: 'order-detail',
                path: ':orderId',
                component: '@/pages/user/order-details',
                routes: [
                  {
                    name: 'cancel-order',
                    path: 'cancel',
                    component: '@/pages/user/order-details/cancel',
                  },
                  {
                    name: 'receipt-order',
                    path: 'receipt',
                    component: '@/pages/user/order-details/receipt',
                  },
                  {
                    name: 'feedback-order',
                    path: 'feedback',
                    component: '@/pages/user/order-details/feedback',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'signUp',
        path: 'sign-up',
        component: '@/pages/user/sign-up',
      },
    ],
  },

  {
    path: 'admin',
    wrappers: ['@/wrappers/AdminAuth', '@/layouts/Admin'],
    headerRender: false,
    routes: [
      { path: '', redirect: 'login' },
      {
        path: 'login',
        name: 'admin-login',
        component: '@/pages/admin/login',
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
      },

      {
        path: 'products',
        name: 'admin-products',
        component: '@/pages/admin/product/management',
      },

      {
        path: 'products/:productId',
        name: 'product-detail',
        component: '@/pages/admin/product/detail',
        routes: [
          {
            name: 'approval-review',
            path: 'review',
            component: '@/pages/admin/product/approve',
          },
        ],
      },
    ],
  },
  {
    path: 'lessor',
    wrappers: ['@/wrappers/LessorAuth', '@/layouts/Lessor'],
    headerRender: false,

    routes: [
      {
        path: '',
        redirect: 'dashboard',
      },
      {
        name: 'on-boarding',
        path: 'on-boarding',
        component: '@/pages/lessor/on-boarding',
      },
      {
        path: 'products',
        headerRender: false,
        routes: [
          {
            path: '',
            redirect: 'manage',
          },
          {
            name: 'add-product',
            path: 'new',
            component: '@/pages/lessor/products/add',
          },
          {
            name: 'product-management',
            path: 'manage',
            component: '@/pages/lessor/products/management',
          },

          {
            name: 'product-management',
            path: 'manage/:productId',
            component: '@/pages/lessor/products/detail',
          },
        ],
      },
      {
        path: 'orders',
        component: '@/pages/lessor/order',
        routes: [
          {
            name: 'order-details',
            path: ':orderId',
            component: '@/pages/lessor/order-details',
            routes: [
              {
                name: 'reject-order',
                path: 'reject',
                component: '@/pages/lessor/order-details/reject',
              },
              {
                name: 'approve-order',
                path: 'approve',
                component: '@/pages/lessor/order-details/approve',
              },
              {
                name: 'return-order',
                path: 'return',
                component: '@/pages/lessor/order-details/return',
              },
            ],
          },
        ],
      },

      {
        name: 'dashboard',
        path: 'dashboard',
        component: '@/pages/lessor/dashboard',
      },
    ],
  },
  {
    name: 'nav.Home',
    path: '/home',
    component: './home',
  },
  {
    name: 'nav.Store',
    path: '/store',
    component: './store',
  },
  {
    path: 'product',
    routes: [
      {
        name: 'product-detail',
        path: ':productId',
        wrappers: ['@/pages/product/detail'],
        routes: [
          {
            name: 'rent',
            path: 'rent',
            component: '@/pages/product/renting',
          },
        ],
      },
    ],
  },
  {
    name: 'nav.AboutUs',
    path: '/about-us',
    component: './about-us',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
