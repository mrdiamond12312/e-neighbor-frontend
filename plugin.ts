import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    return $;
  });
};
