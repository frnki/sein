'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CONTAINER, SECTION_PADDING, SECTION_SUBTITLE, SECTION_TITLE } from '../styles/constants'

const clients = [
  {
    id: 1,
    name: 'Samsung',
    logo: '/clients/samsung.svg',
  },
  {
    id: 2,
    name: 'Hyundai',
    logo: '/clients/hyundai.png',
  },
  {
    id: 3,
    name: 'LG',
    logo: '/clients/lg.svg',
  
  }
]

export default function TrustedClients() {
  return (
    <div className={SECTION_PADDING}>
      <div className={CONTAINER}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={SECTION_TITLE}>Our Trusted Clients</h2>
          <p className={SECTION_SUBTITLE}>
            20년간 신뢰받아온 세인디자인의 클라이언트를 소개합니다
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
        >
          {clients.map((client) => (
            <div 
              key={client.id}
              className="flex items-center justify-center p-8  rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={2400}
                height={120}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 