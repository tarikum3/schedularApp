

import { serviceApi } from './serviceApi';







export const userApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getUsers: builder.query<any, any>({
          query: ({ page = 1, limit = 10, searchText = '' }) => ({
            url: `admin/user?page=${page}&limit=${limit}&searchText=${searchText}`,
            method: "GET",
          }),
          providesTags: ["User", ],
        }),
    
        createUser: builder.mutation<any, any>({
          query: (user) => ({
            url: "admin/user",
            method: "POST",
            body: user,
          }),
          // transformResponse: (response: User) => response.data.user,
          invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation<
        any,
        any & { id: string }
      >({
        query: (user) => {
          let { id } = user;
  
          return {
            url: `admin/user/${id}`,
            method: "PUT",
            body: user,
          };
        },
  
        invalidatesTags: ["User"],
      }),

      }),

})
export const { useGetUsersQuery ,useCreateUserMutation,useUpdateUserMutation} = userApi