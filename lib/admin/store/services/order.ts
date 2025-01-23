

import { serviceApi } from './serviceApi';







export const orderApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getOrders: builder.query<any, any>({
          query: ({ page = 1, limit = 10, searchText = '' }) => ({
            url: `admin/order?page=${page}&limit=${limit}&searchText=${searchText}`,
            method: "GET",
          }),
          providesTags: ["Order", ],
        }),
    
        createOrder: builder.mutation<any, any>({
          query: (order) => ({
            url: "admin/order",
            method: "POST",
            body: order,
          }),
          // transformResponse: (response: Order) => response.data.order,
          invalidatesTags: ["Order"],
        }),
        updateOrder: builder.mutation<
        any,
        any & { id: string }
      >({
        query: (order) => {
          let { id } = order;
  
          return {
            url: `admin/order/${id}`,
            method: "PUT",
            body: order,
          };
        },
  
        invalidatesTags: ["Order"],
      }),

      }),

})
export const { useGetOrdersQuery ,useCreateOrderMutation,useUpdateOrderMutation} = orderApi