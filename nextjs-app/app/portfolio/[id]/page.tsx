'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '../../components/Header'

import 'swiper/css'
import 'swiper/css/navigation'

// Mock project data
const projectData = {
  id: 1,
  title: '서신초등학교 도서실',
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
    '서울 서신초등학교의 도서실 리모델링 계획은 시가와 열람공간의 관계를 재구성하는 것에서 시작되었다. 기존 도서실은 시가와 열람석이 공간적으로 구분되어 있었는데, 열람공간에서는 책력하게 움직인 책과 독면이 바라보여 아동고 답답하지 느껴지는 구조였다. 아이들이 동선한 책만 찾내 열람석으로 가져와 보게 되었던 열람공간에서서 책장들이 책을 들 더 가깝게 되가갈 수 있도록 시가와 열람공간을 서로를 조성하고자 하였다.',
    '<시가와 열람공간의 재구성>',
    '도서가 수정된 책장에 아치형 통로 만들어 시가를 선택하듯 들어가니다 책을 찾아보고 시아사이 조성된 북테에서 바로 열람할 수 있도록 계획하였다. 책장 속 열람공간에서 책을 보다가 자연스럽게 다른 책들의 눈에 들어오게 되어 독서의 폭을 넓힐 수 있게 되길 기대해 본다.',
    '<다양한 형태의 열람공간>',
    '초등학교 도서실은 저학년부터 고학년 신장차들까지 다양한 신체조건을 가진 이용자들을 위한 공간이기 때문에 이에 대응할 수 있도록 여러 종류의 열람공간을 조성하였다. 남측에는 좌식 열람공간과 연결된 목사름자에서 부전고 특징하는 기존 FCU 열람공간 사이에 분위를 철치해 열람공간을 마련했다.',
    '[글: 전소현, 2020]'
  ],
  images: [
    '/placeholder.svg?height=800&width=1200&text=Floor+Plan',
    '/placeholder.svg?height=800&width=1200&text=Interior+1',
    '/placeholder.svg?height=800&width=1200&text=Interior+2',
    '/placeholder.svg?height=800&width=1200&text=Interior+3',
  ]
}

// Mock data for portfolio items (normally this would come from an API or database)
const portfolioItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  image: `/placeholder.svg?height=400&width=600&text=Project+${i + 1}`,
  year: 2023 - Math.floor(i / 4), // Distribute projects across recent years
}))

export default function PortfolioDetail() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const currentProjectIndex = portfolioItems.findIndex(item => item.id === projectData.id)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSlideChange = (swiper: any) => {
    const newProjectId = portfolioItems[swiper.activeIndex].id
    router.push(`/portfolio/${newProjectId}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className={`grid md:grid-cols-2 gap-12 ${isMobile ? '' : 'h-[calc(100vh-24rem)] overflow-hidden'}`}>
            {/* Left: Text Content */}
            <div className={`space-y-8 ${isMobile ? '' : 'overflow-y-auto pr-6'}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold mb-2">{projectData.title}</h1>
                <p className="text-xl text-gray-600">{projectData.subtitle}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold">PROJECT DETAILS:</h2>
                <dl className="grid gap-4">
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Project year</dt>
                    <dd>{projectData.details.year}</dd>
                  </div>
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Location</dt>
                    <dd>{projectData.details.location}</dd>
                  </div>
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Program</dt>
                    <dd>{projectData.details.program}</dd>
                  </div>
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Total planning area</dt>
                    <dd>{projectData.details.area}</dd>
                  </div>
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Architect in charge</dt>
                    <dd>{projectData.details.architect}</dd>
                  </div>
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Project team</dt>
                    <dd>{projectData.details.team}</dd>
                  </div>
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Construction</dt>
                    <dd>{projectData.details.construction}</dd>
                  </div>
                  <div className="grid grid-cols-[140px,1fr]">
                    <dt className="text-gray-600">Photograph</dt>
                    <dd>{projectData.details.photograph}</dd>
                  </div>
                </dl>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold">ABOUT PROJECT:</h2>
                <div className="space-y-4 text-gray-600">
                  {projectData.description.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`space-y-8 ${isMobile ? '' : 'overflow-y-auto'}`}
            >
              {projectData.images.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`Project view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Portfolio Carousel */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">다른 프로젝트 둘러보기</h2>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              loop
              initialSlide={currentProjectIndex}
              onSlideChange={handleSlideChange}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="portfolio-carousel"
            >
              {portfolioItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-lg ${item.id === projectData.id ? 'ring-2 ring-primary' : ''}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                      <div>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-white text-sm">{item.year}</p>
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

