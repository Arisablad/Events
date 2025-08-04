import { getAllEvents } from '@/features/events'
import { Button } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { t } = useTranslation('common')

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getAllEvents()

      console.log(events)
    }

    void fetchEvents()
  }, [])

  return (
    <div>
      <Button color="primary">{t('home.hello')}</Button>
    </div>
  )
}
