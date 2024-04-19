import { useState } from 'react';

import useDataProfile from '@/pages/user/profile/hook/getDataProfile';

const useEditForm = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { dataProfile } = useDataProfile();

  const handleEditMode = (e: boolean) => {
    setEditMode(e);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return {
    confirmPassword,
    handleConfirmPasswordChange,
    dataProfile,
    editMode,
    handleEditMode,
  };
};

export default useEditForm;
