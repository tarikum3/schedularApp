import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

// Define a simpler Customer type without nested includes
export type Customer = Prisma.CustomerGetPayload<{}>;

// Define a detailed Customer type with nested includes for getCustomerById
export type CustomerDetails = Prisma.CustomerGetPayload<{
  include: {
    orders: true;
    carts: true;
    user: true;
  };
}>;

// Define the type for the query parameters
interface GetCustomersParams {
  page?: number;
  limit?: number;
  searchText?: string;
}

export const customerApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Customers Query (uses the simpler Customer type)
    getCustomers: builder.query<Customer[], GetCustomersParams>({
      query: ({ page = 1, limit = 10, searchText = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(searchText && { searchText: encodeURIComponent(searchText) }),
        });

        return {
          url: `admin/customer?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Customer"],
    }),

    // Get Customer by ID Query (uses the detailed CustomerDetails type)
    getCustomerById: builder.query<CustomerDetails, string>({
      query: (id) => ({
        url: `admin/customer/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Customer", id }],
    }),

    // Create Customer Mutation (uses the simpler Customer type)
    createCustomer: builder.mutation<Customer, Prisma.CustomerCreateInput>({
      query: (customer) => ({
        url: "admin/customer",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),

    // Update Customer Mutation (uses the simpler Customer type)
    updateCustomer: builder.mutation<
      Customer,
      { id: string } & Prisma.CustomerUpdateInput
    >({
      query: (customer) => {
        const { id } = customer;

        return {
          url: `admin/customer/${id}`,
          method: "PUT",
          body: customer,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Customer", id }],
    }),
  }),
});

// Export the hooks with improved types
export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
