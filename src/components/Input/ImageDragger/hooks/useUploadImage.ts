import { Upload, notification } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';

import { LIMIT_FILE_SIZE, ACCEPT_FILE } from '@/const/upload';
// import { uploadImage as uploadFile } from '@/services/imagekit/api-services';
import { useImageUpload } from '@/services/imagekit/services';
import { convertBytesToMegaByte } from '@/utils/upload-file';

export const useUploadImage = (intl: any) => {
  const { mutateAsync } = useImageUpload();
  const beforeUpload = (file: { type: string; name: string; size: number }) => {
    const isImage = ACCEPT_FILE.includes(file.type);
    if (!isImage) {
      const defaultErrorUploadMessage = intl.formatMessage(
        {
          id: 'pages.component.dragger.error',
          defaultMessage: 'Tệp không đúng định dạng',
        },
        { name: file.name },
      );
      notification.error({
        message: defaultErrorUploadMessage,
      });
    }
    const isLimitFileSize = convertBytesToMegaByte(file.size) < LIMIT_FILE_SIZE;
    if (!isLimitFileSize) {
      notification.error({
        message: intl.formatMessage({
          id: 'pages.updateDetailUser.uploadLimit.error',
          defaultMessage: `Please upload file smaller than ${LIMIT_FILE_SIZE}MB!`,
        }),
      });
    }
    return (isImage && isLimitFileSize) || Upload.LIST_IGNORE;
  };

  const uploadImage = async (options: UploadRequestOption) => {
    const { onSuccess, onError, file, onProgress } = options;
    mutateAsync({ file: file, onProgress })
      .then((response) => onSuccess?.(response))
      .catch((error) => onError?.(error));
  };

  return {
    beforeUpload,
    uploadImage,
  };
};
