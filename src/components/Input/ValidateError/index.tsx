import React from 'react';
import type { FieldError } from 'react-hook-form';

type TValidateError = {
  error: FieldError | undefined;
};

const ValidateError: React.FC<TValidateError> = ({ error }) => {
  return <p className="px-3 pt-2 text-red-500">{error?.message}</p>;
};

export default ValidateError;
