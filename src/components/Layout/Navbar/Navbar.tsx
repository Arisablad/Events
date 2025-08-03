import { Link } from '@/components/App'
import {
  Navbar as HerouiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { Logo } from './partials'

const Navbar = () => (
  <HerouiNavbar shouldHideOnScroll className="bg-green-500 shadow-sm">
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
      {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        // </NavbarItem> */}{' '}
      {/* REMOVE OR REPLACE WITH OTHER NAVBAR ITEMS */}
    </NavbarContent>
  </HerouiNavbar>
)

export { Navbar }
