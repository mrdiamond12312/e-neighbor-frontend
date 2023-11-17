import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    return $;
  });
  api.addHTMLLinks(() => [{ rel: 'stylesheet', type: 'text/css', href: '/../src/global.less' }]);
};
