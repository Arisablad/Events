import type { EventInterface } from '@/features/events'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface EventStateInterface {
  events: EventInterface[]
}

const initialState: EventStateInterface = {
  events: [],
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventInterface[]>) => {
      state.events = action.payload
    },
  },
})

export const { setEvents } = eventSlice.actions
export const eventReducer = eventSlice.reducer
