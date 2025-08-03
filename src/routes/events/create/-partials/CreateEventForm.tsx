import { EventTypeEnum, saveEventValidation } from '@/features/events'
import { Input, Select, SelectItem, Textarea } from '@heroui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const CreateEventForm = () => {
  const { t } = useTranslation(['form', 'validation', 'common'])
  const { schema, defaultValues } = saveEventValidation

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

  const onSubmit = (data: typeof defaultValues) => {
    console.log('Form submitted:', data) // TODO handle form submission
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'max-w-xl mx-auto flex flex-col gap-4'}
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
            errorMessage={errors?.event_type?.message}
            onSelectionChange={field.onChange}
            items={Object.values(EventTypeEnum).map((type) => ({
              label: t(`common:event_types.${type.toLowerCase()}`),
              value: type,
            }))}
            selectedKeys={field.value ? [field.value] : []}
          >
            {(item) => (
              <SelectItem key={item.value} textValue={item.label.toString()} />
            )}
          </Select>
        )}
      />
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
              errorMessage={errors?.phone_number?.message}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
    </form>
  )
}

export { CreateEventForm }
