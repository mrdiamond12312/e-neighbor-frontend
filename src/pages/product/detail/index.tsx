import { useParams } from '@umijs/max';
import React from 'react';

import ContactInfo from '@/layouts/ContactInfo';
import { useProductDetails } from '@/services/products/services';

const ProductDetail: React.FC = () => {
  const { productId } = useParams();

  const { data, isLoading } = useProductDetails(productId);

  console.log(data, isLoading);
  return <ContactInfo></ContactInfo>;
};

export default ProductDetail;
