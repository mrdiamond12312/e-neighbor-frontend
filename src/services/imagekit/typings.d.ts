declare namespace API {
  type TUploadFileMutationParam = {
    file: string | Blob | RcFile;
    onProgress?: ((event: UploadProgressEvent) => void) | undefined;
  };

  type TUploadResponse = {
    fileId: string;
    name: string;
    size: number;
    versionInfo: {
      id: string;
      name: string;
    };
    filePath: string;
    url: string;
    fileType: string;
    height: number;
    width: number;
    thumbnailUrl: string;
    AITags: string;
  };
}
