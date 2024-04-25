import { FormattedHTMLMessage } from '@umijs/max';
import { Image } from 'antd/lib';
import React from 'react';

import { NO_IMAGE_URL } from '@/layouts/User/helpers/image';

export interface IAvatarProps {
  image?: string;
  name: string | undefined;
  role?: 'lessor' | 'user' | 'admin';
}

export const AvatarBanner: React.FC<IAvatarProps> = ({ image = NO_IMAGE_URL, name, role }) => {
  return (
    <section className="relative overflow-visible w-full">
      <div className="w-full h-48 rounded-bl-xl bg-teal-1" />
      <Image
        src={image}
        rootClassName="absolute left-12 top-[calc(156px-50%)] w-48 rounded-full avatar-custom-mask border-teal-50 border-4 z-10"
        className="rounded-full aspect-square object-cover"
      />
      <article
        className="absolute left-64 top-[calc(192px)] -translate-y-[110%] text-neutral-1"
        aria-label="user.fullName"
      >
        <p className="text-heading-4 font-normal italic">
          <FormattedHTMLMessage
            id={['common.role', role].join('.')}
            defaultMessage={['common.role', role].join('.')}
          />
        </p>
        <p className="text-heading-3">{name}</p>
      </article>
    </section>
  );
};
