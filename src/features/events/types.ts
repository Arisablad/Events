import type { Nullable } from '@/types/global'
import type { EventTypeEnum } from './enums'

interface SaveEventRequestInterface {
  title: string
  date: string
  description: string
  images?: Nullable<File[]>
  event_type: EventTypeEnum
  phone_number: string
  email: string
  location: string
}

export type { SaveEventRequestInterface }
