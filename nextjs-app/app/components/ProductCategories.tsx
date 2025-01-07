'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CONTAINER, SECTION_PADDING, SECTION_SUBTITLE, SECTION_TITLE } from '../styles/constants'

const categories = [
  {
    id: 1,
    title: '파고라',
    description: '정교한 디테일로 완성되는 프리미엄 파고라',
    image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=2070',
    count: 24
  },
  {
    id: 2,
    title: '어닝',
    description: '공간의 가치를 높이는 맞춤형 디자인',
    image: 'https://images.unsplash.com/photo-1697609709300-d7409f2c2459?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count: 18
  },
  {
    id: 3,
    title: '공공시설물',
    description: '세심한 완성도의 도시 경관 디자인',
    image: 'https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?q=80&w=2071',
    count: 12
  },
  {
    id: 4,
    title: '특수구조물',
    description: '디테일한 설계로 완성되는 특수 구조물',
    image: 'https://images.unsplash.com/photo-1496564203457-11bb12075d90?q=80&w=2070',
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
          <h2 className={SECTION_TITLE}>디테일이 만드는 차이</h2>
          <p className={SECTION_SUBTITLE}>
            세심한 디테일로 완성되는 최적의 공간 솔루션
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

