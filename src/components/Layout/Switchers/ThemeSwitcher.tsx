import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { useTheme } from '@heroui/use-theme'
import {
  IconBrightnessDown,
  IconBrightnessDownFilled,
  IconSphere,
} from '@tabler/icons-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const ThemeSwitcher = () => {
  const { t } = useTranslation('common')
  const { theme, setTheme } = useTheme()

  const isMac = navigator.platform?.toUpperCase().includes('MAC')

  console.log('navigator.platform:', navigator)

  const handleKeyDown = (event: KeyboardEvent) => {
    const modifierKey = isMac ? event.metaKey : event.ctrlKey

    if (modifierKey && event.shiftKey && event.key === 'L') {
      event.preventDefault()

      setTheme('light')
    } else if (modifierKey && event.shiftKey && event.key === 'D') {
      event.preventDefault()

      setTheme('dark')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" isIconOnly size="sm">
          <IconSphere size={14} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme Switcher dropdown"
        variant="faded"
        selectedKeys={[theme]}
      >
        <DropdownItem
          key="light"
          onPress={() => setTheme('light')}
          startContent={<IconBrightnessDown />}
          shortcut={isMac ? '⌘⇧L' : 'Ctrl+Shift+L'}
        >
          {t('theme.light')}
        </DropdownItem>
        <DropdownItem
          key="dark"
          onPress={() => setTheme('dark')}
          startContent={<IconBrightnessDownFilled />}
          shortcut={isMac ? '⌘⇧D' : 'Ctrl+Shift+D'}
        >
          {t('theme.dark')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export { ThemeSwitcher }
