'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock related products
const relatedProducts = [
  {
    id: 'sip-388',
    name: '친수형 파고라 B-Type',
    code: 'SIP-388',
    image: '/placeholder.svg?height=400&width=600&text=Product1',
  },
  {
    id: 'sip-389',
    name: '친수형 파고라 C-Type',
    code: 'SIP-389',
    image: '/placeholder.svg?height=400&width=600&text=Product2',
  },
  {
    id: 'sip-390',
    name: '친수형 파고라 D-Type',
    code: 'SIP-390',
    image: '/placeholder.svg?height=400&width=600&text=Product3',
  },
  {
    id: 'sip-391',
    name: '친수형 파고라 E-Type',
    code: 'SIP-391',
    image: '/placeholder.svg?height=400&width=600&text=Product4',
  },
  {
    id: 'sip-392',
    name: '친수형 파고라 F-Type',
    code: 'SIP-392',
    image: '/placeholder.svg?height=400&width=600&text=Product5',
  },
]

interface RelatedProductsCarouselProps {
  category: string
}

export default function RelatedProductsCarousel({ category }: RelatedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === relatedProducts.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? relatedProducts.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-8">다른 {category} 제품</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / (isMobile ? 1 : 3))}%)`,
            }}
          >
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-full ${
                  isMobile ? 'w-full' : 'w-1/3'
                } px-2`}
              >
                <Link href={`/products/${product.id}`} className="block group">
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.code}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-0 transform -translate-y-1/2"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

