import type { TFunction } from 'i18next'
import type * as yup from 'yup'

type Nullable<T> = T | null

interface ValidationInterface<T extends object> {
  schema: (t: TFunction) => yup.ObjectSchema<T>
  defaultValues: T
}

export type { Nullable, ValidationInterface }
