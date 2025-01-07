'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CONTAINER, SECTION_PADDING } from '../styles/constants'

const historyData = [
  {
    year: '2024',
    events: [
      '친환경 파고라 특허 출원',
      '서울숲 복합문화공원 프로젝트 완공',
      '스마트 쉘터 시스템 개발 완료',
      '해외 지사 설립 (베트남)'
    ]
  },
  {
    year: '2023',
    events: [
      '공공디자인 혁신상 수상',
      '판교 테크노밸리 휴게공간 프로젝트 완공',
      '해운대 해변 공공시설물 설치',
      '친환경 소재 연구소 설립',
      '스마트시티 프로젝트 10건 수주'
    ]
  },
  {
    year: '2022',
    events: [
      '기업부설연구소 설립',
      '스마트 파고라 시스템 개발',
      '도시재생 프로젝트 10건 수주',
      '디자인 특허 3건 등록'
    ]
  },
  {
    year: '2021',
    events: [
      '세인디자인 법인 설립',
      '디자인 연구소 설립',
      '첫 공공시설물 프로젝트 수주',
      '기술 연구 개발팀 구성'
    ]
  },
  {
    year: '2020',
    events: [
      '스마트시티 프로젝트 참여',
      '친환경 소재 개발 착수',
      '디자인 특허 5건 등록',
      '해외 시장 조사 및 진출 준비'
    ]
  },
  {
    year: '2019',
    events: [
      '도시재생 뉴딜사업 참여',
      '스마트 가로등 시스템 개발',
      '해외 수출 시작',
      '품질 관리 시스템 구축'
    ]
  },
  {
    year: '2018',
    events: [
      '세인디자인 설립',
      '첫 파고라 프로젝트 수주',
      '디자인팀 구성',
      '기업 부설 연구소 인증',
      '첫 특허 출원'
    ]
  }
]

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24">
      <div className={SECTION_PADDING}>
        <div className={CONTAINER}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4">연혁</h1>
            <p className="text-xl text-gray-400">
              세인디자인이 걸어온 발자취
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {historyData.map((period, index) => (
              <motion.div
                key={period.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 pb-16 last:pb-0"
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />
                <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-500" />
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-bold text-blue-400">{period.year}</h2>
                    <div className="h-px flex-1 bg-white/20" />
                  </div>
                  <ul className="space-y-4">
                    {period.events.map((event, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.1) + (i * 0.05) }}
                        className="text-gray-400 text-lg"
                      >
                        {event}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-24"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              <Link href="/">
                ← 메인으로 돌아가기
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 