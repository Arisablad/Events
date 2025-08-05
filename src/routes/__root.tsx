import { MainContainer, Navbar } from '@/components/Layout'
import { store } from '@/store'
import { HeroUIProvider } from '@heroui/react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Provider } from 'react-redux'

export const Route = createRootRoute({
  component: () => (
    <Provider store={store}>
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
    </Provider>
  ),
})
