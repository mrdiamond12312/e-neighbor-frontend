import React from 'react';
import type { FieldError } from 'react-hook-form';

type TValidateError = {
  error: FieldError | undefined;
};

const ValidateError: React.FC<TValidateError> = ({ error }) => {
  return <p className="text-red-500">{error?.message}</p>;
};

export default ValidateError;
