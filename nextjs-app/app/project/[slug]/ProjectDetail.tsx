'use client'

import { ProjectItem } from '@/app/components/portfolio/ProjectItem'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Header from '../../components/Header'

import 'swiper/css'
import 'swiper/css/navigation'

// Types
interface Product {
  _id: string
  name: string
  code: string
  href: string
  categoryHref: string
  seriesHref: string
  imageUrl: string | null
  additionalImages: (string | null)[]
  material: string[]
  dimensions: {
    width?: number
    depth?: number
    height?: number
  }
  series: string
  category: string
}

interface ProjectDetails {
  year: string
  client: string
}

interface ProjectData {
  _id: string
  title: string
  slug: string
  details: ProjectDetails
  description: string[]
  mainImageUrl: string | null
  images: (string | null)[]
  products: Product[]
  otherProjects: Array<{
    _id: string
    title: string
    href: string
    imageUrl: string | null
  }>
}

interface ProjectDetailProps {
  initialData: ProjectData
}

export function ProjectDetail({ initialData }: ProjectDetailProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto px-4 pb-12">
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Text Content */}
            <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] overflow-hidden bg-white">
              <div className="h-full overflow-y-auto px-6 pt-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                <motion.div
                  key={initialData._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Title Section */}
                  <div className="pb-4">
                    <h1 className="text-4xl font-bold mb-3">{initialData.title}</h1>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">PROJECT DETAILS</h2>
                    <dl className="grid gap-4 text-sm">
                      {Object.entries(initialData.details).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-[100px,1fr] items-baseline">
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
                    <div className="space-y-2 text-gray-600">
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
            <div className="col-span-2 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-6">
                  {initialData.mainImageUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={initialData.mainImageUrl}
                        alt={`${initialData.title} main view`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                  {initialData.images.map((image, index) => (
                    image && (
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
                    )
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Products Carousel */}
          {initialData.products.length > 0 && (
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
                  <SwiperSlide key={product._id}>
                    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                      {/* Product Image */}
                      <div
                        className="group relative aspect-square cursor-pointer"
                        onClick={() => router.push(product.href)}
                      >
                        {product.imageUrl && (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <Link href={product.href}>
                          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                        <p className="text-sm text-gray-500">{product.code}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Other Projects Carousel */}
          {initialData.otherProjects.length > 0 && (
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
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="portfolio-carousel"
              >
                {initialData.otherProjects.map((project) => (
                  <SwiperSlide key={project._id}>
                    <ProjectItem
                      id={project._id}
                      title={project.title}
                      slug={project.href.split('/').pop() || ''}
                      image={project.imageUrl || ''}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 