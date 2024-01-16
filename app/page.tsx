import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

import ThemeSwitch from "@/components/theme-switch";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/public/logo.png'

export default function Landing() {
  const testimonials = [
    {
        name: 'Isaac',
        avatar: 'I',
        title: 'Software Engineer',
        description: 'This is amazing! It is the best app ever!'
    },
    {
        name: 'Andrea',
        avatar: 'A',
        title: 'Industrial Engineer',
        description: 'This is amazing! It is the best app ever!'
    },
    {
        name: 'Jonathan',
        avatar: 'J',
        title: 'Computer Engineer',
        description: 'This is amazing! It is the best app ever!'
    },
    {
        name: 'Miguel',
        avatar: 'M',
        title: 'Computer Engineer',
        description: 'This is amazing! It is the best app ever!'
    },
    {
        name: 'Alejandro',
        avatar: 'A',
        title: 'Bio Engineer',
        description: 'This is amazing! It is the best app ever!'
    },
    {
        name: 'Rafael',
        avatar: 'I',
        title: 'Waiter',
        description: 'This is amazing! It is the best app ever!'
    },
  ];

  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Link href='/'>
          <Image src={Logo} priority width={35} height={35} alt='Logo' className='rounded-md' />
        </Link>
        <div className="flex gap-4 items-center">
          <SignUpButton />
          <ThemeSwitch />
        </div>
      </nav>
      <main className='w-full h-full'>
        <div className="max-w-3xl mx-auto h-full w-full pt-20">
          <section>
            <h1 className="text-4xl md:text-7xl font-bold  bg-gradient-to-b from-blue-500 to-violet-700 bg-clip-text text-transparent text-center">Build Forms Without The Tears!</h1>
            <p className="text-xl mt-5 text-center font-light">Welcome to Fourmika. No credit card required</p>
          </section>
          <section>
            <div className='mt-20 mb-10'>
              <h2 className='text-center text-2xl text-blue-500 font-extrabold mb-10'>
                  Testimonials
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {testimonials.map(testimonial => (
                      <Card key={testimonial.avatar} className='border-2 border-blue-500 text-blue-400'>
                          <CardHeader>
                              <CardTitle className='flex items-center gap-x-2'>
                                  <div>
                                      <p className='text-lg'>{testimonial.name}</p>
                                      <p className='text-gray-600 text-sm'>{testimonial.title}</p>
                                  </div>
                              </CardTitle>
                              <CardContent className='pt-4 px-0 text-gray-400'>
                                  {testimonial.description}
                              </CardContent>
                          </CardHeader>
                      </Card>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
