'use client'

import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import BrandValueIcon from './BrandValueIcon'
import History from './History'

const BRAND_VALUES = [
  {
    id: 1,
    title: '고객 중심 실행',
    description: '고객의 요구에 대한 즉각적인 피드백과 빠른 실행 속도는 세인의 가장 큰 차별화 요소입니다. 설계 변경 요청 후 평균 24시간 내 수정안을 제공하며, 고객의 니즈를 선제적으로 해결합니다.',
    modelType: 'customer' as const
  },
  {
    id: 2,
    title: '품질 기반 신뢰',
    description: '품질 완성도와 신뢰는 브랜드의 가장 중요한 자산입니다. 세밀한 마감과 꼼꼼한 검수 과정을 통해 제품의 디테일과 완성도를 추구하는 끈기는 고객의 숨겨진 니즈까지 해결하며, 신뢰성을 더욱 강화합니다.',
    modelType: 'quality' as const
  },
  {
    id: 3,
    title: '디자인 혁신',
    description: '친수형 파고라와 같은 혁신적인 디자인과 술적 완성도로 고객과 경쟁사 모두에게 인정받고 있습니다. 묵직하면서도 밀도 있는 디자인, 그리고 창의적인 접근을 통해 차별화된 가치를 창출합니다.',
    modelType: 'innovation' as const
  }
]

export default function CompanyOverview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <div className="relative h-screen bg-black overflow-hidden">
        {/* Lens Flare Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-white text-7xl md:text-9xl font-bold leading-tight mb-8">
            Detail is Everything
            </h1>
            
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl text-white font-light">
                완벽한 디테일이 만드는<br />
                특별한 공간의 가치
              </p>
              
              <p className="text-lg text-gray-400 ">
                세심한 디테일에 대한 끊임없는 탐구와<br />
                장인정신으로 완성되는 공간 디자인.<br />
                모든 순간이 의미있는 작품이 됩니다.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>


      {/* Philosophy Section */}
      <div className="relative bg-neutral-950 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-16"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-light">Philosophy</h2>
                <p className="text-[120px] font-bold leading-tight">
                  世 + 人
                </p>
                <p className="text-7xl font-bold">
                  Harmony of Human & Urban Environment
                </p>
              </div>
              <div className="space-y-6 text-xl text-gray-400">
                <p>
                  세인환경디자인은 공공시설물을 통한 행복한 삶을 추구합니다.
                </p>
                <p>
                  빠르게 급변하는 도시환경과 새로운 가치로 대두되는 공공환경에 대해 다양한 욕구를 
                  세인환경디자인의 열정과 도전정신으로 그려 나가고자 합니다.
                </p>
                <p>
                  세인환경디자인은 도시 공간과 관련 다양한 분야의 융합과 다학제적인 사고를 바탕으로 
                  기본기능에 충실한 합리적인 디자인, 친환경적, 친인간적인 디자인을 기본이념으로 두고 있습니다.
                </p>
                <p>
                  혁신적인 자세와 유연한 사고로 디자인, 설계, 제작, 시공 모두
                  최고의 품질로 이용자들이 만족하는 풍요로운 환경을 만들어 가겠습니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Brand Values Section */}
      <div className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Brand Values</h2>
            <p className="text-xl text-gray-400">
              세인디자인이 추구하는 핵심 가치를 소개합니다
            </p>
          </motion.div>

          <div className="space-y-32">
            {BRAND_VALUES.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold">{value.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {value.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <BrandValueIcon modelType={value.modelType} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <History />

      {/* Projects Section */}
      <div className="relative bg-neutral-950 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto space-y-16"
          >
            <div className="space-y-8">
              <h2 className="text-5xl font-light">Projects</h2>
              <p className="text-xl text-gray-400 max-w-2xl">
                세인의 프로젝트는 단순한 시공을 넘어, 공간과 사람을 연결하는 이야기를 담고 있습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "친수형 파고라 프로젝트",
                  description: "친환경 디자인으로 도시와 자연을 연결하는 혁신적 접근",
                  stats: ["프로젝트 기간: 6개월", "고객 만족도: 97%"]
                },
                {
                  title: "공공 공간 설계",
                  description: "사용자 친화적 설계로 지역 사회에 새로운 가능성을 제시",
                  stats: ["수상: 디자인 혁신 대상"]
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden"
                >
                  <div className="relative h-[400px]">
                    <Image
                      src="/placeholder.svg?height=800&width=1200"
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:opacity-75" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="space-y-1">
                        {project.stats.map((stat, i) => (
                          <p key={i} className="text-sm text-gray-400">{stat}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
              >
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

