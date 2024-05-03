import { Flex, Image, Rate, Typography } from 'antd/lib';
import React from 'react';

import { getDateFormatNormal } from '@/utils/time-format';

const FeedbackCard: React.FC<API.IFeedback> = ({ user, content, image, star, createdAt }) => {
  return (
    <Flex className="flex-col gap-2 font-sans">
      <Flex className="flex-row gap-4 items-center">
        <Image
          src={user.avatar}
          preview={false}
          rootClassName="w-16 h-16 rounded-lg overflow-clip"
        />
        <Flex className="flex-col">
          <Typography className="text-body-1-semibold font-sans">{user.fullName}</Typography>
          <Flex className="flex-row gap-2">
            <Rate disabled value={star} />
            <Typography className="text-body-2-regular italic text-neutral-6 font-sans">
              {getDateFormatNormal(createdAt)}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="flex-col gap-2 pl-20">
        <Typography className="text-body-1-regular font-sans">{content}</Typography>
        <Image
          src={image}
          rootClassName="w-32 h-32 object-cover rounded-lg overflow-clip border border-neutral-3"
          className="!w-32 !h-32 object-cover"
        />
      </Flex>
    </Flex>
  );
};

export default FeedbackCard;
