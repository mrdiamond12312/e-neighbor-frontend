import { Button, Form, Popconfirm } from 'antd';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'umi';

import InputText from '@/components/Input';
import DatePicker from '@/components/Input/DatePicker';
import HiddenInput from '@/components/Input/HiddenInput';
import { ImageDragger } from '@/components/Input/ImageDragger';
import useEditForm from '@/pages/user/profile/hook/useEditForm';

const dateFormat = 'YYYY/MM/DD';
const { Item } = Form;

const FormInfo: React.FC = () => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  const [, setDataProfileAPI] = useState<any>();

  const { handleEditMode } = useEditForm();

  const onFinish = (data: API.TAuthProfile) => {
    console.log(data);
    let dataTemp = {
      ...data,
      dob: moment(data?.dob).format(dateFormat),
    };
    setDataProfileAPI(dataTemp);
    handleEditMode(false);
  };

  const confirm = () => {
    handleEditMode(true);
  };

  const cancel = () => {
    handleEditMode(false);
  };

  const { handleSubmit, control } = useForm();

  return (
    <Form
      rootClassName="custom-antd-form-profile"
      form={form}
      name="basic"
      className="w-full"
      onFinish={handleSubmit(onFinish)}
      autoComplete="off"
    >
      <div className="space-y-4">
        <div className="space-y-2 mt-5">
          <Item className="font-semibold text-center">
            {formatMessage({
              id: 'user.profile.input.login',
              defaultMessage: 'Login Information',
            })}
          </Item>
          <div className="grid gap-x-4">
            <div>
              <Item
                label={formatMessage({
                  id: 'user.profile.input.username',
                  defaultMessage: 'Username',
                })}
                required
              >
                <InputText name="username" control={control} className="w-full" />
              </Item>
              <Item
                label={formatMessage({
                  id: 'user.profile.input.password',
                  defaultMessage: 'Password',
                })}
                required
              >
                <HiddenInput
                  placeholder="******"
                  control={control}
                  name="password"
                  className="w-full"
                />
              </Item>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Item className="font-semibold text-center">
            {formatMessage({
              id: 'user.profile.input.contact',
              defaultMessage: 'Contact Information',
            })}
          </Item>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <Item
                label={formatMessage({
                  id: 'user.profile.input.email',
                  defaultMessage: 'Email',
                })}
                required
              >
                <InputText name="email" control={control} className="w-full" />
              </Item>

              <Item
                label={formatMessage({
                  id: 'user.profile.input.fullName',
                  defaultMessage: 'Full Name',
                })}
              >
                <InputText name="fullName" control={control} className="w-full" />
              </Item>

              <Item
                label={formatMessage({
                  id: 'user.profile.input.address',
                  defaultMessage: 'Address',
                })}
              >
                <InputText name="address" control={control} className="w-full" />
              </Item>

              <Item
                label={formatMessage({
                  id: 'user.profile.input.detailAddress',
                  defaultMessage: 'Detail Address',
                })}
              >
                <InputText name="detailAddress" control={control} className="w-full" />
              </Item>
              <Item
                label={formatMessage({
                  id: 'user.profile.input.dateOfBirth',
                  defaultMessage: 'Date of Birth',
                })}
              >
                <DatePicker format="DD-MM-YYYY" name="dob" className="w-full" control={control} />
              </Item>
            </div>

            <div>
              <Item
                label={formatMessage({
                  id: 'user.profile.input.phoneNumber',
                  defaultMessage: 'Phone Number',
                })}
              >
                <InputText name="phoneNumber" control={control} className="w-full" />
              </Item>

              <Item
                label={formatMessage({
                  id: 'user.profile.input.citizenID',
                  defaultMessage: 'Citizen ID',
                })}
              >
                <InputText name="citizenID" control={control} className="w-full" />
              </Item>

              <Item
                label={formatMessage({
                  id: 'user.profile.input.citizenIDCardFront',
                  defaultMessage: 'Citizen Card Front',
                })}
              >
                <ImgCrop aspect={1} rotationSlider>
                  <ImageDragger
                    control={control}
                    maxCount={1}
                    className="w-full"
                    name="citizenCardFront"
                  />
                </ImgCrop>
              </Item>

              <Item
                label={formatMessage({
                  id: 'user.profile.input.citizenIDCardBack',
                  defaultMessage: 'Citizen Card Back',
                })}
              >
                <ImgCrop aspect={1} rotationSlider>
                  <ImageDragger
                    control={control}
                    maxCount={1}
                    className="w-full"
                    name="citizenCardBack"
                  />
                </ImgCrop>
              </Item>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-1">
          <Button type="primary" className="btn-medium btn-primary" htmlType="submit">
            {formatMessage({
              id: 'user.profile.input.saveChangesBtn',
              defaultMessage: 'Save Changes',
            })}
          </Button>
          <Popconfirm
            title={formatMessage({
              id: 'user.profile.input.confirmExit',
              defaultMessage: 'Confirm Exit',
            })}
            description={formatMessage({
              id: 'user.profile.input.cancel',
              defaultMessage: 'If you exit, you will lose your modified data.',
            })}
            onConfirm={confirm}
            onCancel={cancel}
            okText={formatMessage({
              id: 'user.profile.input.yes',
              defaultMessage: 'Yes',
            })}
            cancelText={formatMessage({
              id: 'user.profile.input.no',
              defaultMessage: 'No',
            })}
            okButtonProps={{ className: 'btn-medium btn-primary' }}
            cancelButtonProps={{ className: 'btn-medium btn-default' }}
          >
            <Button className="btn-medium btn-default">
              {formatMessage({
                id: 'user.profile.input.cancelBtn',
                defaultMessage: 'Cancel',
              })}
            </Button>
          </Popconfirm>
        </div>
      </div>
    </Form>
  );
};

export default FormInfo;
