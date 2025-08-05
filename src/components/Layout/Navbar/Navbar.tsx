import { Link } from '@/components/App'
import {
  Navbar as HerouiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react'
import { useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LangSwitcher, ThemeSwitcher } from '../Switchers'
import { Logo } from './partials'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { t } = useTranslation('common')
  const routerState = useRouterState()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) handleCloseMenu()
  }, [routerState])

  return (
    <HerouiNavbar
      shouldHideOnScroll
      className="shadow-sm dark:border-b dark:border-gray-700"
      maxWidth="full"
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        />
      </NavbarContent>

      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            to="/"
            className={'px-2'}
            color={'tertiary'}
            activeProps={{
              className:
                'text-secondary-500 dark:text-secondary-400 font-semibold',
            }}
          >
            {t('navbar.events')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/events/create"
            className={'px-2'}
            color={'tertiary'}
            activeProps={{
              className:
                'text-secondary-500 dark:text-secondary-700 font-semibold',
            }}
          >
            {t('navbar.add_event')}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="pr-12">
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <LangSwitcher />
        </NavbarItem>
      </NavbarContent>

      {/* MOBILE */}
      {/* If there were more links, I would probably move it to another file and remap it through the object array */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            to="/"
            className={'px-2'}
            color={'tertiary'}
            activeProps={{
              className:
                'text-secondary-500 dark:text-secondary-400 font-semibold',
            }}
          >
            {t('navbar.events')}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to="/events/create"
            className={'px-2'}
            color={'tertiary'}
            activeProps={{
              className:
                'text-secondary-500 dark:text-secondary-700 font-semibold',
            }}
          >
            {t('navbar.add_event')}
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </HerouiNavbar>
  )
}

export { Navbar }
