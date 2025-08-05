import { RTK_TAGS } from '@/lib/configs'
import { linkHelper } from '@/lib/helpers'
import { API_ROUTES } from '@/lib/routes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { EventInterface } from '../types'

const baseUrl = import.meta.env.VITE_API_URL

export const eventRepository = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: Object.values(RTK_TAGS),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,

  endpoints: (builder) => ({
    getEvents: builder.query<EventInterface[], void>({
      query: () => API_ROUTES.events.index,
      providesTags: [{ type: RTK_TAGS.EVENT, id: 'LIST' }],
      keepUnusedDataFor: 120,
    }),
    getEventById: builder.query<EventInterface, string>({
      query: (id) =>
        linkHelper({
          href: API_ROUTES.events.show,
          params: { id },
          isApiRoute: true,
        }),
      providesTags: (_, __, id) => [{ type: RTK_TAGS.EVENT, id }],
    }),
    storeEvent: builder.mutation<EventInterface, FormData>({
      query: (formData) => ({
        url: API_ROUTES.events.create,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: RTK_TAGS.EVENT, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetEventsQuery,
  useStoreEventMutation,
  useGetEventByIdQuery,
} = eventRepository
