'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CONTAINER, SECTION_PADDING, SECTION_SUBTITLE, SECTION_TITLE } from '../styles/constants'

const categories = [
  {
    id: 1,
    title: '주거공간',
    description: '편안하고 아늑한 주거 공간 디자인',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    count: 24
  },
  {
    id: 2,
    title: '상업공간',
    description: '브랜드 가치를 높이는 상업 공간',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
    count: 18
  },
  {
    id: 3,
    title: '공용공간',
    description: '모두를 위한 열린 공공 공간',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop',
    count: 12
  },
  {
    id: 4,
    title: '특수공간',
    description: '목적에 최적화된 특수 공간',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop',
    count: 8
  }
]

export default function ProductCategories() {
  return (
    <div className={SECTION_PADDING}>
      <div className={CONTAINER}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className={SECTION_TITLE}>공간 디자인</h2>
          <p className={SECTION_SUBTITLE}>
            목적에 맞는 최적의 공간 솔루션을 제안합니다
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -5 }}
              className="group relative h-[400px] overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-white/80">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

