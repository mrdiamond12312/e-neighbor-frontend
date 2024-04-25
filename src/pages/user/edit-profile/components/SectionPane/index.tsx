import { FormattedHTMLMessage } from '@umijs/max';
import { Flex } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';

export type TSectionPaneProps = {
  editMode: boolean;
  flipEditMode: () => void;
  openSubmitModal: () => void;
};

export const SectionPane: React.FC<TSectionPaneProps> = ({
  editMode,
  flipEditMode,
  openSubmitModal,
}) => {
  return editMode ? (
    <Flex className="flex-row py-2 px-4 justify-between items-center w-full text-heading-4">
      <FormattedHTMLMessage
        id="user.profile.form.editMode.header"
        defaultMessage="Edit Account Information"
      />
      <Flex className="flex-row gap-2">
        <Button onClick={flipEditMode} type="primary">
          <FormattedHTMLMessage id="common.cancel" defaultMessage="Cancel" />
        </Button>
        <Button onClick={openSubmitModal}>
          <FormattedHTMLMessage id="common.submit" defaultMessage="Submit" />
        </Button>
      </Flex>
    </Flex>
  ) : (
    <Flex className="flex-row py-2 px-4 justify-between items-center w-full text-heading-4">
      <FormattedHTMLMessage
        id="user.profile.form.readonlyModeheader"
        defaultMessage="Account Details"
      />
      <Button onClick={flipEditMode} type="primary">
        Edit
      </Button>
    </Flex>
  );
};
