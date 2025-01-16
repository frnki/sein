'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Header from '../../components/Header'

import 'swiper/css'
import 'swiper/css/navigation'

// Types
interface ProjectData {
  id: number
  title: string
  subtitle: string
  details: Record<string, string>
  description: string[]
  products: Array<{
    id: number
    name: string
    category: string
    price: string
    image: string
    link: string
  }>
  images: string[]
}

interface ProjectDetailProps {
  initialData: ProjectData
}

// Mock portfolio items for the carousel
const portfolioItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  image: `/placeholder.svg?height=400&width=600&text=Project+${i + 1}`,
  year: 2023 - Math.floor(i / 4),
}))

export function ProjectDetail({ initialData }: ProjectDetailProps) {
  const router = useRouter()
  const currentProjectIndex = portfolioItems.findIndex(item => item.id === initialData.id)

  const handleSlideChange = (swiper: any) => {
    const newProjectId = portfolioItems[swiper.activeIndex].id
    // You can implement navigation here if needed
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-12">
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Text Content */}
            <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] overflow-hidden bg-white">
              <div className="h-full overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                <motion.div
                  key={initialData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Title Section */}
                  <div className="pb-8">
                    <h1 className="text-4xl font-bold mb-3">{initialData.title}</h1>
                    <p className="text-xl text-gray-600">{initialData.subtitle}</p>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">PROJECT DETAILS</h2>
                    <dl className="grid gap-4 text-sm">
                      {Object.entries(initialData.details).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-[140px,1fr] items-baseline">
                          <dt className="text-gray-600 font-medium capitalize">
                            {key.replace(/_/g, ' ')}
                          </dt>
                          <dd className="text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">ABOUT PROJECT</h2>
                    <div className="space-y-4 text-gray-600">
                      {initialData.description.map((paragraph, index) => (
                        <p key={index} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Images */}
            <div className="col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-6">
                  {initialData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Project view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Products Carousel */}
          <div className="mt-16 mb-16 bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">관련 제품</h2>
            </div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              loop
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="products-carousel"
            >
              {initialData.products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div 
                    className="group relative aspect-square overflow-hidden rounded-lg bg-white shadow-md 
                      transition-all duration-300 hover:shadow-lg cursor-pointer"
                    onClick={() => router.push(product.link)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm text-white/80">{product.category}</p>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-white/90">{product.price}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Portfolio Carousel */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">다른 프로젝트 둘러보기</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/projects')}
                className="hover:bg-white"
              >
                전체 프로젝트 보기
              </Button>
            </div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              loop
              initialSlide={currentProjectIndex}
              onSlideChange={handleSlideChange}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="portfolio-carousel"
            >
              {portfolioItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <div 
                    className={`
                      relative aspect-[4/3] overflow-hidden rounded-lg shadow-md 
                      transition-all duration-300 hover:shadow-lg
                      ${item.id === initialData.id ? 'ring-2 ring-primary' : ''}
                    `}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 flex items-end p-4">
                      <div>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-white/80 text-sm">{item.year}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  )
} 