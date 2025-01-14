'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Header from '../../components/Header'

import 'swiper/css'
import 'swiper/css/navigation'

// Mock project data - 실제로는 API에서 가져와야 함
const getProjectData = (id: number) => ({
  id,
  title: `Project ${id}`,
  subtitle: '도서실 리모델링',
  details: {
    year: '2020',
    location: 'Eunpyeong-gu, Seoul, South Korea',
    program: 'Elementary school library',
    area: '164.71㎡',
    architect: 'SHIN Hyun Bo, JEON So Hyun',
    team: 'LEE Sub',
    construction: 'Baeksang construction',
    photograph: 'LEE Choong-Gun'
  },
  description: [
    '서울 서신초등학교의 도서실 리모델링 계획은...',
    // ... 나머지 설명
  ],
  images: [
    '/placeholder.svg?height=800&width=1200&text=Floor+Plan',
    '/placeholder.svg?height=800&width=1200&text=Interior+1',
    '/placeholder.svg?height=800&width=1200&text=Interior+2',
    '/placeholder.svg?height=800&width=1200&text=Interior+3',
  ]
})

// Mock portfolio items
const portfolioItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  image: `/placeholder.svg?height=400&width=600&text=Project+${i + 1}`,
  year: 2023 - Math.floor(i / 4),
}))

export default function PortfolioDetail() {
  const router = useRouter()
  const params = useParams()
  const [currentProject, setCurrentProject] = useState<any>(null)
  const currentProjectIndex = portfolioItems.findIndex(item => item.id === Number(params.id))

  useEffect(() => {
    // URL 파라미터에서 프로젝트 ID를 가져와서 데이터 로드
    const projectId = Number(params.id)
    if (!isNaN(projectId)) {
      const projectData = getProjectData(projectId)
      setCurrentProject(projectData)
    }
  }, [params.id])

  const handleSlideChange = (swiper: any) => {
    const newProjectId = portfolioItems[swiper.activeIndex].id
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-12">
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Text Content */}
            <div className="h-[calc(100vh-12rem)] overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="h-full overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Title Section */}
                  <div className="border-b pb-8">
                    <h1 className="text-4xl font-bold mb-3">{currentProject.title}</h1>
                    <p className="text-xl text-gray-600">{currentProject.subtitle}</p>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">PROJECT DETAILS</h2>
                    <dl className="grid gap-4 text-sm">
                      {Object.entries(currentProject.details).map(([key, value]) => (
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
                      {currentProject.description.map((paragraph, index) => (
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
            <div className="h-[calc(100vh-12rem)] overflow-hidden bg-white rounded-lg shadow-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="space-y-6 p-6">
                  {currentProject.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md"
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

          {/* Portfolio Carousel */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">다른 프로젝트 둘러보기</h2>
              <Button
                variant="outline"
                size="sm"
                
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
                      ${item.id === currentProject.id ? 'ring-2 ring-primary' : ''}
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

