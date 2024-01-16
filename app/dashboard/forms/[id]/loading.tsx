import React from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <ReloadIcon className='animate-spin h-12 w-12' />
    </div>
  )
}

export default LoadingPage
