import { EventListItem, useGetEventByIdQuery } from '@/features/events'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: event = null, isLoading } = useGetEventByIdQuery(id)

  if (!event && !isLoading) {
    return <Navigate to="/" />
  }

  return (
    <EventListItem
      event={event}
      classNames={{ container: 'max-w-lg m-auto px-4' }}
    />
  )
}
