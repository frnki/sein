"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import InquiryForm from "../components/InquiryForm";
import CatalogRequestSection from "../components/support/CatalogRequestSection";
import OnlineQuoteSection from "../components/support/OnlineQuoteSection";
import ServiceRequestSection from "../components/support/ServiceRequestSection";

export function LocationSection() {
  const handleLocationClick = (type: 'headquarters' | 'factory') => {
    const urls = {
      headquarters: 'https://map.naver.com/p/search/%EC%98%81%EB%93%B1%ED%8F%AC%EB%A1%9C5%EA%B8%B8%2019',
      factory: 'https://map.naver.com/p/search/%ED%8C%8C%EC%A3%BC%EC%8B%9C%20%EC%86%8C%EB%9D%BC%EC%A7%80%EB%A1%9C%2063-25'
    }
    window.open(urls[type], '_blank')
  }

  return (
    <div className="space-y-8">
      <div className="flex  gap-20">
      {/* 본사 정보 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">본사</h2>
        <div className="space-y-2">
          <p className="text-lg">(07275) 서울특별시 영등포구 영등포로5길 19</p>
          <p className="text-gray-600">동아프라임밸리 702호</p>
          <button
            onClick={() => handleLocationClick('headquarters')}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            위치보기
          </button>
        </div>
      </div>

      {/* 공장 정보 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">공장</h2>
        <div className="space-y-2">
          <p className="text-lg">(10863) 경기도 파주시 소라지로 63-25, 1동</p>
          <p className="text-gray-600">(신촌동24-3)</p>
          <button
            onClick={() => handleLocationClick('factory')}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
          >
            위치보기
          </button>
        </div>
      </div>
      </div>
      {/* 연락처 정보 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">연락처</h2>
        <div className="space-y-2">
          <div>
            <span className="font-medium">TEL:</span>
            <span className="ml-2">02-877-8811</span>
          </div>
          <div>
            <span className="font-medium">FAX:</span>
            <span className="ml-2">02-877-8812</span>
          </div>
          <div>
            <span className="font-medium">E-MAIL:</span>
            <span className="ml-2">seined@naver.com</span>
          </div>
        </div>
      </div>

      {/* 지도 */}
      <div className="h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.7598897094874!2d126.91716687677162!3d37.51731897205442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f3aa0749d3d%3A0x7e2e0ca8f0c8a0a0!2z7ISc7Jq47Yq567OE7IucIOyYgeuTse2PrOq1rCDsmIHrk7Htj6zroZwz6rCA!5e0!3m2!1sko!2skr!4v1642432988000!5m2!1sko!2skr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

type TabItem = {
  id: string;
  label: string;
  component: React.ReactNode;
};

type TabGroup = {
  title: string;
  items: TabItem[];
};

const CONTACT_TABS: TabGroup[] = [
  {
    title: "회사 정보",
    items: [
      {
        id: "location",
        label: "오시는 길",
        component: <LocationSection />,
      },
    ],
  },
  {
    title: "제품 문의",
    items: [
      {
        id: "construction",
        label: "건축요청",
        component: <InquiryForm type="construction" />,
      },
      {
        id: "design",
        label: "이미지, 도면요청",
        component: <InquiryForm type="design" />,
      },
      {
        id: "catalog",
        label: "카탈로그 요청",
        component: <CatalogRequestSection />,
      },
    ],
  },
  {
    title: "고객 지원",
    items: [
      {
        id: "service",
        label: "A/S 접수",
        component: <ServiceRequestSection />,
      },
      {
        id: "quote",
        label: "온라인 견적",
        component: <OnlineQuoteSection />,
      },
      {
        id: "other",
        label: "기타",
        component: <InquiryForm type="other" />,
      },
    ],
  },
];

const TabButton = ({
  id,
  label,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 transition-colors
      ${isActive ? "text-black font-semibold" : "text-gray-600"}`}
  >
    {label}
  </button>
);

const TabNavigation = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) => (
  <div className="w-full max-w-xs lg:border-r lg:pr-6 flex flex-col h-[calc(100vh-var(--header-height)-4rem)]">
    <nav
      className="flex-1 flex flex-col space-y-6"
      role="navigation"
      aria-label="연락처 카테고리"
    >
      {CONTACT_TABS.map((group, index) => (
        <div key={index} className="space-y-1">
          <div className="px-4 py-2 text-[16px] font-bold">
            {group.title}
          </div>
          {group.items.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>
      ))}
    </nav>

    <div className="pt-6 ">
      <ContactInfo />
    </div>
  </div>
);

const TabContent = ({ activeTab }: { activeTab: string }) => {
  const activeItem = CONTACT_TABS.flatMap((group) => group.items).find(
    (item) => item.id === activeTab
  );

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-black mb-8">{activeItem?.label}</h1>
      {activeItem?.component}
    </div>
  );
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState(CONTACT_TABS[0].items[0].id);

  return (
    <div className="min-h-screen bg-white pt-[var(--header-height)]">
      <div className="container mx-auto px-4 pt-8">
        <main>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <TabContent activeTab={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-4">
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
  );
}
