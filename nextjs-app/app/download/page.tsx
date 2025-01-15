"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import Header from "../components/Header";
import ResourcesSection from "../components/support/ResourcesSection";

export default function DownloadPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto py-16 ">
          {/* 페이지 헤더 */}
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              자료 다운로드
            </h1>
            <p className="text-lg text-gray-600">
              세인디자인의 제품 자료집과 거래가격 정보를 다운로드할 수 있습니다.
            </p>
          </div>

          <div className="space-y-24">
            <ResourcesSection />

            <section className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-3">추가 문의하기</h2>
                <p className="text-gray-600">
                  자료에 대해 궁금한 점이 있으시다면 문의해 주세요.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 rounded-full bg-gray-50">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">전화 문의</h3>
                      <p className="text-sm text-gray-600">02-525-3274</p>
                      <p className="text-sm text-gray-500">평일 9:00 - 18:00</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 rounded-full bg-gray-50">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">이메일 문의</h3>
                      <p className="text-sm text-gray-600">master@spacetalk.co.kr</p>
                      <p className="text-sm text-gray-500">24시간 접수 가능</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
