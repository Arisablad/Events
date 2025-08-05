import type { EventInterface } from '@/features/events'
import type { Nullable } from '@/types/global'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { I18nProvider } from '@react-aria/i18n'
import { IconCalendar, IconPin } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

type EventListItemProps = Readonly<{
  event: EventInterface
  onEventClick?: (eventId: string) => void
}>

const EventListItem = ({ event, onEventClick }: EventListItemProps) => {
  const { t, i18n } = useTranslation()
  const findImageThumbnail = (images?: Nullable<string[]>) => {
    if (!images?.[0]) return '/default-thumbnail.jpg'

    if (images[0].startsWith('http')) {
      return images[0]
    }

    return `${import.meta.env.VITE_API_URL}${images[0]}`
  }

  return (
    <div onClick={() => onEventClick?.(event.id)} className={'cursor-pointer'}>
      <Card
        className={
          'w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300'
        }
      >
        <CardHeader>
          <div className={'relative h-48 w-full rounded-2xl overflow-hidden'}>
            <img
              src={findImageThumbnail(event.images)}
              alt={event.title}
              className={
                'w-full h-full object-cover hover:opacity-80 hover:brightness-90 transition-transform duration-300'
              }
            />
          </div>
        </CardHeader>
        <CardBody className={'flex flex-col gap-2'}>
          <div className={'flex justify-between px-4'}>
            <h2 className={'text-lg font-semibold'}>{event.title}</h2>
            <span className={'text-sm text-gray-500'}>{event.event_type}</span>
          </div>
          <p className={'px-4 text-sm text-gray-500'}>{event.description}</p>
          <div className={'flex items-center px-4 ml-0.5 gap-2'}>
            <IconCalendar className={'text-secondary'} />
            <I18nProvider locale={i18n.language}>
              <span className={'text-xs text-gray-700 dark:text-gray-400'}>
                {parseAbsoluteToLocal(event.date).toDate().toLocaleString()}
              </span>
            </I18nProvider>
          </div>
          <div className={'flex items-center px-4 ml-0.5 gap-2'}>
            <IconPin className={'text-success'} />
            <span className={'text-xs text-gray-500'}>
              {event.location || t('common:unknown_location')}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export { EventListItem }
