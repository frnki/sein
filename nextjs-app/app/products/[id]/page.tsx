'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '../../components/Header'
import { useProductStore } from '../../lib/store'
import FloatingButton from '../../components/FloatingButton'
import RelatedProductsCarousel from '../../components/RelatedProductsCarousel'

// Mock product data - in real app, this would come from an API
const product = {
  id: 'sip-387',
  name: 'MEDIUM PIÉ TOTE (Black)',
  code: 'SIP-387',
  category: '휴게시설물',
  description: `직물이 움직이는 '석재(piédesta)'의 실루엣에서 영감을 얻어 탄생한 파고라입니다.

유연하고 내구성이 강한 Steel Plate/Pipe와 화강석 등의 소재를 사용했습니다.

세인의 시그니처 디자인은 장인의 섬세한 기술력으로 완성되었습니다.

LED 조명이 적용되어 야간에도 아름다운 공간을 연출할 수 있습니다.`,
  specs: {
    code: 'SIP-387',
    size: 'W5700 x D2800 x H3000',
    material: 'Steel Plate/Pipe, 화강석, Polycarbonate, Hard Wood, NT Panel, LED',
    category: '휴게시설물',
  },
  images: [
    '/placeholder.svg?height=800&width=800&text=Image1',
    '/placeholder.svg?height=800&width=800&text=Image2',
    '/placeholder.svg?height=800&width=800&text=Image3',
    '/placeholder.svg?height=800&width=800&text=Image4',
    '/placeholder.svg?height=800&width=800&text=Image5',
  ],
}

// Mock related products
const relatedProducts = [
  {
    id: 'sip-388',
    name: '친수형 파고라 B-Type',
    code: 'SIP-388',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    id: 'sip-389',
    name: '친수형 파고라 C-Type',
    code: 'SIP-389',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    id: 'sip-390',
    name: '친수형 파고라 D-Type',
    code: 'SIP-390',
    image: '/placeholder.svg?height=400&width=600',
  },
]

export default function ProductDetail() {
  const { addProduct } = useProductStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Product Images */}
            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden md:grid grid-cols-5 gap-4 max-h-[600px] overflow-y-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square overflow-hidden rounded-lg ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="md:hidden relative">
                <div className="flex overflow-x-auto snap-x snap-mandatory">
                  {product.images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full snap-center">
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        width={400}
                        height={400}
                        className="object-cover w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <dl className="max-w-sm space-y-2 text-sm">
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">제품번호</dt>
                  <dd>{product.specs.code}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">카테고리</dt>
                  <dd>{product.specs.category}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">Size</dt>
                  <dd>{product.specs.size}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">Material</dt>
                  <dd>{product.specs.material}</dd>
                </div>
              </dl>

              <div className="space-y-4 text-gray-600">
                {product.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-12 text-lg">관심 상품 추가</Button>
                <Button className="flex-1 h-12 text-lg">문의하기</Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">다른 {product.category} 제품</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold mb-1">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-600">{relatedProduct.code}</p>
                </Link>
              ))}
            </div>
          </div>
          <RelatedProductsCarousel category={product.category} />
          <FloatingButton onClick={() => addProduct({
            id: product.id,
            code: product.code,
            image: product.images[0],
          })} />
        </div>
      </main>
    </div>
  )
}

