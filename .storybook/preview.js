/** @type { import('@storybook/react').Preview } */
import { Preview } from '@storybook/your-framework';
import { withConsole } from '@storybook/addon-console';

import '@storybook/addon-console';
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import '../src/global.less';
import '../tailwind.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

if (module.hot) {
  module.hot.accept();
}

export default preview;
