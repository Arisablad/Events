import { useTranslation } from 'react-i18next'

const EventHeader = () => {
  const { t } = useTranslation('events')

  return (
    <header className={'flex flex-col pb-4'}>
      <h1 className={'text-3xl font-bold text-primary'}>
        {t('list.header.title')}
      </h1>
      <p className={'text-content4-foreground font-medium text-sm'}>
        {t('list.header.subtitle')}
      </p>
    </header>
  )
}

export { EventHeader }
