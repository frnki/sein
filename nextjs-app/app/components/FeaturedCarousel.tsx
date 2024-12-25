'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const featuredProducts = [
  {
    id: 1,
    name: '친수형 파고라 A-Type',
    image: '/placeholder.svg?height=400&width=600',
    code: 'SP1545-1',
  },
  {
    id: 2,
    name: '친수형 파고라 B-Type',
    image: '/placeholder.svg?height=400&width=600',
    code: 'SP1544',
  },
  {
    id: 3,
    name: '친수형 파고라 C-Type',
    image: '/placeholder.svg?height=400&width=600',
    code: 'SP1543',
  },
  {
    id: 4,
    name: '친수형 파고라 D-Type',
    image: '/placeholder.svg?height=400&width=600',
    code: 'SP1542',
  },
  {
    id: 5,
    name: '친수형 파고라 E-Type',
    image: '/placeholder.svg?height=400&width=600',
    code: 'SP1541',
  },
] // Add up to 10 products

export default function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev())
      setNextBtnEnabled(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">대표 상품</h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-[0_0_40%] min-w-0 md:flex-[0_0_30%]">
                  <Card>
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.code}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

