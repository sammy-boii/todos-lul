'use client'

import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // lazy initialization
  // not wrapping it inside a fn would trigger an eager evaluation and cause it to be created on every render
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute={'class'}
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
export default GlobalContextProvider
