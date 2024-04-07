export const policyKeys = [
  'product.policies.correctPurpose',
  'product.policies.not.illegalPurpose',
  'product.policies.not.pawnShop',
];

export const carPolicyKeys = [
  ...policyKeys,
  'product.policies.carDirty',
  'product.policies.not.deliver.prohibited',
  'product.policies.carDirty.handOver',
];

export const furniturePolicyKeys = [
  ...policyKeys,
  'product.policies.furnDirty',
  'product.policies.furnDirty.handOver',
];
