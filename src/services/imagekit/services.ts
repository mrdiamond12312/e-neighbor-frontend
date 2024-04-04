import { useMutation } from '@umijs/max';

import { IMG_KIT_API } from '@/services/imagekit/api-path';
import { uploadImage } from '@/services/imagekit/api-services';

export const useImageUpload = () => {
  return useMutation({
    mutationKey: [IMG_KIT_API],
    mutationFn: (mutateParams: API.TUploadFileMutationParam) =>
      uploadImage(mutateParams.file, mutateParams.onProgress),
  });
};
