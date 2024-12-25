'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CONTAINER, SECTION_PADDING, SECTION_SUBTITLE, SECTION_TITLE } from '../styles/constants'

const points = [
  {
    id: 1,
    title: '고객 중심 빠른 실행력',
    description: '고객의 요구에 대한 즉각적인 피드백과 빠른 실행 속도는 세인의 가장 큰 차별화 요소입니다. 설계 변경 요청 후 평균 24시간 내 수정안을 제공하며, 고객의 니즈를 선제적으로 해결합니다.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070',
    details: [
      '24시간 내 설계 변경안 제공',
      '선제적 니즈 파악 및 해결',
      '즉각적인 피드백 시스템'
    ]
  },
  {
    id: 2,
    title: '완성도 높은 품질 기반의 신뢰',
    description: '품질 완성도와 신뢰는 브랜드의 가장 중요한 자산입니다. 세밀한 마감과 꼼꼼한 검수 과정을 통해 제품의 디테일과 완성도를 추구하는 끈기는 고객의 숨겨진 니즈까지 해결하며, 신뢰성을 더욱 강화합니다.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070',
    details: [
      '완벽한 품질 검수 시스템',
      '체계적 하자 방지 관리',
      '세밀한 마감 처리'
    ]
  },
  {
    id: 3,
    title: '창의적 디자인 혁신',
    description: '친수형 파고라와 같은 혁신적인 디자인과 기술적 완성도로 고객과 경쟁사 모두에게 인정받고 있습니다. 묵직하면서도 밀도 있는 디자인, 그리고 창의적인 접근을 통해 차별화된 가치를 창출합니다.',
    image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=2070',
    details: [
      '혁신적 디자인 솔루션',
      '기술적 완성도 강화',
      '친환경적 설계'
    ]
  }
]

export default function DifferentiationPoints() {
  return (
    <div className={SECTION_PADDING}>
      <div className={CONTAINER}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className={SECTION_TITLE}>세인디자인의 강점</h2>
          <p className={SECTION_SUBTITLE}>
            고객 신뢰를 바탕으로 혁신적인 가치를 창출합니다
          </p>
        </motion.div>

        <div className="space-y-32">
          {points.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">{point.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {point.description}
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {point.details.map((detail, i) => (
                      <li key={i} className="flex items-center space-x-3 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="text-lg">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`relative h-[500px] overflow-hidden rounded-lg ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={point.image}
                    alt={point.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

