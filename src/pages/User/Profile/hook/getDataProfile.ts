import { useEffect, useState } from 'react';

import { fetchAuthInfo } from '@/services/auth/services';

const useDataProfile = () => {
  const [dataProfile, setDataProfile] = useState<any>('');
  useEffect(() => {
    const getData = async () => {
      const currentUser = await fetchAuthInfo();
      setDataProfile(currentUser);
    };
    getData();
  }, []);
  return {
    dataProfile,
  };
};

export default useDataProfile;
