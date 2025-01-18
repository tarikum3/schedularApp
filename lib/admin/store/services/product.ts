

import { serviceApi } from './serviceApi';







export const productApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
  


        getProducts: builder.query<any, any>({
          query: ({ page = 1, limit = 10, searchText = '' }) => ({
            url: `Products/get-Products?page=${page}&limit=${limit}&searchText=${searchText}`,
            method: "GET",
          }),
          providesTags: ["Product", ],
        }),
    

        // getAllComplainsReport: builder.query<Pagination<Complain>, QueryParams>({
        //   query: ({ page = 1, limit = 10, fromDate, toDate, fromDateApp, toDateApp,fromDateClose, toDateClose, fromDateSub, toDateSub, departmentId, status, assignedTo, assignedBy, InquiryType, hasClaim }) => {
        //     const params = new URLSearchParams({
        //       page: page.toString(),
        //       limit: limit.toString(),
        //       ...(fromDate && { fromDate }),
        //       ...(toDate && { toDate }),
        //       ...(fromDateApp && { fromDateApp }),
        //       ...(toDateApp && { toDateApp }),
        //       ...(fromDateSub && { fromDateSub }),
        //       ...(toDateSub && { toDateSub }),
        //       ...(fromDateClose&& { fromDateClose }),
        //       ...(toDateClose && { toDateClose }),
        //       ...(status && { status }),
        //       ...(InquiryType && { InquiryType: encodeURIComponent(InquiryType) }),
        //       ...(assignedTo && { assignedTo: encodeURIComponent(assignedTo) }),
        //       ...(assignedBy && { assignedBy: encodeURIComponent(assignedBy) }),
        //       ...(departmentId && { departmentId: encodeURIComponent(departmentId) }),
        //       ...(hasClaim && { hasClaim: encodeURIComponent(hasClaim) }),
        //     });
    
        //     return {
        //       url: `complains/get-all-complaintreport?${params.toString()}`,
        //       method: 'GET',
        //     };
        //   },
        //   providesTags: ["allComplains",],
        // }),

      }),

})
export const { useGetProductsQuery } = productApi