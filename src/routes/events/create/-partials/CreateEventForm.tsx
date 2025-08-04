import { DropzoneField } from '@/components/Form/Dropzone'
import { EventTypeEnum, saveEventValidation } from '@/features/events'
import {
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
  type DateValue,
} from '@internationalized/date'
import { I18nProvider } from '@react-aria/i18n'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const CreateEventForm = () => {
  const { t, i18n } = useTranslation(['form', 'validation', 'common'])
  const { schema, defaultValues } = saveEventValidation

  let now = today(getLocalTimeZone())

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema(t)),
    criteriaMode: 'all',
    mode: 'onChange',
  })

  const isDateUnavailable = (date: DateValue) =>
    date < now || date > today(getLocalTimeZone()).add({ years: 1 })

  const onSubmit = (data: typeof defaultValues) => {
    console.log('Form submitted:', data) // TODO handle form submission
  }

  return (
    <Card shadow="sm" className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'mx-auto flex flex-col gap-4 py-16'}
      >
        <Controller
          name={'title'}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t('form:placeholders.title')}
              label={t('form:labels.title')}
              isInvalid={!!errors.title}
              errorMessage={errors?.title?.message}
              onValueChange={field.onChange}
              isRequired
            />
          )}
        />
        <Controller
          name={'description'}
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder={t('form:placeholders.event_description')}
              label={t('form:labels.event_description')}
              isInvalid={!!errors.description}
              errorMessage={errors?.description?.message}
              onValueChange={field.onChange}
              isRequired
              rows={4}
            />
          )}
        />
        <Controller
          name={'event_type'}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={t('form:placeholders.event_type')}
              label={t('form:labels.event_type')}
              isInvalid={!!errors.event_type}
              isRequired
              errorMessage={errors?.event_type?.message}
              onSelectionChange={field.onChange}
              items={Object.values(EventTypeEnum).map((type) => ({
                label: t(`common:event_types.${type.toLowerCase()}`),
                value: type,
              }))}
              selectedKeys={field.value ? [field.value] : []}
            >
              {(item) => (
                <SelectItem
                  key={item.value}
                  textValue={item.label.toString()}
                />
              )}
            </Select>
          )}
        />
        <I18nProvider locale={i18n.language}>
          <Controller
            name={'date'}
            control={control}
            render={({ field }) => (
              <DatePicker
                hideTimeZone
                granularity={'second'}
                showMonthAndYearPickers
                label={t('form:labels.event_date')}
                variant={'bordered'}
                isInvalid={!!errors.date}
                isRequired
                errorMessage={errors?.date?.message}
                isDateUnavailable={isDateUnavailable}
                minValue={now}
                value={field.value ? parseAbsoluteToLocal(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.toDate().toISOString() : null)
                }
              />
            )}
          />
        </I18nProvider>

        <div className={'flex flex-col sm:flex-row gap-2'}>
          <Controller
            name={'location'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t('form:placeholders.location')}
                label={t('form:labels.location')}
                isInvalid={!!errors.location}
                isRequired
                errorMessage={errors?.location?.message}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        <div className={'flex gap-2 flex-col sm:flex-row'}>
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t('form:placeholders.email')}
                label={t('form:labels.email')}
                isInvalid={!!errors.email}
                isRequired
                errorMessage={errors?.email?.message}
                onValueChange={field.onChange}
              />
            )}
          />
          <Controller
            name={'phone_number'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t('form:placeholders.phone_number')}
                label={t('form:labels.phone_number')}
                isInvalid={!!errors.phone_number}
                isRequired
                errorMessage={errors?.phone_number?.message}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <DropzoneField
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors?.images?.message}
              label={t('form:labels.image')}
            />
          )}
        />
        <Button
          type="submit"
          color="default"
          className="w-full"
          isLoading={false}
        >
          {t('form:buttons.create_event')}
        </Button>
      </form>
    </Card>
  )
}

export { CreateEventForm }
