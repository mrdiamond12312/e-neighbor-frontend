declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare type TComponentsProps = {
  children?: React.ReactNode;
};

declare type TMeta = {
  statusCode: number;
  message: string;
  error: string;
};

declare type TMetaWrapper<T> = {
  meta: TMeta;
  result: {
    data: T;
  };
};

declare type TPropsFormInput = {
  control?: Control;
  name: string;
  type?: string;
  size?: SizeType;
  error?: MultipleFieldErrors;
  errors?: MultipleFieldErrors;
  placeholder?: string;
  className?: string;
  format?: string;
  values?: [];
  autoSize?: boolean | { minRows: number; maxRows: number };
  label?: string;
  children?: JSX.Element;
  required?: boolean;
  placement?: TooltipPlacement;
  disabled?: boolean;
  rows?: number;
  form?: FormInstance<any>;
};

declare type TRadio = {
  size?: SizeType;
  control: Control<FieldValues>;
  name: string;
  values: { key: string | number; value: string | number }[];
  className?: string;
  disabled?: boolean;
  error?: FieldError;
  placeholder?: string;
};

declare type TFormControl = {
  control?: Control;
  error?: MultipleFieldErrors | FieldError;
};

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const MOCK: 'none' | undefined;
declare const ENEIGHBOR_API: string | undefined;
