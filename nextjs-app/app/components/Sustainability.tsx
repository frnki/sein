'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

export default function Sustainability() {
  const [activeTab, setActiveTab] = useState('environmental')

  const esgActivities = [
    {
      id: 'environmental',
      title: "환경 (Environmental)",
      description: "SEIN은 환경 보호와 지속 가능한 발전을 위해 다양한 노력을 기울이고 있습니다.",
      activities: [
        { name: "친환경 자재 사용", progress: 85 },
        { name: "에너지 효율적인 설계", progress: 90 },
        { name: "폐기물 최소화 프로그램", progress: 75 },
        { name: "탄소 배출량 감축", progress: 70 },
      ]
    },
    {
      id: 'social',
      title: "사회 (Social)",
      description: "우리는 직원, 고객, 그리고 지역 사회와의 긍정적인 관계 구축에 힘쓰고 있습니다.",
      activities: [
        { name: "지역 사회 참여 프로그램", progress: 80 },
        { name: "직원 복지 및 ���발 프로그램", progress: 95 },
        { name: "다양성과 포용성 증진", progress: 85 },
        { name: "공정한 노동 관행", progress: 90 },
      ]
    },
    {
      id: 'governance',
      title: "지배구조 (Governance)",
      description: "SEIN은 투명하고 책임 있는 기업 운영을 통해 이해관계자들의 신뢰를 얻고 있습니다.",
      activities: [
        { name: "투명한 기업 운영", progress: 95 },
        { name: "윤리적 비즈니스 관행", progress: 90 },
        { name: "이해관계자 소통 강화", progress: 85 },
        { name: "리스크 관리 체계 구축", progress: 80 },
      ]
    },
  ]

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">지속 가능성 (ESG 활동)</h2>
      <p className="text-center mb-8 max-w-3xl mx-auto">
        SEIN은 환경과 사회에 대한 책임을 다하며, 지속 가능한 미래를 위해 노력하고 있습니다.
        우리의 ESG 활동은 기업의 장기적인 성장과 사회적 가치 창출을 동시에 추구합니다.
      </p>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">ESG 활동</CardTitle>
          <CardDescription>SEIN의 환경, 사회, 지배구조 관련 활동</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              {esgActivities.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>{category.title.split(' ')[0]}</TabsTrigger>
              ))}
            </TabsList>
            {esgActivities.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="mb-4">{category.description}</p>
                  <div className="space-y-4">
                    {category.activities.map((activity, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span>{activity.name}</span>
                          <span>{activity.progress}%</span>
                        </div>
                        <Progress value={activity.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

