"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  totalProducts: number;
  selectedCount: number;
  sortOrder: "newest" | "oldest";
  onSortChange: (value: "newest" | "oldest") => void;
  onSearch: (value: string) => void;
}

export default function ProductHeader({
  totalProducts,

  onSearch,
}: Props) {
  return (
    <div className="sticky top-[57px] bg-white z-40 border-b">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="제품명 또는 코드로 검색"
              className="pl-10"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-600 whitespace-nowrap">
            총 <span className="font-bold text-primary">{totalProducts}</span>
            개의 제품
          </div>
        </div>
      </div>
    </div>
  );
}
