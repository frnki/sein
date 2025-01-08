'use client'

import { Button } from '@/components/ui/button'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { DynamicRing } from './DynamicRing'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-[150vh] w-full bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Scene */}
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          className="absolute inset-0"
        >
          <DynamicRing scrollProgress={scrollYProgress} />
          <Environment preset="city" />
        </Canvas>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ opacity }}
                className="space-y-8"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                  style={{ y: textY }}
                >
                Timeless Quality<br />driven by Design.
                </motion.h1>
                
                <motion.div 
                  className="space-y-6"
                  style={{ y: textY }}
                >
                  <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                    당신의 이야기를 담은 공간, 세인만의 창의적 디자인과 신뢰를 통해 완성됩니다.
                  </p>
                  
                  <p className="text-gray-400 leading-relaxed">
                    우리는 단순한 설치를 넘어, 영감을 주는 공간과 오래도록 기억에 남을 디자인을 만듭니다.<br />
                    프로젝트에 맞는 섬세한 디테일과 품질로 새로운 가치를 창조합니다.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 transition-all duration-300 text-base"
                    >
                      <Link href="/projects">
                        포트폴리오 보기
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-base"
                    >
                      <Link href="/contact">
                        문의하기
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

