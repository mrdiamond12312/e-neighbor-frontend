import { useState } from 'react';

const useEditForm = () => {
  const [username, setUsername] = useState<string>('judarclitus1920');
  const [password, setPassword] = useState<string>('abcdef');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('Judar Clitus');
  const [mobile, setMobile] = useState<string>('(84) 838 972 219');
  const [email, setEmail] = useState<string>('judarclitus@eneighbor.com');
  const [location, setLocation] = useState<string>('Vietnam');

  const [dataProfile, setDataProfile] = useState<any>({
    username: 'judarclitus1920',
    password: 'abcdef',
    fullName: 'Judar Clitus',
    mobile: '(84) 838 972 219',
    email: 'judarclitus@eneighbor.com',
    location: 'Vietnam',
    avatar:
      'https://rukminim2.flixcart.com/image/850/1000/l0y6qa80/stuffed-toy/u/d/t/duck-doll-10-simba-s-collection-original-imagcmspfdhpxfuy.jpeg?q=90',
    role: 'user',
    address: null,
    detailAddress: null,
    dob: '20/02/2002',
    gender: 0,
  });

  const dataConversation = [
    {
      name: 'Sophie B',
      content: 'Are you satisfied with the product quality? ...',
    },
    {
      name: 'Anne Marie',
      content: 'Are you satisfied with the product quality? ...',
    },
    {
      name: 'Ivan',
      content: 'Are you satisfied with the product quality? ...',
    },
    {
      name: 'Peterson',
      content: 'Are you satisfied with the product quality? ...',
    },
  ];

  const handleDataProfile = (e: any) => {
    console.log('e', e);
    setDataProfile(e);
  };

  const handleUsernameChange = (e: string) => {
    setUsername(e);
  };

  const handlePasswordChange = (e: string) => {
    setPassword(e);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleFullNameChange = (e: string) => {
    setFullName(e);
  };

  const handleMobileChange = (e: string) => {
    setMobile(e);
  };

  const handleEmailChange = (e: string) => {
    setEmail(e);
  };

  const handleLocationChange = (e: string) => {
    setLocation(e);
  };

  return {
    username,
    password,
    confirmPassword,
    fullName,
    mobile,
    email,
    location,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleFullNameChange,
    handleMobileChange,
    handleEmailChange,
    handleLocationChange,
    dataConversation,
    dataProfile,
    setDataProfile,
    handleDataProfile,
  };
};

export default useEditForm;
