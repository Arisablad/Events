import { Link } from '@/components/App'
import {
  Navbar as HerouiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { LangSwitcher, ThemeSwitcher } from '../Switchers'
import { Logo } from './partials'

const Navbar = () => (
  <HerouiNavbar shouldHideOnScroll className="shadow-sm">
    <NavbarBrand>
      <Logo />
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" to="/">
          Features
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <ThemeSwitcher />
      </NavbarItem>
      <NavbarItem className="hidden lg:flex">
        <LangSwitcher />
      </NavbarItem>
    </NavbarContent>
  </HerouiNavbar>
)

export { Navbar }
