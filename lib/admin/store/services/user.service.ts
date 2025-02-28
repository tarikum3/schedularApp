import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

// Define a simpler User type without nested includes
export type User = Prisma.UserGetPayload<{}>;

// Define a detailed User type with nested includes for getUserById
export type UserDetails = Prisma.UserGetPayload<{
  include: {
    accounts: true;
    AdminUser: true;
    Customer: true;
    sessions: true;
    userNotifications: true;
  };
}>;

// Define the type for the query parameters
interface GetUsersParams {
  page?: number;
  limit?: number;
  searchText?: string;
}

export const userApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Users Query (uses the simpler User type)
    getUsers: builder.query<User[], GetUsersParams>({
      query: ({ page = 1, limit = 10, searchText = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(searchText && { searchText: encodeURIComponent(searchText) }),
        });

        return {
          url: `admin/user?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    // Get User by ID Query (uses the detailed UserDetails type)
    getUserById: builder.query<UserDetails, string>({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Create User Mutation (uses the simpler User type)
    createUser: builder.mutation<User, Prisma.UserCreateInput>({
      query: (user) => ({
        url: "admin/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    // Update User Mutation (uses the simpler User type)
    updateUser: builder.mutation<User, { id: string } & Prisma.UserUpdateInput>(
      {
        query: (user) => {
          const { id } = user;

          return {
            url: `admin/user/${id}`,
            method: "PUT",
            body: user,
          };
        },
        invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
      }
    ),
  }),
});

// Export the hooks with improved types
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
