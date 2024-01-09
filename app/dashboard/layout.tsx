import React, { ReactNode } from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

import ThemeSwitch from '@/components/theme-switch'
import Logo from '@/public/logo.png'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Image src={Logo} priority width={200} height={200} alt='Logo' />
        <div className="flex gap-4 items-center">
          <ThemeSwitch />
          <UserButton />
        </div>
      </nav>
      <main className='flex w-full flex-grow'>
        {children}
      </main>
    </div>
  )
}

export default Layout
