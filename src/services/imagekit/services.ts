import { useMutation } from '@umijs/max';
import { UploadRequestError } from 'rc-upload/lib/interface';

import { IMG_KIT_API } from '@/services/imagekit/api-path';
import { uploadImage } from '@/services/imagekit/api-services';

export const useImageUpload = () => {
  return useMutation<
    API.TUploadResponse,
    UploadRequestError | ProgressEvent,
    API.TUploadFileMutationParam
  >(
    [IMG_KIT_API],
    (mutateParams: API.TUploadFileMutationParam) =>
      uploadImage(mutateParams.file, mutateParams.onProgress),
    {},
  );
};
