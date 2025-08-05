import { EventListItem } from '../EventListItem'
import type { EventListProps } from './EventList.types'

const EventGridList = ({ events, onEventClick }: EventListProps) => {
  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
      {events.map((event) => (
        <EventListItem
          key={event.id}
          event={event}
          onEventClick={onEventClick}
          classNames={{
            container: 'cursor-pointer',
          }}
        />
      ))}
    </div>
  )
}

export { EventGridList }
