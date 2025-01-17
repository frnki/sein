"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Calculator, FileDown, FileText, Image, Mail, Phone, Ruler, Settings } from 'lucide-react';
import Header from "../components/Header";

export default function DownloadPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto py-16">
          {/* 페이지 헤더 */}
          <div className="mb-24 max-w-3xl mx-auto text-center">
            <h1 className="text-[2.5rem] font-black text-gray-900 mb-4 tracking-tight">
              자료 다운로드
            </h1>
            <p className="text-[1.2rem] text-gray-600 leading-relaxed">
              세인디자인의 제품 자료집과 거래가격 정보를 다운로드할 수 있습니다.
            </p>
          </div>

          {/* 다운로드 CTA 카드 */}
          <div className="grid md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-200 transition-colors">
                  <FileText className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold">제품 카탈로그</h3>
                <p className="text-gray-600 text-sm">
                  세인디자인의 모든 제품 정보를 한눈에 확인하세요
                </p>
                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <FileDown className="w-4 h-4" />
                  카탈로그 다운로드
                </button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-200 transition-colors">
                  <Calculator className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold">거래가격표</h3>
                <p className="text-gray-600 text-sm">
                  최신 제품 가격 정보를 확인하실 수 있습니다
                </p>
                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <FileDown className="w-4 h-4" />
                  가격표 다운로드
                </button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-200 transition-colors">
                  <FileText className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold">기술 자료</h3>
                <p className="text-gray-600 text-sm">
                  상세 기술 사양과 설치 가이드를 확인하세요
                </p>
                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <FileDown className="w-4 h-4" />
                  기술자료 다운로드
                </button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-200 transition-colors">
                  <Image className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold">3D 렌더링</h3>
                <p className="text-gray-600 text-sm">
                  제품의 3D 렌더링 이미지와 상세 뷰를 확인하세요
                </p>
                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <FileDown className="w-4 h-4" />
                  렌더링 다운로드
                </button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-200 transition-colors">
                  <Ruler className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold">도면 자료</h3>
                <p className="text-gray-600 text-sm">
                  제품의 상세 치수와 설계 도면을 확인하세요
                </p>
                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <FileDown className="w-4 h-4" />
                  도면 다운로드
                </button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-200 transition-colors">
                  <Settings className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold">설치 매뉴얼</h3>
                <p className="text-gray-600 text-sm">
                  제품 설치 및 유지보수에 대한 상세 가이드
                </p>
                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <FileDown className="w-4 h-4" />
                  매뉴얼 다운로드
                </button>
              </CardContent>
            </Card>

          </div>

          <div className="space-y-24">
            {/* <ResourcesSection /> */}

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
                    <div className="p-3 rounded-full bg-gray-100">
                      <Phone className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">전화 문의</h3>
                      <p className="text-sm text-gray-600">02-877-8811</p>
                      <p className="text-sm text-gray-500">평일 9:00 - 18:00</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 rounded-full bg-gray-100">
                      <Mail className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">이메일 문의</h3>
                      <p className="text-sm text-gray-600">seined@naver.com</p>
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
