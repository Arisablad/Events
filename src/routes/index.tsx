import {
  EventTypeEnum,
  useFilteredEvents,
  useGetEventsQuery,
} from '@/features/events'
import type { Nullable } from '@/types/global'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { match } from 'ts-pattern'
import {
  EventFlexList,
  EventGridList,
  EventHeader,
  EventListSkeleton,
  Filters,
} from './-partials'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { t } = useTranslation(['common', 'events'])
  const { data: events = [], isLoading } = useGetEventsQuery()
  const [viewType, setViewType] = useState<'flex' | 'grid'>('grid')
  const [selectedType, setSelectedType] =
    useState<Nullable<EventTypeEnum>>(null)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const { filteredEvents } = useFilteredEvents({
    events: events,
    searchQuery,
    selectedType,
  })

  const handleViewChange = (type: 'flex' | 'grid') => {
    setViewType(type)
  }

  const onEventClick = (eventId: string) => {
    navigate({
      to: '/events/$id',
      params: { id: eventId },
    })
  }

  const onSearch = (query: string) => {
    setSearchQuery(query)
  }

  const onTypeChange = (key: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(
      key.target.value === 'all' ? null : (key.target.value as EventTypeEnum),
    )
  }

  if (isLoading) {
    return <EventListSkeleton viewType={viewType} />
  }

  const sharedProps = {
    events: filteredEvents || [],
    onEventClick,
  }

  return (
    <div className={'flex flex-col gap-4 px-2 md:px-4 lg:px-6'}>
      <EventHeader />
      <Filters
        onViewChange={handleViewChange}
        viewType={viewType}
        onSearch={onSearch}
        selectedType={selectedType}
        onTypeChange={onTypeChange}
      />

      {filteredEvents.length > 0 &&
        match(viewType)
          .with('flex', () => <EventFlexList {...sharedProps} />)
          .with('grid', () => <EventGridList {...sharedProps} />)
          .otherwise(() => <EventFlexList {...sharedProps} />)}

      {filteredEvents.length === 0 && (
        <div className="text-center text-gray-500">
          {t('events.list.no_events')}
        </div>
      )}
    </div>
  )
}
