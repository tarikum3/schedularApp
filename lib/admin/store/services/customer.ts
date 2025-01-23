

import { serviceApi } from './serviceApi';







export const customerApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getCustomers: builder.query<any, any>({
          query: ({ page = 1, limit = 10, searchText = '' }) => ({
            url: `admin/customer?page=${page}&limit=${limit}&searchText=${searchText}`,
            method: "GET",
          }),
          providesTags: ["Customer", ],
        }),
    
        createCustomer: builder.mutation<any, any>({
          query: (customer) => ({
            url: "admin/customer",
            method: "POST",
            body: customer,
          }),
          // transformResponse: (response: Customer) => response.data.customer,
          invalidatesTags: ["Customer"],
        }),
        updateCustomer: builder.mutation<
        any,
        any & { id: string }
      >({
        query: (customer) => {
          let { id } = customer;
  
          return {
            url: `admin/customer/${id}`,
            method: "PUT",
            body: customer,
          };
        },
  
        invalidatesTags: ["Customer"],
      }),

      }),

})
export const { useGetCustomersQuery ,useCreateCustomerMutation,useUpdateCustomerMutation} = customerApi