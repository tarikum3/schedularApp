

// import { serviceApi } from './serviceApi';







// export const orderApi = serviceApi.injectEndpoints({
//     endpoints: (builder) => ({
  
//         getOrders: builder.query<any, any>({
//           query: ({ page = 1, limit = 10, searchText = '' }) => ({
//             url: `admin/order?page=${page}&limit=${limit}&searchText=${searchText}`,
//             method: "GET",
//           }),
//           providesTags: ["Order", ],
//         }),
    
//         createOrder: builder.mutation<any, any>({
//           query: (order) => ({
//             url: "admin/order",
//             method: "POST",
//             body: order,
//           }),
//           // transformResponse: (response: Order) => response.data.order,
//           invalidatesTags: ["Order"],
//         }),
//         updateOrder: builder.mutation<
//         any,
//         any & { id: string }
//       >({
//         query: (order) => {
//           let { id } = order;
  
//           return {
//             url: `admin/order/${id}`,
//             method: "PUT",
//             body: order,
//           };
//         },
  
//         invalidatesTags: ["Order"],
//       }),

//       }),

// })
// export const { useGetOrdersQuery ,useCreateOrderMutation,useUpdateOrderMutation} = orderApi




import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

// Define a simpler Order type without nested includes
export type Order = Prisma.OrderGetPayload<{}>;

// Define a detailed Order type with nested includes for getOrderById
export type OrderDetails = Prisma.OrderGetPayload<{
  include: {
    items: true;
    Customer: true;
  };
}>;

// Define the type for the query parameters
interface GetOrdersParams {
  page?: number;
  limit?: number;
  searchText?: string;
}

export const orderApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Orders Query (uses the simpler Order type)
    getOrders: builder.query<Order[], GetOrdersParams>({
      query: ({ page = 1, limit = 10, searchText = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(searchText && { searchText: encodeURIComponent(searchText) }),
        });

        return {
          url: `admin/order?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Order"],
    }),

    // Get Order by ID Query (uses the detailed OrderDetails type)
    getOrderById: builder.query<OrderDetails, string>({
      query: (id) => ({
        url: `admin/order/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Create Order Mutation (uses the simpler Order type)
    createOrder: builder.mutation<Order, Prisma.OrderCreateInput>({
      query: (order) => ({
        url: "admin/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    // Update Order Mutation (uses the simpler Order type)
    updateOrder: builder.mutation<
      Order,
      { id: string } & Prisma.OrderUpdateInput
    >({
      query: (order) => {
        const { id } = order;

        return {
          url: `admin/order/${id}`,
          method: "PUT",
          body: order,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),
  }),
});

// Export the hooks with improved types
export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderApi;