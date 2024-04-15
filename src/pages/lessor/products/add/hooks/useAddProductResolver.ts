import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@umijs/max';
import * as yup from 'yup';

import {
  ADD_PRODUCT_FORM_KEY,
  INSURANCE_KEY,
  MORTGAGE,
  REQUIRED_DOCUMENTS,
  SURCHARGE_KEY,
  TIME_UNIT,
  TProductFormField,
} from '@/pages/lessor/products/add/helpers/addProductFormKeys';

export const useAddProductResolver = () => {
  const { formatMessage } = useIntl();

  const SurchargeValidationSchema = yup.object().shape({
    [SURCHARGE_KEY.surchargeId]: yup.string().required(
      formatMessage({
        id: 'lessor.addProduct.surCharge.id.null',
        defaultMessage: 'Please provide your surcharge reason!',
      }),
    ),
    [SURCHARGE_KEY.price]: yup
      .number()
      .required(
        formatMessage({
          id: 'lessor.addProduct.surCharge.price.null',
          defaultMessage: 'Please provide your surcharge fee!',
        }),
      )
      .typeError(
        formatMessage({
          id: 'lessor.addProduct.surCharge.price.number',
          defaultMessage: 'Please enter a number!',
        }),
      )
      .test(
        'divided by thoundsand',
        formatMessage({
          id: 'lessor.addProduct.price.notDivideBy1000',
          defaultMessage: 'Price must be divisible by 1000!',
        }),
        (value) => value % 1000 === 0,
      ),
  });

  const InsuranceValidationSchema = yup.object().shape({
    [INSURANCE_KEY.holderName]: yup.string().required(
      formatMessage({
        id: 'lessor.addProduct.insurance.holdername.null',
        defaultMessage: 'Please provide insurance Holder name!',
      }),
    ),
    [INSURANCE_KEY.images]: yup.array().of(
      yup.object().shape({
        originFileObj: yup.mixed().required(
          formatMessage({
            id: 'lessor.addProduct.images.null',
            defaultMessage: 'Please take pictures of your product',
          }),
        ),
      }),
    ),
    [INSURANCE_KEY.description]: yup.string(),
    [INSURANCE_KEY.issueDate]: yup.string().required(
      formatMessage({
        id: 'lessor.addProduct.insurance.issueDate.null',
        defaultMessage: 'Please input the insurance issued date!',
      }),
    ),
    [INSURANCE_KEY.expiryDate]: yup.string().required(
      formatMessage({
        id: 'lessor.addProduct.insurance.expiryDate.null',
        defaultMessage: 'Please input the insurance expiry date!',
      }),
    ),
  });

  const AddProductValidationSchema = yup.object().shape({
    [ADD_PRODUCT_FORM_KEY.name]: yup.string().required(
      formatMessage({
        id: 'lessor.addProduct.name.null',
        defaultMessage: 'Please provide a product name!',
      }),
    ),
    [ADD_PRODUCT_FORM_KEY.images]: yup
      .array()
      .of(
        yup.object().shape({
          originFileObj: yup.mixed().required(
            formatMessage({
              id: 'lessor.addProduct.images.null',
              defaultMessage: 'Please take pictures of your product',
            }),
          ),
        }),
      )
      .required(
        formatMessage({
          id: 'lessor.addProduct.images.null',
          defaultMessage: 'Please take pictures of your product',
        }),
      )
      .min(
        1,
        formatMessage({
          id: 'lessor.addProduct.images.null',
          defaultMessage: 'Please take pictures of your product',
        }),
      ),

    [ADD_PRODUCT_FORM_KEY.description]: yup.string().required(
      formatMessage({
        id: 'lessor.addProduct.description.null',
        defaultMessage: 'Please say something about your product!',
      }),
    ),

    [ADD_PRODUCT_FORM_KEY.price]: yup
      .number()
      .required(
        formatMessage({
          id: 'lessor.addProduct.price.null',
          defaultMessage: 'Please provide your desire rental price!',
        }),
      )
      .test(
        'divided by thoundsand',
        formatMessage({
          id: 'lessor.addProduct.price.notDivideBy1000',
          defaultMessage: 'Price must be divisible by 1000!',
        }),
        (value) => value % 1000 === 0,
      ),

    [ADD_PRODUCT_FORM_KEY.timeUnit]: yup
      .mixed<TIME_UNIT>()
      .oneOf(Object.values(TIME_UNIT))
      .required(
        formatMessage({
          id: 'lessor.addProduct.timeUnit.null',
          defaultMessage: 'Please provide your desire rental period!',
        }),
      ),

    [ADD_PRODUCT_FORM_KEY.category]: yup
      .array()
      .required(
        formatMessage({
          id: 'lessor.addProduct.category.null',
          defaultMessage: 'Please choose your product best-fit category!',
        }),
      )
      .of(
        yup
          .mixed(
            (value) =>
              typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string',
          )
          .required(),
      ),

    [ADD_PRODUCT_FORM_KEY.characteristics]: yup.object(),

    [ADD_PRODUCT_FORM_KEY.value]: yup
      .number()
      .required(
        formatMessage({
          id: 'lessor.addProduct.value.null',
          defaultMessage: 'Please choose your product value!',
        }),
      )
      .typeError(
        formatMessage({
          id: 'lessor.addProduct.surCharge.price.number',
          defaultMessage: 'Please enter a number!',
        }),
      )
      .test(
        'divided by thoundsand',
        formatMessage({
          id: 'lessor.addProduct.price.notDivideBy1000',
          defaultMessage: 'Price must be divisible by 1000!',
        }),
        (value) => value % 1000 === 0,
      ),

    [ADD_PRODUCT_FORM_KEY.policies]: yup.array().of(yup.string().required()),

    [ADD_PRODUCT_FORM_KEY.mortgage]: yup
      .mixed<MORTGAGE>()
      .oneOf(Object.values(MORTGAGE))
      .required(
        formatMessage({
          id: 'lessor.addProduct.mortgage.null',
          defaultMessage: 'Please choose a mortgage strategy!',
        }),
      ),

    [ADD_PRODUCT_FORM_KEY.requiredDocuments]: yup
      .mixed<REQUIRED_DOCUMENTS>()
      .oneOf(Object.values(REQUIRED_DOCUMENTS))
      .required(
        formatMessage({
          id: 'lessor.addProduct.reqDocuments.null',
          defaultMessage: 'Please choose needed Documents from customer!',
        }),
      ),

    [ADD_PRODUCT_FORM_KEY.surcharge]: yup.array().of(SurchargeValidationSchema).required(),
    [ADD_PRODUCT_FORM_KEY.haveInsurance]: yup.boolean().required(
      formatMessage({
        id: 'lessor.addProduct.haveInsurance.null',
        defaultMessage: 'Please tell us if your product has an insurance!',
      }),
    ),

    [ADD_PRODUCT_FORM_KEY.insurance]: yup.object().when('haveInsurance', {
      is: true,
      then: (schema) =>
        schema.shape({
          [INSURANCE_KEY.holderName]: yup.string().required(
            formatMessage({
              id: 'lessor.addProduct.insurance.holdername.null',
              defaultMessage: 'Please provide insurance Holder name!',
            }),
          ),
          [INSURANCE_KEY.images]: yup.array().of(
            yup.object().shape({
              originFileObj: yup.mixed().required(
                formatMessage({
                  id: 'lessor.addProduct.images.null',
                  defaultMessage: 'Please take pictures of your product',
                }),
              ),
            }),
          ),
          [INSURANCE_KEY.description]: yup.string(),
          [INSURANCE_KEY.issueDate]: yup.string().required(
            formatMessage({
              id: 'lessor.addProduct.insurance.issueDate.null',
              defaultMessage: 'Please input the insurance issued date!',
            }),
          ),
          [INSURANCE_KEY.expiryDate]: yup.string().required(
            formatMessage({
              id: 'lessor.addProduct.insurance.expiryDate.null',
              defaultMessage: 'Please input the insurance expiry date!',
            }),
          ),
        }),
      otherwise: (schema) => schema.optional(),
    }),
  });
  return {
    FormSchema: yupResolver<TProductFormField>(AddProductValidationSchema),
    InsuranceValidationSchema,
  };
};
