'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CompanyOverview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <div className="relative h-screen bg-black overflow-hidden">
        {/* Lens Flare Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-white text-6xl md:text-8xl font-bold leading-tight mb-8">
              one story.<br />
              one masterpiece.
            </h1>
            
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl text-white font-light">
                작품은 뚜렷한 이유와 목표를 가지고<br />
                특정한 경험과 영감을 통해 만들어집니다
              </p>
              
              <p className="text-lg text-gray-400 max-w-2xl">
                클라이언트의 이야기, 삶의 흔적을 바탕으로<br />
                의미 있고 가치있는 주거공간을 만들기 위해 연구하며,<br />
                섬세하고 디테일한 디자인으로 공간과 감동을 드립니다.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <div className="relative bg-neutral-950 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-16"
          >
            <div className="space-y-8">
              <h2 className="text-5xl font-light">Philosophy</h2>
              <p className="text-xl text-gray-400">
                세인은 신뢰, 품질, 그리고 창의적 디자인을 중심으로 모든 프로젝트를 수행합니다. 
                우리의 모든 디자인은 고객의 요구를 넘어설 뿐 아니라, 그들의 기대를 앞서갑니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Trust",
                  description: "수십 년간 품질 문제 없이 고객이 믿고 맡길 수 있는 파트너로 자리잡았습니다."
                },
                {
                  title: "Quality",
                  description: "완벽한 마감과 꼼꼼한 검수를 통해 세심하게 품질을 관리합니다."
                },
                {
                  title: "Creative",
                  description: "기존의 틀을 깨고 새로운 가치를 제공하는 혁신적 접근."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <h3 className="text-3xl font-light mb-4 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-light">Vision</h2>
                <p className="text-2xl font-light">
                  삶의 공간을 혁신하는 디자인을 통해<br />
                  더 나은 미래를 만듭니다.
                </p>
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-light">Mission</h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-start">
                    <span className="block w-2 h-2 mt-2 mr-4 bg-blue-500" />
                    <span>품질과 창의적 혁신을 바탕으로 고객의 기대를 뛰어넘는 공간을 제공합니다.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="block w-2 h-2 mt-2 mr-4 bg-blue-500" />
                    <span>지속 가능한 디자인으로 환경과 조화를 이루며, 장기적인 가치를 창출합니다.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative bg-neutral-950 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto space-y-16"
          >
            <div className="space-y-8">
              <h2 className="text-5xl font-light">Projects</h2>
              <p className="text-xl text-gray-400 max-w-2xl">
                세인의 프로젝트는 단순한 시공을 넘어, 공간과 사람을 연결하는 이야기를 담고 있습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "친수형 파고라 프로젝트",
                  description: "친환경 디자인으로 도시와 자연을 연결하는 혁신적 접근",
                  stats: ["프로젝트 기간: 6개월", "고객 만족도: 97%"]
                },
                {
                  title: "공공 공간 설계",
                  description: "사용자 친화적 설계로 지역 사회에 새로운 가능성을 제시",
                  stats: ["수상: 디자인 혁신 대상"]
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden"
                >
                  <div className="relative h-[400px]">
                    <Image
                      src="/placeholder.svg?height=800&width=1200"
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:opacity-75" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="space-y-1">
                        {project.stats.map((stat, i) => (
                          <p key={i} className="text-sm text-gray-400">{stat}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
              >
                <Link href="/portfolio">View All Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

