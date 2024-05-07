import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@umijs/max';
import * as yup from 'yup';

import {
  CREDIT_KEY,
  LOCATION,
  ONBOARDING_FORM_KEY,
} from '@/pages/lessor/on-boarding/helpers/onboardingFormKeys';
import { TOnboardingFormFields } from '@/pages/lessor/on-boarding/hooks/useOnboardingForm';

const useOnboardingResolver = () => {
  const { formatMessage } = useIntl();
  const OnboardingValidationSchema = yup.object().shape({
    [ONBOARDING_FORM_KEY.address]: yup.string().required(
      formatMessage({
        id: 'lessor.onboarding.address.null',
        defaultMessage: 'Please input your address',
      }),
    ),
    [ONBOARDING_FORM_KEY.location]: yup
      .mixed<LOCATION>()
      .oneOf(Object.values(LOCATION))
      .required(
        formatMessage({
          id: 'lessor.onboarding.location.null',
          defaultMessage: 'Please add your Biz Location',
        }),
      ),
    [ONBOARDING_FORM_KEY.shopName]: yup.string().required(
      formatMessage({
        id: 'lessor.onboarding.shopName.null',
        defaultMessage: 'Please think of a Shop Name',
      }),
    ),
    [ONBOARDING_FORM_KEY.avatar]: yup
      .array()
      .of(
        yup.object().shape({
          response: yup.mixed().required(
            formatMessage({
              id: 'lessor.onboarding.avatar.null',
              defaultMessage: 'An Image is Required!',
            }),
          ),
        }),
      )
      .required(
        formatMessage({
          id: 'lessor.onboarding.avatar.null',
          defaultMessage: 'An Image is Required!',
        }),
      )
      .min(
        1,
        formatMessage({
          id: 'lessor.onboarding.avatar.null',
          defaultMessage: 'An Image is Required!',
        }),
      ),
    [ONBOARDING_FORM_KEY.citizenCardBack]: yup
      .array()
      .of(
        yup.object().shape({
          originFileObj: yup.mixed().required(
            formatMessage({
              id: 'lessor.onboarding.citizenCardBack.null',
              defaultMessage: 'An Image is Required!',
            }),
          ),
        }),
      )
      .required(
        formatMessage({
          id: 'lessor.onboarding.citizenCardBack.null',
          defaultMessage: 'An Image is Required!',
        }),
      )
      .min(
        1,
        formatMessage({
          id: 'lessor.onboarding.citizenCardBack.null',
          defaultMessage: 'An Image is Required!',
        }),
      ),
    [ONBOARDING_FORM_KEY.citizenCardFront]: yup
      .array()
      .of(
        yup.object().shape({
          originFileObj: yup.mixed().required(
            formatMessage({
              id: 'lessor.onboarding.citizenCardFront.null',
              defaultMessage: 'An Image is Required!',
            }),
          ),
        }),
      )
      .required(
        formatMessage({
          id: 'lessor.onboarding.citizenCardFront.null',
          defaultMessage: 'An Image is Required!',
        }),
      )
      .min(
        1,
        formatMessage({
          id: 'lessor.onboarding.citizenCardFront.null',
          defaultMessage: 'An Image is Required!',
        }),
      ),
    [ONBOARDING_FORM_KEY.citizenId]: yup
      .string()
      .required(
        formatMessage({
          id: 'lessor.onboarding.citizenId.null',
          defaultMessage: 'Please input your Citizen ID!',
        }),
      )
      .matches(
        /^[0-9]+$/,
        formatMessage({
          id: 'lessor.onboarding.citizenId.digits',
          defaultMessage: 'Please input only digits!',
        }),
      )
      .min(
        12,
        formatMessage({
          id: 'lessor.onboarding.citizenId.exact',
          defaultMessage: '12 digits is required!',
        }),
      )
      .max(
        12,
        formatMessage({
          id: 'lessor.onboarding.citizenId.exact',
          defaultMessage: '12 digits is required!',
        }),
      ),
    [ONBOARDING_FORM_KEY.dob]: yup.string().nullable(),
    [ONBOARDING_FORM_KEY.phoneNumber]: yup
      .string()
      .required(
        formatMessage({
          id: 'lessor.onboarding.phone.null',
          defaultMessage: 'Please input your Phone Number!',
        }),
      )
      .matches(
        /^[0-9]+$/,
        formatMessage({
          id: 'lessor.onboarding.phoneNumber.digits',
          defaultMessage: 'Please input only digits!',
        }),
      ),
    [ONBOARDING_FORM_KEY.fullName]: yup.string().required(
      formatMessage({
        id: 'lessor.onboarding.name.null',
        defaultMessage: 'Please input your Name!',
      }),
    ),
    [ONBOARDING_FORM_KEY.email]: yup
      .string()
      .email(
        formatMessage({
          id: 'lessor.onboarding.email.format',
          defaultMessage: 'Not an Email!',
        }),
      )
      .required(
        formatMessage({
          id: 'lessor.onboarding.email.null',
          defaultMessage: 'Please input your Email!',
        }),
      ),
    [ONBOARDING_FORM_KEY.description]: yup.string().required(
      formatMessage({
        id: 'lessor.onboarding.description.null',
        defaultMessage: 'Please provide a description!',
      }),
    ),
    [ONBOARDING_FORM_KEY.wareHouseAddress]: yup.string().required(
      formatMessage({
        id: 'lessor.onboarding.wareHouseAddress.null',
        defaultMessage: 'Please provide an address to your Warehouse!',
      }),
    ),
    [ONBOARDING_FORM_KEY.paymentInfo]: yup.array().of(
      yup.object().shape({
        [CREDIT_KEY.accountNumber]: yup.string().required(),
        [CREDIT_KEY.bank]: yup.string().required(),
        [CREDIT_KEY.cardType]: yup.string().required(),
        [CREDIT_KEY.holderName]: yup.string().required(),
      }),
    ),
  });

  return {
    FormSchema: yupResolver<TOnboardingFormFields>(OnboardingValidationSchema),
  };
};

export default useOnboardingResolver;
