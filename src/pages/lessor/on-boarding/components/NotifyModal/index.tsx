import { FormattedHTMLMessage } from '@umijs/max';
import { Modal, Row } from 'antd';
import React, { useState } from 'react';

import Button from '@/components/Button';
import Logo from '@/components/Logo';

export const NotifyModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleHideModal = () => setIsModalOpen(false);

  return (
    <Modal
      open={isModalOpen}
      closable={false}
      footer={() => (
        <Row className="flex flex-row justify-end">
          <Button type="primary" onClick={handleHideModal}>
            OK
          </Button>
        </Row>
      )}
      centered
    >
      <Row className="w-full m-3 flex flex-col justify-center items-center gap-2 font-sans">
        <article className="flex flex-row justify-center items-end gap-2">
          <Logo imgClassName="h-20" />
        </article>
        <article className="text-heading-4">
          <FormattedHTMLMessage
            id="lessor.onboarding.modal.welcome"
            defaultMessage="Welcome to Lessor's Channel!"
          />
        </article>
        <span className="text-body-1-regular text-center">
          <FormattedHTMLMessage
            id="lessor.onboarding.modal.intro"
            defaultMessage="Hold on! To become a lessor, we'll need some further information from you first! Let's get started!"
          />
        </span>
      </Row>
    </Modal>
  );
};
