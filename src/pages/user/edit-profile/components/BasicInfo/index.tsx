import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Col, Divider, Form, Row } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import ImgCrop from 'antd-img-crop';
import React from 'react';

import InputText from '@/components/Input';
import DatePicker from '@/components/Input/DatePicker';
import { ImageDragger } from '@/components/Input/ImageDragger';
import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';

const { Item } = Form;

export type TBasicInfoFormProps = Partial<TPropsFormInput> & {
  readOnly: boolean;
};

export const BasicInfo: React.FC<TBasicInfoFormProps> = ({ control, readOnly }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const size: SizeType = 'large';

  return (
    <Form
      layout="horizontal"
      rootClassName="custom-antd-form-small"
      form={form}
      labelCol={{ span: 24, lg: 6 }}
      wrapperCol={{ span: 24, lg: 18 }}
    >
      <Divider orientation="left">
        <article className="font-sans text-heading-5">
          <FormattedHTMLMessage
            id="user.profile.form.section.basic.info"
            defaultMessage="Basic Information"
          />
        </article>
      </Divider>
      <Row gutter={12} style={{ gap: '2px 0px' }}>
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.fullName.label',
              defaultMessage: 'Fullname',
            })}
            required
          >
            <InputText
              placeholder={formatMessage({
                id: 'user.profile.form.fullName.label',
                defaultMessage: 'Fullname',
              })}
              placement="top"
              control={control}
              name={EDIT_PROFILE_KEYS.fullName}
              size={size}
              readOnly={readOnly}
            />
          </Item>
        </Col>

        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.dob.label',
              defaultMessage: 'Date of birth',
            })}
          >
            <DatePicker
              placeholder={formatMessage({
                id: 'user.profile.form.dob.label',
                defaultMessage: 'Date of birth',
              })}
              size={size}
              control={control}
              name={EDIT_PROFILE_KEYS.dob}
              readOnly={readOnly}
            />
          </Item>
        </Col>

        {!readOnly && (
          <Col span={24} lg={12}>
            <Item
              label={formatMessage({
                id: 'user.profile.form.avatar.label',
                defaultMessage: 'Your Avatar',
              })}
            >
              <ImgCrop aspect={1} rotationSlider>
                <ImageDragger
                  className="custom-ant-upload"
                  control={control}
                  name={EDIT_PROFILE_KEYS.avatar}
                  maxCount={1}
                />
              </ImgCrop>
            </Item>
          </Col>
        )}

        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.address.label',
              defaultMessage: 'Address',
            })}
            required
          >
            <InputText
              placeholder={formatMessage({
                id: 'user.profile.form.address.label',
                defaultMessage: 'Address',
              })}
              placement="top"
              control={control}
              name={EDIT_PROFILE_KEYS.address}
              size={size}
              readOnly={readOnly}
            />
          </Item>
        </Col>
      </Row>
    </Form>
  );
};
