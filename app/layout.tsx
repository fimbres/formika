import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/providers/theme-provider'
import { Inter } from 'next/font/google'
import NextTopLoader from "nextjs-toploader";

import { Toaster } from '@/components/ui/toaster'
import DesignerContextProvider from '@/context/designer-context'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Formika',
  description: 'Generate forms without any effort',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <DesignerContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </DesignerContextProvider>
      </body>
    </html>
  </ClerkProvider>
  )
}
