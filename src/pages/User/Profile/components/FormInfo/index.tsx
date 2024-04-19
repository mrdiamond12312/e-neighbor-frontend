import {
  Button,
  Input,
  DatePicker,
  Form,
  Popconfirm,
  type FormProps,
  type PopconfirmProps,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'umi';

import useEditForm from '@/pages/user/profile/hook/useEditForm';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

const FormInfo: React.FC = () => {
  const { formatMessage } = useIntl();

  const [dataProfileAPI, setDataProfileAPI] = useState<any>();

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
  // console.log(dataProfileAPI)

  // const onFinishFailed: FormProps<API.TAuthProfile>['onFinishFailed'] = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  const confirm: PopconfirmProps['onConfirm'] = () => {
    handleEditMode(true);
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    handleEditMode(false);
  };

  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    register('userName');
    register('password');
    register('email');
    register('fullName');
    register('address');
    register('detailedAddress');
    register('phoneNumber');
  }, [register]);

  const getChangeHandlerWithEvent = (name: string) => (event: { target: { value: any } }) =>
    setValue(name, event.target.value);

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: 700 }}
      initialValues={{
        userName: dataProfileAPI?.userName,
        password: dataProfileAPI?.password,
        fullName: dataProfileAPI?.fullName,
        phoneNumber: dataProfileAPI?.phoneNumber,
        email: dataProfileAPI?.email,
        address: dataProfileAPI?.address,
        detailedAddress: dataProfileAPI?.detailedAddress,
        dob: dayjs(dataProfileAPI?.dob) || dayjs(),
      }}
      onFinish={handleSubmit(onFinish)}
      autoComplete="off"
    >
      <div className="font-semibold mt-3">
        {formatMessage({
          id: 'user.profile.input.login',
          defaultMessage: 'Login Information',
        })}
      </div>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.username',
          defaultMessage: 'Username',
        })}
        name="userName"
        rules={[
          {
            required: true,
            message: formatMessage({
              id: 'user.profile.input.username.required',
              defaultMessage: 'Please enter a username',
            }),
          },
        ]}
      >
        <Input onChange={getChangeHandlerWithEvent('userName')} />
      </Form.Item>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.password',
          defaultMessage: 'Password',
        })}
        name="password"
        rules={[
          {
            required: true,
            message: formatMessage({
              id: 'user.profile.input.password.required',
              defaultMessage: 'Please enter a password',
            }),
          },
        ]}
      >
        <Input.Password onChange={getChangeHandlerWithEvent('password')} />
      </Form.Item>
      <div className="font-semibold">
        {formatMessage({
          id: 'user.profile.input.contact',
          defaultMessage: 'Contact Information',
        })}
      </div>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.email',
          defaultMessage: 'Email',
        })}
        name="email"
        rules={[
          {
            type: 'email',
            message: formatMessage({
              id: 'user.profile.input.invalidEmail',
              defaultMessage: 'Your email address is invalid',
            }),
          },
          {
            required: true,
            message: formatMessage({
              id: 'user.profile.input.enterEmail',
              defaultMessage: 'Please enter your email address',
            }),
          },
        ]}
      >
        <Input onChange={getChangeHandlerWithEvent('email')} />
      </Form.Item>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.fullName',
          defaultMessage: 'Full Name',
        })}
        name="fullName"
      >
        <Input onChange={getChangeHandlerWithEvent('fullName')} />
      </Form.Item>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.address',
          defaultMessage: 'Address',
        })}
        name="address"
      >
        <Input onChange={getChangeHandlerWithEvent('address')} />
      </Form.Item>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.detailAddress',
          defaultMessage: 'Detail Address',
        })}
        name="detailedAddress"
      >
        <Input onChange={getChangeHandlerWithEvent('detailedAddress')} />
      </Form.Item>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.dateOfBirth',
          defaultMessage: 'Date of Birth',
        })}
        name="dob"
      >
        <Controller
          name="dob"
          control={control}
          render={({ field }) => <DatePicker {...field} format={dateFormat} />}
        />
      </Form.Item>
      <Form.Item<API.TAuthProfile>
        label={formatMessage({
          id: 'user.profile.input.phoneNumber',
          defaultMessage: 'Phone Number',
        })}
        name="phoneNumber"
      >
        <Input onChange={getChangeHandlerWithEvent('phoneNumber')} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <div className="flex justify-end">
          <Button
            type="primary"
            style={{ marginRight: '5px' }}
            className="btn-medium btn-primary"
            htmlType="submit"
          >
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
      </Form.Item>
    </Form>
  );
};

export default FormInfo;
