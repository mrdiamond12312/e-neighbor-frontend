import { UseMutateFunction } from '@umijs/max';
import { Upload, notification } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';

import { LIMIT_FILE_SIZE, ACCEPT_FILE } from '@/const/upload';
import { convertBytesToMegaByte } from '@/utils/upload-file';

export const useUploadImage = (intl: any) => {
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

  const uploadImage = (
    options: UploadRequestOption,
    mutate: UseMutateFunction<API.TUploadResponse, unknown, API.TUploadFileMutationParam, unknown>,
  ) => {
    const { onSuccess, onError, file, onProgress } = options;

    mutate(
      { file: file, onProgress },
      {
        onSuccess: (event) => onSuccess(event),
        onError: (event) => onError(event),
      },
    );
  };

  return {
    beforeUpload,
    uploadImage,
  };
};
