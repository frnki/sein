'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from './Header'

export function HeaderWrapper() {
  const [mounted, setMounted] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const pathname = usePathname()
  const isHomePage = pathname === '/about'

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsAtTop(scrollPosition < 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't render anything until after hydration
  if (!mounted) {
    return <Header />
  }

  return (
    <Header 
      className={
        isHomePage && isAtTop 
          ? '!bg-transparent text-white border-none' 
          : undefined
      } 
    />
  )
} 