import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/events/$eventId"!</div>
}
