import { PageContainer } from '@ant-design/pro-components';
import { FormattedHTMLMessage } from '@umijs/max';
import { Card } from 'antd';
import { Divider } from 'antd/lib';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import Button from '@/components/Button';
import { Steps } from '@/components/Steps';
import { AdditionalInfo } from '@/pages/lessor/products/add/components/NewProductForm/AdditionalInfo';
import { BasicInfo } from '@/pages/lessor/products/add/components/NewProductForm/BasicInfo';
import { DetailInfo } from '@/pages/lessor/products/add/components/NewProductForm/DetailInfo';
import { RentalInfo } from '@/pages/lessor/products/add/components/NewProductForm/RentalInfo';
import { useAddProductForm } from '@/pages/lessor/products/add/hooks/useAddProductForm';

const LessorAddProduct: React.FC = () => {
  const {
    currentStep,
    handleNextStep,
    handlePreviousStep,
    stepItems,
    control,
    categoryDetail,
    isLoadingCategoryDetail,
    methods,
  } = useAddProductForm();

  const steps = [
    <AdditionalInfo key="add.product.additionalInfo" control={control} />,

    <BasicInfo key="add.product.basicInfo" control={control} />,
    <DetailInfo
      key="add.product.detailInfo"
      control={control}
      isLoadingCategoryDetail={isLoadingCategoryDetail}
      categoryDetail={categoryDetail}
    />,
    <RentalInfo key="add.product.rentalInfo" control={control} />,
  ];
  return (
    <PageContainer className="w-full max-w-screen-2xl p-4 rounded-lg flex flex-col">
      <FormProvider {...methods}>
        <Card
          rootClassName="p-8 pb-0 bg-neutral-1 rounded-lg flex flex-col"
          actions={[
            <Button key="form-previous" type="default" onClick={handlePreviousStep}>
              <FormattedHTMLMessage id="common.previous" defaultMessage="Back" />
            </Button>,
            false ? (
              <Button key="form-submit" onClick={() => {}} type="primary">
                <FormattedHTMLMessage id="common.submit" defaultMessage="Submit" />
              </Button>
            ) : (
              <Button key="form-next" type="primary" onClick={handleNextStep}>
                <FormattedHTMLMessage id="common.next" defaultMessage="Next" />
              </Button>
            ),
          ]}
          styles={{
            body: { display: 'flex', flexDirection: 'column', height: '100%', padding: 0 },
          }}
        >
          <Steps currentStep={currentStep} stepItems={stepItems} />
          <Divider className="hidden md:block" />
          <section className="flex w-full max-w-5xl justify-center items-center m-auto">
            {steps[currentStep]}
          </section>
        </Card>
      </FormProvider>
    </PageContainer>
  );
};

export default LessorAddProduct;
