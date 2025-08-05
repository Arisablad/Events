import type { Nullable } from '@/types/global'
import type { EventTypeEnum } from '../../enums'
import type { EventInterface } from '../../types'

type UseFilteredEventProps = {
  events: EventInterface[]
  searchQuery: string
  selectedType: Nullable<EventTypeEnum>
}

export type UseFilteredEventsProps = UseFilteredEventProps
