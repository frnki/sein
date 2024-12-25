'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

const heroSlides = [
  {
    image: '/images/banner-acrotower.jpg',
    title: 'Urban Design Excellence',
    subtitle: '도시 환경을 혁신하는 디자인'
  },
  {
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1920',
    title: 'Smart City Solutions',
    subtitle: '미래 도시를 위한 스마트 솔루션'
  },
  {
    image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?q=80&w=1920',
    title: 'Sustainable Architecture',
    subtitle: '지속 가능한 건축의 미래'
  }
]

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <Image
                src={slide.image}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              {/* Updated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

              {/* Lens Flare Effect */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="max-w-4xl"
                >
                  <motion.div style={{ opacity, y: textY }}>
                    <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight mb-4">
                      {slide.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/80 font-medium">
                      {slide.subtitle}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 z-20 swiper-button-prev">
        <ChevronLeft className="w-10 h-10 text-white" />
      </div>
      <div className="absolute top-1/2 right-4 z-20 swiper-button-next">
        <ChevronRight className="w-10 h-10 text-white" />
      </div>
    </section>
  )
}

