'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import Header from '../components/Header'
import CatalogRequestSection from '../components/support/CatalogRequestSection'
import OnlineQuoteSection from '../components/support/OnlineQuoteSection'
import ResourcesSection from '../components/support/ResourcesSection'
import ServiceRequestSection from '../components/support/ServiceRequestSection'
import TransactionPriceSection from '../components/support/TransactionPriceSection'

const SUPPORT_TABS = [
  { id: 'resources', label: '자료집' },
  { id: 'transaction-price', label: '거래가격 공시' },
  { id: 'catalog-request', label: '카탈로그 요청' },
  { id: 'service-request', label: 'A/S 접수' },
  { id: 'online-quote', label: '온라인 견적' }
] as const

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<(typeof SUPPORT_TABS)[number]['id']>('resources')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* 페이지 헤더 */}
          <div className="mb-16 max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              고객 지원
            </h1>
            <p className="text-lg text-gray-600">
              세인디자인은 고객의 니즈에 맞는 최적의 지원을 제공합니다. 
              필요하신 서비스를 선택하시면 전문 담당자가 신속하게 도움을 드리겠습니다.
            </p>
          </div>

          {/* 탭 네비게이션 */}
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="space-y-8"
          >
            <div className="flex justify-start">
              <TabsList className="bg-gray-50 p-1 rounded-lg border border-gray-100">
                {SUPPORT_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="px-6 py-3 rounded-md data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-200"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <TabsContent value="resources">
                <ResourcesSection />
              </TabsContent>
              <TabsContent value="transaction-price">
                <TransactionPriceSection />
              </TabsContent>
              <TabsContent value="catalog-request">
                <CatalogRequestSection />
              </TabsContent>
              <TabsContent value="service-request">
                <ServiceRequestSection />
              </TabsContent>
              <TabsContent value="online-quote">
                <OnlineQuoteSection />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

