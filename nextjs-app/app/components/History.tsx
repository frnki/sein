'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CONTAINER, SECTION_PADDING, SECTION_SUBTITLE, SECTION_TITLE } from '../styles/constants'

const historyData = [
  {
    year: '2024',
    events: [
      '친환경 파고라 특허 출원',
      '서울숲 복합문화공원 프로젝트 완공'
    ]
  },
  {
    year: '2023',
    events: [
      '공공디자인 혁신상 수상',
      '판교 테크노밸리 휴게공간 프로젝트 완공',
      '해운대 해변 공공시설물 설치'
    ]
  },
  {
    year: '2022',
    events: [
      '기업부설연구소 설립',
      '스마트 파고라 시스템 개발',
      '도시재생 프로젝트 10건 수주'
    ]
  },
  {
    year: '2021',
    events: [
      '세인디자인 법인 설립',
      '디자인 연구소 설립',
      '첫 공공시설물 프로젝트 수주'
    ]
  },
  {
    year: '2020',
    events: [
      '스마트시티 프로젝트 참여',
      '친환경 소재 개발 착수',
      '디자인 특허 5건 등록'
    ]
  },
  {
    year: '2019',
    events: [
      '도시재생 뉴딜사업 참여',
      '스마트 가로등 시스템 개발',
      '해외 수출 시작'
    ]
  },
  {
    year: '2018',
    events: [
      '세인디자인 설립',
      '첫 파고라 프로젝트 수주',
      '디자인팀 구성'
    ]
  }
]

export default function History() {
  const firstColumn = historyData.slice(0, 4)
  const secondColumn = historyData.slice(4)

  return (
    <div className={`${SECTION_PADDING} bg-neutral-950 text-white`}>
      <div className={CONTAINER}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className={SECTION_TITLE}>연혁</h2>
          <p className={SECTION_SUBTITLE}>
            세인디자인이 걸어온 길
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="relative space-y-12">
              <div className="absolute left-0 top-2 bottom-0 w-px bg-white/20" />
              
              {firstColumn.map((period, index) => (
                <motion.div
                  key={period.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-blue-500" />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-blue-400">{period.year}</h3>
                    <ul className="space-y-2">
                      {period.events.map((event, i) => (
                        <li key={i} className="text-gray-400">
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative space-y-12">
              <div className="absolute left-0 top-2 bottom-0 w-px bg-white/20" />
              
              {secondColumn.map((period, index) => (
                <motion.div
                  key={period.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-blue-500/50" />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-blue-400/50">{period.year}</h3>
                    <ul className="space-y-2">
                      {period.events.map((event, i) => (
                        <li key={i} className="text-gray-500">
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <Link href="/history">
              전체 연혁 보기 →
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 