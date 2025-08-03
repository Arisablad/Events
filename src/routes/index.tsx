import { Button } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { t } = useTranslation('common')

  return (
    <div>
      <Button color="primary">{t('home.hello')}</Button>
    </div>
  )
}
