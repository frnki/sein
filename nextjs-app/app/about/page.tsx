'use client'

import { useEffect, useState } from 'react'
import CompanyOverview from '../components/CompanyOverview'

export default function AboutPage() {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsAtTop(scrollPosition < 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* <Header className={isAtTop ? 'bg-transparent text-white border-none' : ''} /> */}
      <CompanyOverview />
    </div>
  )
}

