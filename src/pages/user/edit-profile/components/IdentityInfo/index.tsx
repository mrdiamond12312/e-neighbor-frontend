import { FormattedHTMLMessage, useIntl } from '@umijs/max';
import { Col, Divider, Form, Row } from 'antd/lib';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import ImgCrop from 'antd-img-crop';
import React from 'react';

import InputText from '@/components/Input';
import { ImageDragger } from '@/components/Input/ImageDragger';
import { EDIT_PROFILE_KEYS } from '@/pages/user/edit-profile/helpers/edit-form-keys';

const { Item } = Form;

export type TIdentityInfoFormProps = Partial<TPropsFormInput> & {
  readOnly: boolean;
};

export const IdentityInfo: React.FC<TIdentityInfoFormProps> = ({ control, readOnly }) => {
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
            id="user.profile.form.section.identity.info"
            defaultMessage="Identity Information"
          />
        </article>
      </Divider>
      <Row gutter={12} style={{ gap: '2px 0px' }}>
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.citizenId.label',
              defaultMessage: 'Citizen ID',
            })}
            required
          >
            <InputText
              placeholder={formatMessage({
                id: 'user.profile.form.citizenId.label',
                defaultMessage: 'Citizen ID',
              })}
              placement="top"
              control={control}
              name={EDIT_PROFILE_KEYS.citizenId}
              size={size}
              readOnly={readOnly}
            />
          </Item>
        </Col>
        <Col span={24} lg={12}></Col>

        {/* {!readOnly && ( */}
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.citizenCardFront.label',
              defaultMessage: 'Card Front',
            })}
          >
            <ImgCrop aspect={85.6 / 53.98} rotationSlider>
              <ImageDragger
                className="custom-ant-upload"
                control={control}
                name={EDIT_PROFILE_KEYS.citizenCardFront}
                maxCount={1}
                readOnly={readOnly}
              />
            </ImgCrop>
          </Item>
        </Col>
        {/* )} */}

        {/* {!readOnly && ( */}
        <Col span={24} lg={12}>
          <Item
            label={formatMessage({
              id: 'user.profile.form.citizenCardBack.label',
              defaultMessage: 'Card Back',
            })}
          >
            <ImgCrop aspect={85.6 / 53.98} rotationSlider>
              <ImageDragger
                className="custom-ant-upload"
                control={control}
                name={EDIT_PROFILE_KEYS.citizenCardBack}
                maxCount={1}
                readOnly={readOnly}
              />
            </ImgCrop>
          </Item>
        </Col>
        {/* )} */}
      </Row>
    </Form>
  );
};
