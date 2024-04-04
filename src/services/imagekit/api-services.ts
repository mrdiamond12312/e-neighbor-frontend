import { request } from '@umijs/max';
import ImageKit from 'imagekit';
import { UploadProgressEvent } from 'rc-upload/lib/interface';

import { IMG_KIT_API } from '@/services/imagekit/api-path';

export const uploadImage = async (
  file: FormData,
  onProgress?: ((event: UploadProgressEvent) => void) | undefined,
) => {
  let imagekit = new ImageKit({
    publicKey: REACT_APP_IMAGEKIT_PUBLIC_KEY,
    privateKey: REACT_APP_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: REACT_APP_IMAGEKIT_ENDPOINT_URL,
  });

  let authenticationParameters = imagekit.getAuthenticationParameters();

  console.log(authenticationParameters);

  return request<API.TUploadResponse>(IMG_KIT_API, {
    method: 'POST',
    data: {
      file,
      ...authenticationParameters,
      fileName: 'image',
      publicKey: REACT_APP_IMAGEKIT_PUBLIC_KEY,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      if (onProgress) onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  });
};
