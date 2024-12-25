'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CONTAINER, SECTION_PADDING, SECTION_SUBTITLE, SECTION_TITLE } from '../styles/constants'

const portfolios = [
  {
    id: 1,
    title: '성수동 복합문화공간',
    category: '상업공간',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053',
    year: '2024',
    location: '서울 성동구'
  },
  {
    id: 2,
    title: '판교 스마트오피스',
    category: '오피스',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069',
    year: '2023',
    location: '경기 성남시'
  },
  {
    id: 3,
    title: '해운대 프리미엄 레지던스',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070',
    year: '2023',
    location: '부산 해운대구'
  },
  {
    id: 4,
    title: '제주 자연친화 리조트',
    category: '리조트',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2053',
    year: '2023',
    location: '��주시'
  }
]

export default function FeaturedPortfolio() {
  return (
    <div className={SECTION_PADDING}>
      <div className={CONTAINER}>
        <motion.div className="flex justify-between items-end mb-16">
          <div>
            <h2 className={SECTION_TITLE}>대표 프로젝트</h2>
            <p className={SECTION_SUBTITLE}>
              세인디자인이 만든 특별한 공간들을 소개합니다
            </p>
          </div>
          <Link 
            href="/portfolio"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            더 보기 →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolios.map((item) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative h-[500px] overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                  <div className="flex items-center space-x-3 text-white/80">
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

