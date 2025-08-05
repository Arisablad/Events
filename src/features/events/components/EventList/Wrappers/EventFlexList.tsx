import { EventListItem } from '../EventListItem'
import type { EventListProps } from './EventList.types'

const EventFlexList = ({ events, onEventClick }: EventListProps) => {
  return (
    <div className={'flex flex-col gap-4'}>
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

export { EventFlexList }
