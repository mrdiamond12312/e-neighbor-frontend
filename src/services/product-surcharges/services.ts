import { useQuery } from '@umijs/max';

import API_ENDPOINTS from '@/services/product-surcharges/api-path';
import { getSurchargeDetail, getSurcharges } from '@/services/product-surcharges/api-services';

export const useSurchargesList = () =>
  useQuery<API.ISurcharge[]>([API_ENDPOINTS.PRODUCT_SURCHARGES], () => getSurcharges(), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

export const useSurchargeDetails = (surchargeId: string) =>
  useQuery<API.ISurcharge>(
    [API_ENDPOINTS.PRODUCT_SURCHARGES_DETAILS, surchargeId],
    () => getSurchargeDetail(surchargeId),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: !!surchargeId,
    },
  );
