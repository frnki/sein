'use client'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import Footer from './components/Footer'
import Header from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAtTop, setIsAtTop] = useState(true)
  const pathname = usePathname()
  const isHomePage = pathname === '/about'

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsAtTop(scrollPosition < 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header 
          className={
            isHomePage && isAtTop 
              ? '!bg-transparent text-white border-none' 
              : undefined
          } 
        />
        <ScrollToTop />
        {children}
        <Footer />
        <Toaster 
          position="top-center" 
          expand={true} 
          richColors 
          closeButton
          theme="system"
          duration={4000}
          style={{ 
            transition: 'all 0.2s ease-out' 
          }}
        />
        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}

