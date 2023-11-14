import React from 'react';

import ContactInfo from '@/layouts/ContactInfo';
import TrendingFurniturePosts from '@/pages/Home/components/TrendingFurniturePosts';

const Home: React.FC = () => {
  return (
    <ContactInfo>
      <TrendingFurniturePosts />
    </ContactInfo>
  );
};

export default Home;
