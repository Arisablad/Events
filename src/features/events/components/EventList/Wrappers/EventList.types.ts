import type { EventInterface } from '../../../types'

type EventListProps = Readonly<{
  events: EventInterface[]
  onEventClick?: (eventId: string) => void
}>

export type { EventListProps }
