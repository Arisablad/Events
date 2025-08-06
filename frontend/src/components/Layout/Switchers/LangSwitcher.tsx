import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import {
  IconBrightnessDown,
  IconBrightnessDownFilled,
} from '@tabler/icons-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LangSwitcher = () => {
  const { t, i18n } = useTranslation('common')

  const isMac = navigator.platform?.toUpperCase().includes('MAC')

  const handleKeyDown = (event: KeyboardEvent) => {
    const modifierKey = isMac ? event.metaKey : event.ctrlKey

    if (modifierKey && event.shiftKey && event.key === '!') {
      event.preventDefault()

      event.stopPropagation()

      i18n.changeLanguage('en')
    } else if (modifierKey && event.shiftKey && event.key === '@') {
      event.preventDefault()

      event.stopPropagation()

      i18n.changeLanguage('pl')
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
          {i18n.language}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Lang Switcher dropdown"
        variant="faded"
        selectedKeys={[i18n.language]}
      >
        <DropdownItem
          key="en"
          onPress={() => i18n.changeLanguage('en')}
          startContent={<IconBrightnessDown />}
          shortcut={isMac ? '⌘⇧1' : 'Ctrl+Shift+1'}
        >
          {t('language.en')}
        </DropdownItem>

        <DropdownItem
          key="pl"
          onPress={() => i18n.changeLanguage('pl')}
          startContent={<IconBrightnessDownFilled />}
          shortcut={isMac ? '⌘⇧2' : 'Ctrl+Shift+2'}
        >
          {t('language.pl')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export { LangSwitcher }
