'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Globe, Mail, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import ContactMethodCard from '../components/ContactMethodCard'
import Header from '../components/Header'
import InquiryForm from '../components/InquiryForm'

const locations = {
  headquarters: {
    name: '본사',
    address: '서울시 강남구 영동대로 82길 25 해승빌딩 3,4층',
    phone: '02-575-3274',
    position: { lat: 37.5087, lng: 127.0632 },
  },
  factory: {
    name: '공장',
    address: '경기도 파주시 문산읍 돈유2로 147-12',
    position: { lat: 37.8526, lng: 126.7866 },
  },
}

const contactMethods = [
  {
    title: '전화문의',
    icon: Phone,
    content: [
      '02-525-3274',
      '상담시간 9 AM - 6 PM',
    ],
    color: 'text-green-500',
    action: { label: '전화 걸기', href: 'tel:02-525-3274' },
  },
  {
    title: '카카오톡 문의',
    icon: MessageCircle,
    content: [
      'spacetalk',
      '친구추가 후 간단한 상담이 가능합니다.',
    ],
    color: 'text-yellow-500',
    action: { label: '카톡으로 상담하기', href: 'https://pf.kakao.com/_xoFmxjxl' },
  },
  {
    title: '이메일 문의',
    icon: Mail,
    content: [
      'master@spacetalk.co.kr',
      '문의사항과 연락처를 함께 보내주세요.',
    ],
    color: 'text-blue-500',
    action: { label: '메일 작성하기', href: 'mailto:master@spacetalk.co.kr' },
  },
  {
    title: '온라인 문의',
    icon: Globe,
    content: [
      '클릭하여 문의를 시작하세요.',
    ],
    color: 'text-purple-500',
    action: { label: '문의 시작하기', href: '#online-inquiry' },
  },
]

const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('product')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-12">
          {/* Location Maps */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {Object.entries(locations).map(([key, location]) => (
              <div key={key} className="space-y-4">
                <h2 className="text-2xl font-bold">{location.name}</h2>
                <p className="text-gray-600">{location.address}</p>
                {location.phone && (
                  <p className="text-gray-600">{location.phone}</p>
                )}
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={location.position}
                    zoom={15}
                  >
                    <Marker position={location.position} />
                  </GoogleMap>
                </LoadScript>
              </div>
            ))}
          </div>

          {/* Contact Methods */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">1:1 문의</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method) => (
                <ContactMethodCard key={method.title} {...method} />
              ))}
            </div>
          </section>

          {/* Online Inquiry Form */}
          <section id="online-inquiry" className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-8">온라인 문의</h2>
            <Tabs defaultValue="product" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-6 bg-white rounded-lg p-1 border">
                <TabsTrigger
                  value="product"
                  className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  제안요청
                </TabsTrigger>
                <TabsTrigger
                  value="construction"
                  className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  건축요청
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  이미지, 도면요청
                </TabsTrigger>
                <TabsTrigger
                  value="other"
                  className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  기타
                </TabsTrigger>
              </TabsList>
              <TabsContent value="product">
                <InquiryForm type="product" />
              </TabsContent>
              <TabsContent value="construction">
                <InquiryForm type="construction" />
              </TabsContent>
              <TabsContent value="design">
                <InquiryForm type="design" />
              </TabsContent>
              <TabsContent value="other">
                <InquiryForm type="other" />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}

