import { cn } from '@/lib/helpers'
import type { PropsWithChildren } from 'react'

type MainContainerProps = {
  classNames?: {
    container?: string
  }
}

const MainContainer = ({
  children,
  classNames,
}: PropsWithChildren<MainContainerProps>) => {
  return (
    <div
      className={cn(
        `flex-1 w-full max-w-[1400px] mx-auto`,
        classNames?.container,
      )}
    >
      {children}
    </div>
  )
}

export { MainContainer }
