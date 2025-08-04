import type { ValidationInterface } from '@/types/global'
import * as yup from 'yup'
import { EventTypeEnum } from '../enums'
import type { SaveEventRequestInterface } from '../types'

const saveEventValidation: ValidationInterface<SaveEventRequestInterface> = {
  schema: (t) =>
    yup.object().shape({
      title: yup
        .string()
        .min(3, t('validation:min_length', { length: 3 }))
        .max(100, t('validation:max_length', { length: 30 }))
        .required(t('validation:required')),
      date: yup.string().required(t('validation:required')),
      description: yup
        .string()
        .min(10, t('validation:min_length', { length: 10 }))
        .max(500, t('validation:max_length', { length: 500 }))
        .required(t('validation:required')),
      image: yup.mixed<File>().nullable(),
      event_type: yup
        .string()
        .oneOf(Object.values(EventTypeEnum))
        .required(t('validation:required')),
      phone_number: yup
        .string()
        .matches(/^\+?[0-9\s]+$/, t('validation:phone_number'))
        .min(9, t('validation:min_length', { length: 9 }))
        .max(15, t('validation:max_length', { length: 15 }))
        .required(t('validation:required')),
      email: yup
        .string()
        .email(t('validation:email'))
        .required(t('validation:required')),
      location: yup
        .string()
        .min(6, t('validation:min_length', { length: 6 }))
        .required(t('validation:required')),
    }),

  defaultValues: {
    title: '',
    date: '',
    description: '',
    image: null,
    event_type: EventTypeEnum.CULTURE,
    phone_number: '',
    email: '',
    location: '',
  },
}

export { saveEventValidation }
