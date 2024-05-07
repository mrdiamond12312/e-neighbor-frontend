export const convertBytesToMegaByte = (file: number) => {
  return file / 1024 / 1024;
};

export const imageDraggerFactory = (url: string = '') => {
  return {
    uid: url,
    name: url,
    url,
    response: {
      url,
    },
  };
};
