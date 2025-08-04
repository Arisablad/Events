import { createFileRoute } from '@tanstack/react-router'
import { CreateEventForm } from './-partials'

export const Route = createFileRoute('/events/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateEventForm />
}
