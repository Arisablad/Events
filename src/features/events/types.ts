import type { Nullable } from '@/types/global'
import type { EventTypeEnum } from './enums'

interface EventInterface {
  id: string
  title: string
  date: string
  description: string
  images?: Nullable<string[]>
  event_type: EventTypeEnum
  phone_number: string
  email: string
  location: string
}

interface SaveEventRequestInterface
  extends Omit<EventInterface, 'id' | 'images'> {
  images?: Nullable<File[]>
}

export type { EventInterface, SaveEventRequestInterface }
