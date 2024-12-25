'use client'

import { Card } from '@/components/ui/card'
import { Download } from 'lucide-react'

const resources = [
  {
    id: 1,
    title: '운동시설물',
    subtitle: '2023 제품자료집',
    type: 'primary',
    url: '#'
  },
  {
    id: 2,
    title: '스마트시설물',
    subtitle: '2023 제품자료집',
    type: 'primary',
    url: '#'
  },
  {
    id: 3,
    title: '조달제품',
    subtitle: '2023 조달 카달로그',
    type: 'primary',
    url: '#'
  },
  {
    id: 4,
    title: '물가지자료',
    subtitle: '놀이·운동 시설물',
    type: 'secondary',
    url: '#'
  },
  {
    id: 5,
    title: '물가지자료',
    subtitle: '휴게 시설물',
    type: 'secondary',
    url: '#'
  }
]

export default function ResourcesSection() {
  const handleDownload = (url: string) => {
    // Handle file download
    window.open(url, '_blank')
  }

  return (
    <Card className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">PDF 자료집</h2>
          <p className="text-gray-600">효율적인 업무처리를 위한 공개 데이터입니다. 버튼을 눌러 다운로드 받으세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => handleDownload(resource.url)}
              className="w-full text-left focus:outline-none group"
            >
              <div 
                className={`
                  aspect-[4/3] rounded-lg p-6 flex flex-col justify-between
                  transition-transform duration-200 group-hover:scale-105
                  ${resource.type === 'primary' 
                    ? 'bg-[#2B4C32] text-white' 
                    : 'bg-[#1F2937] text-white'
                  }
                `}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-sm opacity-80">{resource.subtitle}</p>
                </div>
                <Download className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}

