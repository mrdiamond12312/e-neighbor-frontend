import React from 'react';

import Carousel from '@/components/Carousel';

const TrendingFurniturePosts: React.FC = () => {
  const datas = [
    {
      image:
        'https://www.devittinsurance.com/wp-content/uploads/2020/11/21YM_CRF300L_EXTREME_RED_R-292R_32-1280x853.jpg',
      title: 'Silver MotorBike',
      description: 'Just a Silver Motorbike',
    },
    {
      image:
        'https://www.devittinsurance.com/wp-content/uploads/2020/11/21YM_CRF300L_EXTREME_RED_R-292R_32-1280x853.jpg',
      title: 'Red MotorBike',
      description: 'Just a Red Motorbike',
    },
    {
      image:
        'https://www.devittinsurance.com/wp-content/uploads/2020/11/21YM_CRF300L_EXTREME_RED_R-292R_32-1280x853.jpg',
      title: 'Red MotorBike',
      description: 'Just a Red Motorbike',
    },
    {
      image:
        'https://www.devittinsurance.com/wp-content/uploads/2020/11/21YM_CRF300L_EXTREME_RED_R-292R_32-1280x853.jpg',
      title: 'Red MotorBike2',
      description: 'Just a Red Motorbike',
    },
    {
      image:
        'https://www.devittinsurance.com/wp-content/uploads/2020/11/21YM_CRF300L_EXTREME_RED_R-292R_32-1280x853.jpg',
      title: 'Red MotorBike3',
      description: 'Just a Red Motorbike',
    },
    {
      image:
        'https://www.devittinsurance.com/wp-content/uploads/2020/11/21YM_CRF300L_EXTREME_RED_R-292R_32-1280x853.jpg',
      title: 'Red MotorBike3',
      description: 'Just a Red Motorbike',
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <p className="text-heading-5">Trending Vehicle Posts</p>
      <Carousel datas={datas} />
    </div>
  );
};

export default TrendingFurniturePosts;
