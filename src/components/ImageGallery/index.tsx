import { Carousel, Image } from 'antd/lib';
import { CarouselRef } from 'antd/lib/carousel';
import React, { createRef } from 'react';

export interface IImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<IImageGalleryProps> = ({ images }) => {
  const carouselRef = createRef<CarouselRef>();

  return (
    <section className="flex flex-col gap-3">
      <Image.PreviewGroup items={images}>
        <Carousel
          infinite={false}
          rootClassName="custom-carousel w-full justify-center items-center"
          ref={carouselRef}
          autoplay
        >
          {images.map((image, index) => (
            <Image
              key={['product.image', index].join('.')}
              src={image}
              rootClassName="w-full items-center antd-image-nomask"
              className="img-edge-blur max-h-[calc(100vh-284px)] object-cover"
            />
          ))}
        </Carousel>
      </Image.PreviewGroup>
      {images.length > 1 && (
        <Carousel
          infinite={false}
          rootClassName="custom-carousel-preview w-full justify-center items-center"
          slidesToShow={7}
        >
          {images.map((image, index) => (
            <img
              key={['product.image.preview', index].join('.')}
              src={image}
              className="!w-[100px] h-[100px] object-cover items-center cursor-pointer"
              onMouseOver={() => carouselRef.current?.goTo(index)}
            />
          ))}
        </Carousel>
      )}
    </section>
  );
};
