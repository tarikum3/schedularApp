import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { serviceApi } from '@/lib/admin/store/services/serviceApi'

export const store = configureStore({
  // Add the generated reducer as a specific top-level slice
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,

  },

  
   // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(serviceApi.middleware);
    },
    devTools:process.env.NODE_ENV !=='production',
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch