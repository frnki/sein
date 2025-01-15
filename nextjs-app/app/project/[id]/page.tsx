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
    
  },
  description: [
    '서울 서신초등학교의 도서실 리모델링 계획은 기존의 획일화된 도서관 공간을 학생들의 상상력과 창의성을 자극하는 새로운 학습 환경으로 탈바꿈시키는 것을 목표로 했습니다.',
    '프로젝트의 핵심 과제는 한정된 공간 안에서 다양한 활동이 가능한 유연한 공간을 구성하는 것이었습니다. 이를 위해 기존의 고정식 서가와 열람석 배치를 과감히 재구성하여, 자유로운 독서와 그룹 학습, 문화 활동이 자연스럽게 어우러질 수 있는 공간을 디자인했습니다.',
    '공간의 중심부에는 계단식 열람석을 배치하여 수업과 발표, 독서 활동 등 다목적 용도로 활용할 수 있게 했으며, 이는 도서실의 상징적 요소이자 커뮤니티 공간으로 기능합니다. 벽면을 따라 설치된 높낮이가 다른 서가들은 아이들의 눈높이를 고려하여 설계되었으며, 일부는 이동이 가능하도록 제작되어 공간의 가변성을 높였습니다.',
    '자연광을 최대한 활용하기 위해 기존 창호를 확장하고, 실내 조명은 따뜻한 색온도의 간접 조명을 주로 사용하여 편안한 독서 환경을 조성했습니다. 바닥과 벽체, 천장에는 친환경 소재를 사용하여 쾌적한 실내 환경을 구현했으며, 특히 흡음 성능이 우수한 마감재를 적용하여 도서관의 정숙성을 확보했습니다.',
    '가구 선정에 있어서도 학생들의 체형과 사용성을 고려하여 인체공학적 디자인의 가구를 채택했으며, 이동과 재배치가 용이한 모듈형 가구를 다수 도입하여 공간 활용의 유연성을 극대화했습니다. 색채 계획에서는 차분한 베이지톤을 베이스로 하되, 포인트 컬러를 전략적으로 사용하여 생동감 있는 공간을 연출했습니다.',
    '본 프로젝트는 단순한 리모델링을 넘어, 미래 교육 환경의 새로운 모델을 제시하고자 했습니다. 완공 후 이용자 만족도 조사에서도 높은 평가를 받았으며, 특히 학생들의 도서관 이용 시간이 크게 증가했다는 점에서 의미 있는 성과를 거두었습니다. 이는 공간 디자인이 교육 환경과 학습 동기 부여에 미치는 영향을 잘 보여주는 사례라 할 수 있습니다.'
  ],
  products: [
    {
      id: 1,
      name: 'Modern Reading Chair',
      category: 'Furniture',
      price: '₩450,000',
      image: '/placeholder.svg?height=400&width=400&text=Chair',
      link: '/shop/chair-1'
    },
    {
      id: 2,
      name: 'Adjustable Desk Lamp',
      category: 'Lighting',
      price: '₩89,000',
      image: '/placeholder.svg?height=400&width=400&text=Lamp',
      link: '/shop/lamp-1'
    },
    {
      id: 3,
      name: 'Modular Bookshelf',
      category: 'Storage',
      price: '₩750,000',
      image: '/placeholder.svg?height=400&width=400&text=Shelf',
      link: '/shop/shelf-1'
    },
    // ... more products
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
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Text Content - 스크롤 유지 */}
            <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] overflow-hidden bg-white">
              <div className="h-full overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Title Section */}
                  <div className=" pb-8">
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

            {/* Right: Images - 윈도우 스크롤로 변경 */}
            <div className="col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-6">
                  {currentProject.images.map((image, index) => (
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
              {currentProject.products.map((product) => (
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

