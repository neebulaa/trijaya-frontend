import {
  axiosDelete,
  axiosGet,
  axiosGetAll,
  axiosPost,
  axiosPut,
} from '@/services/api/admin/api.service.ts';
import { IAttributeOption } from '@/types/attributeOption';
import { QueryParams, SuccessResponse } from '@/types/base';
import { QueryOptions } from '@/types/global/queryOptions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAttributeOptions = (params: QueryParams, attributeId: string | any) => {
  return useQuery({
    queryKey: ['attributeOptions', { params }, attributeId],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IAttributeOption>(
        `/v1/admin/attributes/${attributeId}/options`,
        params
      );
    },
  });
};

export const useGetAttributeOption = (id: string, { enabled }: QueryOptions = {}) => {
  return useQuery<SuccessResponse<IAttributeOption>>({
    queryKey: ['attributeOption', id],
    queryFn: async () => {
      return axiosGet(`/v1/admin/attributes/options/${id}`);
    },
    enabled: !!enabled,
  });
};

export const useCreateAttributeOption = (attributeId: string) => {
  return useMutation({
    mutationFn: async (newAttributeOption: any) => {
      return await axiosPost<any, any>(
        `/v1/admin/attributes/options/${attributeId}`,
        newAttributeOption
      );
    },
  });
};

export const useUpdateAttributeOption = (id: string) => {
  return useMutation({
    mutationFn: async (updatedAttributeOption: any) => {
      return await axiosPut<any, any>(`/v1/admin/attributes/options/${id}`, updatedAttributeOption);
    },
  });
};

export const useDeleteAttributeOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await axiosDelete<any>(`/v1/admin/attributes/options/${id}`);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('attributeOptions').then((r) => null);
    },
  });
};
