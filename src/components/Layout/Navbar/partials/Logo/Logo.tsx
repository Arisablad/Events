import { IconCalendar } from '@tabler/icons-react'

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <IconCalendar />
      <span className="text-2xl font-bold text-content1-foreground dark:text-white">
        Alan Events
      </span>
    </div>
  )
}

export { Logo }
