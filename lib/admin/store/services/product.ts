

import { serviceApi } from './serviceApi';








export const productApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getProducts: builder.query<any, any>({
          query: ({ page = 1, limit = 10, searchText = '' }) => {
            const params = new URLSearchParams({
              page: page.toString(),
              limit: limit.toString(),
              // ...(fromDate && { fromDate }),
              // ...(toDate && { toDate }),
              ...(searchText && { searchText: encodeURIComponent(searchText) }),

            });

            return {
              url: `admin/product?${params.toString()}`,
              method: 'GET',
            };
          
          },
          providesTags: ["Product", ],
        }),

        createProduct: builder.mutation<any, any>({
          query: (product) => ({
            url: "admin/product",
            method: "POST",
            body: product,
          }),
          // transformResponse: (response: Product) => response.data.product,
          invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation<
        any,
        any & { id: string }
      >({
        query: (product) => {
          let { id } = product;
  
          return {
            url: `admin/product/${id}`,
            method: "PUT",
            body: product,
          };
        },
  
        invalidatesTags: ["Product"],
      }),
        uploadProductImage: builder.mutation<any, any>({
          query: (image) => ({
            url: "admin/product/",
            method: "POST",
            body: image,
          }),
          // transformResponse: (response: Product) => response.data.image,
          invalidatesTags: ["Product"],
        }),
      }),

})
export const { useGetProductsQuery ,useCreateProductMutation,useUploadProductImageMutation,useUpdateProductMutation} = productApi