import { ArrowArcRight } from '@phosphor-icons/react';
import { FormattedHTMLMessage, Link } from '@umijs/max';
import { Flex } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';
import { PATH_STORE } from '@/const/path';

const Slogan: React.FC = () => {
  return (
    <Flex className="absolute font-sans p-4 flex-col gap-4 top-0 left-0">
      <Flex className="flex-col gap-1 pl-20 pt-24 font-sans text-heading-3 flex-shrink-0">
        <article>
          <FormattedHTMLMessage
            id="landingpage.slogan.1"
            defaultMessage="Borrow Joy, Be Neighborly"
          />
        </article>
        <article>
          <FormattedHTMLMessage
            id="landingpage.slogan.2"
            defaultMessage="Instant Rentals, Seamless Connections"
          />
        </article>
      </Flex>
      <Flex className="flex-col gap-1 pl-20 font-sans text-heading-3 flex-shrink-0">
        <Link to={PATH_STORE}>
          <Button
            btnSize="large"
            icon={<ArrowArcRight />}
            className="w-fit uppercase text-heading-5"
            type="primary"
          >
            <FormattedHTMLMessage id="landingpage.slogan.action" defaultMessage="Explore Now!" />
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Slogan;
