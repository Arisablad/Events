import type { EventInterface } from '@/features/events'

type EventListProps = Readonly<{
  events: EventInterface[]
  onEventClick?: (eventId: string) => void
}>

export type { EventListProps }
