import { eventRepository } from '@/features/events'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [eventRepository.reducerPath]: eventRepository.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventRepository.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
