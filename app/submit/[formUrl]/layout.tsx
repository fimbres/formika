import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import ThemeSwitch from "@/components/theme-switch";
import Logo from '@/public/logo.png'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Link href='/'>
          <Image src={Logo} priority width={35} height={35} alt='Logo' className='rounded-md' />
        </Link>
        <ThemeSwitch />
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
