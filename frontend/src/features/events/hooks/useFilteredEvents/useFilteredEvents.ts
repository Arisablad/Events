import { useMemo } from 'react'
import type { UseFilteredEventsProps } from './useFilteredEvents.types'

const useFilteredEvents = ({
  events,
  searchQuery,
  selectedType,
}: UseFilteredEventsProps) => {
  const filteredEvents = useMemo(() => {
    if (!searchQuery && !selectedType) {
      return events
    }

    if (selectedType) {
      return events?.filter(
        (event) =>
          (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          event.event_type === selectedType,
      )
    }

    return events?.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [events, searchQuery, selectedType])

  return {
    filteredEvents,
  }
}

export { useFilteredEvents }
