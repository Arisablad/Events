import { MainContainer, Navbar } from '@/components/Layout'
import { HeroUIProvider } from '@heroui/react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <HeroUIProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <MainContainer
          classNames={{
            container: 'flex-1 py-6 sm:py-8 lg:py-10',
          }}
        >
          <Outlet />
        </MainContainer>
      </div>
      <TanStackRouterDevtools />
    </HeroUIProvider>
  ),
})
