import { PageContainer } from '@ant-design/pro-components';
import { FormattedHTMLMessage } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';

import Button from '@/components/Button';
import { Steps } from '@/components/Steps';
import { useAddProductForm } from '@/pages/lessor/products/add/hooks/useAddProductForm';

const LessorAddProduct: React.FC = () => {
  const { currentStep, handleNextStep, handlePreviousStep, stepItems } = useAddProductForm();
  return (
    <PageContainer className="w-full max-w-screen-2xl p-4 rounded-lg flex flex-col">
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
        styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%', padding: 0 } }}
      >
        <Steps currentStep={currentStep} stepItems={stepItems} />
      </Card>
    </PageContainer>
  );
};

export default LessorAddProduct;
