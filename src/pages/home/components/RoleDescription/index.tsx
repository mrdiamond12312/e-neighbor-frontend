import { FormattedHTMLMessage } from '@umijs/max';
import { Flex } from 'antd/lib';
import React from 'react';

import { ROLE } from '@/const/roles';

export type TRoleDescriptionProps = {
  selectedRole: ROLE;
};

const RoleDescription: React.FC<TRoleDescriptionProps> = ({ selectedRole }) => {
  return (
    <Flex className="absolute bottom-0 left-0 font-sans text-heading-5 font-normal bg-neutral-2/70 rounded-br-lg backdrop-blur w-full">
      <Flex className="relative font-sans text-heading-5 font-normal p-4 pt-6 px-8">
        <Flex className="absolute top-0 left-4 -translate-y-1/2 rounded-full bg-teal-1 text-neutral-1 p-2 px-4 font-sans text-heading-5">
          <FormattedHTMLMessage id={['common', 'role', selectedRole].join('.')} />
        </Flex>
        <FormattedHTMLMessage
          id={['landingpage', 'role', selectedRole, 'description'].join('.')}
          defaultMessage={['landingpage', 'role', selectedRole, 'description'].join('.')}
        />
      </Flex>
    </Flex>
  );
};

export default RoleDescription;
