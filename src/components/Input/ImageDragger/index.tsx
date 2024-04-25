import { FileImageOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { UploadListProps } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { Flex, Image, Row } from 'antd/lib';
import React, { Fragment } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { useUploadImage } from './hooks/useUploadImage';

import ValidateError from '@/components/Input/ValidateError';
import { useImageUpload } from '@/services/imagekit/services';

export type TPropsDragger = {
  control: Control<FieldValues>;
  name: string;
  maxCount: number;
  disabled?: boolean;
  readOnly?: boolean;
};

export const ImageDragger: React.FC<TPropsDragger & Partial<UploadListProps>> = ({
  control,
  name,
  maxCount,
  readOnly,
  ...settings
}) => {
  const intl = useIntl();
  const { beforeUpload, uploadImage } = useUploadImage(intl);

  const { mutate } = useImageUpload();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return readOnly ? (
          <Row>
            {!field.value?.[0] || field.value[0].url === '' ? (
              <Flex className="pl-3 h-8 items-end font-sans text-body-2-semibold">NaN</Flex>
            ) : (
              <Image rootClassName="pl-3" src={field.value[0].url} />
            )}
          </Row>
        ) : (
          <Fragment>
            <Dragger
              multiple={true}
              maxCount={maxCount}
              beforeUpload={beforeUpload}
              listType="picture"
              {...field}
              customRequest={(options) => uploadImage(options, mutate)}
              fileList={field.value}
              onChange={(info) => {
                field.onChange(info.fileList);
              }}
              {...settings}
            >
              {
                <div className="flex flex-row gap-2 p-2 justify-center items-center">
                  <p className="ant-upload-drag-icon mb-5">
                    <FileImageOutlined />
                  </p>
                  <div>
                    <p className="text-body-2-regular text-teal-7">
                      {intl.formatMessage({
                        id: 'pages.component.dragger.title',
                        defaultMessage: 'Click or Drop the image here',
                      })}
                    </p>
                  </div>
                </div>
              }
            </Dragger>
            <ValidateError error={error} />
          </Fragment>
        );
      }}
    />
  );
};
