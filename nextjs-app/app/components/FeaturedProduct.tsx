'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 1,
    name: '프리미엄 인테리어 패키지',
    description: '고급스러운 공간을 위한 올인원 디자인 솔루션',
    price: '상담문의',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2080',
    features: ['맞춤형 설계', '프리미엄 자재', '전문가 시공', '사후관리']
  }
]

export default function FeaturedProduct() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative h-[500px] overflow-hidden rounded-sm">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h2>
                  <p className="text-gray-600 text-lg">{product.description}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">주요 특징</h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="text-2xl font-bold">{product.price}</div>
                  <Link
                    href="/contact"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-sm hover:bg-blue-700 transition-colors"
                  >
                    상담 신청하기
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

