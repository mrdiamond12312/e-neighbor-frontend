import { useIntl, useParams } from '@umijs/max';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import ContactInfo from '@/layouts/ContactInfo';
import LoadingSkeleton from '@/pages/store/components/LoadingSkeleton';
import { useProductDetails } from '@/services/products/services';

const ProductDetail: React.FC = () => {
  const { productId } = useParams();

  const { data, isLoading } = useProductDetails(productId);
  const { formatMessage } = useIntl();

  console.log(data, isLoading);
  return (
    <ContactInfo>
      {isLoading ? (
        <ContactInfo>
          <LoadingSkeleton />
        </ContactInfo>
      ) : (
        data && (
          <section>
            <div>
              <div>
                <span className="text-neutral-7 text-heading-3 w-fit">
                  {formatMessage({ id: data.category.name })}/<strong>{data.name}</strong>
                </span>{' '}
                {/*May be replaced with a breadCrumb*/}
                <div className="flex">
                  <div className="space-y-4">
                    <p className="text-heading-3 w-fit">{data.name}</p>
                    <p>
                      Rental Deal:{' '}
                      <span className="text-teal-3">
                        {data.price} {formatMessage({ id: data.timeUnit })}
                      </span>
                    </p>
                    <p>
                      Real Price: <span style={{ color: 'orange' }}>{data.value} đ</span>
                    </p>
                    <p>Rating: {data.averageStar}</p>
                    <p>{data.description}</p>
                    <button
                      type="button"
                      className="text-white font-bold py-2 px-4 rounded"
                      style={{ backgroundColor: '#3AA39F' }}
                    >
                      {formatMessage({
                        id: 'store.preview.card.btn.rent',
                        defaultMessage: 'Rent Now!',
                      })}
                    </button>
                  </div>
                  <div className="w-1/2">
                    <ImageGallery
                      items={data.images.map((image) => ({ original: image, thumbnail: image }))}
                      showPlayButton={false}
                      showFullscreenButton={false}
                      showIndex={true}
                    />
                  </div>
                </div>
              </div>
              {data.characteristics.length > 0 && (
                <div className="mt-4">
                  <p className="text-heading-3 w-fit">Characteristics</p>
                  <div className="flex flex-wrap gap-2">
                    {data.characteristics.map((characteristic, index) => (
                      <p
                        key={index}
                        className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                      >
                        {formatMessage({ id: characteristic.localeId })}:{' '}
                        {characteristic.description}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {data.policies.length > 0 && (
                <div className="mt-4">
                  <p className="text-heading-3 w-fit">Policies</p>
                  <div className="flex flex-wrap gap-2">
                    {data.policies.map((policy, index) => (
                      <p
                        key={index}
                        className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                      >
                        {policy}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <p className="text-heading-3 w-fit">Mortgage</p>
                <p className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {formatMessage({ id: data.mortgage })}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-heading-3 w-fit">Document Required</p>
                <p className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {formatMessage({ id: data.requiredDocuments })}
                </p>
              </div>
            </div>
          </section>
        )
      )}
    </ContactInfo>
  );
};

export default ProductDetail;
