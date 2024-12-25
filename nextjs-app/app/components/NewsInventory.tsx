'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CONTAINER, SECTION_PADDING, SECTION_SUBTITLE, SECTION_TITLE } from '../styles/constants'

const news = [
  {
    id: 1,
    title: '2024 도시 재생 프로젝트 시작',
    category: '프로젝트',
    date: '2024.03.15',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    excerpt: '지속 가능한 도시 개발을 위한 새로운 프로젝트가 시작되었습니다.'
  },
  {
    id: 2,
    title: '친환경 건축 디자인 어워드 수상',
    category: '수상소식',
    date: '2024.03.10',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071',
    excerpt: '혁신적인 친환경 설계로 국제 건축 어워드에서 대상을 수상했습니다.'
  },
  {
    id: 3,
    title: '스마트 오피스 디자인 트렌드',
    category: '트렌드',
    date: '2024.03.05',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069',
    excerpt: '2024년 새롭게 주목받는 스마트 오피스 디자인 트렌드를 소개합니다.'
  }
]

export default function NewsInventory() {
  return (
    <div className={SECTION_PADDING}>
      <div className={CONTAINER}>
        <motion.div className="flex justify-between items-end mb-16">
          <div>
            <h2 className={SECTION_TITLE}>최신 소식</h2>
            <p className={SECTION_SUBTITLE}>
              세인디자인의 새로운 소식을 전해드립니다
            </p>
          </div>
          <Link 
            href="/news"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            더 보기 →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <motion.article
              key={item.id}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <span className="text-blue-600 text-sm font-medium">{item.category}</span>
              <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">{item.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
} 