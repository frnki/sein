'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const executives = [
  { 
    name: "김세인", 
    position: "CEO", 
    image: "/placeholder.svg?height=400&width=400",
    bio: "20년 이상의 건축 및 디자인 경험을 바탕으로 SEIN을 이끌고 있습니다. 지속 가능한 혁신을 통해 더 나은 삶의 공간을 만들어가는 것이 그의 비전입니다.",
    achievements: [
      "국제 건축 디자인 어워드 3회 수상",
      "지속 가능한 건축 관련 TED 강연 진행",
      "건축 전문 저널 'ArchInnovate' 편집위원"
    ]
  },
  { 
    name: "박혁신", 
    position: "CTO", 
    image: "/placeholder.svg?height=400&width=400",
    bio: "최첨단 기술과 디자인의 융합을 통해 혁신적인 제품 개발을 주도하고 있습니다. 그의 기술적 전문성은 SEIN의 제품이 항상 업계를 선도하도록 합니다.",
    achievements: [
      "AI 기반 건축 설계 시스템 개발",
      "스마트 홈 기술 관련 특허 5건 보유",
      "건축 기술 혁신 컨퍼런스 keynote 스피커"
    ]
  },
  { 
    name: "이창조", 
    position: "디자인 디렉터", 
    image: "/placeholder.svg?height=400&width=400",
    bio: "국제적으로 인정받는 디자이너로, SEIN의 모든 제품에 독특하고 아름다운 디자인을 불어넣습니다. 그의 창의적인 비전은 SEIN을 디자인 혁신의 선두주자로 만들었습니다.",
    achievements: [
      "레드닷 디자인 어워드 수상",
      "뉴욕 현대 미술관 (MoMA) 영구 컬렉션 선정",
      "세계적인 디자인 잡지 'DesignNow' 표지 모델"
    ]
  },
]

export default function TeamIntroduction() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">팀 소개</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {executives.map((exec, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardTitle className="text-xl text-center">{exec.name}</CardTitle>
                  <CardDescription className="text-center">{exec.position}</CardDescription>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{exec.name}</DialogTitle>
                <DialogDescription>{exec.position}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="mb-4">{exec.bio}</p>
                <h4 className="font-semibold mb-2">주요 성과:</h4>
                <ul className="list-disc list-inside">
                  {exec.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-center">팀 구성</h3>
        <p className="text-center max-w-3xl mx-auto">
          SEIN의 팀은 건축가, 디자이너, 엔지니어, 그리고 프로젝트 매니저로 구성되어 있습니다. 
          각 분야의 전문가들이 협력하여 혁신적이고 지속 가능한 건축 솔루션을 제공합니다.
          우리의 다양한 배경과 전문성은 SEIN이 업계를 선도하는 혁신적인 제품을 지속적으로 개발할 수 있게 하는 원동력입니다.
        </p>
      </div>
    </section>
  )
}

