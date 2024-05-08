export enum PRODUCT_CLASSIFY_SEGMENT {
  isNotApproved = 'isNotApproved',
  isApproved = 'isApproved',
  isRejected = 'isRejected',
}

export const PRODUCT_CLASSIFY_PAYLOAD: { [key in PRODUCT_CLASSIFY_SEGMENT]: any } = {
  [PRODUCT_CLASSIFY_SEGMENT.isApproved]: {
    isConfirmedByAdmin: true,
  },
  [PRODUCT_CLASSIFY_SEGMENT.isNotApproved]: {
    isConfirmedByAdmin: false,
  },
  [PRODUCT_CLASSIFY_SEGMENT.isRejected]: {
    isConfirmedByAdmin: false,
  },
};

export const ADMIN_SEGMENTS_LOCALES = 'admin.products.management.classifier';
