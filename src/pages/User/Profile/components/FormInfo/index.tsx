import { Button, Form, FormProps, Popconfirm, type PopconfirmProps } from 'antd';
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

  const onFinish: FormProps<API.TAuthProfile>['onFinish'] = (data) => {
    console.log(data);
    let dataTemp = {
      ...data,
      dob: moment(data?.dob).format(dateFormat),
    };
    setDataProfileAPI(dataTemp);
    handleEditMode(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = () => {
    handleEditMode(true);
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    handleEditMode(false);
  };

  const { handleSubmit, control } = useForm();

  return (
    <Form
      form={form}
      name="basic"
      wrapperCol={{ span: 20 }}
      //   initialValues={{
      //     userName: dataProfileAPI?.userName,
      //     password: dataProfileAPI?.password,
      //     fullName: dataProfileAPI?.fullName,
      //     phoneNumber: dataProfileAPI?.phoneNumber,
      //     email: dataProfileAPI?.email,
      //     address: dataProfileAPI?.address,
      //     detailedAddress: dataProfileAPI?.detailedAddress,
      //     dob: dayjs(dataProfileAPI?.dob) || dayjs(),
      //   }}
      onFinish={handleSubmit(onFinish)}
      autoComplete="off"
    >
      <Item className="font-semibold mt-3">
        {formatMessage({
          id: 'user.profile.input.login',
          defaultMessage: 'Login Information',
        })}
      </Item>
      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.username',
          defaultMessage: 'Username',
        })}
        required
      >
        <InputText name="username" control={control} />
      </Item>

      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.password',
          defaultMessage: 'Password',
        })}
        required
      >
        <HiddenInput placeholder="******" control={control} name="password" />
      </Item>

      <Item className="font-semibold">
        {formatMessage({
          id: 'user.profile.input.contact',
          defaultMessage: 'Contact Information',
        })}
      </Item>
      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.email',
          defaultMessage: 'Email',
        })}
        required
      >
        <InputText name="email" control={control} />
      </Item>

      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.fullName',
          defaultMessage: 'Full Name',
        })}
      >
        <InputText name="fullName" control={control} />
      </Item>

      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.address',
          defaultMessage: 'Address',
        })}
      >
        <InputText name="address" control={control} />
      </Item>

      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.detailAddress',
          defaultMessage: 'Detail Address',
        })}
      >
        <InputText name="detailAddress" control={control} />
      </Item>

      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.dateOfBirth',
          defaultMessage: 'Date of Birth',
        })}
      >
        <DatePicker format="DD-MM-YYYY" name="dob" control={control} />
      </Item>

      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.phoneNumber',
          defaultMessage: 'Phone Number',
        })}
      >
        <InputText name="phoneNumber" control={control} />
      </Item>

      <Item
        className="flex items-center space-x-4 mt-2"
        label={formatMessage({
          id: 'user.profile.input.citizenCardNumber',
          defaultMessage: 'Citizen Card Number',
        })}
      >
        <ImgCrop aspect={1} rotationSlider>
          <ImageDragger control={control} maxCount={2} className="custom-ant-upload" name="CCCD" />
        </ImgCrop>
      </Item>

      <div className="flex items-center space-x-4 mt-2">
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
    </Form>
  );
};

export default FormInfo;
