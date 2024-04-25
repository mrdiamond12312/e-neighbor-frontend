import { FormattedHTMLMessage } from '@umijs/max';
import { Flex, Modal } from 'antd/lib';
import React from 'react';

import Button from '@/components/Button';
import { BasicInfo } from '@/pages/user/edit-profile/components/BasicInfo';
import { ContactInfo } from '@/pages/user/edit-profile/components/ContactInfo';
import { IdentityInfo } from '@/pages/user/edit-profile/components/IdentityInfo';
import { LogInInfo } from '@/pages/user/edit-profile/components/LogInInfo';
import { PasswordConfirm } from '@/pages/user/edit-profile/components/PasswordConfirm';
import { SectionPane } from '@/pages/user/edit-profile/components/SectionPane';
import { useEditProfileForm } from '@/pages/user/edit-profile/hooks/useEditProfileForm';

const ProfileEdit: React.FC = () => {
  const {
    control,
    flipEditMode,
    editMode,
    checkInfoField,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    handleSubmit,
    getValues,
    isSubmitting,
  } = useEditProfileForm();

  return (
    <Flex className="flex-col gap-4 p-4 w-full">
      <SectionPane
        editMode={editMode}
        flipEditMode={flipEditMode}
        openSubmitModal={async () => {
          checkInfoField().then((isGoodToForward) => {
            if (isGoodToForward) setIsSubmitModalOpen(true);
          });
        }}
      />
      <section className="bg-neutral-1 rounded-lg border-neutral-3 border p-4">
        {!editMode && <LogInInfo />}
        <BasicInfo control={control} readOnly={!editMode} />
        <ContactInfo control={control} readOnly={!editMode} />
        <IdentityInfo control={control} readOnly={!editMode} />
        <Modal
          open={isSubmitModalOpen}
          onCancel={() => setIsSubmitModalOpen(false)}
          footer={
            <Button onClick={() => handleSubmit(getValues())} loading={isSubmitting}>
              <FormattedHTMLMessage id="common.submit" />
            </Button>
          }
        >
          <PasswordConfirm control={control} />
        </Modal>
      </section>
    </Flex>
  );
};

export default ProfileEdit;
