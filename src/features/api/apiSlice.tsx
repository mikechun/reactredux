import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { RootState } from '../../app/store'

const maxResults = 100

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: ``,
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.accessToken
      headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  refetchOnMountOrArgChange: 1,
  keepUnusedDataFor: 0,
  endpoints: builder => ({
    getUser: builder.query({
      query: (args) => {
        return `/user`
      },
    }),
  })
})

export const { useGetUserQuery } = apiSlice
