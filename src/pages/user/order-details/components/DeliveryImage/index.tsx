import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Image } from 'antd/lib';
import React, { useState } from 'react';

import Button from '@/components/Button';
import { NO_IMAGE_URL } from '@/const/image';

export type TDeliveryImageProps = {
  imageUponDelivery?: string;
  imageUponReturn?: string;
};

export const DeliveryImage: React.FC<TDeliveryImageProps> = ({
  imageUponDelivery = NO_IMAGE_URL,
  imageUponReturn = NO_IMAGE_URL,
}) => {
  const [isPreviewVisible, setPreviewVisible] = useState<boolean>(false);

  return (
    <Flex className="w-full pt-2 gap-1 flex-col">
      <Image.PreviewGroup
        preview={{
          visible: isPreviewVisible,
          onVisibleChange: (visible) => setPreviewVisible(visible),
        }}
      >
        <p className="text-heading-4">
          <FormattedHTMLMessage
            id="order.detail.image.upon.deliveryAndReturn"
            defaultMessage="Proof of Delivery and Return Images"
          />
        </p>
        <Image className="hidden" src={imageUponDelivery} />

        <Image className="hidden" src={imageUponReturn} />
      </Image.PreviewGroup>
      <Button
        className="w-fit"
        disabled={imageUponDelivery === NO_IMAGE_URL}
        onClick={() => setPreviewVisible(!isPreviewVisible)}
      >
        <FormattedHTMLMessage
          id="order.detail.image.upon.deliveryAndReturn.button"
          defaultMessage="Click here to view the images"
        />
      </Button>
    </Flex>
  );
};
