import { createApi, fetchBaseQuery,  } from '@reduxjs/toolkit/query/react';


export const serviceApi = createApi({
    baseQuery: fetchBaseQuery({
         baseUrl: '/api'

      }),
  tagTypes: ['Customer', 'Product'],
  endpoints: () => ({}),
});