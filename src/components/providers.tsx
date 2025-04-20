'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
import { RouterProvider } from 'react-aria-components'
import { NuqsProvider } from '~/components/nuqs-provider'
import { ThemeProvider } from '~/components/theme-provider'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <RouterProvider navigate={router.push}>
      <ThemeProvider enableSystem={true} attribute="class">
        <NuqsProvider>{children}</NuqsProvider>
      </ThemeProvider>
    </RouterProvider>
  )
}
