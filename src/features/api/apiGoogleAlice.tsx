import { VideoSettings } from '@mui/icons-material';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { RootState } from '../../app/store'

const maxResults = 100

export const apiGoogleSlice = createApi({
  reducerPath: 'apiGoogle',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `https://www.googleapis.com/youtube/v3`,
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState).auth.googleToken
      headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  refetchOnMountOrArgChange: 1,
  keepUnusedDataFor: 0,
  endpoints: builder => ({
    getVideos: builder.query({
      query: (args) => {
        return `/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&maxResults=100`
      },
    }),
    getSubscriptions: builder.query({
      query: (args) => {
        return '/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=200'
      },
    }),
    getComments: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        console.log('getting videos')
        const mySubscriptions: any = await fetchWithBQ('/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=200')

        const channels = []
        for(const sub of mySubscriptions?.data?.items) {
          console.log(sub.snippet)
          channels.push(sub.snippet.resourceId.channelId)
          // const channel:any = await fetchWithBQ(`/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${sub.snippet.channelId}`)
          // console.log(channel)
        }

        const channelList = channels.join(',')
        console.log(channelList)
        const res:any = await fetchWithBQ(`/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelList}`)
        return res
      },
    }),
  })
})

export const { useGetVideosQuery, useGetSubscriptionsQuery, useGetCommentsQuery } = apiGoogleSlice
