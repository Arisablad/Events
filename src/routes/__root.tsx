import { Navbar } from '@/components/Layout'
import { HeroUIProvider } from '@heroui/react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <HeroUIProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 w-full max-w-[1400px] mx-auto bg-yellow-300">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </HeroUIProvider>
  ),
})
