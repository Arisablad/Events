import { useGetEventsQuery } from '@/features/events'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { match } from 'ts-pattern'
import { EventFlexList, EventGridList, EventHeader, Filters } from './-partials'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { t } = useTranslation('common')
  const { data: events, isLoading } = useGetEventsQuery()
  const [viewType, setViewType] = useState<'flex' | 'grid'>('flex')
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleViewChange = (type: 'flex' | 'grid') => {
    setViewType(type)
  }

  const onEventClick = (eventId: string) => {
    console.log(`Event clicked: ${eventId}`)

    navigate({
      to: '/events/$id',
      params: { id: eventId },
    })
  }

  const onSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredEvents = useMemo(() => {
    if (!searchQuery) {
      return events
    }

    return events?.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [events, searchQuery])

  if (isLoading) {
    return <div>{t('loading')}</div>
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
      />

      {match(viewType)
        .with('flex', () => <EventFlexList {...sharedProps} />)
        .with('grid', () => <EventGridList {...sharedProps} />)
        .otherwise(() => (
          <EventFlexList {...sharedProps} />
        ))}
    </div>
  )
}
