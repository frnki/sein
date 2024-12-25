'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const popularCategories = [
  {
    id: 'landscape',
    title: 'Landscape Furniture',
    subtitle: '휴게시설물',
    image: '/placeholder.svg?height=600&width=800',
    href: '/products/landscape'
  },
  {
    id: 'playground',
    title: 'Playground',
    subtitle: '놀이시설물',
    image: '/placeholder.svg?height=600&width=800',
    href: '/products/playground'
  },
  {
    id: 'smart',
    title: 'NEXTTALK',
    subtitle: '스마트시설물',
    image: '/placeholder.svg?height=600&width=800',
    href: '/products/smart'
  }
]

export default function PopularCategories() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">인기 카테고리</h2>
          <p className="text-xl text-gray-400">가장 많은 관심을 받고 있는 제품 카테고리입니다</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href} className="block group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/30" />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-400 mb-4">{category.subtitle}</p>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="mr-2">자세히 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

