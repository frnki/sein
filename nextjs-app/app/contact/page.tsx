"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import InquiryForm from "../components/InquiryForm";
import CatalogRequestSection from "../components/support/CatalogRequestSection";
import OnlineQuoteSection from "../components/support/OnlineQuoteSection";
import ServiceRequestSection from "../components/support/ServiceRequestSection";

export function LocationSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">본사</h2>
        <div className="space-y-2 text-gray-600">
          <p>서울특별시 강남구 테헤란로 123</p>
          <p>전화: 02-1234-5678</p>
          <p>팩스: 02-1234-5679</p>
        </div>
      </div>

      <div className="h-[400px] w-full bg-gray-100 rounded-lg">
        {/* 카카오맵이나 구글맵 컴포넌트가 들어갈 자리 */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          지도가 표시될 영역
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">대중교통 이용시</h3>
        <div className="space-y-2 text-gray-600">
          <p>지하철: 2호선 강남역 3번 출구에서 도보 5분</p>
          <p>버스: 강남역 버스정류장 하차</p>
        </div>
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
