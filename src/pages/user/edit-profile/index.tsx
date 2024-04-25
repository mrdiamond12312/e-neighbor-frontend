import { useSearchParams } from '@umijs/max';
import { Flex } from 'antd/lib';
import React from 'react';

import { BasicInfo } from '@/pages/user/edit-profile/components/BasicInfo';
import { ContactInfo } from '@/pages/user/edit-profile/components/ContactInfo';
import { IdentityInfo } from '@/pages/user/edit-profile/components/IdentityInfo';
import { SectionPane } from '@/pages/user/edit-profile/components/SectionPane';
import { MODE } from '@/pages/user/edit-profile/helpers/editor-mode';
import { useEditProfileForm } from '@/pages/user/edit-profile/hooks/useEditProfileForm';

const ProfileEdit: React.FC = () => {
  const [searchParams, setEditMode] = useSearchParams();
  const editMode = searchParams.get('mode') === MODE.editMode ? true : false;
  const flipEditMode = () => {
    setEditMode(new URLSearchParams({ mode: editMode ? MODE.readOnly : MODE.editMode }));
  };

  const { control } = useEditProfileForm();

  return (
    <Flex className="flex-col gap-4 p-4 w-full">
      <SectionPane editMode={editMode} flipEditMode={flipEditMode} />
      <section className="bg-neutral-1 rounded-lg border-neutral-3 border p-4">
        <BasicInfo control={control} readOnly={!editMode} />
        <ContactInfo control={control} readOnly={!editMode} />
        <IdentityInfo control={control} readOnly={!editMode} />
      </section>
    </Flex>
  );
};

export default ProfileEdit;
