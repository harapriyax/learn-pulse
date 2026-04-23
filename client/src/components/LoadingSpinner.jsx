import React from 'react'
import { Loader2 } from 'lucide-react'
import Logo from './Logo'

const LoadingSpinner = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
      <div className='relative'>
        <div className='h-16 w-16 rounded-2xl gradient-bg flex items-center justify-center shadow-xl animate-pulse-glow'>
          <Logo size={34} />
        </div>
        <Loader2 className='h-6 w-6 animate-spin text-primary absolute -bottom-8 left-1/2 -translate-x-1/2' />
      </div>
      <p className='mt-12 text-sm font-medium text-muted-foreground animate-pulse'>Loading LearnPulse...</p>
    </div>
  )
}

export default LoadingSpinner
