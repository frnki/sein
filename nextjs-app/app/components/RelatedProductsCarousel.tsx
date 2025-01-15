'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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

const ImageWithFallback = ({ src, alt, ...props }: any) => {
  const [error, setError] = useState(false)

  return (
    <>
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </>
  )
}

export default function RelatedProductsCarousel({ category }: RelatedProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 3 }
    }
  })
  
  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-8">다른 {category} 제품</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-[0_0_140px] "
              >
                <Link href={`/products/${product.id}`} className="block group">
                  <div className="relative w-[140px] aspect-square overflow-hidden rounded-lg mb-4">
                    <ImageWithFallback
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
      </div>
    </div>
  )
}

