import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'sonner'
import Footer from './components/Footer'
import { HeaderWrapper } from './components/HeaderWrapper'
import { ScrollToTop } from './components/ScrollToTop'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <HeaderWrapper />
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

