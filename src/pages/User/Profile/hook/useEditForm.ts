import { useState } from 'react';

const useEditForm = () => {
  const [username, setUsername] = useState<string>('judarclitus1920');
  const [password, setPassword] = useState<string>('abcdef');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('Judar Clitus');
  const [mobile, setMobile] = useState<string>('(84) 838 972 219');
  const [email, setEmail] = useState<string>('judarclitus@eneighbor.com');
  const [location, setLocation] = useState<string>('Vietnam');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
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
  };
};

export default useEditForm;
