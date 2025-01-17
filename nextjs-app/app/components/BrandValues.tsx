'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

const BRAND_VALUES = [
    {
      id: 1,
      title: "고객 중심 실행",
      description:
        "고객의 요구에 대한 즉각적인 피드백과 빠른 실행 속도는 세인의 가장 큰 차별화 요소입니다. 설계 변경 요청 후 평균 24시간 내 수정안을 제공하며, 고객의 니즈를 선제적으로 해결합니다.",
      modelType: "customer" as const,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "품질 기반 신뢰",
      description:
        "품질 완성도와 신뢰는 브랜드의 가장 중요한 자산입니다. 세밀한 마감과 꼼꼼한 검수 과정을 통해 제품의 디테일과 완성도를 추구하는 끈기는 고객의 숨겨진 니즈까지 해결하며, 신뢰성을 더욱 강화합니다.",
      modelType: "quality" as const,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "디자인 혁신",
      description:
        "친수형 파고라와 같은 혁신적인 디자인과 술적 완성도로 고객과 경쟁사 모두에게 인정받고 있습니다. 묵직하면서도 밀도 있는 디자인, 그리고 창의적인 접근을 통해 차별화된 가치를 창출합니다.",
      modelType: "innovation" as const,
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
  ];
export default function BrandValues() {
  return (
    <section className="relative  text-white py-32 overflow-hidden">
    

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
            Core Values
          </h2>
          <h3 className="text-xl text-neutral-400">세인만의 핵심가치로 고객 만족을 실현합니다</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRAND_VALUES.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-800/50 hover:border-neutral-700/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/50 to-transparent group-hover:opacity-75 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-white transition-all duration-300">
                    {value.title}
                  </h4>
                  <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  )
}
