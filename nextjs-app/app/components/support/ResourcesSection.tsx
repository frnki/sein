'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight, Cog, Dumbbell, Gift, Tag } from 'lucide-react'

const resources = [
  {
    id: 1,
    title: '운동시설물',
    subtitle: '2023 제품자료집',
    icon: Dumbbell,
    url: '#'
  },
  {
    id: 2,
    title: '스마트시설물',
    subtitle: '2023 제품자료집',
    icon: Cog,
    url: '#'
  },
  {
    id: 3,
    title: '조달제품',
    subtitle: '2023 조달 카탈로그',
    icon: Gift,
    url: '#'
  },
  {
    id: 4,
    title: '물가자료',
    subtitle: '놀이·운동 시설물',
    icon: ArrowUpRight,
    url: '#'
  },
  {
    id: 5,
    title: '물가자료',
    subtitle: '휴게 시설물',
    icon: ArrowUpRight,
    url: '#'
  },
  {
    id: 6,
    title: '24년 6월 거래 가격',
    subtitle: '거래 가격',
    icon: Tag,
    url: '#'
  }
]

export default function ResourcesSection() {
  const handleDownload = (url: string) => {
    // Handle file download
    window.open(url, '_blank')
  }

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => {
          const Icon = resource.icon
          return (
            <Card
              key={resource.id}
              className="transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5" />
                    <h3 className="text-lg font-medium">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {resource.subtitle}
                  </p>
                  <button
                    onClick={() => handleDownload(resource.url)}
                    className={cn(
                      "mt-auto flex items-center justify-between w-full px-4 py-3",
                      "text-sm border rounded-lg transition-colors duration-200",
                      "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    )}
                  >
                    <span>PDF 다운로드</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

